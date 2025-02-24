import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePrice } from '../hooks/usePrice';
import { CheckoutButton } from '../components/CheckoutButton';

export function Cart() {
  const { t } = useTranslation();
  const { formatPrice } = usePrice();
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();

  const handleQuantityChange = (id: string, quantity: number, minQuantity: number, maxQuantity: number) => {
    if (quantity >= minQuantity && quantity <= maxQuantity) {
      updateQuantity(id, quantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-4">{t('cart.empty.title')}</h2>
              <p className="text-gray-400 mb-8">{t('cart.empty.description')}</p>
              <Link
                to="/new-order"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                {t('cart.empty.browseServices')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-xl"
        >
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{t('cart.title')}</h1>
              <button
                onClick={clearCart}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                {t('cart.clearCart')}
              </button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-white font-medium">
                          {item.emoji} {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{t('cart.platform')}: {item.platform}</p>
                        <p className="text-gray-400 text-sm">{t('cart.link')}: {item.link}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value), 10, 1000000)}
                            className="w-20 sm:w-24 bg-gray-600 border border-gray-500 rounded px-3 py-1 text-white"
                          />
                        </div>
                        
                        <motion.div 
                          className="text-emerald-400 font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                        >
                          {formatPrice((item.price * item.quantity) / 1000)}
                        </motion.div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-8">
              <div className="flex justify-between items-center mb-6">
                <div className="text-gray-400">{t('cart.total')}</div>
                <motion.div 
                  className="text-2xl font-bold text-emerald-400"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    scale: [1, 1.02, 1],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                >
                  {formatPrice(total())}
                </motion.div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-400 text-sm">
                    {t('cart.verification')}
                  </p>
                </div>
              </div>

              <CheckoutButton />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}