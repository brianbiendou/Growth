import { useState, useMemo } from 'react';
import { Youtube, Facebook, Music as TikTok, Instagram, Music2 as Spotify, Twitch, MessageSquare as Discord, Ghost as Snapchat, Send as Telegram, Twitter, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { youtubeServices } from '../services/youtube';
import { facebookServices } from '../services/facebook';
import { tiktokServices } from '../services/tiktok';
import { instagramServices } from '../services/instagram';
import { spotifyServices } from '../services/spotify';
import { twitchServices } from '../services/twitch';
import { discordServices } from '../services/discord';
import { snapchatServices } from '../services/snapchat';
import { telegramServices } from '../services/telegram';
import { twitterServices } from '../services/twitter';
import { AnimatedMessage } from '../components/AnimatedMessage';
import { PlatformButton } from '../components/PlatformButton';
import { useCartStore } from '../store/cart';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePrice } from '../hooks/usePrice';
import clsx from 'clsx';

interface Service {
  id: string;
  name: string;
  maxQuantity: number;
  minQuantity: number;
  speed: 'Slow' | 'Fast' | 'Very Fast' | 'Instant';
  price: number;
  time?: string;
  emoji?: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  services: Service[];
}

interface Platform {
  id: string;
  name: string;
  icon: any;
  color: string;
  categories: Category[];
}

const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'text-pink-500',
    categories: instagramServices.categories
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: TikTok,
    color: 'text-pink-500',
    categories: tiktokServices.categories
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: 'text-red-500',
    categories: youtubeServices.categories
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-500',
    categories: facebookServices.categories
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: 'text-blue-400',
    categories: twitterServices.categories
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: Spotify,
    color: 'text-green-500',
    categories: spotifyServices.categories
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: Twitch,
    color: 'text-purple-500',
    categories: twitchServices.categories
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: Discord,
    color: 'text-indigo-500',
    categories: discordServices.categories
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    icon: Snapchat,
    color: 'text-yellow-500',
    categories: snapchatServices.categories
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: Telegram,
    color: 'text-blue-400',
    categories: telegramServices.categories
  }
];

const countries = {
  'fr': { code: '🇫🇷', name: 'French' },
  'es': { code: '🇪🇸', name: 'Spanish' },
  'sa': { code: '🇸🇦', name: 'Arabic' },
  'br': { code: '🇧🇷', name: 'Brazilian' },
  'id': { code: '🇮🇩', name: 'Indonesian' },
  'se': { code: '🇸🇪', name: 'Sweden' },
  'us': { code: '🇺🇸', name: 'USA' }
};

const genders = {
  'mixed': { emoji: '⚥', name: 'Mixed' },
  'male': { emoji: '👨', name: 'Male' },
  'female': { emoji: '👩', name: 'Female' }
};

function generateQuantityOptions(minQuantity: number, maxQuantity: number): number[] {
  const options: number[] = [];
  let currentValue = Math.ceil(minQuantity / 1000) * 1000;

  // Ajouter les paliers de 1000 jusqu'à 10000
  while (currentValue <= Math.min(10000, maxQuantity) && currentValue <= maxQuantity) {
    options.push(currentValue);
    currentValue += 1000;
  }

  // Si maxQuantity > 10000, ajouter les paliers de 10000
  if (maxQuantity > 10000) {
    currentValue = Math.ceil(Math.max(currentValue, 10000) / 10000) * 10000;
    while (currentValue <= maxQuantity) {
      options.push(currentValue);
      currentValue += 10000;
    }
  }

  // Si le dernier palier n'atteint pas maxQuantity, ajouter maxQuantity
  if (options[options.length - 1] < maxQuantity) {
    options.push(maxQuantity);
  }

  return options;
}

