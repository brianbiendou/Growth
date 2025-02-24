export const twitchServices = {
  id: 'twitch',
  name: 'Twitch',
  categories: [
    {
      id: 'followers',
      name: 'Twitch: Followers',
      services: [
        {
          id: '58',
          name: 'Twitch Followers | Max 10K | Slow',
          maxQuantity: 10000,
          minQuantity: 100,
          speed: 'Slow',
          price: 830,
          time: '8h 42min',
          emoji: '👥 🐌',
          description: '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Channel Link\n👤 Public Channel Required\n⭐ Real Followers'
        }
      ]
    },
    {
      id: 'live-viewers',
      name: 'Twitch: Live Stream Viewers',
      services: [
        {
          id: '628',
          name: 'Twitch Live Streams | 15 min | MAX 1K',
          maxQuantity: 1000,
          minQuantity: 10,
          speed: 'Fast',
          price: 600,
          time: '9min',
          emoji: '👀⚡',
          description: '✨ Quality: High Quality\n⚡ Speed: Fast\n⏱️ Duration: 15 Minutes\n📉 Drop Rate: 5-10%\n🔗 Live Stream Link\n👤 Public Channel Required'
        }
      ]
    }
  ]
};