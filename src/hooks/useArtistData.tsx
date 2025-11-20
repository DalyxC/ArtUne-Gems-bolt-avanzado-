import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ArtistData {
  firstName: string;
  totalEarnings: string;
  upcomingBookingsCount: number;
  avgRating: number;
  profileViews: number;
  trends: {
    earnings: number;
    bookings: number;
    rating: number;
    views: number;
  };
  profileCompletion: number;
  checklistItems: Array<{
    id: string;
    title: string;
    description: string;
    completed: boolean;
    progress: number;
    action: string;
  }>;
}

export const useArtistData = () => {
  const { user } = useAuth();
  const [data, setData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistData = async () => {
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

        // Fetch artist profile
        const { data: artistProfile } = await supabase
          .from('artist_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        // Fetch conversations count
        const { count: conversationsCount } = await supabase
          .from('conversations')
          .select('*', { count: 'exact', head: true })
          .eq('artist_id', user.id);

        // Fetch messages count
        const { count: messagesCount } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('sender_id', user.id);

        // Fetch artist media count
        const { count: mediaCount } = await supabase
          .from('artist_media')
          .select('*', { count: 'exact', head: true })
          .eq('artist_id', artistProfile?.id || '');

        // Build progressive missions based on completion
        const missions = [
          {
            id: 'portfolio',
            title: '📸 Show Your Talent',
            description: 'Upload at least 3 photos or videos',
            completed: (mediaCount || 0) >= 3,
            progress: 20,
            action: 'Upload Media'
          },
          {
            id: 'services',
            title: '💰 Define Your Value',
            description: 'Set your hourly rate and services',
            completed: !!artistProfile?.hourly_rate,
            progress: 20,
            action: 'Set Pricing'
          },
          {
            id: 'payment',
            title: '💳 Activate Payments',
            description: 'Connect Stripe to receive money',
            completed: !!artistProfile?.stripe_onboarding_complete,
            progress: 30,
            action: 'Connect Stripe'
          },
          {
            id: 'advanced',
            title: '📝 Advanced Options',
            description: 'Enable recurring or fixed contracts',
            completed: !!(artistProfile?.accepts_recurring || artistProfile?.accepts_fixed_contract),
            progress: 20,
            action: 'Configure'
          },
          {
            id: 'bio',
            title: '✍️ Tell Your Story',
            description: 'Write a detailed bio (100+ characters)',
            completed: !!(profile?.bio && profile.bio.length >= 100),
            progress: 10,
            action: 'Write Bio'
          }
        ];

        const completedMissions = missions.filter(m => m.completed).length;
        const profileCompletion = missions
          .filter(m => m.completed)
          .reduce((acc, m) => acc + m.progress, 0) + 30; // Base 30% from registration

        setData({
          firstName: profile?.full_name?.split(' ')[0] || 'Artist',
          totalEarnings: '$0', // TODO: Calculate from bookings/payments table
          upcomingBookingsCount: 0, // TODO: Calculate from bookings table
          avgRating: 5.0, // TODO: Calculate from reviews table
          profileViews: artistProfile?.profile_completion || 0,
          trends: {
            earnings: 0,
            bookings: 0,
            rating: 0,
            views: 0
          },
          profileCompletion,
          checklistItems: missions
        });
      } catch (error) {
        console.error('Error fetching artist data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [user]);

  return { data, loading };
};
