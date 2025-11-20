import { Card } from "@/components/ui/card";
import { Cpu, MessageSquare, Search, Smartphone } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Smart Role Detection",
    description: "Intelligent routing and personalized experiences"
  },
  {
    icon: MessageSquare,
    title: "Real-time Communication",
    description: "Instant chat and live project updates"
  },
  {
    icon: Search,
    title: "AI-Powered Discovery",
    description: "Find the perfect artist match instantly"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Seamless experience on every device"
  }
];

const TechnologySection = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Engineered for Excellence
          </h2>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
            Built for the creative future of the UAE
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/10 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-3 bg-primary/10 rounded-xl inline-flex mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-secondary-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-secondary-foreground/60 max-w-3xl mx-auto">
            Powered by cutting-edge technology: secure authentication, real-time data sync, 
            AI-powered matching, and enterprise-grade security — all optimized for performance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
