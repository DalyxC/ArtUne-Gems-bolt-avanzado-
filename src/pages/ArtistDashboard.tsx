import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTopNav from "@/components/dashboard/DashboardTopNav";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentMessages from "@/components/dashboard/RecentMessages";
import AnalyticsSnapshot from "@/components/dashboard/AnalyticsSnapshot";
import ProfileProgressWidget from "@/components/dashboard/ProfileProgressWidget";
import OnboardingTutorial from "@/components/onboarding/OnboardingTutorial";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useArtistData } from "@/hooks/useArtistData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  Camera, 
  DollarSign, 
  CreditCard, 
  Briefcase, 
  FileText 
} from "lucide-react";

const ArtistDashboard = () => {
  const { showOnboarding, completeOnboarding, skipOnboarding } = useOnboarding();
  const { data: artistData, loading } = useArtistData();
  const navigate = useNavigate();

  if (loading || !artistData) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  // Mission handlers
  const handleMissionClick = (missionId: string) => {
    switch (missionId) {
      case 'portfolio':
        navigate('/artist/profile');
        toast.info('Upload your best photos and videos to showcase your work');
        break;
      case 'services':
        navigate('/artist/profile');
        toast.info('Set your hourly rate and create service packages');
        break;
      case 'payment':
        toast.info('Stripe Connect integration coming soon!');
        break;
      case 'advanced':
        navigate('/artist/settings');
        toast.info('Enable recurring bookings or fixed contracts');
        break;
      case 'bio':
        navigate('/artist/profile');
        toast.info('Write a compelling bio to attract clients');
        break;
      default:
        break;
    }
  };

  const missions = artistData.checklistItems.map(item => ({
    ...item,
    progress: item.progress || 20, // Default progress value
    icon: item.id === 'portfolio' ? Camera :
          item.id === 'services' ? DollarSign :
          item.id === 'payment' ? CreditCard :
          item.id === 'advanced' ? Briefcase :
          FileText,
    onClick: () => handleMissionClick(item.id)
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <OnboardingTutorial 
        open={showOnboarding}
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
        dashboardType="artist"
      />
      <DashboardTopNav userRole="artist" />
      
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-auto">
          <div className="flex flex-col lg:flex-row min-h-full">
            {/* Main Content Area */}
            <div className="flex-1 p-6 lg:p-8 min-w-0">
              <DashboardHeader artist={artistData} />
              <UpcomingEvents />
            </div>
            
            {/* Right Context Panel */}
            <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-border/50 p-6 space-y-6 bg-[#0A0A0F]">
              <ProfileProgressWidget
                completionPercentage={artistData.profileCompletion}
                missions={missions}
              />
              <QuickActions />
              <RecentMessages />
              <AnalyticsSnapshot />
            </div>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
