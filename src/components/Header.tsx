import { Link } from 'react-router-dom';
import { ShoppingCart, PlusCircle, MessageSquare, TrendingUp } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';

export function Header() {
  const { t } = useTranslation();
  const items = useCartStore((state) => state.items);
  const itemCount = items.length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-900 light:bg-white light:border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-12 sm:h-16 items-center">
          <motion.div 
            className="flex items-center gap-1 sm:gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut"
                  }
                }}
                className="relative"
              >
                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-purple-500" />
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.span 
                className="text-base sm:text-xl font-bold text-white light:text-gray-900 ml-1"
                whileHover={{
                  y: [0, -2, 2, -2, 0],
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut"
                  }
                }}
              >
                {t('common.growth')}
              </motion.span>
            </Link>
          </motion.div>

          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
            <Link 
              to="/new-order" 
              className="text-gray-300 hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors flex items-center gap-2 p-1.5 sm:p-2"
            >
              <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:inline">{t('common.newOrder')}</span>
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-300 hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors flex items-center gap-2 p-1.5 sm:p-2"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:inline">{t('common.contact')}</span>
            </Link>
            <Link 
              to="/cart" 
              className="text-gray-300 hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors flex items-center gap-2 relative p-1.5 sm:p-2"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:inline">{t('common.cart')}</span>
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-purple-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}