import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette, Users, CheckCircle2 } from "lucide-react";

type UserType = "artist" | "client";

const steps = {
  artist: [
    {
      number: "01",
      title: "Create your profile",
      description: "Upload your work and showcase your creative portfolio",
      icon: Palette
    },
    {
      number: "02",
      title: "Get verified",
      description: "Complete identity verification and set your rates",
      icon: CheckCircle2
    },
    {
      number: "03",
      title: "Receive requests",
      description: "Get project requests and event bookings from clients",
      icon: Users
    },
    {
      number: "04",
      title: "Get paid securely",
      description: "Receive payments via escrow protection in AED",
      icon: CheckCircle2
    }
  ],
  client: [
    {
      number: "01",
      title: "Browse artists",
      description: "Explore verified talent or post your creative project",
      icon: Users
    },
    {
      number: "02",
      title: "Connect & compare",
      description: "Chat with artists and review their proposals",
      icon: Palette
    },
    {
      number: "03",
      title: "Pay safely",
      description: "Secure payment through ARTUNE's escrow system",
      icon: CheckCircle2
    },
    {
      number: "04",
      title: "Receive your work",
      description: "Get your finished masterpiece or exceptional performance",
      icon: CheckCircle2
    }
  ]
};

const HowItWorks = () => {
  const [activeType, setActiveType] = useState<UserType>("artist");

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your journey starts here — choose your path
          </p>

          {/* Toggle */}
          <div className="inline-flex p-1 bg-muted rounded-lg">
            <Button
              variant={activeType === "artist" ? "default" : "ghost"}
              onClick={() => setActiveType("artist")}
              className="px-6 py-2"
            >
              I'm an Artist
            </Button>
            <Button
              variant={activeType === "client" ? "default" : "ghost"}
              onClick={() => setActiveType("client")}
              className="px-6 py-2"
            >
              I'm a Client
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps[activeType].map((step, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/80 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl font-bold text-primary/20">
                  {step.number}
                </span>
                <div className="mt-2 p-2 bg-primary/10 rounded-lg">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
