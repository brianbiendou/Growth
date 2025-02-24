import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, BookText as TikTok, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-500' },
  { icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-400' },
  { icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-500' },
  { icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-500' },
  { icon: TikTok, href: 'https://tiktok.com', color: 'hover:text-pink-500' },
  { icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-600' },
  { icon: Github, href: 'https://github.com', color: 'hover:text-purple-500' }
];

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/new-order' },
      { name: 'Careers', href: '/new-order' },
      { name: 'Press', href: '/new-order' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/new-order' },
      { name: 'Newsletter', href: '/new-order' },
      { name: 'Events', href: '/new-order' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms', href: '/new-order' },
      { name: 'Privacy', href: '/new-order' },
      { name: 'Cookies', href: '/new-order' }
    ]
  }
];

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
              Growth
            </Link>
            <p className="text-gray-400 text-sm">
              Boost your social media presence with real engagement and authentic growth.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © {currentYear} Growth. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/new-order" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms
            </Link>
            <Link to="/new-order" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link to="/new-order" className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}