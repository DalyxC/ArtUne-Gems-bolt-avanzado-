import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useOnboarding = () => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        // Show onboarding if not completed
        setShowOnboarding(!data?.onboarding_completed);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  const completeOnboarding = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      if (error) throw error;

      setShowOnboarding(false);
      toast.success('Tutorial completed!');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to save tutorial progress');
    }
  };

  const skipOnboarding = async () => {
    await completeOnboarding();
  };

  return {
    showOnboarding,
    loading,
    completeOnboarding,
    skipOnboarding,
  };
};
