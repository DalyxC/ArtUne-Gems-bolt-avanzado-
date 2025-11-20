import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Eye, Calendar, DollarSign, Star, Users, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const earningsData = [
    { month: 'Jan', amount: 4200 },
    { month: 'Feb', amount: 5100 },
    { month: 'Mar', amount: 4800 },
    { month: 'Apr', amount: 6300 },
    { month: 'May', amount: 7200 },
    { month: 'Jun', amount: 6800 }
  ];

  const bookingsData = [
    { month: 'Jan', bookings: 8 },
    { month: 'Feb', bookings: 12 },
    { month: 'Mar', bookings: 10 },
    { month: 'Apr', bookings: 15 },
    { month: 'May', bookings: 18 },
    { month: 'Jun', bookings: 16 }
  ];

  const eventTypeData = [
    { name: 'Weddings', value: 35, color: '#9B5DE5' },
    { name: 'Corporate', value: 30, color: '#00F5A0' },
    { name: 'Private', value: 20, color: '#00D9F5' },
    { name: 'Venues', value: 15, color: '#F15BB5' }
  ];

  const topMetrics = [
    {
      title: "Total Revenue",
      value: "$42,580",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-400"
    },
    {
      title: "Profile Views",
      value: "12,847",
      change: "+23.1%",
      trend: "up",
      icon: Eye,
      color: "text-purple-400"
    },
    {
      title: "Booking Rate",
      value: "68%",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-400"
    },
    {
      title: "Avg Rating",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "text-amber-400"
    }
  ];

  const performanceMetrics = [
    {
      label: "Response Rate",
      value: "98%",
      change: "+5%",
      icon: Clock,
      color: "text-emerald-400"
    },
    {
      label: "Client Retention",
      value: "85%",
      change: "+12%",
      icon: Users,
      color: "text-blue-400"
    },
    {
      label: "Avg Response Time",
      value: "2.3 hrs",
      change: "-15%",
      icon: Clock,
      color: "text-purple-400"
    },
    {
      label: "Conversion Rate",
      value: "42%",
      change: "+8%",
      icon: TrendingUp,
      color: "text-amber-400"
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground mt-1">Track your performance and growth metrics</p>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topMetrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <Card key={idx} className="bg-[#0F1419] border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${metric.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge className={`${
                          metric.trend === "up" 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {metric.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {metric.change}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{metric.value}</h3>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Earnings Chart */}
              <Card className="bg-[#0F1419] border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Monthly Earnings</CardTitle>
                  <p className="text-sm text-muted-foreground">Revenue over the last 6 months</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3C" />
                      <XAxis dataKey="month" stroke="#8B92A7" />
                      <YAxis stroke="#8B92A7" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A1F2C', 
                          border: '1px solid #2A2F3C',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#9B5DE5" 
                        strokeWidth={3}
                        dot={{ fill: '#9B5DE5', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bookings Chart */}
              <Card className="bg-[#0F1419] border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Monthly Bookings</CardTitle>
                  <p className="text-sm text-muted-foreground">Number of bookings per month</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bookingsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3C" />
                      <XAxis dataKey="month" stroke="#8B92A7" />
                      <YAxis stroke="#8B92A7" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A1F2C', 
                          border: '1px solid #2A2F3C',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="bookings" fill="#00F5A0" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Event Types & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Type Distribution */}
              <Card className="bg-[#0F1419] border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Event Type Distribution</CardTitle>
                  <p className="text-sm text-muted-foreground">Breakdown by event category</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={eventTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {eventTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1A1F2C', 
                            border: '1px solid #2A2F3C',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {eventTypeData.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                        <span className="text-sm font-semibold text-foreground ml-auto">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-[#0F1419] border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Performance Metrics</CardTitle>
                  <p className="text-sm text-muted-foreground">Key performance indicators</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {performanceMetrics.map((metric, idx) => {
                      const Icon = metric.icon;
                      return (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${metric.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm text-muted-foreground">{metric.label}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-foreground">{metric.value}</span>
                            <Badge className={`${
                              metric.change.startsWith('+') 
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                : metric.change.startsWith('-')
                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {metric.change}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
