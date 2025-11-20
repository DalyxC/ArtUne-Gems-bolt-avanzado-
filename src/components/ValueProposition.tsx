import { Shield, CreditCard, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const values = [
  {
    icon: Shield,
    title: "Verified Talent",
    description: "Every artist profile is manually reviewed and verified for quality and authenticity.",
    color: "text-primary"
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Escrow protection in AED — funds released only after successful completion.",
    color: "text-accent"
  },
  {
    icon: Target,
    title: "Smart Matching",
    description: "Intelligent discovery powered by tags, styles, ratings, and verified reviews.",
    color: "text-coral"
  }
];

const ValueProposition = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why ARTUNE
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Backed by creativity. Built on trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-muted/50 mb-6`}>
                <value.icon className={`w-8 h-8 ${value.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
