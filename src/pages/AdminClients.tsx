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
import { Search, Filter, Eye, UserCheck, TrendingUp } from "lucide-react";

export default function AdminClients() {
  const clients = [
    {
      id: 1,
      name: "TechCorp Inc",
      email: "events@techcorp.com",
      type: "Corporate",
      totalSpent: "$45,200",
      bookings: 28,
      status: "Active",
      joined: "2023-06-10",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@email.com",
      type: "Individual",
      totalSpent: "$3,800",
      bookings: 5,
      status: "Active",
      joined: "2023-12-05",
    },
    {
      id: 3,
      name: "Event Planners Ltd",
      email: "contact@eventplanners.com",
      type: "Business",
      totalSpent: "$67,500",
      bookings: 42,
      status: "VIP",
      joined: "2023-03-15",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.j@mail.com",
      type: "Individual",
      totalSpent: "$1,200",
      bookings: 2,
      status: "Inactive",
      joined: "2024-01-02",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
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
                <UserCheck className="h-10 w-10 text-coral" />
                Clients Management
              </h1>
              <p className="text-muted-foreground text-lg">
                Monitor client activity, spending, and engagement
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3,892</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-green-500">+15.3%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$284,530</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-green-500">+12.5%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  VIP Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">147</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-green-500">+8.1%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>Find clients by name, email, or status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search clients..." className="pl-9" />
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
                  VIP
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Active
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Inactive
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Clients Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Clients ({clients.length})</CardTitle>
              <CardDescription>Complete client directory with analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-accent/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-coral/20 flex items-center justify-center font-semibold text-coral text-sm">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{client.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-green-500">
                        {client.totalSpent}
                      </TableCell>
                      <TableCell>{client.bookings}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {client.joined}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
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
