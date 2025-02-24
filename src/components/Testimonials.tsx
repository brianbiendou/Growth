import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

// Fonction pour générer un temps de connexion aléatoire
function getRandomLastSeen() {
  const times = [
    { min: 1, max: 59, unit: 'minute' },
    { min: 1, max: 23, unit: 'hour' },
    { min: 1, max: 7, unit: 'day' }
  ];
  
  const randomType = times[Math.floor(Math.random() * times.length)];
  const value = Math.floor(Math.random() * (randomType.max - randomType.min + 1)) + randomType.min;
  
  return { value, unit: randomType.unit };
}

// Fonction pour générer une note aléatoire entre 4 et 5 étoiles
function getRandomRating() {
  return 4 + Math.random();
}

const testimonialsByLang = {
  en: [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fashion Influencer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Thanks to Growth, I was able to increase my Instagram community from 1,000 to over 50,000 followers in just 3 months. The results are incredible!',
      platform: 'Instagram',
      growth: '50K+ followers',
      earnings: '$5,000/month'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Tech YouTuber',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'I was looking for a reliable way to increase my visibility on YouTube. Growth helped me reach 100K subscribers and now I live from my passion.',
      platform: 'YouTube',
      growth: '100K+ subscribers',
      earnings: '$8,000/month'
    },
    {
      id: 3,
      name: 'Emma Martinez',
      role: 'TikTok Creator',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'As a TikTok beginner, I didn\'t know where to start. Growth provided the boost I needed. Now I make a living through partnerships.',
      platform: 'TikTok',
      growth: '500K+ followers',
      earnings: '$12,000/month'
    },
    {
      id: 4,
      name: 'Alex Thompson',
      role: 'Fitness Coach',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Growth services transformed my online business. I now have an engaged community and stable income through my online courses.',
      platform: 'Instagram & YouTube',
      growth: '200K+ followers',
      earnings: '$15,000/month'
    }
  ],
  fr: [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Influenceuse Mode',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Grâce à Growth, j\'ai pu augmenter ma communauté Instagram de 1 000 à plus de 50 000 followers en seulement 3 mois. Les résultats sont incroyables !',
      platform: 'Instagram',
      growth: '50K+ followers',
      earnings: '5 000€/mois'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'YouTubeur Tech',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Je cherchais un moyen fiable d\'augmenter ma visibilité sur YouTube. Growth m\'a aidé à atteindre 100K abonnés et maintenant je vis de ma passion.',
      platform: 'YouTube',
      growth: '100K+ abonnés',
      earnings: '8 000€/mois'
    },
    {
      id: 3,
      name: 'Emma Martinez',
      role: 'Créatrice TikTok',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'En tant que débutante sur TikTok, je ne savais pas par où commencer. Growth m\'a fourni l\'impulsion dont j\'avais besoin. Maintenant, je gagne ma vie grâce aux partenariats.',
      platform: 'TikTok',
      growth: '500K+ followers',
      earnings: '12 000€/mois'
    },
    {
      id: 4,
      name: 'Alex Thompson',
      role: 'Coach Fitness',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Les services de Growth ont transformé mon business en ligne. J\'ai maintenant une communauté engagée et des revenus stables grâce à mes cours en ligne.',
      platform: 'Instagram & YouTube',
      growth: '200K+ followers',
      earnings: '15 000€/mois'
    }
  ],
  es: [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Influencer de Moda',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Gracias a Growth, pude aumentar mi comunidad de Instagram de 1,000 a más de 50,000 seguidores en solo 3 meses. ¡Los resultados son increíbles!',
      platform: 'Instagram',
      growth: '50K+ seguidores',
      earnings: '5.000€/mes'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'YouTuber de Tecnología',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Buscaba una forma confiable de aumentar mi visibilidad en YouTube. Growth me ayudó a alcanzar 100K suscriptores y ahora vivo de mi pasión.',
      platform: 'YouTube',
      growth: '100K+ suscriptores',
      earnings: '8.000€/mes'
    },
    {
      id: 3,
      name: 'Emma Martinez',
      role: 'Creadora de TikTok',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Como principiante en TikTok, no sabía por dónde empezar. Growth me dio el impulso que necesitaba. Ahora me gano la vida con colaboraciones.',
      platform: 'TikTok',
      growth: '500K+ seguidores',
      earnings: '12.000€/mes'
    },
    {
      id: 4,
      name: 'Alex Thompson',
      role: 'Entrenador de Fitness',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Los servicios de Growth transformaron mi negocio en línea. Ahora tengo una comunidad comprometida e ingresos estables gracias a mis cursos en línea.',
      platform: 'Instagram & YouTube',
      growth: '200K+ seguidores',
      earnings: '15.000€/mes'
    }
  ]
};

export function Testimonials() {
  const { t, i18n } = useTranslation();

  const testimonials = useMemo(() => {
    const currentLangTestimonials = testimonialsByLang[i18n.language] || testimonialsByLang.en;
    return currentLangTestimonials.map(testimonial => ({
      ...testimonial,
      lastSeen: getRandomLastSeen(),
      rating: getRandomRating()
    }));
  }, [i18n.language]);

  // Quadruple les témoignages pour assurer un défilement plus fluide
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('testimonials.title')} <span className="text-purple-500">Growth</span>
          </h2>
          <p className="text-gray-400 text-lg">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />

          <motion.div
            className="flex gap-3 sm:gap-8 py-4"
            animate={{
              x: [0, -7680], // Quadruple la distance d'animation
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 160, // Animation plus lente
                ease: "linear",
              },
            }}
            style={{
              width: "fit-content",
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="w-[280px] sm:w-[400px] flex-shrink-0 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-gray-800/70 transition-colors"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-white truncate">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{testimonial.role}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {t('testimonials.lastSeen', {
                        value: testimonial.lastSeen.value,
                        unit: t(`time.${testimonial.lastSeen.unit}`, { count: testimonial.lastSeen.value })
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const fillPercentage = Math.max(0, Math.min(100, (testimonial.rating - i) * 100));
                    return (
                      <div key={i} className="relative w-4 h-4 sm:w-5 sm:h-5">
                        <Star className="absolute w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        <div className="absolute overflow-hidden" style={{ width: `${fillPercentage}%` }}>
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-yellow-500" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <blockquote className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 italic line-clamp-3">
                  "{testimonial.content}"
                </blockquote>

                {/* Stats uniformes sur mobile */}
                <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-2 text-sm">
                  <div className="bg-purple-900/30 rounded-lg p-3">
                    <p className="text-purple-300">{t('testimonials.monthlyEarnings')}</p>
                    <p className="text-white font-medium">{testimonial.earnings}</p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-400">{t('testimonials.platform')}</p>
                    <p className="text-white font-medium truncate">{testimonial.platform}</p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-400">{t('testimonials.growth')}</p>
                    <p className="text-white font-medium truncate">{testimonial.growth}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm sm:text-base text-gray-400">
            {t('testimonials.joinOthers')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}