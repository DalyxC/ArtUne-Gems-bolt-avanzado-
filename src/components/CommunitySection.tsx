import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    icon: Users,
    text: "Network with fellow creators"
  },
  {
    icon: Heart,
    text: "Collaborate on projects"
  },
  {
    icon: Zap,
    text: "Grow your creative brand"
  }
];

const CommunitySection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-coral/5 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join a Movement of
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-coral bg-clip-text text-transparent">
              Creative Visionaries
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Join a network of creators redefining art across the Emirates. 
            Collaborate, exhibit, and grow your creative brand.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <highlight.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{highlight.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link to="/auth/role">
            <Button variant="hero" size="lg" className="group text-lg px-8 py-6 bg-secondary hover:bg-secondary/90">
              Join the Movement
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {/* Community Stats */}
          <div className="mt-12 pt-12 border-t border-border/50">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">3K+</div>
                <div className="text-sm text-muted-foreground">Active Creators</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-1">7</div>
                <div className="text-sm text-muted-foreground">Emirates</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-coral mb-1">20+</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
