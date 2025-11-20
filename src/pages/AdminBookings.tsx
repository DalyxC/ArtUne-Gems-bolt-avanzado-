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
import { Search, Filter, Eye, Calendar, CheckCircle, XCircle } from "lucide-react";

export default function AdminBookings() {
  const bookings = [
    {
      id: "BK-001",
      event: "Corporate Jazz Night",
      client: "TechCorp Inc",
      artist: "Sarah Miller",
      date: "2024-02-15",
      time: "19:00",
      location: "Grand Hotel",
      amount: "$2,500",
      status: "Confirmed",
    },
    {
      id: "BK-002",
      event: "Wedding Reception",
      client: "John & Emma",
      artist: "DJ Alex",
      date: "2024-02-20",
      time: "18:00",
      location: "Rose Garden",
      amount: "$1,800",
      status: "Pending",
    },
    {
      id: "BK-003",
      event: "Birthday Party",
      client: "Sarah Johnson",
      artist: "Band Live",
      date: "2024-02-10",
      time: "20:00",
      location: "Beach Club",
      amount: "$1,200",
      status: "Completed",
    },
    {
      id: "BK-004",
      event: "Concert Series",
      client: "Event Planners Ltd",
      artist: "Maria Garcia",
      date: "2024-02-18",
      time: "21:00",
      location: "City Arena",
      amount: "$5,000",
      status: "Cancelled",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Cancelled":
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
                <Calendar className="h-10 w-10 text-primary" />
                Bookings Management
              </h1>
              <p className="text-muted-foreground text-lg">
                Monitor all platform bookings and event statuses
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">892</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">234</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Cancelled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">121</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>Find bookings by ID, client, artist, or status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search bookings..." className="pl-9" />
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
                  Confirmed
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Pending
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Completed
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Cancelled
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Bookings ({bookings.length})</CardTitle>
              <CardDescription>Complete booking records with details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-accent/50">
                      <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.event}</p>
                          <p className="text-sm text-muted-foreground">{booking.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.client}</TableCell>
                      <TableCell>{booking.artist}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{booking.date}</p>
                          <p className="text-muted-foreground">{booking.time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-green-500">
                        {booking.amount}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {booking.status === "Pending" && (
                            <>
                              <Button size="sm" variant="outline">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <XCircle className="h-4 w-4 text-red-500" />
                              </Button>
                            </>
                          )}
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
