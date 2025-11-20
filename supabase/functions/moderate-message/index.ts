import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ModerationResult {
  isViolation: boolean;
  violationType: string | null;
  confidence: number;
  flaggedContent: string | null;
  explanation: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();

    if (!message || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Moderating message from user ${userId}: ${message}`);

    // Call Lovable AI for intelligent content analysis
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = `Eres un moderador de contenido experto para una plataforma de contratación de artistas. Tu trabajo es analizar mensajes y detectar intentos de evadir la plataforma compartiendo información de contacto o enlaces de pago externos.

REGLAS CRÍTICAS DE DETECCIÓN:

1. INFORMACIÓN DE CONTACTO:
   - Emails: cualquier formato incluyendo variaciones (arroba, at, @, [at])
   - Teléfonos: números con o sin formato, códigos de país, espacios, guiones
   - Redes sociales: menciones de Instagram, Facebook, WhatsApp, Telegram, Twitter, TikTok, etc.
   - Nombres de usuario: "@usuario", "búscame en", "mi perfil de", etc.

2. ENLACES Y PAGOS EXTERNOS:
   - URLs completas o parciales
   - Menciones de plataformas: PayPal, Bizum, Stripe directo, transferencias, Venmo, Zelle
   - Frases como "te paso mi", "paga por", "envía dinero a", "mi cuenta es"
   - Links acortados (bit.ly, tinyurl, etc.)

3. EVASIÓN CREATIVA:
   - Números escritos con palabras
   - Caracteres especiales para ofuscar
   - Spacing inusual
   - Códigos o referencias indirectas

FALSOS POSITIVOS A EVITAR:
- Referencias artísticas legítimas ("mi obra tiene un teléfono antiguo")
- Contexto general ("uso Instagram para inspirarme")
- Números no relacionados con contacto ("150 personas", "año 2023")

Responde SOLO con un JSON válido usando esta función.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analiza este mensaje: "${message}"` }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "report_moderation_result",
              description: "Reportar el resultado del análisis de moderación",
              parameters: {
                type: "object",
                properties: {
                  isViolation: {
                    type: "boolean",
                    description: "Si el mensaje contiene una violación"
                  },
                  violationType: {
                    type: "string",
                    enum: ["email", "phone", "social_media", "payment_link", "external_link", "none"],
                    description: "Tipo de violación detectada"
                  },
                  confidence: {
                    type: "number",
                    description: "Nivel de confianza de 0 a 1"
                  },
                  flaggedContent: {
                    type: "string",
                    description: "El contenido específico que viola las reglas"
                  },
                  explanation: {
                    type: "string",
                    description: "Explicación breve de por qué se detectó la violación"
                  }
                },
                required: ["isViolation", "violationType", "confidence", "flaggedContent", "explanation"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "report_moderation_result" } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log("AI response:", JSON.stringify(aiData, null, 2));

    // Extract function call result
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error("No tool call in response");
      throw new Error("Invalid AI response format");
    }

    const result: ModerationResult = JSON.parse(toolCall.function.arguments);
    console.log("Moderation result:", result);

    // If violation detected, record in database
    if (result.isViolation && result.confidence > 0.6) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Check or update user strikes
      const { data: strikes, error: fetchError } = await supabase
        .from("user_strikes")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching strikes:", fetchError);
      }

      let newStrikeCount = 1;
      let isSuspended = false;
      let suspensionUntil = null;

      if (strikes) {
        newStrikeCount = strikes.strike_count + 1;
        
        // Suspension logic
        if (newStrikeCount >= 3) {
          isSuspended = true;
          const now = new Date();
          suspensionUntil = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
        }

        await supabase
          .from("user_strikes")
          .update({
            strike_count: newStrikeCount,
            last_strike_at: new Date().toISOString(),
            is_suspended: isSuspended,
            suspension_until: suspensionUntil?.toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq("user_id", userId);
      } else {
        await supabase
          .from("user_strikes")
          .insert({
            user_id: userId,
            strike_count: 1,
            last_strike_at: new Date().toISOString()
          });
      }

      console.log(`User ${userId} now has ${newStrikeCount} strikes${isSuspended ? ' and is SUSPENDED' : ''}`);
    }

    return new Response(
      JSON.stringify({
        allowed: !result.isViolation || result.confidence <= 0.6,
        result
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in moderate-message:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
