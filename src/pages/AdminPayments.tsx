import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, DollarSign, TrendingUp, Download } from "lucide-react";

export default function AdminPayments() {
  const payments = [
    {
      id: "PAY-001",
      type: "Booking Payment",
      from: "TechCorp Inc",
      to: "Sarah Miller",
      amount: "$2,500",
      commission: "$250",
      date: "2024-01-15",
      status: "Completed",
    },
    {
      id: "PAY-002",
      type: "Payout",
      from: "Platform",
      to: "DJ Alex",
      amount: "$1,620",
      commission: "$180",
      date: "2024-01-14",
      status: "Pending",
    },
    {
      id: "PAY-003",
      type: "Refund",
      from: "Platform",
      to: "John Doe",
      amount: "$1,200",
      commission: "-$120",
      date: "2024-01-13",
      status: "Completed",
    },
    {
      id: "PAY-004",
      type: "Booking Payment",
      from: "Event Planners Ltd",
      to: "Maria Garcia",
      amount: "$5,000",
      commission: "$500",
      date: "2024-01-12",
      status: "Completed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container py-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <DollarSign className="h-10 w-10 text-green-500" />
                Payments & Revenue
              </h1>
              <p className="text-muted-foreground text-lg">
                Monitor all transactions, payouts, and platform revenue
              </p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">$284,530</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-green-500">+12.5%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Commission Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">$28,453</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-green-500">+10%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Payouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">$12,340</div>
                <p className="text-sm text-muted-foreground mt-2">8 pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Refunds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">$3,450</div>
                <p className="text-sm text-muted-foreground mt-2">12 refunds</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>Find transactions by ID, user, or type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search payments..." className="pl-9" />
                </div>
                <Button variant="outline" className="md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              <div className="flex gap-2 mt-4">
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  All
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Bookings
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Payouts
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Refunds
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Transactions ({payments.length})</CardTitle>
              <CardDescription>Complete payment history with details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-accent/50">
                      <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{payment.type}</Badge>
                      </TableCell>
                      <TableCell>{payment.from}</TableCell>
                      <TableCell>{payment.to}</TableCell>
                      <TableCell className="font-semibold">{payment.amount}</TableCell>
                      <TableCell className={payment.commission.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
                        {payment.commission}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {payment.date}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
