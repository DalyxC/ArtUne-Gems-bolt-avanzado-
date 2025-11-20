import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, User } from "lucide-react";

const UpcomingEvents = () => {
  // Mock data - replace with real API calls
  const events = [
    {
      id: 1,
      name: "Wedding Reception",
      client: "Client: Sarah & Mert Johnson",
      date: "12.2024-05-20 18:00",
      venue: "Four Seasons Resort",
      status: "confirmed",
      payment: "$2,500"
    },
    {
      id: 2,
      name: "Corporate Event",
      client: "Client: TechCorp Events",
      date: "12.2024-06-15 19:30",
      venue: "Convention Center",
      status: "pending",
      payment: "$3,500"
    },
    {
      id: 3,
      name: "Birthday Party",
      client: "Client: Emma Rodriguez",
      date: "12.2024-07-22 20:00",
      venue: "Private Residence",
      status: "confirmed",
      payment: "$1,800"
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="bg-[#0F1419] border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl text-foreground">Upcoming Events</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Your next bookings and their details
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event) => (
          <div 
            key={event.id}
            className="p-5 rounded-xl bg-[#1A1F2C] border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-foreground text-lg truncate">
                    {event.name}
                  </h3>
                  <Badge className={`text-xs font-semibold capitalize shrink-0 ${getStatusStyle(event.status)}`}>
                    {event.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <User className="w-4 h-4 shrink-0" />
                  <span className="truncate">{event.client}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold text-primary mb-1">
                  {event.payment}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 shrink-0 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 text-primary" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              className="w-full text-sm h-9 border-border/50 hover:border-primary hover:bg-primary/10 hover:text-primary font-medium"
            >
              View Details
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;

