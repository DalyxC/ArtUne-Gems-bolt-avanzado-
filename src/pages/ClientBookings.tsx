import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, MessageSquare, FileText, Download, XCircle } from "lucide-react";

export default function ClientBookings() {
  const upcomingBookings = [
    { 
      id: 1,
      name: "Corporate Gala 2024", 
      artist: "Mike Chen", 
      date: "Dec 15, 2024", 
      time: "7:00 PM - 11:00 PM", 
      location: "Grand Hotel Ballroom, New York", 
      amount: "$550",
      status: "confirmed",
      type: "DJ & Producer"
    },
    { 
      id: 2,
      name: "Wedding Reception", 
      artist: "Sarah Johnson", 
      date: "Dec 22, 2024", 
      time: "6:30 PM - 10:30 PM", 
      location: "Riverside Gardens, Chicago", 
      amount: "$750",
      status: "confirmed",
      type: "Jazz Vocalist"
    },
    { 
      id: 3,
      name: "Birthday Celebration", 
      artist: "Emma Wilson", 
      date: "Jan 5, 2025", 
      time: "5:00 PM - 8:00 PM", 
      location: "Private Venue, Boston", 
      amount: "$650",
      status: "pending",
      type: "Classical Pianist"
    },
  ];

  const pastBookings = [
    { 
      id: 4,
      name: "Anniversary Party", 
      artist: "Alex Rivera", 
      date: "Nov 10, 2024", 
      time: "8:00 PM - 12:00 AM", 
      location: "Sunset Lounge, Miami", 
      amount: "$900",
      status: "completed",
      type: "Live Band",
      rated: true
    },
    { 
      id: 5,
      name: "Corporate Mixer", 
      artist: "Lisa Park", 
      date: "Oct 28, 2024", 
      time: "6:00 PM - 9:00 PM", 
      location: "Tech Hub, Seattle", 
      amount: "$400",
      status: "completed",
      type: "Acoustic Guitarist",
      rated: false
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "pending":
        return "bg-accent/20 text-accent border-accent/30";
      case "completed":
        return "bg-primary/20 text-primary border-primary/30";
      case "cancelled":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <ClientSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 space-y-6 max-w-7xl">
          
          {/* Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold text-foreground">My Bookings</h1>
              <p className="text-muted-foreground text-lg mt-2">
                Manage your event bookings and reservations
              </p>
            </div>
            <Button size="lg" className="px-8">
              <Calendar className="w-5 h-5 mr-2" />
              New Booking
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="upcoming" className="animate-fade-in">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
              <TabsTrigger value="upcoming" className="text-base">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="text-base">
                Past Events ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Bookings */}
            <TabsContent value="upcoming" className="space-y-4 mt-6">
              {upcomingBookings.map((booking) => (
                <Card 
                  key={booking.id} 
                  className="hover:shadow-lg transition-all duration-300 border-border/50"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                              {booking.name}
                            </h3>
                            <p className="text-muted-foreground">
                              with <span className="text-primary font-semibold">{booking.artist}</span> • {booking.type}
                            </p>
                          </div>
                          <Badge variant="default" className={getStatusColor(booking.status)}>
                            {booking.status.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="p-2 rounded-lg bg-muted">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="text-sm font-medium text-foreground">{booking.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="p-2 rounded-lg bg-muted">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Time</p>
                              <p className="text-sm font-medium text-foreground">{booking.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="p-2 rounded-lg bg-muted">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Location</p>
                              <p className="text-sm font-medium text-foreground">{booking.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                            <p className="text-3xl font-bold text-primary">{booking.amount}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Chat
                            </Button>
                            <Button variant="outline">
                              <FileText className="w-4 h-4 mr-2" />
                              Details
                            </Button>
                            {booking.status === "pending" && (
                              <Button variant="destructive">
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Past Bookings */}
            <TabsContent value="past" className="space-y-4 mt-6">
              {pastBookings.map((booking) => (
                <Card 
                  key={booking.id} 
                  className="hover:shadow-lg transition-all duration-300 border-border/50"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                              {booking.name}
                            </h3>
                            <p className="text-muted-foreground">
                              with <span className="text-primary font-semibold">{booking.artist}</span> • {booking.type}
                            </p>
                          </div>
                          <Badge variant="default" className={getStatusColor(booking.status)}>
                            {booking.status.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="p-2 rounded-lg bg-muted">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="text-sm font-medium text-foreground">{booking.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="p-2 rounded-lg bg-muted">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Time</p>
                              <p className="text-sm font-medium text-foreground">{booking.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="p-2 rounded-lg bg-muted">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Location</p>
                              <p className="text-sm font-medium text-foreground">{booking.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                            <p className="text-3xl font-bold text-primary">{booking.amount}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Receipt
                            </Button>
                            <Button variant="outline">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message
                            </Button>
                            {!booking.rated && (
                              <Button>
                                Leave Review
                              </Button>
                            )}
                            {booking.rated && (
                              <Button variant="outline" disabled>
                                Review Submitted
                              </Button>
                            )}
                          </div>
                        </div>
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
  );
}
