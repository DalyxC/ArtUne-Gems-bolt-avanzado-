import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calendar, Star, Eye } from "lucide-react";

interface DashboardHeaderProps {
  artist: {
    firstName: string;
    totalEarnings: string;
    upcomingBookingsCount: number;
    avgRating: number;
    profileViews: number;
    trends: {
      earnings: number;
      bookings: number;
      rating: number;
      views: number;
    };
  };
}

const DashboardHeader = ({ artist }: DashboardHeaderProps) => {
  const stats = [
    {
      label: "Total Earnings",
      value: artist.totalEarnings,
      trend: artist.trends.earnings,
      icon: DollarSign,
      subtitle: "This month",
      color: "text-emerald-400"
    },
    {
      label: "Upcoming Bookings",
      value: artist.upcomingBookingsCount,
      trend: artist.trends.bookings,
      icon: Calendar,
      subtitle: "Next 30 days",
      color: "text-blue-400"
    },
    {
      label: "Average Rating",
      value: `${artist.avgRating} / 5.0`,
      trend: artist.trends.rating,
      icon: Star,
      subtitle: "Based on reviews",
      color: "text-amber-400"
    },
    {
      label: "Profile Views",
      value: artist.profileViews,
      trend: artist.trends.views,
      icon: Eye,
      subtitle: "This week",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="space-y-8 mb-8">
      {/* Welcome Message */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome back, {artist.firstName}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Here's what's happening with your bookings today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index}
              className="p-6 bg-[#0F1419] border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full ${
                  stat.trend >= 0 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}>
                  {stat.trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {Math.abs(stat.trend)}%
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-foreground/80 mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.subtitle}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHeader;
