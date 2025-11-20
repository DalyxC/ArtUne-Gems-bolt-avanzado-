import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Star, MapPin, Music, Award, Users } from "lucide-react";

const Profile = () => {
  const portfolioItems = [
    { id: 1, title: "Jazz Festival 2023", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400" },
    { id: 2, title: "Wedding Performance", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400" },
    { id: 3, title: "Corporate Event", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400" },
    { id: 4, title: "Live Concert", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400" }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Profile</h1>
                <p className="text-muted-foreground mt-1">Manage your public artist profile</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
            </div>

            {/* Profile Header Card */}
            <Card className="bg-[#0F1419] border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-8 h-8 text-white" />
                    </button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Artist Name</label>
                        <Input defaultValue="Sarah Anderson" className="bg-[#1A1F2C] border-border/50" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Stage Name</label>
                        <Input defaultValue="The Jazz Queen" className="bg-[#1A1F2C] border-border/50" />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Music className="w-3 h-3 mr-1" />
                        Jazz
                      </Badge>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Music className="w-3 h-3 mr-1" />
                        Soul
                      </Badge>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Music className="w-3 h-3 mr-1" />
                        Blues
                      </Badge>
                      <Button variant="outline" size="sm" className="h-7 text-xs border-border/50">
                        + Add Genre
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[#0F1419] border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">4.8</p>
                      <p className="text-xs text-muted-foreground">Average Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0F1419] border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-emerald-500/10">
                      <Award className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">142</p>
                      <p className="text-xs text-muted-foreground">Events Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0F1419] border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">89</p>
                      <p className="text-xs text-muted-foreground">Happy Clients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0F1419] border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">15+</p>
                      <p className="text-xs text-muted-foreground">Cities Performed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About Section */}
            <Card className="bg-[#0F1419] border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Bio</label>
                  <Textarea 
                    placeholder="Tell clients about yourself, your experience, and what makes you unique..."
                    className="min-h-[120px] bg-[#1A1F2C] border-border/50"
                    defaultValue="Professional jazz vocalist with over 10 years of experience performing at weddings, corporate events, and jazz clubs. Known for smooth vocals and engaging stage presence."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Location</label>
                    <Input defaultValue="Los Angeles, CA" className="bg-[#1A1F2C] border-border/50" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Years of Experience</label>
                    <Input defaultValue="10+" className="bg-[#1A1F2C] border-border/50" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Rate Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Min Rate" defaultValue="$500" className="bg-[#1A1F2C] border-border/50" />
                    <Input placeholder="Max Rate" defaultValue="$5,000" className="bg-[#1A1F2C] border-border/50" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card className="bg-[#0F1419] border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">Portfolio</CardTitle>
                <Button variant="outline" className="border-border/50">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photos
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {portfolioItems.map((item) => (
                    <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-medium px-2 text-center">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services Offered */}
            <Card className="bg-[#0F1419] border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">Services Offered</CardTitle>
                <Button variant="outline" className="border-border/50">Add Service</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Live Performance", "Studio Recording", "Private Events", "Corporate Functions", "Wedding Entertainment"].map((service, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50">
                      <span className="text-foreground">{service}</span>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
