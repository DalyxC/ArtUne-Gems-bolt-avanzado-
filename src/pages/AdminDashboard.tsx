import { AdminSidebar } from "@/components/admin/AdminSidebar";
import DashboardTopNav from "@/components/dashboard/DashboardTopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Users,
  UserCheck,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Award,
  CreditCard,
  FileText,
} from "lucide-react";
import OnboardingTutorial from "@/components/onboarding/OnboardingTutorial";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";

export default function AdminDashboard() {
  const { showOnboarding, completeOnboarding, skipOnboarding } = useOnboarding();
  const { analytics, loading } = useAdminAnalytics();

  const metrics = [
    {
      title: "Total Revenue",
      value: analytics?.totalRevenue || "$0",
      change: `${analytics?.trends.revenue || 0}%`,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Active Artists",
      value: String(analytics?.activeArtists || 0),
      change: `+${analytics?.trends.artists || 0}%`,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Active Clients",
      value: String(analytics?.activeClients || 0),
      change: `+${analytics?.trends.clients || 0}%`,
      icon: UserCheck,
      color: "text-coral",
    },
    {
      title: "Pending Approvals",
      value: String(analytics?.pendingApprovals || 0),
      change: `${analytics?.trends.approvals || 0}`,
      icon: AlertCircle,
      color: "text-yellow-500",
    },
  ];

  const systemHealth = [
    { label: "API Uptime", status: "Normal", value: "99.9%", color: "bg-green-500" },
    { label: "Response Time", status: "Normal", value: "45ms", color: "bg-green-500" },
    { label: "Storage Usage", status: "Warning", value: "78%", color: "bg-yellow-500" },
    { label: "Queue Health", status: "Normal", value: "12 jobs", color: "bg-green-500" },
  ];

  const recentActivity = [
    { type: "verification", user: "Sarah Miller", action: "Artist profile verified", time: "2m ago" },
    { type: "booking", user: "John Doe", action: "New booking created", time: "5m ago" },
    { type: "dispute", user: "Emily Chen", action: "Dispute opened", time: "12m ago" },
    { type: "payout", user: "Mike Johnson", action: "Payout processed", time: "18m ago" },
  ];

  const approvalQueue = [
    {
      id: 1,
      name: "Alex Thompson",
      type: "Artist Profile",
      date: "2024-01-15",
      thumbnail: "AT",
    },
    {
      id: 2,
      name: "Jazz Night Booking",
      type: "Event Cancellation",
      date: "2024-01-15",
      thumbnail: "JN",
    },
    {
      id: 3,
      name: "Sarah Lee vs DJ Max",
      type: "Dispute",
      date: "2024-01-14",
      thumbnail: "SL",
    },
  ];

  const topPerformers = [
    { name: "Maria Garcia", type: "Artist", bookings: 45, earnings: "$12,500" },
    { name: "TechCorp Inc", type: "Client", bookings: 28, spent: "$45,200" },
    { name: "DJ Alex", type: "Artist", bookings: 38, earnings: "$9,800" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <OnboardingTutorial 
        open={showOnboarding}
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
        dashboardType="admin"
      />
      <DashboardTopNav userRole="admin" />
      
      <div className="flex flex-1 min-h-0">
        <AdminSidebar />
        
        <main className="flex-1 overflow-y-auto">
        <div className="container py-8 space-y-8">
          {/* Welcome Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Welcome back, Admin 🎛️</h1>
            <p className="text-muted-foreground text-lg">
              Here's today's performance overview
            </p>
          </div>

          {/* KPI Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <Card key={metric.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-500">{metric.change}</p>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* System Health */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  System Health & Alerts
                </CardTitle>
                <CardDescription>Real-time platform monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemHealth.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.status}</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Rapid operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Artist
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Resolve Dispute
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Process Payout
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Approval Queue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  Approval Queue
                </CardTitle>
                <CardDescription>Items requiring review</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {approvalQueue.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                        {item.thumbnail}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
                <CardDescription>Latest actions and events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-coral" />
                User Insights - Top Performers
              </CardTitle>
              <CardDescription>Most engaged artists and clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                        #{index + 1}
                      </div>
                      <Badge variant="secondary">{performer.type}</Badge>
                    </div>
                    <p className="font-semibold mb-2">{performer.name}</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        {performer.bookings} bookings
                      </p>
                      <p className="text-primary font-medium">
                        {performer.earnings || performer.spent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Planning Tips */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Planning Tips & Admin Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                💡 <strong>3 artists</strong> awaiting payout confirmation
              </p>
              <p className="text-sm">
                ⚠️ High refund rate detected this week — consider review
              </p>
              <p className="text-sm">
                ✨ <strong>New feature:</strong> AI-powered fraud detection available
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      </div>
    </div>
  );
}
