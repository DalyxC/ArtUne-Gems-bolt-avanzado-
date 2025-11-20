-- Add new fields to artist_profiles for location and hiring models
ALTER TABLE artist_profiles
ADD COLUMN IF NOT EXISTS location_city TEXT,
ADD COLUMN IF NOT EXISTS location_country TEXT,
ADD COLUMN IF NOT EXISTS location_lat NUMERIC,
ADD COLUMN IF NOT EXISTS location_lng NUMERIC,
ADD COLUMN IF NOT EXISTS accepts_one_time BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS accepts_recurring BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS accepts_fixed_contract BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS stripe_account_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_onboarding_complete BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS primary_category TEXT;

-- Create artist_media table for portfolio files
CREATE TABLE IF NOT EXISTS artist_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID NOT NULL REFERENCES artist_profiles(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image', 'video', 'audio'
  file_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on artist_media
ALTER TABLE artist_media ENABLE ROW LEVEL SECURITY;

-- RLS policies for artist_media
CREATE POLICY "Artists can view their own media"
  ON artist_media FOR SELECT
  USING (artist_id IN (
    SELECT id FROM artist_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Artists can insert their own media"
  ON artist_media FOR INSERT
  WITH CHECK (artist_id IN (
    SELECT id FROM artist_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Artists can update their own media"
  ON artist_media FOR UPDATE
  USING (artist_id IN (
    SELECT id FROM artist_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Artists can delete their own media"
  ON artist_media FOR DELETE
  USING (artist_id IN (
    SELECT id FROM artist_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Everyone can view media from verified artists"
  ON artist_media FOR SELECT
  USING (artist_id IN (
    SELECT id FROM artist_profiles WHERE verification_status = 'verified'
  ));

-- Create storage bucket for artist portfolios
INSERT INTO storage.buckets (id, name, public)
VALUES ('artist-portfolio', 'artist-portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
CREATE POLICY "Artists can upload to their own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'artist-portfolio' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Artists can view their own uploads"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'artist-portfolio' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Everyone can view public portfolio files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'artist-portfolio');

-- Trigger for artist_media updated_at
CREATE TRIGGER update_artist_media_updated_at
  BEFORE UPDATE ON artist_media
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();