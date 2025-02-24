import { Outlet } from 'react-router-dom';
import { BookOpen, Settings, PlusCircle, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Layout() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: t('common.newOrder'), icon: PlusCircle, href: '/new-order' },
    { name: t('common.tutorials'), icon: BookOpen, href: '/tutorials' },
    { name: t('common.settings'), icon: Settings, href: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-4 right-4 z-50 md:hidden bg-purple-600 text-white p-3 rounded-full shadow-lg"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar - Desktop: Fixed, Mobile: Slide from bottom */}
        <motion.div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-800 mt-16 z-40
            md:translate-x-0 md:transition-none
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-300 ease-in-out
            md:block`}
        >
          <div className="flex flex-col h-full">
            <nav className="mt-4 flex-1">
              <div className="space-y-1 px-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 pl-0 md:pl-64 pt-16">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}