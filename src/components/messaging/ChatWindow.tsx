import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send, AlertTriangle, Ban } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  is_blocked: boolean;
  profiles?: {
    full_name: string;
  };
}

interface ChatWindowProps {
  conversationId: string;
  otherUserId: string;
  otherUserName: string;
  currentUserId: string;
}

export function ChatWindow({
  conversationId,
  otherUserId,
  otherUserName,
  currentUserId,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [suspensionEnd, setSuspensionEnd] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
    checkSuspensionStatus();

    // Subscribe to real-time messages
    const channel = supabase
      .channel(`conversation-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          console.log("New message received:", payload);
          const newMsg = payload.new as Message;
          if (!newMsg.is_blocked) {
            setMessages((prev) => [...prev, newMsg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checkSuspensionStatus = async () => {
    const { data } = await supabase
      .from("user_strikes")
      .select("*")
      .eq("user_id", currentUserId)
      .single();

    if (data?.is_suspended) {
      const suspensionEndDate = data.suspension_until
        ? new Date(data.suspension_until)
        : null;
      if (suspensionEndDate && suspensionEndDate > new Date()) {
        setIsSuspended(true);
        setSuspensionEnd(data.suspension_until);
      }
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        profiles:sender_id (full_name)
      `)
      .eq("conversation_id", conversationId)
      .eq("is_blocked", false)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los mensajes",
        variant: "destructive",
      });
      return;
    }

    setMessages(data || []);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || loading || isSuspended) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-message", {
        body: {
          conversationId,
          content: newMessage.trim(),
        },
      });

      if (error) throw error;

      if (data?.error) {
        if (data.error === "suspended") {
          setIsSuspended(true);
          setSuspensionEnd(data.suspensionUntil);
          toast({
            title: "Cuenta Suspendida",
            description: data.message,
            variant: "destructive",
          });
        } else if (data.error === "blocked") {
          toast({
            title: "Mensaje Bloqueado",
            description: data.message,
            variant: "destructive",
          });
        }
        setNewMessage("");
        return;
      }

      setNewMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {otherUserName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{otherUserName}</p>
            <p className="text-sm text-muted-foreground font-normal">
              Conversación segura
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {isSuspended && (
          <Alert variant="destructive">
            <Ban className="h-4 w-4" />
            <AlertDescription>
              Tu cuenta está suspendida hasta{" "}
              {suspensionEnd &&
                format(new Date(suspensionEnd), "PPP", { locale: es })}
              . No puedes enviar mensajes hasta que se revise tu caso.
            </AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Importante:</strong> Por tu seguridad, está prohibido
            compartir información de contacto (emails, teléfonos, redes
            sociales) o enlaces de pago externos. Los mensajes que infrinjan
            estas normas serán bloqueados automáticamente.
          </AlertDescription>
        </Alert>

        {messages.map((message) => {
          const isOwn = message.sender_id === currentUserId;
          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isOwn
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {!isOwn && (
                  <p className="text-xs font-semibold mb-1">
                    {message.profiles?.full_name || "Usuario"}
                  </p>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {format(new Date(message.created_at), "HH:mm")}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </CardContent>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={
              isSuspended
                ? "No puedes enviar mensajes (suspendido)"
                : "Escribe un mensaje..."
            }
            disabled={loading || isSuspended}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || isSuspended || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
