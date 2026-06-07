-- Fix RLS Policies to Allow Admin Operations
-- Run this in Supabase SQL Editor to fix the 406 error and enable DELETE

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated insert on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated update on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated delete on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated insert on specialties" ON specialties;
DROP POLICY IF EXISTS "Allow authenticated update on specialties" ON specialties;
DROP POLICY IF EXISTS "Allow authenticated delete on specialties" ON specialties;

-- Drop any existing "Allow all" policies to avoid conflicts
DROP POLICY IF EXISTS "Allow all insert on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow all update on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow all delete on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow all insert on specialties" ON specialties;
DROP POLICY IF EXISTS "Allow all update on specialties" ON specialties;
DROP POLICY IF EXISTS "Allow all delete on specialties" ON specialties;

-- Create new policies that allow all operations
-- (We handle authentication at the application level)

-- Blog posts policies
CREATE POLICY "Allow all insert on blog_posts"
  ON blog_posts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow all update on blog_posts"
  ON blog_posts FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Allow all delete on blog_posts"
  ON blog_posts FOR DELETE
  TO public
  USING (true);

-- Specialties policies
CREATE POLICY "Allow all insert on specialties"
  ON specialties FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow all update on specialties"
  ON specialties FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Allow all delete on specialties"
  ON specialties FOR DELETE
  TO public
  USING (true);
