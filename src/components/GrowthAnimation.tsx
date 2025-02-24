import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

function Counter({ end, duration = 2, prefix = '', resetKey = '' }: { end: number; duration?: number; prefix?: string; resetKey?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, resetKey]); // Changed key to resetKey

  return (
    <span className="tabular-nums">
      {prefix}{count.toLocaleString()}
    </span>
  );
}

export function GrowthAnimation() {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Animation cycle
    const startAnimation = () => {
      controls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 2 }
      });
      setAnimationKey(prev => prev + 1); // Force counter reset
    };

    // Initial animation
    startAnimation();

    // Set up interval for animation cycle
    const interval = setInterval(startAnimation, 10000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.div 
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={controls}
        className="flex flex-col items-center gap-8 p-6 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-800/30 backdrop-blur-sm"
      >
        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
          <div className="text-center space-y-2">
            <div className="text-gray-400 text-sm">Before</div>
            <div className="text-2xl font-bold text-white">
              <Counter 
                end={100} 
                prefix="👥 " 
                key={`followers-${animationKey}`}
                resetKey={`followers-${animationKey}`}
              />
            </div>
            <div className="text-2xl font-bold text-white">
              <Counter 
                end={500} 
                prefix="❤️ " 
                key={`likes-${animationKey}`}
                resetKey={`likes-${animationKey}`}
              />
            </div>
            <div className="text-2xl font-bold text-white">
              <Counter 
                end={1000} 
                prefix="👀 " 
                key={`views-${animationKey}`}
                resetKey={`views-${animationKey}`}
              />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-gray-400 text-sm">After</div>
            <motion.div 
              className="text-2xl font-bold text-green-400"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            >
              <Counter 
                end={10000} 
                prefix="👥 " 
                duration={2.5} 
                key={`followers-after-${animationKey}`}
                resetKey={`followers-after-${animationKey}`}
              />
            </motion.div>
            <motion.div 
              className="text-2xl font-bold text-green-400"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            >
              <Counter 
                end={50000} 
                prefix="❤️ " 
                duration={2.5} 
                key={`likes-after-${animationKey}`}
                resetKey={`likes-after-${animationKey}`}
              />
            </motion.div>
            <motion.div 
              className="text-2xl font-bold text-green-400"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            >
              <Counter 
                end={100000} 
                prefix="👀 " 
                duration={2.5} 
                key={`views-after-${animationKey}`}
                resetKey={`views-after-${animationKey}`}
              />
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="absolute inset-0 -z-10"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="text-center text-gray-400 text-sm">
          Hover to see the growth potential!
        </div>
      </motion.div>
    </motion.div>
  );
}