import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  DollarSign, 
  CreditCard, 
  Briefcase, 
  CheckCircle2, 
  TrendingUp,
  ChevronRight 
} from "lucide-react";

interface Mission {
  id: string;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
  progress: number;
  action: string;
  onClick: () => void;
}

interface ProfileProgressWidgetProps {
  completionPercentage: number;
  missions: Mission[];
}

const ProfileProgressWidget = ({ completionPercentage, missions }: ProfileProgressWidgetProps) => {
  const completedMissions = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Profile Strength
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Complete your profile to get more bookings
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {completionPercentage}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={completionPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground text-center">
            {completedMissions}/{totalMissions} missions completed
          </p>
        </div>

        {/* Motivational Message */}
        {completionPercentage < 100 && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-sm font-medium text-primary text-center">
              💫 Profiles at 100% receive 5x more booking requests
            </p>
          </div>
        )}

        {completionPercentage === 100 && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <p className="text-sm font-medium text-green-500 text-center">
              🎉 Your profile is complete! You're ready to receive bookings.
            </p>
          </div>
        )}

        {/* Missions List */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Your Missions</h4>
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <div
                key={mission.id}
                className={`group relative p-4 rounded-lg border transition-all ${
                  mission.completed
                    ? "bg-green-500/5 border-green-500/30"
                    : "bg-muted/30 border-border hover:border-primary/50 hover:shadow-md cursor-pointer"
                }`}
                onClick={!mission.completed ? mission.onClick : undefined}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      mission.completed
                        ? "bg-green-500/20 text-green-500"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {mission.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-sm">{mission.title}</h5>
                      {mission.completed ? (
                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/30">
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          +{mission.progress}%
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{mission.description}</p>
                    {!mission.completed && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={mission.onClick}
                      >
                        {mission.action}
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileProgressWidget;
