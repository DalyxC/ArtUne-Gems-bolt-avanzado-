import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const RecentMessages = () => {
  // Mock data - replace with real API calls
  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      preview: "Thank you for the quote for our wedding!...",
      timeAgo: "2 hours ago",
      isUnread: true
    },
    {
      id: 2,
      sender: "TechCorp Events",
      preview: "Hi! I'd like to confirm the technical requirements...",
      timeAgo: "5 hours ago",
      isUnread: false
    },
    {
      id: 3,
      sender: "Emma Rodriguez",
      preview: "Thank you for the quick response!",
      timeAgo: "1 day ago",
      isUnread: false
    }
  ];

  return (
    <Card className="bg-[#0F1419] border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg text-foreground">Recent Messages</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-4 rounded-lg bg-[#1A1F2C] border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-foreground">
                    {message.sender.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                      {message.sender}
                    </span>
                    {message.isUnread && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {message.timeAgo}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 ml-10">
              {message.preview}
            </p>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          className="w-full mt-4 border-border/50 hover:border-primary hover:bg-primary/10 hover:text-primary font-medium"
        >
          View All Messages
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentMessages;

