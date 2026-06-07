-- Add Videos Table to Supabase
-- Run this in Supabase SQL Editor

-- Create videos table
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access on videos"
  ON videos FOR SELECT
  TO public
  USING (true);

-- Create policies for all operations (admin panel handles auth)
CREATE POLICY "Allow all insert on videos"
  ON videos FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow all update on videos"
  ON videos FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Allow all delete on videos"
  ON videos FOR DELETE
  TO public
  USING (true);

-- Insert initial sample videos
INSERT INTO videos (title, youtube_url, youtube_id, display_order) VALUES
('Sağlıklı Yaşam İpuçları', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 1),
('Beslenme ve Diyet', 'https://www.youtube.com/watch?v=9bZkp7q19f0', '9bZkp7q19f0', 2),
('Egzersiz ve Fitness', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', 'jNQXAC9IVRw', 3),
('Mental Sağlık', 'https://www.youtube.com/watch?v=y6120QOlsfU', 'y6120QOlsfU', 4);

-- Create index for ordering
CREATE INDEX idx_videos_display_order ON videos (display_order);

