import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ClientStats {
  totalSpent: string;
  totalBookings: number;
  favoriteArtists: number;
  upcomingEvents: number;
  trends: {
    spent: number;
    bookings: number;
    favorites: number;
  };
}

export const useClientData = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ClientStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Fetch conversations count (proxy for bookings)
        const { count: conversationsCount } = await supabase
          .from('conversations')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', user.id);

        // Fetch manual requests count
        const { count: requestsCount } = await supabase
          .from('manual_requests')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', user.id);

        setStats({
          totalSpent: '$0', // TODO: Calculate from payments table
          totalBookings: (conversationsCount || 0) + (requestsCount || 0),
          favoriteArtists: 0, // TODO: Implement favorites table
          upcomingEvents: 0, // TODO: Calculate from bookings table
          trends: {
            spent: 0,
            bookings: 0,
            favorites: 0
          }
        });
      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [user]);

  return { stats, loading };
};
