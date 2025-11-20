import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      client: "TechCorp Inc.",
      avatar: "TC",
      rating: 5,
      date: "Oct 28, 2024",
      event: "Corporate Gala 2024",
      review: "Sarah was absolutely phenomenal! Her voice filled the room with elegance and class. Every guest complimented the entertainment. Highly professional and punctual. Would book again in a heartbeat!",
      helpful: 12
    },
    {
      id: 2,
      client: "Sarah & Michael",
      avatar: "SM",
      rating: 5,
      date: "Oct 20, 2024",
      event: "Wedding Reception",
      review: "We couldn't have asked for a better vocalist for our special day. Sarah learned our favorite songs and performed them beautifully. The emotional depth she brought to our first dance song had everyone in tears. Thank you for making our day perfect!",
      helpful: 18
    },
    {
      id: 3,
      client: "Blue Note Lounge",
      avatar: "BN",
      rating: 5,
      date: "Oct 15, 2024",
      event: "Jazz Night",
      review: "A true professional with an incredible range. Sarah knows how to work a crowd and create the perfect jazz atmosphere. Our patrons loved her performance and many asked when she'd be back. Already booked for next month!",
      helpful: 8
    },
    {
      id: 4,
      client: "Jennifer Martinez",
      avatar: "JM",
      rating: 4,
      date: "Oct 10, 2024",
      event: "Birthday Celebration",
      review: "Great performance overall! Sarah has an amazing voice and was very accommodating with song requests. Only minor issue was the setup took a bit longer than expected, but the performance itself was worth it.",
      helpful: 5
    },
    {
      id: 5,
      client: "Bella Vista Restaurant",
      avatar: "BV",
      rating: 5,
      date: "Oct 5, 2024",
      event: "Restaurant Opening",
      review: "Perfect ambient music for our grand opening. Sarah's repertoire was exactly what we needed - sophisticated yet not overpowering. Many guests specifically mentioned how much they enjoyed the live music.",
      helpful: 10
    }
  ];

  const stats = [
    { label: "Overall Rating", value: "4.8", icon: Star, color: "text-amber-400" },
    { label: "Total Reviews", value: "89", icon: MessageSquare, color: "text-blue-400" },
    { label: "5-Star Reviews", value: "76", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Response Rate", value: "100%", icon: ThumbsUp, color: "text-purple-400" }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Reviews & Ratings</h1>
              <p className="text-muted-foreground mt-1">See what clients are saying about you</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Card key={idx} className="bg-[#0F1419] border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${stat.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Rating Distribution */}
            <Card className="bg-[#0F1419] border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const percentage = stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 2 : stars === 2 ? 1 : 0;
                    return (
                      <div key={stars} className="flex items-center gap-4">
                        <div className="flex items-center gap-1 w-20">
                          <span className="text-sm text-foreground">{stars}</span>
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        </div>
                        <div className="flex-1 h-3 bg-[#1A1F2C] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Client Reviews</h2>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {reviews.length} Reviews
                </Badge>
              </div>

              {reviews.map((review) => (
                <Card key={review.id} className="bg-[#0F1419] border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">{review.avatar}</span>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground">{review.client}</h3>
                            <p className="text-sm text-muted-foreground">{review.event}</p>
                          </div>
                          <div className="text-right">
                            {renderStars(review.rating)}
                            <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">{review.review}</p>
                        
                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Helpful ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reviews;
