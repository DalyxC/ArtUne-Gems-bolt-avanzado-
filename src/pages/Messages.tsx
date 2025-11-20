import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface Conversation {
  id: string;
  client_id: string;
  artist_id: string;
  updated_at: string;
  client?: {
    full_name: string;
  };
  artist?: {
    full_name: string;
  };
  lastMessage?: {
    content: string;
    created_at: string;
  };
}

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  const fetchConversations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data: conversationsData, error: convError } = await supabase
        .from("conversations")
        .select(`
          *,
          client:profiles!conversations_client_id_fkey (full_name),
          artist:profiles!conversations_artist_id_fkey (full_name)
        `)
        .or(`client_id.eq.${user.id},artist_id.eq.${user.id}`)
        .order("updated_at", { ascending: false });

      if (convError) throw convError;

      const enrichedConversations = await Promise.all(
        (conversationsData || []).map(async (conv) => {
          const { data: lastMessage } = await supabase
            .from("messages")
            .select("content, created_at")
            .eq("conversation_id", conv.id)
            .eq("is_blocked", false)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          return {
            ...conv,
            lastMessage,
          };
        })
      );

      setConversations(enrichedConversations);
      
      if (enrichedConversations.length > 0 && !selectedConversation) {
        setSelectedConversation(enrichedConversations[0]);
      }
    } catch (error: any) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const getOtherUser = (conversation: Conversation) => {
    if (!user) return { id: "", name: "Usuario" };
    
    const isClient = conversation.client_id === user.id;
    return {
      id: isClient ? conversation.artist_id : conversation.client_id,
      name: isClient 
        ? conversation.artist?.full_name || "Artista" 
        : conversation.client?.full_name || "Cliente",
    };
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Conversations List */}
        <div className="w-full lg:w-96 border-r bg-card">
          <div className="p-4 border-b">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Mensajes
            </h2>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-80px)]">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">
                Cargando conversaciones...
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tienes conversaciones aún</p>
              </div>
            ) : (
              conversations.map((conversation) => {
                const otherUser = getOtherUser(conversation);
                const isSelected = selectedConversation?.id === conversation.id;

                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
                      isSelected ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="mt-1">
                        <AvatarFallback>
                          {otherUser.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold truncate">{otherUser.name}</p>
                          {conversation.lastMessage && (
                            <span className="text-xs text-muted-foreground">
                              {format(
                                new Date(conversation.lastMessage.created_at),
                                "HH:mm"
                              )}
                            </span>
                          )}
                        </div>
                        {conversation.lastMessage ? (
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage.content}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            Sin mensajes
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 p-4 lg:p-8">
          {selectedConversation && user ? (
            <ChatWindow
              conversationId={selectedConversation.id}
              otherUserId={getOtherUser(selectedConversation).id}
              otherUserName={getOtherUser(selectedConversation).name}
              currentUserId={user.id}
            />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-xl text-muted-foreground">
                  Selecciona una conversación para comenzar
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Messages;
