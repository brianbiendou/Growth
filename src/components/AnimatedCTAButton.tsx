import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export function AnimatedCTAButton() {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center py-8">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-xl" />
      
      {/* Sparkle effects */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Sparkles className="absolute text-yellow-300 w-6 h-6 left-1/4 top-1/4" />
        <Sparkles className="absolute text-blue-300 w-4 h-4 left-2/3 bottom-1/3" />
        <Sparkles className="absolute text-purple-300 w-5 h-5 right-1/4 top-1/2" />
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={() => navigate('/new-order')}
        className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-45"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Pulsing border */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Button content */}
        <div className="relative flex items-center gap-3 text-white font-semibold text-lg">
          <span>Start Growing Now</span>
          <motion.div
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}