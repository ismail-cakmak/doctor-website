# Supabase Integration Setup Guide

This guide will help you complete the Supabase integration for your doctor website.

## ✅ What Has Been Done

All code changes have been completed:
- ✅ Supabase client library installed
- ✅ All components updated to use Supabase
- ✅ All admin pages updated to use Supabase
- ✅ Authentication integrated with Supabase
- ✅ Data manager created for async operations

## 🔧 What You Need to Do

### Step 1: Add Your Supabase Credentials

You need to add your Supabase credentials to the `.env` file that was created in your project root.

**IMPORTANT: You mentioned you already have your API key and project URL. Now you need to add them to the project.**

1. Open the file: `/home/ismailcakmak/DEV/doctor-website/.env`

2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

**Where to find these values:**
- Go to your Supabase project dashboard
- Click on "Project Settings" (gear icon)
- Click on "API" in the left menu
- Copy the "Project URL" and "anon public" key

### Step 2: Create Database Tables in Supabase

You need to run SQL commands in Supabase to create the necessary tables.

1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"
4. Copy and paste the following SQL code:

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT DEFAULT 'Dr. Sabri Keser',
  category TEXT,
  read_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create specialties table
CREATE TABLE specialties (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  what_is TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access on blog_posts"
  ON blog_posts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on specialties"
  ON specialties FOR SELECT
  TO public
  USING (true);

-- Create policies to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert on blog_posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on blog_posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on blog_posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on specialties"
  ON specialties FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on specialties"
  ON specialties FOR UPDATE
  TO authenticated
  USING (true);

-- Insert initial blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, image, category, read_time) VALUES
('kalp-sagligini-korumak-icin-10-ipucu', 'Kalp Sağlığını Korumak İçin 10 İpucu', 'Kalbinizi sağlıklı tutmak ve kardiyovasküler risk faktörlerini azaltmak için temel stratejileri öğrenin.', '<p>Kalp sağlığı, genel sağlığınızın en önemli parçalarından biridir. Düzenli egzersiz, dengeli beslenme ve stres yönetimi kalp sağlığınızı korumanın temel taşlarıdır.</p><p>Günde en az 30 dakika orta tempolu egzersiz yapın, tuzu azaltın, sebze ve meyve tüketimini artırın.</p>', '/medical-research-lab.png', 'Kardiyoloji', '5 dakika'),
('yillik-kontrollerin-onemi', 'Yıllık Kontrollerin Önemi', 'Düzenli sağlık taramalarının erken teşhis ve önleme için neden çok önemli olduğunu keşfedin.', '<p>Yıllık sağlık kontrolleri, hastalıkların erken teşhisinde hayati öneme sahiptir.</p><p>Kan testleri, tansiyon ölçümü, kolesterol kontrolü ve diğer tarama testleri sayesinde birçok hastalık erken dönemde yakalanabilir. Erken teşhis, tedavi başarısını önemli ölçüde artırır.</p>', '/doctor-medical-office.png', 'Koruyucu Hekimlik', '4 dakika'),
('kronik-hastaliklari-yonetmek', 'Kronik Hastalıkları Etkili Bir Şekilde Yönetmek', 'Doğru yönetim ve yaşam tarzı değişiklikleri ile kronik hastalıklarla iyi yaşamaya dair uzman tavsiyeleri.', '<p>Kronik hastalıklar doğru yönetim stratejileri ile kontrol altında tutulabilir.</p><p>İlaç tedavisine uyum, düzenli doktor takibi ve yaşam tarzı değişiklikleri başarılı yönetimin anahtarıdır. Diyabet, hipertansiyon gibi kronik hastalıklar ile kaliteli bir yaşam sürmek mümkündür.</p>', '/medical-consultation.png', 'Kronik Hastalık', '6 dakika');

