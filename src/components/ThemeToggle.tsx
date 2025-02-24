import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useSettingsStore } from '../store/settings';

export function ThemeToggle() {
  const { theme, toggleTheme } = useSettingsStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-1.5 sm:p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'light' ? 0 : -180,
          scale: theme === 'light' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
      </motion.div>
      
      <div className="w-4 h-4 sm:w-5 sm:h-5 opacity-0">
        {/* Placeholder pour maintenir la taille du bouton */}
      </div>
    </motion.button>
  );
}