import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Globe2 } from 'lucide-react';
import { useSettingsStore } from '../store/settings';
import { languages } from '../i18n';

export function LanguageSelectionModal() {
  const { setLanguage } = useSettingsStore();
  const [isOpen, setIsOpen] = useState(true);

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-gray-800 rounded-xl p-4 sm:p-6 max-w-[280px] sm:max-w-lg w-full shadow-2xl">
              <motion.div
                className="flex justify-center mb-4 sm:mb-6"
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  y: [0, -5, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="relative">
                  <Globe2 className="w-10 h-10 sm:w-16 sm:h-16 text-blue-500" />
                  <motion.div
                    className="absolute -right-1 -top-1 sm:-right-2 sm:-top-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <Languages className="w-5 h-5 sm:w-8 sm:h-8 text-purple-500" />
                  </motion.div>
                </div>
              </motion.div>

              <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-1 sm:mb-2">
                Welcome to Growth!
              </h2>
              <p className="text-gray-400 text-sm sm:text-base text-center mb-4 sm:mb-6">
                Please select your preferred language
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                {Object.entries(languages).map(([code, lang]) => (
                  <motion.button
                    key={code}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageSelect(code)}
                    className="p-2 sm:p-4 rounded-lg text-left transition-colors bg-gray-700 hover:bg-gray-600"
                  >
                    <div>
                      <p className="font-medium text-white text-sm sm:text-base">{lang.nativeName}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{lang.name}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}