-- Insert initial specialties
INSERT INTO specialties (slug, title, description, icon, what_is) VALUES
('androloji', 'Androloji', 'Erkek sağlığı ve cinsel işlev', 'Stethoscope', '<h3>Androloji Nedir?</h3><p>Androloji, erkek üreme sistemi ve cinsel sağlık sorunlarının tanı ve tedavisi ile ilgilenen tıp dalıdır.</p><p>Erkek infertilitesi, hormonal dengesizlikler, cinsel işlev bozuklukları ve diğer erkek sağlığı sorunlarını kapsar.</p>'),
('erkek-infertilitesi', 'Erkek İnfertilitesi', 'Kısırlık tanı ve tedavisi', 'Users', '<h3>Erkek İnfertilitesi Nedir?</h3><p>Erkek infertilitesi, çiftlerin çocuk sahibi olamamasında erkek faktörlerin rol oynadığı durumdur.</p>'),
('erektil-disfonksiyon', 'Erektil Disfonksiyon', 'Sertleşme sorunu için çözümler', 'Activity', '<h3>Erektil Disfonksiyon Nedir?</h3><p>Cinsel ilişki için yeterli ereksiyonu sağlayamama veya sürdürememe durumudur.</p>'),
('prematur-ejekulasyon', 'Prematür Ejekülasyon', 'Erken boşalma yönetimi', 'Activity', '<h3>Prematür Ejekülasyon Nedir?</h3><p>İstenenden daha erken boşalma durumudur.</p>'),
('peyronie-penis-egriligi', 'Peyronie (Penis Eğriliği)', 'Değerlendirme ve tedavi', 'Droplets', '<h3>Peyronie Hastalığı Nedir?</h3><p>Penis dokusunda plak oluşumu sonucu penisin eğrilmesi durumudur.</p>'),
('penil-protez-genital-estetik', 'Penil Protez & Genital Estetik', 'Mutluluk çubuğu ve estetik cerrahiler', 'Slice', '<h3>Penil Protez ve Genital Estetik Nedir?</h3><p>İlaç tedavisine yanıt vermeyen erektil disfonksiyon için protez implantasyonu.</p>'),
('eswt-sok-dalga', 'ESWT Şok Dalga', 'İlaçsız fonksiyon destek tedavisi', 'Waves', '<h3>ESWT Şok Dalga Tedavisi Nedir?</h3><p>Düşük yoğunluklu şok dalgaları kullanarak doku rejenerasyonunu artıran tedavi.</p>'),
('prp-eksozom-kok-hucre', 'PRP / Eksozom / Kök Hücre', 'Rejeneratif uygulamalar', 'Syringe', '<h3>Rejeneratif Tıp Uygulamaları Nedir?</h3><p>Vücudun kendi iyileşme mekanizmalarını kullanan tedavi yöntemleri.</p>'),
('kronik-prostatit', 'Kronik Prostatit', 'Neden odaklı tanı ve tedavi', 'Microscope', '<h3>Kronik Prostatit Nedir?</h3><p>Prostat bezinin uzun süreli iltihaplanması durumudur.</p>'),
('bph-iyi-huylu-prostat', 'BPH (İyi Huylu Prostat)', 'İlaç ve girişimsel seçenekler', 'Shield', '<h3>BPH Nedir?</h3><p>Prostat bezinin yaşla birlikte büyümesi durumudur.</p>'),
('tas-cerrahisi', 'Taş Cerrahisi', 'Böbrek ve üreter taşı endoürolojisi', 'TestTube', '<h3>Taş Cerrahisi Nedir?</h3><p>Böbrek, üreter ve mesane taşlarının minimal invaziv tedavisi.</p>'),
('pelvik-organ-sarkmasi', 'Pelvik Organ Sarkması', 'Cerrahi ve cerrahi dışı çözümler', 'Pill', '<h3>Pelvik Organ Sarkması Nedir?</h3><p>Pelvik bölge organlarının normal pozisyonlarından aşağı kayması.</p>');
```

5. Click "Run" or press Ctrl+Enter
6. You should see "Success. No rows returned" message

### Step 3: Test Locally

1. Make sure your `.env` file has the correct credentials
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Visit your website and check if blog posts and specialties load
4. Try logging into the admin panel and creating/editing content

### Step 4: Deploy to Netlify

When deploying to Netlify, you need to add environment variables there too:

1. Go to your Netlify dashboard
2. Select your site
3. Go to "Site settings" → "Environment variables"
4. Click "Add a variable"
5. Add these two variables:
   - Key: `VITE_SUPABASE_URL`, Value: your Supabase URL
   - Key: `VITE_SUPABASE_ANON_KEY`, Value: your anon key
6. Redeploy your site

## 🎉 That's It!

After completing these steps:
- ✅ Your website will use Supabase database
- ✅ Changes from admin panel will be visible to everyone
- ✅ Data persists across all devices and browsers
- ✅ Completely free (within Supabase free tier limits)

## 🔒 Security Notes

- The `.env` file is already in `.gitignore`, so your credentials won't be committed to Git
- The anon key is safe to use in frontend code (it's designed for public access)
- Row Level Security (RLS) policies protect your data
- Only authenticated users can modify data through the admin panel

## 📊 Supabase Free Tier Limits

Your website will work perfectly within these limits:
- 500MB database storage
- 50,000 monthly active users
- 2GB bandwidth
- Unlimited API requests

## ❓ Troubleshooting

If you see errors:
1. Check that `.env` file has correct credentials (no quotes, no spaces)
2. Make sure you ran the SQL commands in Supabase
3. Restart your dev server after changing `.env`
4. Check browser console for specific error messages

## 📝 Next Steps

Once everything is working:
1. Test creating blog posts in admin panel
2. Test editing specialty content
3. Verify changes appear on the public website
4. Deploy to Netlify with environment variables

