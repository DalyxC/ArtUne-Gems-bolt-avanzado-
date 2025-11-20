import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PublicArtist {
  id: string;
  user_id: string;
  stage_name: string | null;
  full_name: string | null;
  location_city: string | null;
  location_country: string | null;
  primary_category: string | null;
  genre: string | null;
  performance_type: string | null;
  hourly_rate: number | null;
  avatar_url: string | null;
  bio: string | null;
  verification_status: string | null;
  media: Array<{
    id: string;
    file_url: string;
    file_type: string;
  }>;
}

export const usePublicArtists = (filters?: {
  city?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const [artists, setArtists] = useState<PublicArtist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        let query = supabase
          .from('artist_profiles')
          .select(`
            id,
            user_id,
            stage_name,
            location_city,
            location_country,
            primary_category,
            genre,
            performance_type,
            hourly_rate,
            verification_status
          `)
          .eq('verification_status', 'verified');

        // Apply filters
        if (filters?.city) {
          query = query.ilike('location_city', `%${filters.city}%`);
        }
        if (filters?.category) {
          query = query.eq('primary_category', filters.category);
        }
        if (filters?.minPrice) {
          query = query.gte('hourly_rate', filters.minPrice);
        }
        if (filters?.maxPrice) {
          query = query.lte('hourly_rate', filters.maxPrice);
        }

        const { data: artistProfiles, error: profileError } = await query;

        if (profileError) throw profileError;

        // Fetch profiles and media for each artist
        const artistsWithDetails = await Promise.all(
          (artistProfiles || []).map(async (artist) => {
            // Get profile info
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, avatar_url, bio')
              .eq('id', artist.user_id)
              .single();

            // Get media
            const { data: media } = await supabase
              .from('artist_media')
              .select('id, file_url, file_type')
              .eq('artist_id', artist.id)
              .order('display_order', { ascending: true })
              .limit(3);

            return {
              ...artist,
              full_name: profile?.full_name || null,
              avatar_url: profile?.avatar_url || null,
              bio: profile?.bio || null,
              media: media || []
            };
          })
        );

        setArtists(artistsWithDetails);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [filters]);

  return { artists, loading };
};
