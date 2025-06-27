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

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
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

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988c6.62 0 11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.33-1.297C4.198 14.77 3.708 13.619 3.708 12.322c0-1.297.49-2.449 1.297-3.331C5.926 8.07 7.077 7.581 8.374 7.581s2.449.489 3.331 1.297c.821.821 1.31 1.972 1.31 3.269s-.489 2.448-1.31 3.331c-.882.807-2.034 1.297-3.331 1.297z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488"/>
      </svg>
    ),
  },
];

// Logo Component
const FooterLogo = () => (
  <div className="flex items-center">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-yellow-400 rounded-lg flex items-center justify-center mr-4 shadow-lg">
      <span className="text-white font-bold text-xl font-['Plus_Jakarta_Sans']">
        S
      </span>
    </div>
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent">
        SinarIlmu
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-['Nunito'] -mt-1">
        Desa Cerdas Digital
      </p>
    </div>
  </div>
);

// Footer Link Component
const FooterLink = ({ 
  link, 
  onClick 
}: { 
  link: FooterLink; 
  onClick: (href: string) => void;
}) => (
  <motion.button
    onClick={() => onClick(link.href)}
    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-['Nunito'] text-left"
    whileHover={{ x: 4 }}
    transition={{ duration: 0.2 }}
  >
    {link.name}
  </motion.button>
);

// Social Link Component
const SocialButton = ({ social }: { social: SocialLink }) => (
  <motion.a
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    aria-label={social.name}
  >
    {social.icon}
  </motion.a>
);

const Footer = () => {
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigation = (href: string) => {
    setCurrentPath(href);
    // Add navigation logic here
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <FooterLogo />
              <p className="mt-4 text-gray-600 dark:text-gray-400 font-['Nunito'] leading-relaxed">
                Platform pembelajaran digital untuk mewujudkan desa cerdas melalui teknologi edukatif yang inovatif dan mudah diakses.
              </p>
              <div className="mt-6 flex space-x-3">
                {socialLinks.map((social) => (
                  <SocialButton key={social.name} social={social} />
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans'] uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <FooterLink link={link} onClick={handleNavigation} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans'] mb-2">
                Dapatkan Update Terbaru
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-['Nunito']">
                Berlangganan newsletter untuk mendapatkan informasi program dan fitur terbaru SinarIlmu.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Nunito']"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium font-['Plus_Jakarta_Sans'] hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Berlangganan
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-600 dark:text-gray-400 font-['Nunito'] text-sm">
                © {currentYear} SinarIlmu. Semua hak dilindungi.
              </p>
              <div className="flex space-x-6">
                <button 
                  onClick={() => handleNavigation('/privacy')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-['Nunito'] transition-colors duration-200"
                >
                  Kebijakan Privasi
                </button>
                <button 
                  onClick={() => handleNavigation('/terms')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-['Nunito'] transition-colors duration-200"
                >
                  Syarat & Ketentuan
                </button>
              </div>
            </div>
            
            {/* University Credit */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-['Nunito']">
                Dikembangkan oleh mahasiswa
              </p>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 font-['Plus_Jakarta_Sans']">
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