-- Create the photos table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.photos (
  id SERIAL PRIMARY KEY,
  photo_url TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- Create the locations table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.locations (
  id SERIAL PRIMARY KEY,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  altitude DOUBLE PRECISION,
  accuracy DOUBLE PRECISION,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Create policies to allow access to everyone (you can refine these later)
CREATE POLICY "Allow select for everyone" 
ON public.photos FOR SELECT USING (true);

CREATE POLICY "Allow insert for everyone" 
ON public.photos FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select for everyone" 
ON public.locations FOR SELECT USING (true);

CREATE POLICY "Allow insert for everyone" 
ON public.locations FOR INSERT WITH CHECK (true);

-- Create the storage bucket for media files if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'media', 'media', true
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'media'
);

-- Set up storage policies for public access to the media bucket
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Allow uploads for everyone" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'media');

-- Grant access to authenticated users
GRANT ALL ON public.photos TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.photos_id_seq TO authenticated;

GRANT ALL ON public.locations TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.locations_id_seq TO authenticated;

-- Grant access to anonymous users
GRANT SELECT ON public.photos TO anon;
GRANT SELECT ON public.locations TO anon;
