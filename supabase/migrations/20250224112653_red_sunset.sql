-- Create services related tables
CREATE TABLE IF NOT EXISTS platforms (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  platform_id text REFERENCES platforms(id),
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS services (
  id text PRIMARY KEY,
  category_id text REFERENCES categories(id),
  name text NOT NULL,
  description text NOT NULL,
  min_quantity integer NOT NULL,
  max_quantity integer NOT NULL,
  price integer NOT NULL,
  speed text NOT NULL,
  emoji text,
  time text
);

-- Enable RLS
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON platforms
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access" ON categories
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access" ON services
  FOR SELECT TO public USING (true);

-- Insert platforms data
INSERT INTO platforms (id, name, icon, color) VALUES
  ('instagram', 'Instagram', 'Instagram', 'text-pink-500'),
  ('facebook', 'Facebook', 'Facebook', 'text-blue-500'),
  ('twitter', 'Twitter', 'Twitter', 'text-blue-400'),
  ('tiktok', 'TikTok', 'Music', 'text-pink-500'),
  ('youtube', 'YouTube', 'Youtube', 'text-red-500'),
  ('spotify', 'Spotify', 'Music2', 'text-green-500'),
  ('twitch', 'Twitch', 'Twitch', 'text-purple-500'),
  ('discord', 'Discord', 'MessageSquare', 'text-indigo-500'),
  ('snapchat', 'Snapchat', 'Ghost', 'text-yellow-500'),
  ('telegram', 'Telegram', 'Send', 'text-blue-400')
ON CONFLICT (id) DO NOTHING;

-- Insert categories and services
-- Instagram
INSERT INTO categories (id, platform_id, name) VALUES
  ('instagram_followers', 'instagram', 'Instagram: Followers'),
  ('instagram_likes', 'instagram', 'Instagram: Likes'),
  ('instagram_views', 'instagram', 'Instagram: Views')
ON CONFLICT (id) DO NOTHING;

INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('847', 'instagram_followers', 'Instagram Followers | Max 300K | Slow', 
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   10, 300000, 9648, 'Slow', '👥 🐌', '1h 33min'),
  ('787', 'instagram_followers', 'Instagram Followers | Max 300K | Fast',
   '✨ Quality: High Quality\n⚡ Speed: Fast\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   10, 300000, 10068, 'Fast', '👥 ⚡', '4min')
ON CONFLICT (id) DO NOTHING;

-- YouTube
INSERT INTO categories (id, platform_id, name) VALUES
  ('youtube_subscribers', 'youtube', 'YouTube: Subscribers'),
  ('youtube_views', 'youtube', 'YouTube: Views'),
  ('youtube_likes', 'youtube', 'YouTube: Likes')
ON CONFLICT (id) DO NOTHING;

INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('216', 'youtube_subscribers', 'Youtube Subscribe | Max 200K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   100, 200000, 52453, 'Slow', '👥 🐌', '15h 47min')
ON CONFLICT (id) DO NOTHING;

-- TikTok
INSERT INTO categories (id, platform_id, name) VALUES
  ('tiktok_followers', 'tiktok', 'TikTok: Followers'),
  ('tiktok_likes', 'tiktok', 'TikTok: Likes'),
  ('tiktok_views', 'tiktok', 'TikTok: Views')
ON CONFLICT (id) DO NOTHING;

INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('849', 'tiktok_followers', 'TikTok Followers | Max 100K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   10, 100000, 11900, 'Slow', '👥 🐌', '3h 17min')
ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS categories_platform_id_idx ON categories(platform_id);
CREATE INDEX IF NOT EXISTS services_category_id_idx ON services(category_id);