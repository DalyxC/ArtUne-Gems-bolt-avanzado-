import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Eye, Calendar, Clock, MessageCircle } from "lucide-react";

const AnalyticsSnapshot = () => {
  // Mock data - replace with real API calls
  const metrics = [
    {
      label: "Profile Views",
      value: "1,234",
      change: "+18%",
      icon: Eye,
      color: "text-purple-400"
    },
    {
      label: "Booking Requests",
      value: "42",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-400"
    },
    {
      label: "Response Rate",
      value: "98%",
      change: "+5%",
      icon: MessageCircle,
      color: "text-emerald-400"
    },
    {
      label: "Avg. Response Time",
      value: "2.3 hrs",
      change: "-15%",
      icon: Clock,
      color: "text-amber-400"
    }
  ];

  return (
    <Card className="bg-[#0F1419] border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg text-foreground">Monthly Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="p-3 rounded-lg bg-[#1A1F2C] border border-border/50 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${metric.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    metric.change.startsWith('+') 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : metric.change.startsWith('-')
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <span className="text-xl font-bold text-foreground">{metric.value}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSnapshot;
