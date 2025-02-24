import { motion } from 'framer-motion';
import { GrowthAnimation } from './GrowthAnimation';

export function AnimatedMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <GrowthAnimation />
      <p className="text-gray-400 mt-8">
        Select your preferred platform below to explore our premium services
      </p>
    </motion.div>
  );
}