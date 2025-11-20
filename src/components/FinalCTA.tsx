import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Icon */}
          <div className="inline-flex p-4 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm">
            <Sparkles className="w-12 h-12 text-accent" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Creative Journey
            <span className="block mt-2">Begins Here</span>
          </h2>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join ARTUNE today and become part of the UAE's thriving creative community
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/auth/signup/artist">
              <Button 
                variant="hero" 
                size="lg"
                className="group text-lg px-10 py-7 bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl"
              >
                Start as an Artist
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/auth/signup/client">
              <Button 
                variant="outline" 
                size="lg"
                className="group text-lg px-10 py-7 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm"
              >
                Find Your Artist
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Line */}
          <p className="text-sm text-primary-foreground/70 pt-4">
            Trusted by 3,000+ verified artists • Secure AED payments • No hidden fees
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
