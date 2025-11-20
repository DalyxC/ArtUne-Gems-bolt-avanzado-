import { ClientSidebar } from "@/components/client/ClientSidebar";
import DashboardTopNav from "@/components/dashboard/DashboardTopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DollarSign, Calendar, Heart, Clock, Search, Star, MapPin, 
  MessageSquare, FileText, TrendingUp, Music, Palette, Camera, Mic
} from "lucide-react";
import OnboardingTutorial from "@/components/onboarding/OnboardingTutorial";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useClientData } from "@/hooks/useClientData";
import { useAuth } from "@/hooks/useAuth";

export default function ClientDashboard() {
  const { showOnboarding, completeOnboarding, skipOnboarding } = useOnboarding();
  const { stats: clientStats, loading } = useClientData();
  const { user } = useAuth();

  const stats = [
    { 
      title: "Total Spent", 
      value: clientStats?.totalSpent || "$0", 
      change: `${clientStats?.trends.spent || 0}%`, 
      trend: (clientStats?.trends.spent || 0) >= 0 ? "up" : "down", 
      icon: DollarSign,
      color: "text-green-500"
    },
    { 
      title: "Total Bookings", 
      value: String(clientStats?.totalBookings || 0), 
      change: `+${clientStats?.trends.bookings || 0}`, 
      trend: "up", 
      icon: Calendar,
      color: "text-primary"
    },
    { 
      title: "Favorite Artists", 
      value: String(clientStats?.favoriteArtists || 0), 
      change: `+${clientStats?.trends.favorites || 0}`, 
      trend: "up", 
      icon: Heart,
      color: "text-coral"
    },
    { 
      title: "Upcoming Events", 
      value: String(clientStats?.upcomingEvents || 0), 
      change: "Next 30 days", 
      trend: "neutral", 
      icon: Clock,
      color: "text-accent"
    },
  ];

  const featuredArtists = [
    { name: "Sarah Johnson", genre: "Jazz Vocalist", rating: 4.9, reviews: 124, price: "$500-800", location: "New York", avatar: "SJ", tags: ["Wedding", "Corporate"] },
    { name: "Mike Chen", genre: "DJ & Producer", rating: 4.8, reviews: 89, price: "$400-600", location: "Los Angeles", avatar: "MC", tags: ["Birthday", "Club"] },
    { name: "Emma Wilson", genre: "Classical Pianist", rating: 5.0, reviews: 156, price: "$600-900", location: "Chicago", avatar: "EW", tags: ["Wedding", "Classical"] },
    { name: "Alex Rivera", genre: "Live Band", rating: 4.7, reviews: 98, price: "$800-1200", location: "Miami", avatar: "AR", tags: ["Corporate", "Festival"] },
  ];

  const upcomingEvents = [
    { 
      id: 1,
      name: "Corporate Gala 2024", 
      artist: "Mike Chen", 
      date: "Dec 15, 2024", 
      time: "7:00 PM", 
      location: "Grand Hotel Ballroom", 
      amount: "$550",
      status: "confirmed"
    },
    { 
      id: 2,
      name: "Wedding Reception", 
      artist: "Sarah Johnson", 
      date: "Dec 22, 2024", 
      time: "6:30 PM", 
      location: "Riverside Gardens", 
      amount: "$750",
      status: "confirmed"
    },
    { 
      id: 3,
      name: "Birthday Celebration", 
      artist: "Emma Wilson", 
      date: "Jan 5, 2025", 
      time: "5:00 PM", 
      location: "Private Venue", 
      amount: "$650",
      status: "pending"
    },
  ];

  const quickActions = [
    { title: "Find Artists", icon: Search, color: "bg-primary/10 text-primary", description: "Browse our talent" },
    { title: "Schedule Event", icon: Calendar, color: "bg-accent/10 text-accent", description: "Book an artist" },
    { title: "View Favorites", icon: Heart, color: "bg-coral/10 text-coral", description: "Your saved artists" },
    { title: "Event History", icon: FileText, color: "bg-muted text-muted-foreground", description: "Past bookings" },
  ];

  const recentActivity = [
    { action: "Booked Mike Chen for Corporate Gala", time: "2 hours ago", icon: Calendar },
    { action: "Added Sarah Johnson to favorites", time: "5 hours ago", icon: Heart },
    { action: "Sent message to Emma Wilson", time: "1 day ago", icon: MessageSquare },
    { action: "Paid $750 for Wedding Reception", time: "2 days ago", icon: DollarSign },
  ];

  const tags = ["Wedding", "Corporate", "Birthday", "Jazz", "DJ", "Classical", "Rock", "Pop"];

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <OnboardingTutorial 
        open={showOnboarding}
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
        dashboardType="client"
      />
      <DashboardTopNav userRole="client" />
      
      <div className="flex flex-1 min-h-0">
        <ClientSidebar />
        
        <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 space-y-8 max-w-7xl">
          
          {/* Welcome Header */}
          <div className="space-y-2 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome back, John 👋
            </h1>
            <p className="text-muted-foreground text-lg">Here's what's happening today</p>
          </div>

          {/* KPI Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      {stat.trend === "up" && (
                        <div className="flex items-center gap-1 text-green-500 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          <span>{stat.change}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Find Your Perfect Artist */}
          <Card className="animate-fade-in border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Search className="w-6 h-6 text-primary" />
                Find Your Perfect Artist
              </CardTitle>
              <CardDescription>Search by keyword, genre, location, or event type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search artists by name, genre, or location..." 
                    className="pl-10 h-12 bg-muted/30 border-border"
                  />
                </div>
                <Button size="lg" className="px-8">
                  Search
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1.5"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Featured Artists */}
            <Card className="lg:col-span-2 animate-fade-in border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Featured Artists</CardTitle>
                    <CardDescription>Top-rated talent for your next event</CardDescription>
                  </div>
                  <Button variant="outline">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {featuredArtists.map((artist, index) => (
                    <Card 
                      key={index} 
                      className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-card/50 border-border/30"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="w-16 h-16 border-2 border-primary/20">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-lg font-bold">
                              {artist.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-lg mb-1">{artist.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{artist.genre}</p>
                            <div className="flex items-center gap-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-accent text-accent" />
                                <span className="font-medium">{artist.rating}</span>
                                <span className="text-muted-foreground">({artist.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{artist.location}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="icon" variant="ghost" className="text-coral hover:text-coral">
                            <Heart className="w-5 h-5" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {artist.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <span className="text-lg font-bold text-primary">{artist.price}</span>
                          <Button size="sm">View Profile</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions & Recent Activity */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="animate-fade-in border-border/50">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used functions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group"
                      >
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {action.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{action.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="animate-fade-in border-border/50">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-start gap-3 pb-4 border-b border-border/30 last:border-0 last:pb-0">
                          <div className="p-2 rounded-lg bg-muted">
                            <Icon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground">{activity.action}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Upcoming Events */}
          <Card className="animate-fade-in border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Upcoming Events</CardTitle>
                  <CardDescription>Your scheduled bookings</CardDescription>
                </div>
                <Button variant="outline">View All Bookings</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <Card 
                    key={event.id} 
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer bg-card/50 border-border/30"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 grid md:grid-cols-5 gap-4 items-center">
                          <div className="md:col-span-2">
                            <h4 className="font-semibold text-foreground mb-1">{event.name}</h4>
                            <p className="text-sm text-muted-foreground">with {event.artist}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge 
                            variant={event.status === "confirmed" ? "default" : "secondary"}
                            className={
                              event.status === "confirmed" 
                                ? "bg-green-500/20 text-green-500 border-green-500/30" 
                                : "bg-accent/20 text-accent border-accent/30"
                            }
                          >
                            {event.status}
                          </Badge>
                          <span className="text-lg font-bold text-primary min-w-[80px] text-right">{event.amount}</span>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Planning Tips */}
          <Card className="animate-fade-in border-border/50 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-2">💡 Planning Tip</h3>
                  <p className="text-muted-foreground mb-4">
                    Book early for holiday season! Top-rated artists get booked 2-3 months in advance. 
                    Consider securing your favorite performers now for upcoming events.
                  </p>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Browse Available Artists
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
      </div>
    </div>
  );
}
