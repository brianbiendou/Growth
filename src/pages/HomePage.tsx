import { AnimatedText } from '../components/AnimatedText';
import { SocialCarousel } from '../components/SocialCarousel';
import { AnimatedCTAButton } from '../components/AnimatedCTAButton';
import { Testimonials } from '../components/Testimonials';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();

  const stats = [
    { value: '3 562 443', label: t('home.stats.completedOrders') },
    { value: '24/7', label: t('home.stats.support') },
    { value: '4.4/5', label: t('home.stats.rating') },
    { value: t('home.stats.freeServices'), label: '' },
    { value: t('home.stats.qualityServices'), label: '' },
    { value: '119 036', label: t('home.stats.happyCustomers') }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold">
              {t('home.title')} <AnimatedText />
            </h1>
            <p className="mt-4 text-xl text-gray-400">
              {t('home.subtitle')}
            </p>
          </div>

          <SocialCarousel />
          <AnimatedCTAButton />

          <section className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-blue-500">{t('home.whyChooseUs')}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl ${
                    index % 2 === 0 ? 'bg-gray-800/50' : 'bg-purple-600/90'
                  } backdrop-blur-sm`}
                >
                  <div className="text-center">
                    <div className="text-xl font-bold">{stat.value}</div>
                    {stat.label && (
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
}