function NewOrder() {
  const { t } = useTranslation();
  const { formatPrice } = usePrice();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addItem);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [link, setLink] = useState<string>('');
  const [charge, setCharge] = useState<number>(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');

  const platform = platforms.find(p => p.id === selectedPlatform);
  const categories = platform?.categories || [];
  
  const isTargetedCategory = selectedCategory?.toLowerCase().includes('targeted');

  const quantityOptions = useMemo(() => {
    if (!selectedService) return [];
    return generateQuantityOptions(selectedService.minQuantity, selectedService.maxQuantity);
  }, [selectedService]);

  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatform(platformId);
    setSelectedCategory('');
    setSelectedService(null);
    setQuantity(0);
    setCharge(0);
    setSelectedCountry('');
    setSelectedGender('');
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedService(null);
    setQuantity(0);
    setCharge(0);
    setSelectedCountry('');
    setSelectedGender('');
  };

  const handleServiceChange = (service: Service) => {
    setSelectedService(service);
    const defaultQuantity = Math.ceil(service.minQuantity / 1000) * 1000;
    setQuantity(defaultQuantity);
    setCharge(calculateCharge(service.price, defaultQuantity));
  };

  const calculateCharge = (price: number, qty: number) => {
    return (price * qty) / 1000;
  };

  const handleQuantityChange = (value: string) => {
    if (!selectedService) return;
    
    const numValue = parseInt(value);
    setQuantity(numValue);
    setCharge(calculateCharge(selectedService.price, numValue));
  };

  const isValidQuantity = selectedService && 
    quantity >= selectedService.minQuantity && 
    quantity <= selectedService.maxQuantity && 
    quantity % 1000 === 0;

  const handleSubmit = () => {
    if (!selectedService || !link || !isValidQuantity) return;

    addToCart({
      id: selectedService.id,
      name: selectedService.name,
      price: selectedService.price,
      quantity,
      link,
      emoji: selectedService.emoji,
      platform: platform?.name || ''
    });

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setSelectedCategory('');
      setSelectedService(null);
      setQuantity(0);
      setCharge(0);
      setLink('');
      setSelectedCountry('');
      setSelectedGender('');
    }, 2000);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const filteredServices = categories
    .find(c => c.id === selectedCategory)
    ?.services.filter(service => {
      if (!isTargetedCategory) return true;
      
      const countryMatch = !selectedCountry || service.name.includes(countries[selectedCountry].code);
      const genderMatch = !selectedGender || service.name.includes(genders[selectedGender].emoji);
      
      return countryMatch && genderMatch;
    });

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <AnimatedMessage />
        
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-2">
          {platforms.map((platform) => (
            <PlatformButton
              key={platform.id}
              icon={platform.icon}
              name={platform.name}
              color={platform.color}
              isSelected={selectedPlatform === platform.id}
              onClick={() => handlePlatformChange(platform.id)}
            />
          ))}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              {t('newOrder.category')}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="">{t('newOrder.selectCategory')}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {isTargetedCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                >
                  <option value="">Select Country</option>
                  {Object.entries(countries).map(([code, country]) => (
                    <option key={code} value={code}>
                      {country.code} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Gender
                </label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                >
                  <option value="">Select Gender</option>
                  {Object.entries(genders).map(([code, gender]) => (
                    <option key={code} value={code}>
                      {gender.emoji} {gender.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {selectedCategory && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                {t('newOrder.service')}
              </label>
              <select
                value={selectedService?.id || ''}
                onChange={(e) => {
                  const service = filteredServices?.find(s => s.id === e.target.value);
                  if (service) handleServiceChange(service);
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="">{t('newOrder.selectService')}</option>
                {filteredServices?.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {formatPrice(service.price)} per 1000
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedService && (
            <div className="bg-gray-800 rounded-lg p-4 space-y-2">
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                {selectedService.description}
              </pre>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              {t('newOrder.link')}
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={t('newOrder.enterLink')}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>

          {selectedService && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                {t('newOrder.quantity')} (Min: {selectedService.minQuantity} - Max: {selectedService.maxQuantity})
              </label>
              <select
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Select Quantity</option>
                {quantityOptions.map((value) => (
                  <option key={value} value={value}>
                    {value.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          )}

          {charge > 0 && (
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-white text-lg text-center">
                {t('newOrder.charge')}: <span className="font-bold">{formatPrice(charge)}</span>
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSubmit}
              disabled={!selectedService || !link || !isValidQuantity}
              className={clsx(
                'w-full sm:flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2',
                selectedService && link && isValidQuantity
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-800 text-gray-400 cursor-not-allowed'
              )}
            >
              {t('newOrder.addToCart')}
            </button>

            <button
              onClick={handleGoToCart}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {t('newOrder.viewCart')}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {addedToCart && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              {t('newOrder.addedSuccess')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NewOrder;