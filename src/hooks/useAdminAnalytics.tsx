import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminAnalytics {
  totalRevenue: string;
  activeArtists: number;
  activeClients: number;
  pendingApprovals: number;
  trends: {
    revenue: number;
    artists: number;
    clients: number;
    approvals: number;
  };
}

export const useAdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminAnalytics = async () => {
      try {
        // Count artists
        const { count: artistsCount } = await supabase
          .from('artist_profiles')
          .select('*', { count: 'exact', head: true });

        // Count clients (users without artist profiles)
        const { count: clientsCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Count pending manual requests
        const { count: pendingCount } = await supabase
          .from('manual_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Count pending artist verifications
        const { count: pendingVerifications } = await supabase
          .from('artist_profiles')
          .select('*', { count: 'exact', head: true })
          .eq('verification_status', 'pending');

        setAnalytics({
          totalRevenue: '$0', // TODO: Calculate from payments table
          activeArtists: artistsCount || 0,
          activeClients: (clientsCount || 0) - (artistsCount || 0),
          pendingApprovals: (pendingCount || 0) + (pendingVerifications || 0),
          trends: {
            revenue: 0,
            artists: 0,
            clients: 0,
            approvals: 0
          }
        });
      } catch (error) {
        console.error('Error fetching admin analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminAnalytics();
  }, []);

  return { analytics, loading };
};
