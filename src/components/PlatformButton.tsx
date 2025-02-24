import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface PlatformButtonProps {
  icon: LucideIcon;
  name: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export function PlatformButton({ icon: Icon, name, color, isSelected, onClick }: PlatformButtonProps) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        'relative flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-200',
        isSelected ? 'bg-gray-800 text-white' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800/70'
      )}
    >
      <motion.div
        initial={false}
        animate={isSelected ? {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <Icon className={clsx('w-5 h-5', color)} />
      </motion.div>
      <span className="font-medium">{name}</span>
      {isSelected && (
        <motion.div
          layoutId="platform-highlight"
          className="absolute inset-0 border-2 border-blue-500 rounded-lg"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}