import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, DollarSign, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Bookings = () => {
  const bookings = [
    {
      id: 1,
      eventName: "Corporate Gala 2024",
      client: "TechCorp Inc.",
      date: "2024-11-15",
      time: "19:00 - 23:00",
      venue: "Grand Ballroom, Hilton Downtown",
      amount: "$2,500",
      status: "confirmed",
      type: "Corporate Event"
    },
    {
      id: 2,
      eventName: "Wedding Reception",
      client: "Sarah & Michael",
      date: "2024-11-20",
      time: "18:00 - 01:00",
      venue: "Riverside Gardens",
      amount: "$3,800",
      status: "confirmed",
      type: "Wedding"
    },
    {
      id: 3,
      eventName: "Jazz Night",
      client: "Blue Note Lounge",
      date: "2024-11-25",
      time: "20:00 - 00:00",
      venue: "Blue Note, Downtown",
      amount: "$1,200",
      status: "pending",
      type: "Live Performance"
    },
    {
      id: 4,
      eventName: "Birthday Celebration",
      client: "Jennifer Martinez",
      date: "2024-12-01",
      time: "19:00 - 22:00",
      venue: "Private Residence",
      amount: "$800",
      status: "pending",
      type: "Private Event"
    },
    {
      id: 5,
      eventName: "Album Launch Party",
      client: "Indie Records",
      date: "2024-10-28",
      time: "21:00 - 02:00",
      venue: "The Warehouse",
      amount: "$2,000",
      status: "completed",
      type: "Concert"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
                <p className="text-muted-foreground mt-1">Manage your upcoming and past events</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Calendar className="w-4 h-4 mr-2" />
                New Booking Request
              </Button>
            </div>

            {/* Filters */}
            <Card className="bg-[#0F1419] border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search bookings..." 
                      className="pl-10 bg-[#1A1F2C] border-border/50"
                    />
                  </div>
                  <Button variant="outline" className="border-border/50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="bg-[#0F1419] border border-border/50">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {bookings.filter(b => b.status === "confirmed").map((booking) => (
                  <Card key={booking.id} className="bg-[#0F1419] border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-foreground">{booking.eventName}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{booking.type}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4 text-primary" />
                              <span>{booking.client}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{booking.venue}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:items-end">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-2xl font-bold text-foreground">{booking.amount}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-border/50">
                              Details
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Contact Client
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {bookings.filter(b => b.status === "pending").map((booking) => (
                  <Card key={booking.id} className="bg-[#0F1419] border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-foreground">{booking.eventName}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{booking.type}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4 text-primary" />
                              <span>{booking.client}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{booking.venue}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:items-end">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-2xl font-bold text-foreground">{booking.amount}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                              Decline
                            </Button>
                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                              Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {bookings.filter(b => b.status === "completed").map((booking) => (
                  <Card key={booking.id} className="bg-[#0F1419] border-border/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-foreground">{booking.eventName}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{booking.type}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4 text-primary" />
                              <span>{booking.client}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>{booking.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:items-end">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-2xl font-bold text-foreground">{booking.amount}</span>
                          </div>
                          <Button variant="outline" size="sm" className="border-border/50">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Bookings;
