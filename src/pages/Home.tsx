import { motion, easeInOut } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Beranda - Sinar Ilmu ';
    setIsVisible(true);
  }, []);

  // Animation variants
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

  const stats = [
    { number: "4", label: "SDN Mitra", subtitle: "Sekolah Dasar Negeri", icon: "🏫" },
    { number: "9,485", label: "Penduduk", subtitle: "Desa Pliken", icon: "👥" },
    { number: "4", label: "Minggu", subtitle: "Program Intensif", icon: "⏰" },
    { number: "100%", label: "Digital", subtitle: "Platform Pembelajaran", icon: "💻" }
  ];

  const features = [
    {
      icon: "🎮",
      title: "Gamifikasi Interaktif",
      description: "Belajar sambil bermain dengan sistem poin, badge, dan leaderboard yang memotivasi siswa untuk terus belajar"
    },
    {
      icon: "📱",
      title: "Media Sosial Edukatif", 
      description: "Platform diskusi aman untuk siswa berbagi pengetahuan dan berkolaborasi dalam pembelajaran"
    },
    {
      icon: "🧩",
      title: "Kuis Adaptif",
      description: "Evaluasi pembelajaran yang menyesuaikan tingkat kesulitan berdasarkan kemampuan dan progress siswa"
    },
    {
      icon: "👥",
      title: "Komunitas Belajar",
      description: "Forum diskusi dan kolaborasi real-time antar siswa, guru, dan orang tua untuk mendukung pembelajaran"
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Pantau progress belajar dengan visualisasi data yang mudah dipahami oleh siswa dan guru"
    },
    {
      icon: "🎯",
      title: "Pembelajaran Personal",
      description: "Konten pembelajaran yang disesuaikan dengan gaya dan kecepatan belajar setiap siswa"
    }
  ];

  const schools = [
    { name: 'SDN 1 Pliken', students: '245', programs: '12' },
    { name: 'SDN 2 Pliken', students: '198', programs: '10' },
    { name: 'SDN 3 Pliken', students: '167', programs: '8' },
    { name: 'SDN 4 Pliken', students: '203', programs: '11' }
  ];

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-32 h-32 sm:w-96 sm:h-96 bg-primary-100/30 dark:bg-primary-900/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-24 h-24 sm:w-80 sm:h-80 bg-secondary-100/30 dark:bg-secondary-900/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto pt-8 sm:pt-16 pb-8 w-full"
          >
            {/* Main Title */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-heading mb-4 sm:mb-6 leading-none">
                <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  SINAR
                </span>
                <span className="text-gray-900 dark:text-white"> ILMU</span>
              </h1>
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
                <div className="h-1 w-8 sm:w-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                <span className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium font-body text-center">Platform Pembelajaran Digital</span>
                <div className="h-1 w-8 sm:w-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
              <p className="text-lg sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-200 font-medium font-body mb-4 sm:mb-6 max-w-5xl mx-auto leading-relaxed px-2">
                Mewujudkan <span className="font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Desa Cerdas</span> dengan Teknologi Pembelajaran Digital yang Inovatif
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 font-body max-w-4xl mx-auto px-2">
                Platform pembelajaran digital untuk anak-anak Desa Pliken dengan fitur interaktif, gamifikasi, dan media sosial edukatif yang aman
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/learn')}
                  className="group relative w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold font-heading text-base sm:text-lg rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Mulai Belajar
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      🚀
                    </motion.span>
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/about')}
                  className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-400 font-bold font-heading text-base sm:text-lg rounded-2xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 shadow-lg"
                >
                  <span className="flex items-center justify-center gap-3">
                    Pelajari Lebih Lanjut
                    📖
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto px-2">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group"
                  >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 shadow-lg hover:shadow-glow">
                      <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">{stat.icon}</div>
                      <h3 className="text-xl sm:text-3xl md:text-4xl font-bold font-heading bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                        {stat.number}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 font-bold font-heading mb-1 text-sm sm:text-base">
                        {stat.label}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-body">
                        {stat.subtitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading text-gray-900 dark:text-white mb-6 sm:mb-8">
                Fitur <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Unggulan</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-body max-w-4xl mx-auto leading-relaxed px-2">
                Platform pembelajaran digital yang dirancang khusus untuk meningkatkan minat belajar anak-anak desa dengan teknologi modern
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700 group-hover:border-primary-200 dark:group-hover:border-primary-700 group-hover:shadow-glow transition-all duration-500 h-full">
                    <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 dark:text-white mb-3 sm:mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-body leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 sm:w-80 h-40 sm:h-80 bg-secondary-400/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading text-white mb-6 sm:mb-8">
                Sekolah Mitra
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-body max-w-4xl mx-auto leading-relaxed px-2">
                Berkolaborasi dengan 4 Sekolah Dasar Negeri di Desa Pliken untuk menghadirkan pendidikan digital terbaik bagi generasi masa depan
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {schools.map((school, index) => (
                <motion.div
                  key={school.name}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-white/30 transition-all duration-300">
                      <span className="text-2xl sm:text-3xl">🏫</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-3 sm:mb-4 text-center">
                      {school.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold font-heading text-white">{school.students}</p>
                        <p className="text-white/80 text-xs sm:text-sm font-body">Siswa</p>
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-bold font-heading text-white">{school.programs}</p>
                        <p className="text-white/80 text-xs sm:text-sm font-body">Program</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section - Zigzag Layout */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-amber-600 border border-amber-200 dark:text-amber-400 dark:border-amber-800 rounded-full mb-4 text-xs sm:text-sm font-medium">
                ⏱️ Roadmap Implementasi
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Timeline{" "}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  Program
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-2">
                Program intensif 4 minggu untuk implementasi platform pembelajaran digital yang komprehensif
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line - hidden on mobile, visible on desktop */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-amber-200 to-purple-200 dark:from-blue-800 dark:via-amber-800 dark:to-purple-800 rounded-full"></div>

              <div className="space-y-8 sm:space-y-16">
                {[
                  {
                    week: "Week 1",
                    title: "Survei & Pengembangan",
                    desc: "Pemetaan kebutuhan mendalam melalui observasi langsung, wawancara dengan stakeholder, dan launching platform beta dengan fitur utama yang telah dioptimalkan",
                    icon: "🔍",
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    week: "Week 2", 
                    title: "Sosialisasi & Training",
                    desc: "Penyuluhan komprehensif ke seluruh SD mitra, pelatihan intensif guru dan staff, serta workshop untuk optimalisasi penggunaan platform pembelajaran",
                    icon: "📢",
                    color: "from-emerald-500 to-emerald-600"
                  },
                  {
                    week: "Week 3",
                    title: "Monitoring & Optimasi", 
                    desc: "Pemantauan real-time penggunaan platform, analisis data pembelajaran, dan perbaikan berkelanjutan berdasarkan feedback dari pengguna aktif",
                    icon: "📈",
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    week: "Week 4",
                    title: "Evaluasi & Scaling",
                    desc: "Evaluasi menyeluruh dampak platform, dokumentasi best practices, dan perencanaan strategis untuk pengembangan fase selanjutnya",
                    icon: "🚀",
                    color: "from-rose-500 to-rose-600"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.week}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col lg:flex-row`}
                  >
                    <div className={`flex-1 w-full ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"} mb-4 lg:mb-0`}>
                      <div className="bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
                        <div className="p-6 sm:p-8">
                          <div className={`inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 py-1 text-xs font-semibold bg-gradient-to-r ${item.color} text-white border-0 rounded-full`}>
                            {item.week}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative z-10 mb-4 lg:mb-0">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-950`}>
                        <span className="text-lg sm:text-2xl">{item.icon}</span>
                      </div>
                    </div>

                    <div className="flex-1 hidden lg:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-16 sm:mt-20"
            >
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4 sm:mb-6">
                    Siap Memulai Perjalanan Digital?
                  </h3>
                  <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto px-2">
                    Bergabunglah dengan revolusi pembelajaran digital untuk menciptakan masa depan pendidikan yang lebih cerah
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-primary-600 font-bold font-heading text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Mulai Sekarang 🌟
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;