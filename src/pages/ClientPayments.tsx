import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CreditCard, Calendar, DollarSign, TrendingUp, CheckCircle } from "lucide-react";

export default function ClientPayments() {
  const stats = [
    { title: "Total Spent", value: "$12,450", change: "+12.5%", icon: DollarSign, color: "text-primary" },
    { title: "This Month", value: "$1,900", change: "+8.3%", icon: Calendar, color: "text-accent" },
    { title: "Avg. per Booking", value: "$445", change: "-2.1%", icon: TrendingUp, color: "text-coral" },
    { title: "Completed", value: "28", change: "+4", icon: CheckCircle, color: "text-green-500" },
  ];

  const transactions = [
    { 
      id: "TXN-2024-089", 
      event: "Corporate Gala 2024", 
      artist: "Mike Chen", 
      date: "Dec 15, 2024", 
      amount: "$550", 
      status: "paid",
      paymentMethod: "•••• 4242"
    },
    { 
      id: "TXN-2024-088", 
      event: "Wedding Reception", 
      artist: "Sarah Johnson", 
      date: "Dec 22, 2024", 
      amount: "$750", 
      status: "paid",
      paymentMethod: "•••• 4242"
    },
    { 
      id: "TXN-2024-087", 
      event: "Birthday Celebration", 
      artist: "Emma Wilson", 
      date: "Jan 5, 2025", 
      amount: "$650", 
      status: "pending",
      paymentMethod: "•••• 4242"
    },
    { 
      id: "TXN-2024-086", 
      event: "Anniversary Party", 
      artist: "Alex Rivera", 
      date: "Nov 10, 2024", 
      amount: "$900", 
      status: "paid",
      paymentMethod: "•••• 4242"
    },
    { 
      id: "TXN-2024-085", 
      event: "Corporate Mixer", 
      artist: "Lisa Park", 
      date: "Oct 28, 2024", 
      amount: "$400", 
      status: "paid",
      paymentMethod: "•••• 4242"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "pending":
        return "bg-accent/20 text-accent border-accent/30";
      case "refunded":
        return "bg-coral/20 text-coral border-coral/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <ClientSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 space-y-6 max-w-7xl">
          
          {/* Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Payments</h1>
              <p className="text-muted-foreground text-lg mt-2">
                Transaction history and payment methods
              </p>
            </div>
            <Button variant="outline" size="lg">
              <CreditCard className="w-5 h-5 mr-2" />
              Manage Cards
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Payment Methods */}
          <Card className="animate-fade-in border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </div>
                <Button>Add New Card</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-0 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <CreditCard className="w-12 h-12" />
                      <Badge className="bg-green-500 text-white border-0">Default</Badge>
                    </div>
                    <div className="space-y-4">
                      <p className="text-2xl font-bold tracking-wider">•••• •••• •••• 4242</p>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-primary-foreground/70 text-xs mb-1">Card Holder</p>
                          <p className="font-semibold">John Doe</p>
                        </div>
                        <div>
                          <p className="text-primary-foreground/70 text-xs mb-1">Expires</p>
                          <p className="font-semibold">12/26</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border-dashed border-2 hover:border-primary transition-colors cursor-pointer flex items-center justify-center min-h-[200px]">
                  <div className="text-center">
                    <CreditCard className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground font-medium">Add New Card</p>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="animate-fade-in border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Transaction History</CardTitle>
                  <CardDescription>All your booking payments</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <Card 
                    key={transaction.id} 
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer bg-card/50 border-border/30"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-3 rounded-xl bg-primary/10">
                            <DollarSign className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-lg mb-1">
                              {transaction.event}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {transaction.artist} • {transaction.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary mb-1">
                              {transaction.amount}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {transaction.paymentMethod}
                            </p>
                          </div>
                          <Badge 
                            variant="default" 
                            className={getStatusColor(transaction.status)}
                          >
                            {transaction.status.toUpperCase()}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-sm text-muted-foreground">
                        <span>Transaction ID: {transaction.id}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
