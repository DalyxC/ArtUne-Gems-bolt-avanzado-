import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { conversationId, content, attachmentUrl, attachmentType } = await req.json();

    if (!conversationId || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing message from user ${user.id} in conversation ${conversationId}`);

    // Check if user is suspended
    const { data: strikes } = await supabase
      .from("user_strikes")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (strikes?.is_suspended) {
      const suspensionEnd = strikes.suspension_until ? new Date(strikes.suspension_until) : null;
      if (suspensionEnd && suspensionEnd > new Date()) {
        return new Response(
          JSON.stringify({
            error: "suspended",
            message: `Tu cuenta está suspendida hasta ${suspensionEnd.toLocaleDateString('es-ES')} por múltiples infracciones a las políticas de la plataforma.`,
            suspensionUntil: suspensionEnd.toISOString()
          }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Call moderation function
    const moderationResponse = await fetch(
      `${supabaseUrl}/functions/v1/moderate-message`,
      {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          userId: user.id
        }),
      }
    );

    if (!moderationResponse.ok) {
      console.error("Moderation failed:", await moderationResponse.text());
      throw new Error("Moderation service unavailable");
    }

    const moderationResult = await moderationResponse.json();
    console.log("Moderation result:", moderationResult);

    // If message is blocked
    if (!moderationResult.allowed) {
      const violation = moderationResult.result;
      
      // Log the flagged message (store as blocked)
      const { error: insertError } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: content,
          is_flagged: true,
          is_blocked: true
        });

      if (insertError) {
        console.error("Error inserting flagged message:", insertError);
      }

      // Log the flag
      const serviceRoleClient = createClient(
        supabaseUrl,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      await serviceRoleClient.from("message_flags").insert({
        user_id: user.id,
        violation_type: violation.violationType,
        flagged_content: violation.flaggedContent,
        ai_confidence: violation.confidence
      });

      // Get current strike count
      const currentStrikes = strikes?.strike_count || 0;

      return new Response(
        JSON.stringify({
          error: "blocked",
          violation: {
            type: violation.violationType,
            explanation: violation.explanation,
            strikeCount: currentStrikes + 1
          },
          message: getViolationMessage(violation.violationType, currentStrikes + 1)
        }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Message passed moderation, insert it
    const { data: message, error: insertError } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: content,
        attachment_url: attachmentUrl,
        attachment_type: attachmentType
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting message:", insertError);
      throw insertError;
    }

    console.log("Message sent successfully:", message.id);

    return new Response(
      JSON.stringify({ success: true, message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-message:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function getViolationMessage(violationType: string, strikeCount: number): string {
  const baseMessage = "🚫 Este mensaje fue bloqueado porque ";
  
  let typeMessage = "";
  switch (violationType) {
    case "email":
      typeMessage = "contiene una dirección de correo electrónico.";
      break;
    case "phone":
      typeMessage = "contiene un número de teléfono.";
      break;
    case "social_media":
      typeMessage = "contiene información de redes sociales o apps de mensajería.";
      break;
    case "payment_link":
      typeMessage = "menciona plataformas de pago externas.";
      break;
    case "external_link":
      typeMessage = "contiene enlaces externos no permitidos.";
      break;
    default:
      typeMessage = "contiene información prohibida.";
  }

  const policyMessage = "\n\n📋 Por tu seguridad y la de todos los usuarios, toda la comunicación y los pagos deben realizarse a través de la plataforma ArtUne.";
  
  let strikeMessage = "";
  if (strikeCount === 1) {
    strikeMessage = "\n\n⚠️ Esta es tu primera advertencia.";
  } else if (strikeCount === 2) {
    strikeMessage = "\n\n⚠️⚠️ Esta es tu segunda advertencia. Una más resultará en la suspensión temporal de tu cuenta.";
  } else if (strikeCount >= 3) {
    strikeMessage = "\n\n🔒 Has acumulado 3 advertencias. Tu cuenta será suspendida temporalmente y requerirá revisión manual para ser reactivada.";
  }

  return baseMessage + typeMessage + policyMessage + strikeMessage;
}
