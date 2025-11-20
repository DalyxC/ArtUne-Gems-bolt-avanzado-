import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Paperclip, MoreVertical } from "lucide-react";

export default function ClientMessages() {
  const conversations = [
    { id: 1, name: "Mike Chen", role: "DJ & Producer", avatar: "MC", lastMessage: "Sounds great! I'll prepare the setlist", time: "10 min ago", unread: 2, online: true },
    { id: 2, name: "Sarah Johnson", role: "Jazz Vocalist", avatar: "SJ", lastMessage: "Looking forward to the event!", time: "1 hour ago", unread: 0, online: true },
    { id: 3, name: "Emma Wilson", role: "Classical Pianist", avatar: "EW", lastMessage: "Can we discuss the song selection?", time: "3 hours ago", unread: 1, online: false },
    { id: 4, name: "Alex Rivera", role: "Live Band", avatar: "AR", lastMessage: "Thank you for the booking!", time: "1 day ago", unread: 0, online: false },
  ];

  const messages = [
    { id: 1, sender: "Mike Chen", content: "Hi! Thanks for booking me for your corporate event. I'm excited to perform!", time: "10:30 AM", own: false },
    { id: 2, sender: "You", content: "Hi Mike! We're thrilled to have you. Do you need anything specific for the setup?", time: "10:35 AM", own: true },
    { id: 3, sender: "Mike Chen", content: "Just the standard DJ equipment. I'll bring my own controller and laptop. Do you have a sound system?", time: "10:40 AM", own: false },
    { id: 4, sender: "You", content: "Yes, the venue has a professional sound system. I'll send you the technical specs.", time: "10:45 AM", own: true },
    { id: 5, sender: "Mike Chen", content: "Perfect! Also, any specific music preferences or genres you'd like me to focus on?", time: "10:50 AM", own: false },
    { id: 6, sender: "You", content: "Mix of upbeat electronic and some classics. The crowd is pretty diverse, ages 25-50.", time: "10:55 AM", own: true },
    { id: 7, sender: "Mike Chen", content: "Sounds great! I'll prepare the setlist accordingly. See you on the 15th!", time: "11:00 AM", own: false },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <ClientSidebar />
      
      <main className="flex-1 overflow-hidden flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-border flex flex-col bg-card/50">
          <div className="p-4 border-b border-border space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-9 bg-muted/30 border-border"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                  conversation.id === 1 ? "bg-muted/30" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">
                          {conversation.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">{conversation.role}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-1">
                      {conversation.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground">{conversation.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-card/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                      MC
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Mike Chen</h3>
                  <p className="text-sm text-muted-foreground">DJ & Producer • Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.own ? "flex-row-reverse" : ""}`}
              >
                {!message.own && (
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold">
                      MC
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex flex-col ${message.own ? "items-end" : "items-start"} max-w-lg`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.own
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-2">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card/50">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type your message..."
                className="flex-1 bg-muted/30 border-border"
              />
              <Button size="icon" className="flex-shrink-0">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
