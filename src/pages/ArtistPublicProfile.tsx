import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Calendar, FileText, Star, MapPin, Music, DollarSign, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import ManualRequestModal from '@/components/artist/ManualRequestModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ArtistProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  is_recurrent_available: boolean;
  is_fixed_contract_available: boolean;
  stage_name: string | null;
  genre: string | null;
  performance_type: string | null;
  experience_years: number | null;
  hourly_rate: number | null;
}

const ArtistPublicProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<'recurrent' | 'fixed'>('recurrent');

  useEffect(() => {
    loadArtistProfile();
  }, [id]);

  const loadArtistProfile = async () => {
    if (!id) return;

    try {
      // Get profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, bio, is_recurrent_available, is_fixed_contract_available')
        .eq('id', id)
        .maybeSingle();

      if (profileError) throw profileError;

      // Get artist-specific data
      const { data: artistData, error: artistError } = await supabase
        .from('artist_profiles')
        .select('stage_name, genre, performance_type, experience_years, hourly_rate')
        .eq('user_id', id)
        .maybeSingle();

      if (artistError) throw artistError;

      if (profileData) {
        setArtist({
          ...profileData,
          ...artistData,
        });
      }
    } catch (error) {
      console.error('Error loading artist profile:', error);
      toast.error('Error al cargar el perfil del artista');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestClick = (type: 'recurrent' | 'fixed') => {
    setRequestType(type);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando perfil...</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Artista no encontrado</p>
      </div>
    );
  }

  const displayName = artist.stage_name || artist.full_name;
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12 max-w-5xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-32 w-32">
                <AvatarImage src={artist.avatar_url || undefined} />
                <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl font-bold">{displayName}</h1>
                  {artist.genre && (
                    <p className="text-xl text-muted-foreground mt-1">{artist.genre}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {artist.performance_type && (
                    <Badge variant="secondary">
                      <Music className="h-3 w-3 mr-1" />
                      {artist.performance_type}
                    </Badge>
                  )}
                  {artist.experience_years && (
                    <Badge variant="secondary">
                      {artist.experience_years} años de experiencia
                    </Badge>
                  )}
                  {artist.hourly_rate && (
                    <Badge variant="secondary">
                      <DollarSign className="h-3 w-3" />
                      {artist.hourly_rate}/hora
                    </Badge>
                  )}
                </div>

                {artist.bio && (
                  <p className="text-muted-foreground">{artist.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modalities Section */}
        <Card>
          <CardHeader>
            <CardTitle>Modalidades de Contratación Disponibles</CardTitle>
            <CardDescription>
              Este artista ofrece las siguientes opciones de contratación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Single Booking - Always Available */}
            <div className="flex items-start justify-between p-4 border border-border/50 rounded-lg bg-muted/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Booking Único</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reserva para eventos individuales con pago seguro
                  </p>
                </div>
              </div>
              <Button>Reservar Ahora</Button>
            </div>

            <Separator />

            {/* Recurring Gigs */}
            {artist.is_recurrent_available && (
              <div className="flex items-start justify-between p-4 border border-border/50 rounded-lg bg-muted/20">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Gigs Recurrentes</h3>
                      <Badge variant="outline" className="text-xs">
                        ✅ Disponible
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Contratación para residencias semanales o mensuales
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => handleRequestClick('recurrent')}
                >
                  Solicitar Residencia
                </Button>
              </div>
            )}

            {/* Fixed Contract */}
            {artist.is_fixed_contract_available && (
              <div className="flex items-start justify-between p-4 border border-border/50 rounded-lg bg-muted/20">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Contrato Fijo</h3>
                      <Badge variant="outline" className="text-xs">
                        ✅ Disponible
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Colaboraciones a largo plazo con términos personalizados
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => handleRequestClick('fixed')}
                >
                  Solicitar Contrato Fijo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />

      {/* Manual Request Modal */}
      <ManualRequestModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        artistId={artist.id}
        artistName={displayName}
        requestType={requestType}
      />
    </div>
  );
};

export default ArtistPublicProfile;