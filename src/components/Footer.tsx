import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Types
interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

// Footer data
const footerSections: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { name: 'Beranda', href: '/' },
      { name: 'Tentang Kami', href: '/about' },
      { name: 'Pembelajaran', href: '/learn' },
      { name: 'Bantuan', href: '/help' },
    ],
  },
  {
    title: 'Kemitraan',
    links: [
      { name: 'SDN 1 Pliken', href: '/schools/sdn1' },
      { name: 'SDN 2 Pliken', href: '/schools/sdn2' },
      { name: 'SDN 3 Pliken', href: '/schools/sdn3' },
      { name: 'SDN 4 Pliken', href: '/schools/sdn4' },
    ],
  },
  {
    title: 'Komunitas',
    links: [
      { name: 'Forum Diskusi', href: '/community/forum' },
      { name: 'Leaderboard', href: '/community/leaderboard' },
      { name: 'Event', href: '/community/events' },
      { name: 'Blog', href: '/community/blog' },
    ],
  },
  {
    title: 'Dukungan',
    links: [
      { name: 'FAQ', href: '/help/faq' },
      { name: 'Panduan', href: '/help/guide' },
      { name: 'Kontak', href: '/help/contact' },
      { name: 'Lapor Bug', href: '/help/report' },
    ],
  },
];

// Logo Component
const FooterLogo = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center group transition-transform duration-200 hover:scale-105 w-full sm:w-auto justify-center sm:justify-start">
    <img 
      src="/assets/icons/logo.png" 
      alt="SinarIlmu Logo"
      className="w-10 h-10 sm:w-12 sm:h-12 object-cover mr-3 sm:mr-4"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const fallback = target.nextElementSibling as HTMLElement;
        if (fallback) fallback.style.display = 'flex';
      }}
    />
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg hidden items-center justify-center mr-3 sm:mr-4 shadow-lg">
      <span className="text-white font-bold text-lg sm:text-xl font-heading">
        S
      </span>
    </div>
    <div className="flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 dark:text-white">
        SinarIlmu
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-body -mt-1">
        Desa Cerdas Digital
      </p>
    </div>
  </button>
);

// Footer Link Component
const FooterLinkComponent = ({ 
  link, 
  onClick 
}: { 
  link: FooterLink; 
  onClick: (href: string) => void;
}) => (
  <motion.button
    onClick={() => onClick(link.href)}
    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-body text-left text-sm sm:text-base w-full"
    whileHover={{ x: 4 }}
    transition={{ duration: 0.2 }}
  >
    {link.name}
  </motion.button>
);

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    navigate(href);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-8 sm:top-12 lg:top-20 right-8 sm:right-12 lg:right-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-96 lg:h-96 bg-primary-100/20 dark:bg-primary-900/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-8 sm:bottom-12 lg:bottom-20 left-8 sm:left-12 lg:left-20 w-24 h-24 sm:w-40 sm:h-40 lg:w-80 lg:h-80 bg-secondary-100/20 dark:bg-secondary-900/10 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
            {/* Logo and Description */}
            <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
              <FooterLogo onClick={() => handleNavigation('/')} />
              <p className="mt-4 sm:mt-6 text-gray-600 dark:text-gray-400 font-body leading-relaxed text-sm sm:text-base lg:text-lg px-2 sm:px-0">
                Platform pembelajaran digital untuk mewujudkan desa cerdas melalui teknologi edukatif yang inovatif dan mudah diakses.
              </p>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-1 text-center sm:text-left">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-heading uppercase tracking-wider mb-4 sm:mb-6 relative inline-block">
                  {section.title}
                  <div className="absolute -bottom-1 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                </h3>
                <ul className="space-y-2 sm:space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <FooterLinkComponent link={link} onClick={handleNavigation} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 sm:py-8 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl mx-2 sm:mx-4 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-center sm:text-left">
              <p className="text-gray-600 dark:text-gray-400 font-body text-xs sm:text-sm">
                © {currentYear} Sinar Ilmu. Semua hak dilindungi.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <button 
                  onClick={() => handleNavigation('/privacy')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-xs sm:text-sm font-body transition-colors duration-200"
                >
                  Kebijakan Privasi
                </button>
                <button 
                  onClick={() => handleNavigation('/terms')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-xs sm:text-sm font-body transition-colors duration-200"
                >
                  Syarat & Ketentuan
                </button>
              </div>
            </div>
            
            {/* University Credit */}
            <div className="text-center lg:text-right">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-body">
                Dikembangkan oleh mahasiswa
              </p>
              <p className="text-xs sm:text-sm font-bold font-heading bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Universitas Jenderal Soedirman
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;