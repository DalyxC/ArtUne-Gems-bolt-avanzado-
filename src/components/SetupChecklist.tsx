import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action?: string;
}

interface SetupChecklistProps {
  completionPercentage: number;
  items: ChecklistItem[];
}

const SetupChecklist = ({ completionPercentage, items }: SetupChecklistProps) => {
  const getBadgeVariant = () => {
    if (completionPercentage >= 100) return "default";
    if (completionPercentage >= 70) return "secondary";
    return "outline";
  };

  const getBadgeText = () => {
    if (completionPercentage >= 100) return "🏆 Gold";
    if (completionPercentage >= 70) return "🥈 Silver";
    if (completionPercentage >= 40) return "🥉 Bronze";
    return "⚪ Incomplete";
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Boost your visibility and get more bookings
            </CardDescription>
          </div>
          <Badge variant={getBadgeVariant()} className="text-sm">
            {getBadgeText()}
          </Badge>
        </div>
        <div className="space-y-2 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {item.completed ? (
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                {item.title}
              </div>
              <div className="text-sm text-muted-foreground">
                {item.description}
              </div>
            </div>
            {!item.completed && item.action && (
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                {item.action}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SetupChecklist;
