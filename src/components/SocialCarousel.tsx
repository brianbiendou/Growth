import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, MessageCircle, Twitch, Disc as Discord } from 'lucide-react';

const socialIcons = [
  { Icon: Instagram, color: 'text-pink-600' },
  { Icon: Facebook, color: 'text-blue-600' },
  { Icon: Twitter, color: 'text-blue-400' },
  { Icon: Youtube, color: 'text-red-600' },
  { Icon: Twitch, color: 'text-purple-600' },
  { Icon: Discord, color: 'text-indigo-600' },
  { Icon: MessageCircle, color: 'text-green-500' },
];

export function SocialCarousel() {
  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex">
        <motion.div
          className="flex space-x-16 whitespace-nowrap"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...socialIcons, ...socialIcons, ...socialIcons].map((item, index) => (
            <item.Icon
              key={index}
              className={`w-12 h-12 ${item.color}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}