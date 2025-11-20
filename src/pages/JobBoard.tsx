import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, MapPin, Calendar, DollarSign, Clock, Search, Filter } from "lucide-react";

const JobBoard = () => {
  const jobs = [
    {
      id: 1,
      title: "Wedding Singer Needed",
      client: "Anderson Wedding Planning",
      type: "Wedding",
      location: "Beverly Hills, CA",
      date: "Dec 15, 2024",
      budget: "$2,000 - $3,500",
      posted: "2 hours ago",
      featured: true,
      description: "Looking for an experienced vocalist for an elegant wedding reception. Must have jazz and contemporary repertoire."
    },
    {
      id: 2,
      title: "Corporate Event Performer",
      client: "Global Tech Solutions",
      type: "Corporate",
      location: "San Francisco, CA",
      date: "Jan 20, 2025",
      budget: "$3,000 - $5,000",
      posted: "5 hours ago",
      featured: true,
      description: "Annual company gala needs professional entertainment. 3-hour performance required."
    },
    {
      id: 3,
      title: "Jazz Club Regular Gig",
      client: "The Blue Room",
      type: "Regular Gig",
      location: "Los Angeles, CA",
      date: "Every Friday",
      budget: "$800 per night",
      posted: "1 day ago",
      featured: false,
      description: "Seeking talented jazz vocalist for Friday night residency. Must be available weekly."
    },
    {
      id: 4,
      title: "Birthday Party Entertainment",
      client: "Private Client",
      type: "Private Event",
      location: "Malibu, CA",
      date: "Nov 30, 2024",
      budget: "$1,500 - $2,000",
      posted: "2 days ago",
      featured: false,
      description: "50th birthday celebration needs live music entertainment. Mix of classics and modern hits."
    },
    {
      id: 5,
      title: "Restaurant Opening Night",
      client: "Bella Vista Restaurant",
      type: "Corporate",
      location: "Santa Monica, CA",
      date: "Dec 5, 2024",
      budget: "$1,200",
      posted: "3 days ago",
      featured: false,
      description: "Grand opening event. Looking for ambient live music to create elegant atmosphere."
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Wedding":
        return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      case "Corporate":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Regular Gig":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Private Event":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
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
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Job Board</h1>
                <p className="text-muted-foreground mt-1">Find your next performance opportunity</p>
              </div>

              {/* Search & Filters */}
              <Card className="bg-[#0F1419] border-border/50">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search by event type, location, or keyword..." 
                        className="pl-10 bg-[#1A1F2C] border-border/50"
                      />
                    </div>
                    <Button variant="outline" className="border-border/50">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-[#0F1419] border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">24</p>
                      <p className="text-xs text-muted-foreground">Active Jobs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0F1419] border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-emerald-500/10">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">8</p>
                      <p className="text-xs text-muted-foreground">Applications Sent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0F1419] border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground">New This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job Listings */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="bg-[#0F1419] border border-border/50">
                <TabsTrigger value="all">All Jobs</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="bg-[#0F1419] border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                                {job.featured && (
                                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{job.client}</p>
                              <p className="text-sm text-muted-foreground">{job.description}</p>
                            </div>
                            <Badge className={getTypeColor(job.type)}>
                              {job.type}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>{job.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>Posted {job.posted}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:items-end lg:justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-lg font-bold text-foreground">{job.budget}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-border/50">
                              Details
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="featured" className="space-y-4">
                {jobs.filter(j => j.featured).map((job) => (
                  <Card key={job.id} className="bg-[#0F1419] border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                                  Featured
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{job.client}</p>
                              <p className="text-sm text-muted-foreground">{job.description}</p>
                            </div>
                            <Badge className={getTypeColor(job.type)}>
                              {job.type}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>{job.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>Posted {job.posted}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:items-end lg:justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-lg font-bold text-foreground">{job.budget}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-border/50">
                              Details
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                {jobs.slice(0, 3).map((job) => (
                  <Card key={job.id} className="bg-[#0F1419] border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                                {job.featured && (
                                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{job.client}</p>
                              <p className="text-sm text-muted-foreground">{job.description}</p>
                            </div>
                            <Badge className={getTypeColor(job.type)}>
                              {job.type}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>{job.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>Posted {job.posted}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:items-end lg:justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-lg font-bold text-foreground">{job.budget}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-border/50">
                              Details
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobBoard;
