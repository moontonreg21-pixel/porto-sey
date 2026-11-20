-- ============================================================
--  SEY JOURNAL — Supabase SQL Schema
--  Paste this entire file into Supabase SQL Editor → Run
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- TABLES
-- ─────────────────────────────────────────────

-- Admin profile (single row, your personal data)
CREATE TABLE IF NOT EXISTS admin_profile (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT        NOT NULL DEFAULT 'Syakilla Purwana',
  title      TEXT        DEFAULT 'Multidisciplinary Designer & Writer',
  quote      TEXT        DEFAULT 'when the stars appeared in February, we prayed.',
  bio        TEXT,
  photo_url  TEXT,
  tiktok     TEXT        DEFAULT '@syakilla.purwana',
  github     TEXT        DEFAULT '@putrisyakillasi',
  substack   TEXT        DEFAULT '@seykilla',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kegiatan (events / portfolio)
CREATE TABLE IF NOT EXISTS kegiatan (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT        NOT NULL,
  category    TEXT        DEFAULT 'Pameran',
  date        TEXT,
  location    TEXT,
  role        TEXT,
  image_url   TEXT,
  description TEXT,
  status      TEXT        DEFAULT 'Diterbitkan',
  views       INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Articles / Jurnal
CREATE TABLE IF NOT EXISTS articles (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title      TEXT        NOT NULL,
  category   TEXT,
  date       TEXT,
  read_time  TEXT        DEFAULT '4 menit',
  excerpt    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities log (catatan aktivitas admin)
CREATE TABLE IF NOT EXISTS activities (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title      TEXT        NOT NULL,
  category   TEXT,
  date       TEXT,
  status     TEXT        DEFAULT 'Selesai',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────

ALTER TABLE admin_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE kegiatan      ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities    ENABLE ROW LEVEL SECURITY;

-- Public: anyone can READ
CREATE POLICY "Public read profile"    ON admin_profile FOR SELECT USING (true);
CREATE POLICY "Public read kegiatan"   ON kegiatan      FOR SELECT USING (true);
CREATE POLICY "Public read articles"   ON articles      FOR SELECT USING (true);
CREATE POLICY "Public read activities" ON activities    FOR SELECT USING (true);

-- Authenticated admin only: WRITE
CREATE POLICY "Auth update profile"    ON admin_profile FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert kegiatan"   ON kegiatan FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update kegiatan"   ON kegiatan FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete kegiatan"   ON kegiatan FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert articles"   ON articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update articles"   ON articles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete articles"   ON articles FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert activities" ON activities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update activities" ON activities FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete activities" ON activities FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- SEED DATA — Default Profile
-- ─────────────────────────────────────────────

INSERT INTO admin_profile (name, title, quote, bio, photo_url, tiktok, github, substack)
VALUES (
  'Syakilla Purwana',
  'Multidisciplinary Designer & Writer',
  'when the stars appeared in February, we prayed.',
  'Halo, aku Syakilla. Ruang ini memang sederhana—hanya berisi potongan hal yang aku tulis, aku pikirkan, dan aku rasakan di sela-sela hari.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  '@syakilla.purwana',
  '@putrisyakillasi',
  '@seykilla'
) ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- SEED DATA — Kegiatan
-- ─────────────────────────────────────────────

INSERT INTO kegiatan (title, category, date, location, role, image_url, description, status) VALUES
(
  'UX Summit Nusantara: Merawat Empati di Era AI',
  'Keynote', '12 Mei 2024', 'Jakarta', 'Keynote Speaker',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
  'Membahas pergeseran paradigma desainer dari operator visual menjadi fasilitator solusi bermakna bagi komunitas.',
  'Diterbitkan'
),
(
  'Workshop Fotografi Arsitektur Kayu',
  'Workshop', '18 Okt 2024', 'Studio Alam Cibubur', 'Mentor & Fasilitator',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  'Eksplorasi teknik menangkap jiwa dan tekstur alami kayu dalam dokumentasi arsitektur lokal.',
  'Diterbitkan'
),
(
  'Pameran Keramik Bumi Nusantara',
  'Pameran', '24 Okt 2024', 'Galeri Utama Paviliun', 'Kurator Pameran',
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
  'Koleksi keramik tanah liat bertekstur alami dengan pembakaran kayu tradisional nusantara.',
  'Diterbitkan'
);

-- ─────────────────────────────────────────────
-- SEED DATA — Artikel
-- ─────────────────────────────────────────────

INSERT INTO articles (title, category, date, read_time, excerpt) VALUES
(
  'Menemukan Keheningan dalam Antarmuka Digital yang Tenang',
  'Esai & Desain', '18 Februari 2025', '5 menit',
  'Bagaimana pemanfaatan ruang negatif, ritme visual yang lembut, dan nada warna bersahaja memberikan kenyamanan serta ketenangan bagi jiwa pembaca di tengah kebisingan digital.'
),
(
  'Tentang Langkah Lambat dan Hal-Hal yang Luput',
  'Catatan Harian', '10 Januari 2025', '4 menit',
  'Refleksi tentang mengapa kita selalu terburu-buru, dan keindahan yang baru terlihat ketika kita mengizinkan diri kita untuk bernapas sejenak.'
),
(
  'Material Alami dan Ruang Ingatan Manusia',
  'Arsitektur', '02 Desember 2024', '6 menit',
  'Sentuhan kayu, dinginnya batu, dan kehangatan tanah liat dalam membangun ruang yang memanusiakan penghuninya.'
);

-- ─────────────────────────────────────────────
-- SEED DATA — Activities
-- ─────────────────────────────────────────────

INSERT INTO activities (title, category, date, status) VALUES
('Menambahkan artikel baru: Keheningan Digital',  'Artikel',  '18 Feb 2025', 'Selesai'),
('Memperbarui foto profil',                       'Profil',   '15 Feb 2025', 'Selesai'),
('Mengunggah kegiatan: Workshop Fotografi Kayu',  'Kegiatan', '18 Okt 2024', 'Selesai');

-- ─────────────────────────────────────────────
-- ADMIN USER — Setup Panduan
-- ─────────────────────────────────────────────
-- Buat akun admin melalui Supabase Dashboard:
-- 1. Buka Supabase Dashboard → Authentication → Users
-- 2. Klik "Add user" → "Create new user"
-- 3. Masukkan email dan password admin pribadi Anda
-- 4. Klik "Create User"
-- ─────────────────────────────────────────────
