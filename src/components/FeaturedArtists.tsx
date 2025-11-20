import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, ArrowRight } from "lucide-react";

// Mock data for founding artists
const artists = [
  {
    name: "Amira Al-Mansouri",
    medium: "Visual Art",
    city: "Dubai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    verified: true
  },
  {
    name: "Khalid Rahman",
    medium: "Music Production",
    city: "Abu Dhabi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    verified: true
  },
  {
    name: "Layla Hassan",
    medium: "Fashion Design",
    city: "Dubai",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    verified: true
  },
  {
    name: "Omar Abdulla",
    medium: "Photography",
    city: "Sharjah",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    verified: true
  }
];

const categories = [
  "Visual Art",
  "Music",
  "Fashion",
  "Photography",
  "Performance",
  "Digital Art"
];

const FeaturedArtists = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Artists
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover exceptional talent across the Emirates
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {artists.map((artist, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                {artist.verified && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground p-1.5 rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{artist.name}</h3>
                <p className="text-muted-foreground mb-3">{artist.medium}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {artist.city}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="group">
            Explore All Artists
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
