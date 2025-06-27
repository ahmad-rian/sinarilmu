import { motion, easeInOut } from 'framer-motion'; // Tambahkan import easeInOut
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Halaman Tidak Ditemukan - SinarIlmu';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Perbaikan: gunakan easeInOut dari framer-motion, bukan string
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut
      }
    }
  };

  const popularPages = [
    {
      title: "Beranda",
      description: "Kembali ke halaman utama SinarIlmu",
      path: "/",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Belajar",
      description: "Jelajahi materi pembelajaran interaktif",
      path: "/learn",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Sekolah Mitra",
      description: "Lihat profil sekolah-sekolah mitra kami",
      path: "/schools",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Komunitas",
      description: "Bergabung dengan komunitas pembelajaran",
      path: "/community",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const quickActions = [
    {
      title: "Cari Bantuan",
      description: "Hubungi tim support kami",
      action: () => navigate('/help/contact'),
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Laporkan Masalah",
      description: "Laporkan link yang rusak",
      action: () => navigate('/help/report'),
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "FAQ",
      description: "Pertanyaan yang sering diajukan",
      action: () => navigate('/help/faq'),
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      {/* Main Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-100/20 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary-100/20 dark:bg-secondary-900/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Logo/Icon */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <img 
                  src="/public/assets/icons/logo.png" 
                  alt="SinarIlmu Logo" 
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const sibling = target.nextElementSibling as HTMLElement | null;
                    if (sibling) sibling.style.display = 'block';
                  }}
                />
                <span className="text-white font-bold text-3xl hidden">SI</span>
              </div>
            </motion.div>

            {/* 404 Animation */}
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h1 
                className="text-8xl md:text-9xl font-bold font-heading text-primary-500 dark:text-primary-400 mb-4"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                404
              </motion.h1>
            </motion.div>

            {/* Error Message */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-6">
                Oops! Halaman Tidak Ditemukan
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-3xl mx-auto mb-8 leading-relaxed">
                Sepertinya halaman yang Anda cari sedang bersembunyi di suatu tempat. Mungkin sedang belajar di kelas lain? 
                Jangan khawatir, mari kita bantu Anda menemukan jalan kembali!
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="mb-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/')}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold font-heading text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Kembali ke Beranda
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.history.back()}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-400 font-bold font-heading text-lg rounded-2xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 shadow-lg"
                >
                  Halaman Sebelumnya
                </motion.button>
              </div>
            </motion.div>

           
          </motion.div>
        </div>
      </section>

      {/* Popular Pages Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-6">
              Halaman <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Populer</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-3xl mx-auto">
              Mungkin Anda mencari salah satu halaman berikut?
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPages.map((page, index) => (
              <motion.div
                key={page.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(page.path)}
              >
                <div className="h-32 overflow-hidden">
                  <img 
                    src={page.image} 
                    alt={page.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white mb-2">
                    {page.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-body text-sm">
                    {page.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-6">
              Butuh <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">Bantuan?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-3xl mx-auto">
              Tim kami siap membantu Anda menyelesaikan masalah yang dihadapi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 text-center cursor-pointer"
                onClick={action.action}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <span className="text-white font-bold text-2xl">
                    {action.title === 'Cari Bantuan' ? '💬' : 
                     action.title === 'Laporkan Masalah' ? '⚠️' : '❓'}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-3">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body">
                  {action.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop&crop=center" 
            alt="Fun learning"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
              Tahukah Kamu?
            </h2>
            <p className="text-xl text-white/90 font-body max-w-4xl mx-auto mb-8">
              Halaman 404 dinamakan demikian karena kode status HTTP 404 yang berarti "Not Found". 
              Tapi di SinarIlmu, tidak ada yang benar-benar hilang - selalu ada cara untuk belajar hal baru!
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => navigate('/learn')}
                className="bg-white text-primary-600 font-semibold font-heading px-8 py-4 rounded-2xl text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg"
              >
                Mari Belajar Sesuatu yang Baru!
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;