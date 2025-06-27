import { motion, easeInOut } from 'framer-motion';
import { useState, useEffect } from 'react';

// Type for School
type School = {
  id: number;
  name: string;
  address: string;
  students: number;
  teachers: number;
  classes: number;
  established: number;
  headmaster: string;
  description: string;
  image: string;
  facilities: string[];
  achievements: string[];
  programs: string[];
  contact: {
    phone: string;
    email: string;
  };
  stats: {
    digitalLiteracy: number;
    academicScore: number;
    participation: number;
  };
  specialization: string;
};

const Schools = () => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  useEffect(() => {
    document.title = 'Sekolah Mitra - SinarIlmu';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeInOut
      }
    }
  };

  const schools: School[] = [
    {
      id: 1,
      name: "SDN 1 Pliken",
      address: "Jl. Pendidikan No. 1, Desa Pliken",
      students: 245,
      teachers: 12,
      classes: 6,
      established: 1965,
      headmaster: "Ibu Siti Aminah, S.Pd",
      description: "Sekolah dasar negeri tertua di Desa Pliken yang telah melahirkan banyak lulusan berprestasi. Memiliki fasilitas lengkap dan tenaga pengajar berpengalaman dengan fokus pada pengembangan karakter dan akademik yang seimbang.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&crop=center",
      facilities: ["Perpustakaan", "Lab Komputer", "Ruang Multimedia", "Lapangan Olahraga", "Kantin Sekolah", "UKS"],
      achievements: [
        "Juara 1 Lomba Cerdas Cermat Tingkat Kecamatan 2024",
        "Sekolah Adiwiyata Tingkat Kabupaten 2023",
        "Juara 2 Festival Seni Budaya SD 2024"
      ],
      programs: ["Literasi Digital", "Kelas Tambahan", "Ekstrakurikuler Pramuka", "Bimbingan Belajar"],
      contact: {
        phone: "(0281) 123-4567",
        email: "sdn1pliken@gmail.com"
      },
      stats: {
        digitalLiteracy: 85,
        academicScore: 82,
        participation: 92
      },
      specialization: "Pendidikan Karakter & Tradisional"
    },
    {
      id: 2,
      name: "SDN 2 Pliken", 
      address: "Jl. Kartini No. 15, Desa Pliken",
      students: 198,
      teachers: 10,
      classes: 6,
      established: 1972,
      headmaster: "Bapak Ahmad Sutrisno, S.Pd",
      description: "Sekolah yang mengutamakan pendidikan karakter dan teknologi. Aktif dalam pengembangan kurikulum digital dan pembelajaran inovatif dengan pendekatan modern dan ramah teknologi.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop&crop=center",
      facilities: ["Ruang Kelas Digital", "Perpustakaan Digital", "Lab IPA", "Ruang Seni", "Taman Baca", "Musholla"],
      achievements: [
        "Sekolah Digital Terbaik Tingkat Kecamatan 2024",
        "Juara 1 Lomba Robotika SD 2023",
        "Prestasi Terbaik Implementasi Kurikulum Merdeka 2024"
      ],
      programs: ["Coding untuk Anak", "English Club", "Klub Sains", "Kelas Musik"],
      contact: {
        phone: "(0281) 234-5678", 
        email: "sdn2pliken@gmail.com"
      },
      stats: {
        digitalLiteracy: 90,
        academicScore: 85,
        participation: 88
      },
      specialization: "Teknologi & Digital Learning"
    },
    {
      id: 3,
      name: "SDN 3 Pliken",
      address: "Jl. Diponegoro No. 22, Desa Pliken", 
      students: 167,
      teachers: 9,
      classes: 6,
      established: 1980,
      headmaster: "Ibu Dewi Sartika, S.Pd, M.Pd",
      description: "Sekolah yang fokus pada pengembangan kreativitas dan bakat siswa. Memiliki program unggulan di bidang seni dan olahraga dengan fasilitas yang mendukung ekspresi kreatif siswa.",
      image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=600&h=400&fit=crop&crop=center",
      facilities: ["Studio Seni", "Lapangan Basket", "Ruang Musik", "Perpustakaan", "Lab Bahasa", "Taman Sekolah"],
      achievements: [
        "Juara 1 Lomba Menyanyi Anak Tingkat Provinsi 2024",
        "Prestasi Terbaik Sekolah Seni Tingkat Kabupaten 2023", 
        "Juara 2 Lomba Basket Mini Tingkat Kecamatan 2024"
      ],
      programs: ["Sanggar Seni", "Tim Basket", "Paduan Suara", "Tari Tradisional"],
      contact: {
        phone: "(0281) 345-6789",
        email: "sdn3pliken@gmail.com"
      },
      stats: {
        digitalLiteracy: 78,
        academicScore: 80,
        participation: 95
      },
      specialization: "Seni & Kreativitas"
    },
    {
      id: 4,
      name: "SDN 4 Pliken",
      address: "Jl. Sudirman No. 8, Desa Pliken",
      students: 134,
      teachers: 8, 
      classes: 6,
      established: 1985,
      headmaster: "Bapak Hendra Wijaya, S.Pd",
      description: "Sekolah termuda namun paling inovatif dalam penerapan teknologi pembelajaran. Menjadi pilot project untuk implementasi platform digital dengan pendekatan pembelajaran abad 21.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop&crop=center",
      facilities: ["Smart Classroom", "Wi-Fi Area", "Digital Library", "Computer Lab", "Science Corner", "Green House"],
      achievements: [
        "Pilot Project Sekolah Digital Sukses 2024",
        "Juara 1 Inovasi Pembelajaran Digital 2023",
        "Sekolah Ramah Teknologi Terbaik 2024"
      ],
      programs: ["Digital Learning", "Green School", "STEM Education", "Tech Club"],
      contact: {
        phone: "(0281) 456-7890",
        email: "sdn4pliken@gmail.com"
      },
      stats: {
        digitalLiteracy: 95,
        academicScore: 87,
        participation: 90
      },
      specialization: "Inovasi & STEM"
    }
  ];

  const overallStats = {
    totalStudents: schools.reduce((sum, school) => sum + school.students, 0),
    totalTeachers: schools.reduce((sum, school) => sum + school.teachers, 0),
    avgDigitalLiteracy: Math.round(schools.reduce((sum, school) => sum + school.stats.digitalLiteracy, 0) / schools.length),
    avgAcademicScore: Math.round(schools.reduce((sum, school) => sum + school.stats.academicScore, 0) / schools.length)
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&h=1080&fit=crop&crop=center" 
            alt="School building"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <img 
                  src="/public/assets/icons/logo.png" 
                  alt="SinarIlmu Logo" 
                  className="w-12 h-12 object-contain"
                />
                <span className="text-white font-bold text-2xl hidden">SI</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold font-heading text-gray-900 dark:text-white mb-6"
            >
              Sekolah <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Mitra</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-4xl mx-auto mb-8"
            >
              Empat Sekolah Dasar Negeri di Desa Pliken yang menjadi mitra strategis dalam pengembangan pendidikan digital berkualitas dan berkelanjutan.
            </motion.p>

            {/* Overall Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-primary-600 dark:text-primary-400 mb-2">
                  {overallStats.totalStudents}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body text-sm">Total Siswa</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-secondary-600 dark:text-secondary-400 mb-2">
                  {overallStats.totalTeachers}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body text-sm">Total Guru</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-green-600 dark:text-green-400 mb-2">
                  {overallStats.avgDigitalLiteracy}%
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body text-sm">Literasi Digital</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-purple-600 dark:text-purple-400 mb-2">
                  {overallStats.avgAcademicScore}%
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body text-sm">Nilai Akademik</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Schools Grid Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-6">
              Profil <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Sekolah</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-3xl mx-auto">
              Kenali lebih dekat sekolah-sekolah mitra yang berkomitmen dalam transformasi pendidikan digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {schools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                {/* School Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={school.image} 
                    alt={school.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                      {school.specialization}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 text-gray-700 text-xs font-semibold rounded-full">
                      Est. {school.established}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  {/* School Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-2">
                      {school.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 font-body text-sm mb-3">
                      {school.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 font-body leading-relaxed text-sm">
                      {school.description}
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                      <div className="text-lg font-bold font-heading text-primary-600 dark:text-primary-400">
                        {school.students}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-body">Siswa</div>
                    </div>
                    <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                      <div className="text-lg font-bold font-heading text-secondary-600 dark:text-secondary-400">
                        {school.teachers}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-body">Guru</div>
                    </div>
                    <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                      <div className="text-lg font-bold font-heading text-green-600 dark:text-green-400">
                        {school.classes}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-body">Kelas</div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Literasi Digital</span>
                        <span className="text-primary-600 dark:text-primary-400 font-semibold">{school.stats.digitalLiteracy}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${school.stats.digitalLiteracy}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Nilai Akademik</span>
                        <span className="text-secondary-600 dark:text-secondary-400 font-semibold">{school.stats.academicScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${school.stats.academicScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Headmaster */}
                  <div className="bg-gradient-to-r from-gray-50 to-primary-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 mb-6">
                    <h4 className="text-sm font-semibold font-heading text-gray-900 dark:text-white mb-1">
                      Kepala Sekolah
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-body">
                      {school.headmaster}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => setSelectedSchool(school)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold font-heading rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Lihat Detail Lengkap
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-6">
              Manfaat <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Kemitraan</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-3xl mx-auto">
              Kolaborasi strategis yang memberikan dampak positif bagi seluruh ekosistem pendidikan
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Akses Teknologi",
                description: "Platform pembelajaran digital gratis untuk semua siswa dan guru dengan fitur lengkap dan mudah digunakan",
                color: "from-blue-500 to-blue-600",
                image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=300&fit=crop&crop=center"
              },
              {
                title: "Pelatihan Guru",
                description: "Workshop dan training rutin untuk mengoptimalkan penggunaan platform dan meningkatkan kompetensi digital",
                color: "from-green-500 to-green-600",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center"
              },
              {
                title: "Monitoring Progress",
                description: "Dashboard analytics untuk memantau perkembangan belajar siswa dan efektivitas pembelajaran secara real-time",
                color: "from-purple-500 to-purple-600",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
              },
              {
                title: "Dukungan Teknis",
                description: "Support berkelanjutan dan maintenance platform secara berkala untuk memastikan kelancaran pembelajaran",
                color: "from-orange-500 to-orange-600",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop&crop=center" 
            alt="Partnership handshake"
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
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
              Tertarik Menjadi Mitra?
            </h2>
            <p className="text-xl text-white/90 font-body max-w-3xl mx-auto mb-8">
              Bergabunglah dengan program kemitraan SinarIlmu dan wujudkan transformasi digital di sekolah Anda
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-primary-600 font-semibold font-heading px-8 py-4 rounded-2xl text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
              Daftar Menjadi Mitra
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* School Detail Modal */}
      {selectedSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
                  {selectedSchool.name}
                </h2>
                <p className="text-primary-600 dark:text-primary-400 font-semibold">
                  {selectedSchool.specialization}
                </p>
              </div>
              <button
                onClick={() => setSelectedSchool(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white mb-4">
                  Fasilitas Unggulan
                </h3>
                <div className="grid grid-cols-1 gap-2 mb-6">
                  {selectedSchool.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                      {facility}
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white mb-4">
                  Program Unggulan
                </h3>
                <div className="space-y-2 mb-6">
                  {selectedSchool.programs.map((program, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                      {program}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white mb-4">
                  Prestasi Terbaru
                </h3>
                <div className="space-y-3 mb-6">
                  {selectedSchool.achievements.map((achievement, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border-l-4 border-yellow-400">
                      <div className="flex items-start">
                        <span className="text-yellow-500 mr-3 text-lg">🏆</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{achievement}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white mb-4">
                  Informasi Kontak
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="mr-3 text-blue-500">📞</span>
                    <span>{selectedSchool.contact.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="mr-3 text-red-500">📧</span>
                    <span>{selectedSchool.contact.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="mr-3 text-green-500">📍</span>
                    <span>{selectedSchool.address}</span>
                  </div>
                </div>

                {/* Statistics Chart */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-4">
                  <h4 className="text-sm font-semibold font-heading text-gray-900 dark:text-white mb-3">
                    Statistik Performa
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Literasi Digital</span>
                        <span className="text-primary-600 dark:text-primary-400 font-semibold">{selectedSchool.stats.digitalLiteracy}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                          style={{ width: `${selectedSchool.stats.digitalLiteracy}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Nilai Akademik</span>
                        <span className="text-secondary-600 dark:text-secondary-400 font-semibold">{selectedSchool.stats.academicScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full"
                          style={{ width: `${selectedSchool.stats.academicScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Partisipasi</span>
                        <span className="text-green-600 dark:text-green-400 font-semibold">{selectedSchool.stats.participation}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                          style={{ width: `${selectedSchool.stats.participation}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setSelectedSchool(null)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Tutup Detail
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Schools;