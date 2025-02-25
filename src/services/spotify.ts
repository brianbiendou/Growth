export const spotifyServices = {
  id: 'spotify',
  name: 'Spotify',
  categories: [
    {
      id: 'followers',
      name: 'Spotify: Followers',
      services: [
        {
          id: '97',
          name: 'Spotify Followers | User/Playlist/Artist | MAX 100M',
          maxQuantity: 1000000,
          minQuantity: 100,
          speed: 'Fast',
          price: 260, // (0.97 * 2.5) * 100 = 600 centimes
          time: '4h 7min',
          emoji: '👥 ♻️',
          description: '✨ Quality: High Quality\n⚡ Speed: Fast\n♻️ Lifetime Guarantee\n📉 Drop Rate: 5-10%\n🔗 Profile/Playlist/Artist Link\n⭐ Works for Users, Playlists & Artists'
        }
      ]
    },
    {
      id: 'monthly-listeners',
      name: 'Spotify: Monthly Listeners',
      services: [
        {
          id: '624',
          name: 'Spotify Monthly Listeners | Max 25K | Slow',
          maxQuantity: 25000,
          minQuantity: 500,
          speed: 'Slow',
          price: 1450, // (5.78 * 2.5) * 100 = 1450 centimes
          time: '12h 32min',
          emoji: '👥 🐌',
          description: '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Artist Link\n⭐ Real Monthly Listeners'
        }
      ]
    },
    {
      id: 'plays',
      name: 'Spotify: Plays',
      services: [
        {
          id: '105',
          name: 'Spotify Plays | Max 10M | Slow',
          maxQuantity: 1000000,
          minQuantity: 500,
          speed: 'Slow',
          price: 499, // (1.91 * 2.5) * 100 = 477 centimes
          time: '11h 40min',
          emoji: '👥 🐌',
          description: '✨ Quality: High Quality\n⚡ Speed: Slow\n♻️ No Refill\n📉 Drop Rate: 10-20%\n🔗 Track Link\n⭐ All Play Types Working'
        }
      ]
    }
  ]
};
