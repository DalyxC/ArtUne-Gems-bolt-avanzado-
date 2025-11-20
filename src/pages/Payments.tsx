import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Calendar, CreditCard, Download, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";

const Payments = () => {
  const transactions = [
    {
      id: 1,
      type: "income",
      event: "Corporate Gala 2024",
      client: "TechCorp Inc.",
      amount: 2500,
      date: "2024-10-28",
      status: "completed",
      method: "Bank Transfer"
    },
    {
      id: 2,
      type: "income",
      event: "Wedding Reception",
      client: "Sarah & Michael",
      amount: 3800,
      date: "2024-10-20",
      status: "completed",
      method: "Credit Card"
    },
    {
      id: 3,
      type: "pending",
      event: "Jazz Night",
      client: "Blue Note Lounge",
      amount: 1200,
      date: "2024-10-25",
      status: "pending",
      method: "Bank Transfer"
    },
    {
      id: 4,
      type: "income",
      event: "Birthday Celebration",
      client: "Jennifer Martinez",
      amount: 800,
      date: "2024-10-10",
      status: "completed",
      method: "PayPal"
    },
    {
      id: 5,
      type: "expense",
      event: "Equipment Upgrade",
      client: "Music Store Pro",
      amount: -450,
      date: "2024-10-15",
      status: "completed",
      method: "Credit Card"
    },
    {
      id: 6,
      type: "income",
      event: "Restaurant Opening",
      client: "Bella Vista",
      amount: 1200,
      date: "2024-10-05",
      status: "completed",
      method: "Bank Transfer"
    }
  ];

  const stats = [
    {
      label: "Total Earnings",
      value: "$42,580",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-400"
    },
    {
      label: "This Month",
      value: "$8,300",
      change: "+23%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-400"
    },
    {
      label: "Pending",
      value: "$2,400",
      change: "3 invoices",
      trend: "neutral",
      icon: Calendar,
      color: "text-amber-400"
    },
    {
      label: "Next Payout",
      value: "Nov 1",
      change: "$5,600",
      trend: "neutral",
      icon: CreditCard,
      color: "text-purple-400"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "failed":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Payments</h1>
                <p className="text-muted-foreground mt-1">Manage your earnings and transactions</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-border/50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Card key={idx} className="bg-[#0F1419] border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${stat.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {stat.trend !== "neutral" && (
                          <Badge className={`${
                            stat.trend === "up" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}>
                            {stat.change}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      {stat.trend === "neutral" && (
                        <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Payment Methods */}
            <Card className="bg-[#0F1419] border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">Payment Methods</CardTitle>
                <Button variant="outline" size="sm" className="border-border/50">
                  Add Method
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Primary</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Bank Account</p>
                    <p className="text-foreground font-semibold">•••• 4242</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[#1A1F2C] border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">PayPal</p>
                    <p className="text-foreground font-semibold">sarah@email.com</p>
                  </div>

                  <div className="p-4 rounded-lg bg-[#1A1F2C] border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Credit Card</p>
                    <p className="text-foreground font-semibold">•••• 8888</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transactions */}
            <Card className="bg-[#0F1419] border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="bg-[#1A1F2C] border border-border/50 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`p-3 rounded-lg ${
                            transaction.type === "income" 
                              ? "bg-emerald-500/10" 
                              : transaction.type === "pending"
                              ? "bg-amber-500/10"
                              : "bg-red-500/10"
                          }`}>
                            {transaction.type === "income" ? (
                              <ArrowDownRight className="w-5 h-5 text-emerald-400" />
                            ) : transaction.type === "pending" ? (
                              <Calendar className="w-5 h-5 text-amber-400" />
                            ) : (
                              <ArrowUpRight className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-1">{transaction.event}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{transaction.client}</span>
                              <span>•</span>
                              <span>{transaction.date}</span>
                              <span>•</span>
                              <span>{transaction.method}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${
                              transaction.amount > 0 
                                ? "text-emerald-400" 
                                : "text-red-400"
                            }`}>
                              {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="income" className="space-y-3">
                    {transactions.filter(t => t.type === "income").map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-3 rounded-lg bg-emerald-500/10">
                            <ArrowDownRight className="w-5 h-5 text-emerald-400" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-1">{transaction.event}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{transaction.client}</span>
                              <span>•</span>
                              <span>{transaction.date}</span>
                              <span>•</span>
                              <span>{transaction.method}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                          <div className="text-right">
                            <p className="text-lg font-bold text-emerald-400">
                              +${transaction.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-3">
                    {transactions.filter(t => t.type === "pending").map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-3 rounded-lg bg-amber-500/10">
                            <Calendar className="w-5 h-5 text-amber-400" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-1">{transaction.event}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{transaction.client}</span>
                              <span>•</span>
                              <span>{transaction.date}</span>
                              <span>•</span>
                              <span>{transaction.method}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                          <div className="text-right">
                            <p className="text-lg font-bold text-amber-400">
                              ${transaction.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="expenses" className="space-y-3">
                    {transactions.filter(t => t.type === "expense").map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-3 rounded-lg bg-red-500/10">
                            <ArrowUpRight className="w-5 h-5 text-red-400" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-1">{transaction.event}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{transaction.client}</span>
                              <span>•</span>
                              <span>{transaction.date}</span>
                              <span>•</span>
                              <span>{transaction.method}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                          <div className="text-right">
                            <p className="text-lg font-bold text-red-400">
                              ${Math.abs(transaction.amount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payments;
