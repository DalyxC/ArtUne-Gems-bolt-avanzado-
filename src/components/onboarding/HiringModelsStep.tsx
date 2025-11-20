import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, RefreshCw, FileText } from 'lucide-react';

interface HiringModelsStepProps {
  acceptsOneTime: boolean;
  acceptsRecurring: boolean;
  acceptsFixedContract: boolean;
  onOneTimeChange: (value: boolean) => void;
  onRecurringChange: (value: boolean) => void;
  onFixedContractChange: (value: boolean) => void;
  disabled?: boolean;
}

const HiringModelsStep = ({
  acceptsOneTime,
  acceptsRecurring,
  acceptsFixedContract,
  onOneTimeChange,
  onRecurringChange,
  onFixedContractChange,
  disabled,
}: HiringModelsStepProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">How do you want to work?</h3>
        <p className="text-sm text-muted-foreground">
          Select all that apply. This helps clients find the right match.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">One-Time Gigs</CardTitle>
                <CardDescription className="text-sm">
                  Accept automated, single-event bookings
                </CardDescription>
              </div>
            </div>
            <Switch
              checked={acceptsOneTime}
              onCheckedChange={onOneTimeChange}
              disabled={disabled}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0 text-xs text-muted-foreground">
          Perfect for events, performances, and project-based work
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/50 rounded-lg">
                <RefreshCw className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Recurring Gigs</CardTitle>
                <CardDescription className="text-sm">
                  Offer freelance retainers or subscription services
                </CardDescription>
              </div>
            </div>
            <Switch
              checked={acceptsRecurring}
              onCheckedChange={onRecurringChange}
              disabled={disabled}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0 text-xs text-muted-foreground">
          Great for ongoing collaborations and regular gigs
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <FileText className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Fixed Contracts</CardTitle>
                <CardDescription className="text-sm">
                  Open to full-time or fixed-term employment
                </CardDescription>
              </div>
            </div>
            <Switch
              checked={acceptsFixedContract}
              onCheckedChange={onFixedContractChange}
              disabled={disabled}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0 text-xs text-muted-foreground">
          Ideal for stable, long-term opportunities
        </CardContent>
      </Card>
    </div>
  );
};

export default HiringModelsStep;
