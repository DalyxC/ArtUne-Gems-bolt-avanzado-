import { Card } from "@/components/ui/card";
import { Users, Shield, Star, TrendingUp } from "lucide-react";

const metrics = [
  {
    icon: Users,
    value: "3,000+",
    label: "Verified Artists",
    color: "text-primary"
  },
  {
    icon: Shield,
    value: "100%",
    label: "Secure Payments",
    color: "text-accent"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    color: "text-coral"
  },
  {
    icon: TrendingUp,
    value: "15K+",
    label: "Projects Completed",
    color: "text-primary"
  }
];

const testimonials = [
  {
    quote: "ARTUNE transformed how I connect with clients. The verification badge gave me instant credibility.",
    author: "Sarah Al-Khalifa",
    role: "Visual Artist, Dubai",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
  },
  {
    quote: "Finding the perfect photographer for our event was effortless. The escrow system made payment worry-free.",
    author: "Ahmed Al-Mazrouei",
    role: "Event Organizer, Abu Dhabi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
  }
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built on Trust
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of artists and clients creating together
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex p-3 rounded-xl bg-muted/50 mb-4">
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
              <div className="text-4xl font-bold mb-2">{metric.value}</div>
              <div className="text-muted-foreground">{metric.label}</div>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-lg transition-all duration-300 border-border/50 bg-card animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-bold text-lg">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Secure AED Payments via Stripe Connect</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Verified Artist Badge System</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
