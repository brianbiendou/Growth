import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, Globe2, Coins } from 'lucide-react';
import { useSettingsStore, currencies, type CurrencyCode } from '../store/settings';
import { languages } from '../i18n';
import { useNavigate } from 'react-router-dom';

export function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, currency, setLanguage, setCurrency, resetSettings, hideSettings } = useSettingsStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleValidate = () => {
    hideSettings();
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Globe2 className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-white">{t('settings.title')}</h1>
          </div>

          <div className="space-y-8">
            {/* Language Selection */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                {t('settings.interfaceLanguage')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(languages).map(([code, lang]) => (
                  <motion.button
                    key={code}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageChange(code)}
                    className={`relative p-4 rounded-lg text-left transition-colors ${
                      language === code
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{lang.nativeName}</p>
                        <p className="text-sm opacity-75">{lang.name}</p>
                      </div>
                      {language === code && (
                        <Check className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Currency Selection */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Coins className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold text-white">
                  {t('settings.currency')}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(currencies).map(([code, curr]) => (
                  <motion.button
                    key={code}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCurrencyChange(code as CurrencyCode)}
                    className={`relative p-4 rounded-lg text-left transition-colors ${
                      currency === code
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{curr.name}</p>
                        <p className="text-sm opacity-75">{curr.symbol}</p>
                      </div>
                      {currency === code && (
                        <Check className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <button
                onClick={resetSettings}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                {t('settings.reset')}
              </button>
              <button
                onClick={handleValidate}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                {t('settings.save')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              {t('settings.settingsUpdated')}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}