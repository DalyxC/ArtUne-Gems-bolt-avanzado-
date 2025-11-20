import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Star, MapPin, Heart, Filter, DollarSign } from "lucide-react";
import { useState } from "react";

export default function ClientFindArtists() {
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const artists = [
    { name: "Sarah Johnson", genre: "Jazz Vocalist", rating: 4.9, reviews: 124, price: "$500-800", location: "New York", avatar: "SJ", tags: ["Wedding", "Corporate"], availability: "Available" },
    { name: "Mike Chen", genre: "DJ & Producer", rating: 4.8, reviews: 89, price: "$400-600", location: "Los Angeles", avatar: "MC", tags: ["Birthday", "Club"], availability: "Available" },
    { name: "Emma Wilson", genre: "Classical Pianist", rating: 5.0, reviews: 156, price: "$600-900", location: "Chicago", avatar: "EW", tags: ["Wedding", "Classical"], availability: "Booked" },
    { name: "Alex Rivera", genre: "Live Band", rating: 4.7, reviews: 98, price: "$800-1200", location: "Miami", avatar: "AR", tags: ["Corporate", "Festival"], availability: "Available" },
    { name: "Lisa Park", genre: "Acoustic Guitarist", rating: 4.9, reviews: 142, price: "$300-500", location: "Seattle", avatar: "LP", tags: ["Wedding", "Cafe"], availability: "Available" },
    { name: "David Brown", genre: "Hip Hop MC", rating: 4.6, reviews: 67, price: "$700-1000", location: "Atlanta", avatar: "DB", tags: ["Birthday", "Club"], availability: "Available" },
    { name: "Maria Garcia", genre: "Opera Singer", rating: 5.0, reviews: 203, price: "$900-1500", location: "Boston", avatar: "MG", tags: ["Classical", "Theater"], availability: "Booked" },
    { name: "Tom Anderson", genre: "Rock Band", rating: 4.8, reviews: 115, price: "$600-900", location: "Nashville", avatar: "TA", tags: ["Festival", "Bar"], availability: "Available" },
  ];

  const genres = ["All", "Jazz", "Classical", "DJ", "Rock", "Pop", "Hip Hop", "Country"];
  const eventTypes = ["All Events", "Wedding", "Corporate", "Birthday", "Festival", "Private Party"];
  const locations = ["All Locations", "New York", "Los Angeles", "Chicago", "Miami", "Seattle", "Atlanta", "Boston"];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <ClientSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 space-y-6 max-w-7xl">
          
          {/* Header */}
          <div className="space-y-2 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground">Find Your Perfect Artist</h1>
            <p className="text-muted-foreground text-lg">
              Discover talented performers for your next event
            </p>
          </div>

          {/* Search & Filters */}
          <Card className="animate-fade-in border-border/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, genre, or location..." 
                    className="pl-10 h-12 bg-muted/30 border-border"
                  />
                </div>
                <Button size="lg" className="px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Select defaultValue="all-genres">
                  <SelectTrigger className="h-10 bg-muted/30">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre.toLowerCase().replace(" ", "-")}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select defaultValue="all-events">
                  <SelectTrigger className="h-10 bg-muted/30">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(" ", "-")}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select defaultValue="all-locations">
                  <SelectTrigger className="h-10 bg-muted/30">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase().replace(" ", "-")}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select defaultValue="rating">
                  <SelectTrigger className="h-10 bg-muted/30">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Price Range
                  </label>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={2000}
                  step={50}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{artists.length}</span> results
            </p>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Artist Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {artists.map((artist, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-border/50 group"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-20 h-20 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-xl font-bold">
                        {artist.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                            {artist.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{artist.genre}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-coral">
                          <Heart className="w-5 h-5" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="font-medium text-sm">{artist.rating}</span>
                            <span className="text-xs text-muted-foreground">({artist.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{artist.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {artist.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                      <span className="text-xl font-bold text-primary">{artist.price}</span>
                    </div>
                    <Badge 
                      variant={artist.availability === "Available" ? "default" : "secondary"}
                      className={
                        artist.availability === "Available"
                          ? "bg-green-500/20 text-green-500 border-green-500/30"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {artist.availability}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                    <Button size="sm" className="w-full">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 py-4">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="default" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>

        </div>
      </main>
    </div>
  );
}
