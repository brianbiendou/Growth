/*
  # Insert Remaining Services Data

  1. New Data
    - Additional services for all social media platforms
    - Complete categories and services data
    - Pricing and specifications for all services

  2. Structure
    - Insert remaining categories
    - Insert remaining services
    - Maintain data consistency with existing records
*/

-- Facebook Categories
INSERT INTO categories (id, platform_id, name) VALUES
  ('facebook_followers', 'facebook', 'Facebook: Followers'),
  ('facebook_page_likes', 'facebook', 'Facebook: Page Likes + Followers'),
  ('facebook_views', 'facebook', 'Facebook: Views'),
  ('facebook_reactions', 'facebook', 'Facebook: Post Reactions'),
  ('facebook_livestream', 'facebook', 'Facebook: Live Stream')
ON CONFLICT (id) DO NOTHING;

-- Facebook Services
INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('611', 'facebook_followers', 'Facebook Page/Profile Followers | Max 50K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   10, 50000, 2750, 'Slow', '👥 🐌', '1h 36min'),
  ('613', 'facebook_page_likes', 'Facebook Page Likes + Followers | Max 10K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   10, 10000, 6810, 'Slow', '👍 🐌', '22h 24min'),
  ('644', 'facebook_views', 'Facebook Video Views | Max 10M | Fast',
   '✨ Quality: High Quality\n⚡ Speed: Fast\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   100, 10000000, 80, 'Fast', '👀⚡', '8h 8min')
ON CONFLICT (id) DO NOTHING;

-- Twitter Categories
INSERT INTO categories (id, platform_id, name) VALUES
  ('twitter_followers', 'twitter', 'Twitter: Followers'),
  ('twitter_likes', 'twitter', 'Twitter: Likes'),
  ('twitter_retweets', 'twitter', 'Twitter: Retweets'),
  ('twitter_views', 'twitter', 'Twitter: Tweet Views'),
  ('twitter_poll_votes', 'twitter', 'Twitter: Poll Votes')
ON CONFLICT (id) DO NOTHING;

-- Twitter Services
INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('401', 'twitter_followers', 'Twitter Followers | Max 50K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ Real Followers',
   100, 50000, 11050, 'Slow', '👥 🐌', '3h 26m'),
  ('402', 'twitter_likes', 'Twitter Real Likes | Max 2K | Fast',
   '✨ Quality: High Quality\n⚡ Speed: Fast\n♻️ No Refill\n📉 Drop Rate: 5-10%\n🔗 Tweet Link\n👤 Public Profile Required\n⭐ Real Likes',
   10, 2500, 6450, 'Fast', '💙⚡', '24m')
ON CONFLICT (id) DO NOTHING;

-- Spotify Categories
INSERT INTO categories (id, platform_id, name) VALUES
  ('spotify_followers', 'spotify', 'Spotify: Followers'),
  ('spotify_monthly_listeners', 'spotify', 'Spotify: Monthly Listeners'),
  ('spotify_plays', 'spotify', 'Spotify: Plays')
ON CONFLICT (id) DO NOTHING;

-- Spotify Services
INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('97', 'spotify_followers', 'Spotify Followers | User/Playlist/Artist | MAX 100M',
   '✨ Quality: High Quality\n⚡ Speed: Fast\n♻️ Lifetime Guarantee\n📉 Drop Rate: 5-10%\n🔗 Profile/Playlist/Artist Link\n⭐ Works for Users, Playlists & Artists',
   100, 100000000, 970, 'Fast', '👥 ♻️', '4h 7min'),
  ('624', 'spotify_monthly_listeners', 'Spotify Monthly Listeners | Max 25K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Artist Link\n⭐ Real Monthly Listeners',
   500, 25000, 5780, 'Slow', '👥 🐌', '12h 32min')
ON CONFLICT (id) DO NOTHING;

-- Twitch Categories
INSERT INTO categories (id, platform_id, name) VALUES
  ('twitch_followers', 'twitch', 'Twitch: Followers'),
  ('twitch_live_viewers', 'twitch', 'Twitch: Live Stream Viewers')
ON CONFLICT (id) DO NOTHING;

-- Twitch Services
INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('58', 'twitch_followers', 'Twitch Followers | Max 10K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Channel Link\n👤 Public Channel Required\n⭐ Real Followers',
   100, 10000, 3320, 'Slow', '👥 🐌', '8h 42min'),
  ('628', 'twitch_live_viewers', 'Twitch Live Streams | 15 min | MAX 1K',
   '✨ Quality: High Quality\n⚡ Speed: Fast\n⏱️ Duration: 15 Minutes\n📉 Drop Rate: 5-10%\n🔗 Live Stream Link\n👤 Public Channel Required',
   10, 1000, 2400, 'Fast', '👀⚡', '9min')
ON CONFLICT (id) DO NOTHING;

-- Discord Categories
INSERT INTO categories (id, platform_id, name) VALUES
  ('discord_members', 'discord', 'Discord: Members')
ON CONFLICT (id) DO NOTHING;

-- Discord Services
INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('433', 'discord_members', 'Discord Offline Server Members | Max 1K | Fast',
   '✨ Quality: High Quality\n⚡ Speed: Fast\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Server Invite Link\n👤 Public Server Required\n⭐ Offline Members\n⚠️ Server must be public and invite link must not expire',
   50, 1000, 3540, 'Fast', '👥 ⚡', '40min')
ON CONFLICT (id) DO NOTHING;

-- Snapchat Categories
INSERT INTO categories (id, platform_id, name) VALUES
  ('snapchat_followers', 'snapchat', 'Snapchat: Followers')
ON CONFLICT (id) DO NOTHING;

-- Snapchat Services
INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('729', 'snapchat_followers', 'Snapchat Followers | Max 10K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ Real Followers\n⚠️ Profile must be public',
   100, 10000, 28770, 'Slow', '👥 🐌', '12h 56min')
ON CONFLICT (id) DO NOTHING;

-- Telegram Categories
INSERT INTO categories (id, platform_id, name) VALUES
  ('telegram_members', 'telegram', 'Telegram: Members'),
  ('telegram_views', 'telegram', 'Telegram: Post Views'),
  ('telegram_reactions', 'telegram', 'Telegram: Reactions')
ON CONFLICT (id) DO NOTHING;

-- Telegram Services
INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('446', 'telegram_members', 'Telegram Members | Max 50K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Channel/Group Link\n👤 Public Channel/Group Required\n⭐ Real Members',
   500, 50000, 4320, 'Slow', '👥 🐌', '5h 38min'),
  ('614', 'telegram_views', 'Telegram Views | Max 100K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 5-10%\n🔗 Post Link\n👤 Public Channel Required\n⭐ Real Views',
   10, 100000, 30, 'Slow', '👀 🐌', '15min'),
  ('467', 'telegram_reactions', 'Telegram Reactions | 👍 + Views',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 5-10%\n🔗 Post Link\n👤 Public Channel Required\n⭐ Includes Views',
   10, 1000000, 120, 'Slow', '👍', '8h 32min')
ON CONFLICT (id) DO NOTHING;

-- Additional TikTok Categories
INSERT INTO categories (id, platform_id, name) VALUES
  ('tiktok_favorites', 'tiktok', 'TikTok: Favorites & Shares'),
  ('tiktok_comments', 'tiktok', 'TikTok: Comments'),
  ('tiktok_livestream', 'tiktok', 'TikTok: Live Stream Views')
ON CONFLICT (id) DO NOTHING;

-- Additional TikTok Services
INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('807', 'tiktok_favorites', 'TikTok Favorites | Max 20K | Fast',
   '✨ Quality: High Quality\n⚡ Speed: Fast\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   10, 20000, 440, 'Fast', '⚡', '1h 40min'),
  ('661', 'tiktok_livestream', 'TikTok Live Stream Views | 15 Min | Instant',
   '✨ Quality: High Quality\n⚡ Speed: Instant\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   20, 10000, 1290, 'Instant', '⚡️', '17min')
ON CONFLICT (id) DO NOTHING;

-- Additional YouTube Categories
INSERT INTO categories (id, platform_id, name) VALUES
  ('youtube_comments', 'youtube', 'YouTube: Comments'),
  ('youtube_livestream', 'youtube', 'YouTube: Live Stream')
ON CONFLICT (id) DO NOTHING;

-- Additional YouTube Services
INSERT INTO services (id, category_id, name, description, min_quantity, max_quantity, price, speed, emoji, time) VALUES
  ('695', 'youtube_comments', 'YouTube Custom Comments | Max 10K | Slow',
   '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   10, 10000, 20343, 'Slow', '💬 🐌', '5 min'),
  ('732', 'youtube_livestream', 'YouTube Live Streams | 15 Minutes | MAX 50K',
   '✨ Quality: High Quality\n⚡ Speed: Fast\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Profile Link\n👤 Public Profile Required\n⭐ All Flag Types Working',
   10, 50000, 356, 'Fast', '👀⚡', '5 min')
ON CONFLICT (id) DO NOTHING;