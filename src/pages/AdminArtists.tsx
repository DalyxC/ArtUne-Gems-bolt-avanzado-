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
import { Search, Filter, CheckCircle, XCircle, Eye, Users } from "lucide-react";

export default function AdminArtists() {
  const artists = [
    {
      id: 1,
      name: "Sarah Miller",
      email: "sarah.m@example.com",
      genre: "Jazz",
      status: "Verified",
      bookings: 45,
      rating: 4.9,
      joined: "2023-08-15",
    },
    {
      id: 2,
      name: "DJ Alex",
      email: "alex@djstudio.com",
      genre: "Electronic",
      status: "Pending",
      bookings: 0,
      rating: 0,
      joined: "2024-01-10",
    },
    {
      id: 3,
      name: "Maria Garcia",
      email: "maria@music.com",
      genre: "Classical",
      status: "Verified",
      bookings: 67,
      rating: 5.0,
      joined: "2023-05-20",
    },
    {
      id: 4,
      name: "Band Live",
      email: "info@bandlive.com",
      genre: "Rock",
      status: "Flagged",
      bookings: 23,
      rating: 3.8,
      joined: "2023-11-02",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Flagged":
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
                <Users className="h-10 w-10 text-primary" />
                Artists Management
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage artist profiles, verifications, and performance
              </p>
            </div>
            <Button>
              <CheckCircle className="h-4 w-4 mr-2" />
              Bulk Approve
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>Find artists by name, email, genre, or status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search artists..." className="pl-9" />
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
                  Verified
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Pending
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Flagged
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Artists Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Artists ({artists.length})</CardTitle>
              <CardDescription>Complete artist directory with actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artist</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artists.map((artist) => (
                    <TableRow key={artist.id} className="hover:bg-accent/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary text-sm">
                            {artist.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{artist.name}</p>
                            <p className="text-sm text-muted-foreground">{artist.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{artist.genre}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(artist.status)}>
                          {artist.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{artist.bookings}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{artist.rating > 0 ? artist.rating.toFixed(1) : "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {artist.joined}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {artist.status === "Pending" && (
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
