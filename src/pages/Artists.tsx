import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { usePublicArtists } from '@/hooks/usePublicArtists';
import { MapPin, Music, Star, Search } from 'lucide-react';

const Artists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const { artists, loading } = usePublicArtists({
    city: cityFilter,
    category: categoryFilter === 'all' ? '' : categoryFilter,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  });

  const filteredArtists = artists.filter((artist) => {
    const name = artist.stage_name || artist.full_name || '';
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const categories = ['Musician', 'DJ', 'Singer', 'Band', 'Dancer', 'Performer'];
  const eventTypes = ['Wedding', 'Corporate', 'Private Party', 'Concert', 'Festival'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Artists</h1>
          <p className="text-muted-foreground">
            Discover talented artists for your next event
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Artist List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, genre, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Artist Cards */}
            {loading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-4 p-6">
                      <Skeleton className="h-48 w-full md:w-64 rounded-lg" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            ) : filteredArtists.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  No artists found matching your criteria.
                </p>
              </Card>
            ) : (
              filteredArtists.map((artist) => (
                <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Artist Image */}
                    <div className="relative h-48 w-full md:w-64 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {artist.media[0] ? (
                        <img
                          src={artist.media[0].file_url}
                          alt={artist.stage_name || artist.full_name || 'Artist'}
                          className="w-full h-full object-cover"
                        />
                      ) : artist.avatar_url ? (
                        <img
                          src={artist.avatar_url}
                          alt={artist.stage_name || artist.full_name || 'Artist'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Artist Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-foreground">
                            {artist.stage_name || artist.full_name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">
                              {artist.location_city && artist.location_country
                                ? `${artist.location_city}, ${artist.location_country}`
                                : artist.location_city || artist.location_country || 'Location not specified'}
                            </span>
                          </div>
                        </div>

                        {artist.verification_status === 'verified' && (
                          <Badge className="bg-primary text-primary-foreground">
                            Pro Member
                          </Badge>
                        )}
                      </div>

                      {/* Category & Genre */}
                      <div className="flex flex-wrap gap-2">
                        {artist.primary_category && (
                          <Badge variant="secondary">{artist.primary_category}</Badge>
                        )}
                        {artist.genre && (
                          <Badge variant="outline">{artist.genre}</Badge>
                        )}
                        {artist.performance_type && (
                          <Badge variant="outline">{artist.performance_type}</Badge>
                        )}
                      </div>

                      {/* Bio */}
                      {artist.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {artist.bio}
                        </p>
                      )}

                      {/* Price & Actions */}
                      <div className="flex items-center justify-between pt-2">
                        {artist.hourly_rate && (
                          <div className="text-foreground">
                            <span className="text-sm text-muted-foreground">From </span>
                            <span className="text-lg font-semibold">
                              ${artist.hourly_rate}
                            </span>
                            <span className="text-sm text-muted-foreground"> /hour</span>
                            <p className="text-xs text-muted-foreground mt-1">
                              Plus applicable taxes and fees
                            </p>
                          </div>
                        )}

                        <Link to={`/artist/${artist.user_id}`}>
                          <Button className="bg-primary hover:bg-primary/90">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Sidebar - Filters & Quote Request */}
          <div className="space-y-6">
            {/* Filters Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    City
                  </label>
                  <Input
                    placeholder="Enter city"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Art Type
                  </label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Event Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((event) => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Price Range ($/hour)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchQuery('');
                    setCityFilter('');
                    setCategoryFilter('all');
                    setPriceRange([0, 2000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>

            {/* Quote Request Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Get Instant Quote
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Request quotes from multiple artists in 3 simple steps:
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm text-foreground">
                    Tell us about your event
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm text-foreground">
                    Select your preferred artists
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                    3
                  </div>
                  <p className="text-sm text-foreground">
                    Receive quotes within 24 hours
                  </p>
                </div>
              </div>

              <Link to="/auth/signup/client">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Request
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artists;
