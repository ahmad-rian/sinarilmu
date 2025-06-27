import { motion, easeInOut } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Tentang Kami - SinarIlmu';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
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

  const teamMembers = [
    {
      name: "Ahmad Rian Syaifullah", 
      nim: "H1D022010",
      role: "Full Stack Developer",
      specialty: "Backend Architecture & System Design",
      description: "Memimpin pengembangan platform dan merancang arsitektur sistem yang scalable dan secure untuk mendukung pembelajaran digital yang efektif",
      skills: ["Node.js", "React", "Database Design", "System Architecture"],
      image: "/assets/images/rian.jpeg"
    },
    {
      name: "Arih Puspita Murti",
      nim: "I1A022079", 
      role: "Designer & Researcher",
      specialty: "Content Strategy & User Experience",
      description: "Mengembangkan strategi konten pembelajaran dan merancang pengalaman pengguna yang optimal untuk anak-anak desa",
      skills: ["Content Strategy", "User Research", "Design Systems"],
      image: "/assets/images/arih.png"
    },
    {
      name: "Hamas Izzuddin Fathi",
      nim: "H1D022097",
      role: "Frontend Developer",
      specialty: "UI/UX Design & Frontend Development",
      description: "Merancang interface yang user-friendly dan mengembangkan frontend dengan teknologi modern untuk pengalaman pengguna yang optimal",
      skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: "/assets/images/hamas.png"
    },
  ];

  const values = [
    {
      title: "Visi Kami",
      description: "Mewujudkan desa cerdas melalui transformasi digital pendidikan yang merata, berkelanjutan, dan berdampak positif bagi generasi masa depan.",
      highlight: "Desa Cerdas Digital"
    },
    {
      title: "Misi Kami",
      description: "Menghadirkan platform pembelajaran digital yang inovatif, mudah diakses, dan sesuai dengan kebutuhan spesifik anak-anak desa.",
      highlight: "Pembelajaran Inklusif"
    },
    {
      title: "Inovasi",
      description: "Mengintegrasikan teknologi terdepan dengan metode pembelajaran yang menyenangkan, interaktif, dan efektif.",
      highlight: "Teknologi untuk Semua"
    },
    {
      title: "Kolaborasi", 
      description: "Membangun kemitraan strategis dengan sekolah, masyarakat, dan berbagai stakeholder pendidikan untuk dampak maksimal.",
      highlight: "Bersama Membangun"
    }
  ];

  const milestones = [
    {
      period: "Q3 2024",
      title: "Riset & Konseptualisasi",
      description: "Survei mendalam kebutuhan pendidikan di Desa Pliken dan analisis gap teknologi yang komprehensif",
      status: "completed",
      insights: "Mengidentifikasi 3 tantangan utama: akses teknologi terbatas, metode pembelajaran konvensional, dan kurangnya motivasi belajar siswa"
    },
    {
      period: "Q4 2024", 
      title: "Pengembangan Platform",
      description: "Pembangunan platform SinarIlmu dengan fitur pembelajaran interaktif dan gamifikasi",
      status: "completed",
      insights: "Berhasil mengembangkan MVP dengan 5 fitur utama dan melakukan testing internal yang komprehensif"
    },
    {
      period: "Q1 2025",
      title: "Pilot Program",
      description: "Implementasi beta testing di 4 SDN di Desa Pliken dengan program 4 minggu intensif",
      status: "current",
      insights: "Saat ini melibatkan 813 siswa dan 32 guru dalam program pilot dengan feedback positif 87%"
    },
    {
      period: "Q2+ 2025",
      title: "Ekspansi & Scaling",
      description: "Pengembangan ke desa-desa lain di Kabupaten Banyumas dan optimasi platform",
      status: "planned",
      insights: "Target ekspansi ke 15 desa dengan 2.500+ siswa dan pengembangan fitur AI untuk personalisasi pembelajaran"
    }
  ];

  const stats = [
    { number: "3", label: "Tim Developer", subtitle: "Mahasiswa Berdedikasi" },
    { number: "4", label: "Minggu Program", subtitle: "Implementasi Intensif" },
    { number: "813", label: "Siswa Target", subtitle: "Di 4 Sekolah Mitra" },
    { number: "100%", label: "Open Source", subtitle: "Teknologi Terbuka" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-5 sm:top-10 md:top-20 right-0 sm:right-10 md:right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-primary-100/20 dark:bg-primary-900/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
          <div className="absolute bottom-5 sm:bottom-10 md:bottom-20 left-0 sm:left-10 md:left-20 w-24 h-24 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-secondary-100/20 dark:bg-secondary-900/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-12">
              <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl sm:shadow-2xl">
                  <img 
                    src="/assets/icons/logo.png" 
                    alt="SinarIlmu Logo" 
                    className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const sibling = target.nextElementSibling as HTMLElement | null;
                      if (sibling) sibling.style.display = 'block';
                    }}
                  />
                  <span className="text-white font-bold text-lg sm:text-xl md:text-2xl hidden">SI</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold font-heading text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 leading-tight px-2"
            >
              Tentang <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">SinarIlmu</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 font-body max-w-2xl sm:max-w-4xl lg:max-w-5xl mx-auto mb-6 sm:mb-8 md:mb-12 leading-relaxed px-4"
            >
              Platform pembelajaran digital yang dikembangkan dengan <span className="font-semibold text-primary-600 dark:text-primary-400">hati dan dedikasi</span> untuk mewujudkan desa cerdas melalui teknologi pendidikan yang inovatif dan accessible.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 max-w-2xl sm:max-w-4xl lg:max-w-5xl mx-auto border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
            >
              <div className="mb-3 sm:mb-4 md:mb-6">
                <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-200 font-heading mb-2 sm:mb-3 md:mb-4">Program Pengabdian Masyarakat</h2>
                <div className="w-8 sm:w-12 md:w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-3 sm:mb-4 md:mb-6"></div>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 font-body leading-relaxed px-2">
                SinarIlmu lahir dari <span className="font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Bhinneka Ceria Berkarya 2025</span>, sebuah program pengabdian masyarakat yang dikembangkan oleh mahasiswa Universitas Jenderal Soedirman. Kami percaya bahwa teknologi dapat menjadi jembatan untuk memberikan akses pendidikan berkualitas kepada anak-anak di daerah pedesaan.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 md:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-heading bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-bold font-heading mb-0 sm:mb-1 text-xs sm:text-sm md:text-base">
                    {stat.label}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-body">
                    {stat.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-heading text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-8 px-2">
              Visi & <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Misi</span>
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-400 font-body max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto leading-relaxed px-4">
              Nilai-nilai fundamental yang mendorong kami dalam menciptakan solusi pendidikan digital yang berdampak dan berkelanjutan
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-xl transition-all duration-500 h-full">
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <span className="inline-block px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-semibold rounded-full border border-primary-200/50 dark:border-primary-700/50">
                      {value.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-body text-sm sm:text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-heading text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-8 px-2">
              Tim <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Developer</span>
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-400 font-body max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto leading-relaxed px-4">
              Mahasiswa Universitas Jenderal Soedirman yang berdedikasi untuk kemajuan pendidikan digital dan transformasi teknologi di Indonesia
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.nim}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 group-hover:border-primary-200 dark:group-hover:border-primary-700 group-hover:shadow-xl transition-all duration-500">
                  <div className="text-center mb-3 sm:mb-4 md:mb-6">
                    {/* Profile Image Placeholder */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const sibling = target.nextElementSibling as HTMLElement | null;
                          if (sibling) sibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 hidden items-center justify-center">
                        <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg md:text-xl font-bold font-heading text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-bold font-body text-xs sm:text-sm mb-1">
                      {member.nim}
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400 font-semibold font-heading text-sm sm:text-base mb-1 sm:mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 font-body text-xs sm:text-sm mb-3 sm:mb-4">
                      {member.specialty}
                    </p>
                  </div>
                  
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <p className="text-gray-600 dark:text-gray-400 font-body text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 md:mb-4">
                      {member.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-700 dark:text-primary-300 text-xs font-medium font-body rounded-full border border-primary-200/50 dark:border-primary-700/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Zigzag Layout */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-heading text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-8 px-2">
              Perjalanan <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">Kami</span>
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-400 font-body max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto leading-relaxed px-4">
              Milestone penting dalam pengembangan platform SinarIlmu dan transformasi pendidikan digital di Desa Pliken
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line - hidden on mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 via-secondary-200 to-primary-200 dark:from-primary-800 dark:via-secondary-800 dark:to-primary-800 hidden lg:block"></div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.period}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`flex-1 w-full ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"} mb-3 lg:mb-0`}>
                    <div className={`bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border-0 hover:shadow-xl transition-all duration-300 ${
                      milestone.status === 'current' ? 'ring-2 ring-primary-500/50 border-primary-300 dark:border-primary-600' : ''
                    }`}>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                        <span className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          milestone.status === 'current' ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' :
                          'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {milestone.period}
                        </span>
                        {milestone.status === 'current' && (
                          <span className="px-2 py-1 bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400 text-xs font-bold rounded-full">
                            SEDANG BERJALAN
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold font-heading text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-body text-sm sm:text-base leading-relaxed mb-2 sm:mb-3 md:mb-4">
                        {milestone.description}
                      </p>
                      
                      {/* Insights */}
                      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border-l-4 border-primary-400">
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-body italic">
                          <span className="font-semibold text-primary-600 dark:text-primary-400">Insight:</span> {milestone.insights}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 my-3 lg:my-0">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-4 border-white dark:border-gray-900 ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'current' ? 'bg-gradient-to-r from-primary-500 to-secondary-500' :
                      'bg-gray-400'
                    }`}></div>
                  </div>

                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* University Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-5 sm:top-10 md:top-20 right-0 sm:right-10 md:right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
          <div className="absolute bottom-5 sm:bottom-10 md:bottom-20 left-0 sm:left-10 md:left-20 w-24 h-24 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-secondary-400/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-heading text-white mb-3 sm:mb-4 md:mb-8 px-2">
              Universitas Jenderal Soedirman
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-white/90 font-body max-w-2xl sm:max-w-4xl lg:max-w-5xl mx-auto mb-6 sm:mb-8 md:mb-12 leading-relaxed px-4">
              Kami bangga menjadi bagian dari Universitas Jenderal Soedirman, Purwokerto, dalam menghadirkan inovasi pendidikan digital untuk kemajuan masyarakat Indonesia dan pembangunan berkelanjutan.
            </p>
            
            <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-white mb-1 sm:mb-2">1963</h3>
                <p className="text-white/80 font-body text-xs sm:text-sm md:text-base">Tahun Berdiri</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-white mb-1 sm:mb-2">Purwokerto</h3>
                <p className="text-white/80 font-body text-xs sm:text-sm md:text-base">Jawa Tengah</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-white mb-1 sm:mb-2">UNSOED</h3>
                <p className="text-white/80 font-body text-xs sm:text-sm md:text-base">Akronim</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-heading text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-8 px-2">
              Mari <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Berkolaborasi</span>
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-400 font-body max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12 leading-relaxed px-4">
              Kami terbuka untuk kolaborasi dan kemitraan dalam mengembangkan pendidikan digital di Indonesia. Mari bersama-sama membangun masa depan pendidikan yang lebih baik.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-8 sm:mb-12 md:mb-16 px-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/help/contact')}
                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold font-heading text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Hubungi Kami
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/community')}
                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-400 font-bold font-heading text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 shadow-lg"
              >
                Gabung Komunitas
              </motion.button>
            </div>

            {/* Contact Cards */}
            <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3 max-w-2xl sm:max-w-5xl md:max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 shadow-lg hover:shadow-xl h-full">
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">💬</span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold font-heading text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
                    Diskusi Program
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-body text-xs sm:text-sm md:text-base leading-relaxed">
                    Tertarik dengan program kami? Mari diskusikan lebih lanjut tentang kolaborasi dan kemitraan untuk mengembangkan pendidikan digital.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-secondary-300/50 dark:hover:border-secondary-600/50 transition-all duration-300 shadow-lg hover:shadow-xl h-full">
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900/30 dark:to-secondary-800/30 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-600 dark:text-secondary-400">🎓</span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold font-heading text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
                    Institusi Pendidikan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-body text-xs sm:text-sm md:text-base leading-relaxed">
                    Sekolah atau institusi pendidikan yang ingin mengimplementasikan platform digital pembelajaran untuk meningkatkan kualitas pendidikan.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 shadow-lg hover:shadow-xl h-full">
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">🚀</span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold font-heading text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
                    Developer & Kontributor
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-body text-xs sm:text-sm md:text-base leading-relaxed">
                    Bergabunglah sebagai kontributor untuk mengembangkan platform open-source ini bersama-sama dalam semangat kolaborasi.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;