import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';

export type DashboardType = 'artist' | 'client' | 'admin';

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  tips?: string[];
}

interface OnboardingTutorialProps {
  open: boolean;
  onComplete: () => void;
  onSkip: () => void;
  dashboardType: DashboardType;
}

const tutorialSteps: Record<DashboardType, TutorialStep[]> = {
  artist: [
    {
      title: 'Welcome to Your Artist Dashboard!',
      description: 'Let\'s take a quick tour to help you get started and maximize your bookings.',
      icon: <Sparkles className="w-12 h-12 text-primary" />,
      tips: ['Complete your profile to boost visibility', 'Set up payments to receive earnings'],
    },
    {
      title: 'Complete Your Profile Setup',
      description: 'Use the Setup Checklist in the right panel to complete your profile. Higher completion rates lead to more bookings!',
      icon: '📝',
      tips: ['Add a detailed bio and portfolio', 'Verify your profile for trust badge', 'Set your availability calendar'],
    },
    {
      title: 'Quick Actions Panel',
      description: 'Access frequently used features quickly from the Quick Actions section.',
      icon: '⚡',
      tips: ['Update availability', 'Respond to messages', 'View booking requests'],
    },
    {
      title: 'Track Your Performance',
      description: 'Monitor your earnings, bookings, and ratings from the Analytics Snapshot.',
      icon: '📊',
      tips: ['Watch your profile views trend', 'Track monthly earnings', 'Monitor your rating'],
    },
    {
      title: 'Sidebar Navigation',
      description: 'Use the sidebar to navigate between Dashboard, Bookings, Messages, Profile, and more.',
      icon: '🧭',
      tips: ['Hover to expand the sidebar', 'Check notifications regularly', 'Update your profile often'],
    },
  ],
  client: [
    {
      title: 'Welcome to Your Client Dashboard!',
      description: 'Let\'s explore how to find and book the perfect artists for your events.',
      icon: <Sparkles className="w-12 h-12 text-primary" />,
      tips: ['Browse featured artists', 'Save favorites for quick access'],
    },
    {
      title: 'Find Your Perfect Artist',
      description: 'Use the search bar and filters to discover artists by genre, location, or event type.',
      icon: '🔍',
      tips: ['Try searching by event type', 'Filter by price range', 'Check artist ratings and reviews'],
    },
    {
      title: 'Featured Artists',
      description: 'Browse top-rated artists curated for quality and reliability.',
      icon: '⭐',
      tips: ['View detailed artist profiles', 'Check availability before booking', 'Add favorites for later'],
    },
    {
      title: 'Manage Your Events',
      description: 'Track upcoming bookings, past events, and communicate with artists.',
      icon: '📅',
      tips: ['View event details and status', 'Message artists directly', 'Leave reviews after events'],
    },
    {
      title: 'Quick Actions & Activity',
      description: 'Access common tasks and view your recent activity from the sidebar panels.',
      icon: '⚡',
      tips: ['Schedule events quickly', 'View booking history', 'Check your favorites'],
    },
  ],
  admin: [
    {
      title: 'Welcome to Admin Dashboard!',
      description: 'Your central hub for managing the platform, users, and operations.',
      icon: <Sparkles className="w-12 h-12 text-primary" />,
      tips: ['Monitor system health', 'Review approval queue'],
    },
    {
      title: 'Platform Metrics',
      description: 'Track key performance indicators including revenue, active users, and pending approvals.',
      icon: '📈',
      tips: ['Monitor growth trends', 'Track user engagement', 'Watch for alerts'],
    },
    {
      title: 'System Health & Alerts',
      description: 'Keep tabs on platform performance, uptime, and storage usage.',
      icon: '🏥',
      tips: ['Check API response times', 'Monitor storage usage', 'Review queue health'],
    },
    {
      title: 'Approval Queue',
      description: 'Review and approve artist profiles, event changes, and dispute resolutions.',
      icon: '✅',
      tips: ['Process approvals promptly', 'Review profiles carefully', 'Handle disputes fairly'],
    },
    {
      title: 'User Management',
      description: 'Access detailed user insights, manage accounts, and view top performers.',
      icon: '👥',
      tips: ['Monitor top performers', 'Review user reports', 'Manage user roles'],
    },
  ],
};

const OnboardingTutorial = ({ open, onComplete, onSkip, dashboardType }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = tutorialSteps[dashboardType];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px]" onInteractOutside={(e) => e.preventDefault()}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onSkip}
        >
          <X className="h-4 w-4" />
        </Button>

        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">
              {typeof currentStepData.icon === 'string' ? currentStepData.icon : currentStepData.icon}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{currentStepData.title}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </DialogHeader>

        <div className="py-6 space-y-4">
          <DialogDescription className="text-base leading-relaxed">
            {currentStepData.description}
          </DialogDescription>

          {currentStepData.tips && currentStepData.tips.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="font-semibold text-sm text-foreground">💡 Quick Tips:</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {currentStepData.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <Button
            variant="ghost"
            onClick={onSkip}
            className="text-muted-foreground"
          >
            Skip Tutorial
          </Button>
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            )}
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? (
                'Get Started'
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTutorial;
