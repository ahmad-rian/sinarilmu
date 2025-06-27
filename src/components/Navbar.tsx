import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

// Types
interface NavItem {
  name: string;
  href: string;
}

// Navigation items
const navigation: NavItem[] = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang Kami', href: '/about' },
  { name: 'Pembelajaran', href: '/learn' },
  { name: 'Sekolah Mitra', href: '/schools' },
  { name: 'Komunitas', href: '/community' },
//   { name: 'Bantuan', href: '/help' },
];

// Logo Component
const Logo = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center group transition-transform duration-200 hover:scale-105"
  >
    <img 
      src="/assets/icons/logo.png" 
      alt="SinarIlmu Logo"
      className="w-12 h-12 object-cover mr-3"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const fallback = target.nextElementSibling as HTMLElement;
        if (fallback) fallback.style.display = 'flex';
      }}
    />
    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg hidden items-center justify-center mr-3 shadow-lg">
      <span className="text-white font-bold text-xl font-heading">
        S
      </span>
    </div>
    <div className="flex flex-col">
      <h1 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
       SINAR ILMU
      </h1>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-body -mt-1">
        Desa Cerdas Digital
      </p>
    </div>
  </button>
);

// Desktop Nav Item
const DesktopNavItem = ({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: NavItem; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full text-sm font-medium font-heading transition-all duration-200 hover:scale-105 ${
      isActive
        ? 'bg-primary-500 text-white shadow-lg hover:bg-primary-600'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`}
  >
    {item.name}
  </button>
);

// Mobile Nav Item
const MobileNavItem = ({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: NavItem; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-lg font-medium font-heading transition-all duration-200 hover:translate-x-2 ${
      isActive
        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 border-l-4 border-primary-500'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
    }`}
  >
    {item.name}
  </button>
);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    return href === '/' ? location.pathname === href : location.pathname.startsWith(href);
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Logo onClick={() => handleNavigation('/')} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full px-2 py-2 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex space-x-1">
                  {navigation.map((item) => (
                    <DesktopNavItem
                      key={item.name}
                      item={item}
                      isActive={isActive(item.href)}
                      onClick={() => handleNavigation(item.href)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-3">
              {/* Using the imported ThemeToggle component */}
              <ThemeToggle size="sm" />
              
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="px-4 py-6 space-y-1">
                  {/* Current page indicator */}
                  <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-body">
                      Halaman Aktif:
                    </p>
                    <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 font-heading">
                      {navigation.find(item => item.href === location.pathname)?.name || 'Beranda'}
                    </p>
                  </div>

                  {/* Navigation items */}
                  <div className="space-y-2">
                    {navigation.map((item) => (
                      <MobileNavItem
                        key={item.name}
                        item={item}
                        isActive={isActive(item.href)}
                        onClick={() => handleNavigation(item.href)}
                      />
                    ))}
                  </div>

                  
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;