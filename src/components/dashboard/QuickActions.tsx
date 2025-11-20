import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ImageIcon, Calendar, BarChart3, Sparkles } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      label: "Generate Quote",
      icon: FileText,
      color: "text-blue-400"
    },
    {
      label: "Update Portfolio",
      icon: ImageIcon,
      color: "text-purple-400"
    },
    {
      label: "Set Availability",
      icon: Calendar,
      color: "text-emerald-400"
    },
    {
      label: "View Analytics",
      icon: BarChart3,
      color: "text-amber-400"
    }
  ];

  return (
    <Card className="bg-[#0F1419] border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg text-foreground">Quick Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg bg-[#1A1F2C] border border-border/50 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left group"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform ${action.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{action.label}</span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickActions;

