import { motion, easeInOut } from 'framer-motion'; // Tambahkan import easeInOut
import { useState, useEffect } from 'react';

const Learn = () => {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  useEffect(() => {
    document.title = 'Belajar - SinarIlmu';
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

  // Perbaikan: gunakan easeInOut dari framer-motion, bukan string
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

  const grades = [
    { id: 'all', name: 'Semua Kelas' },
    { id: 'grade1', name: 'Kelas 1' },
    { id: 'grade2', name: 'Kelas 2' },
    { id: 'grade3', name: 'Kelas 3' },
    { id: 'grade4', name: 'Kelas 4' },
    { id: 'grade5', name: 'Kelas 5' },
    { id: 'grade6', name: 'Kelas 6' }
  ];

  const subjects = [
    { 
      id: 'all', 
      name: 'Semua Mata Pelajaran', 
      color: 'bg-gray-100 dark:bg-gray-800',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center'
    },
    { 
      id: 'math', 
      name: 'Matematika', 
      color: 'bg-blue-100 dark:bg-blue-900/30',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&crop=center'
    },
    { 
      id: 'indonesian', 
      name: 'Bahasa Indonesia', 
      color: 'bg-green-100 dark:bg-green-900/30',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center'
    },
    { 
      id: 'science', 
      name: 'IPA', 
      color: 'bg-purple-100 dark:bg-purple-900/30',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop&crop=center'
    },
    { 
      id: 'social', 
      name: 'IPS', 
      color: 'bg-orange-100 dark:bg-orange-900/30',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center'
    },
    { 
      id: 'digital', 
      name: 'Literasi Digital', 
      color: 'bg-indigo-100 dark:bg-indigo-900/30',
      image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=300&fit=crop&crop=center'
    }
  ];

  const learningMethods = [
    {
      title: "Kuis Interaktif",
      description: "Uji pemahaman dengan kuis yang menyenangkan dan berhadiah poin untuk memotivasi belajar",
      color: "from-blue-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop&crop=center",
      features: ["Multiple Choice", "True/False", "Drag & Drop", "Leaderboard"]
    },
    {
      title: "Game Edukatif", 
      description: "Belajar sambil bermain dengan game yang mendidik dan mengasah kemampuan kognitif",
      color: "from-green-500 to-green-600",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop&crop=center",
      features: ["Puzzle Game", "Memory Game", "Word Game", "Math Challenge"]
    },
    {
      title: "Video Pembelajaran",
      description: "Materi pembelajaran dalam bentuk video animasi menarik dengan narasi yang jelas",
      color: "from-purple-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1588702547954-4800ead296ef?w=400&h=300&fit=crop&crop=center",
      features: ["Animasi 2D", "Narasi Jelas", "Subtitle", "Playback Speed"]
    },
    {
      title: "Forum Diskusi",
      description: "Berbagi dan diskusi materi pembelajaran dengan teman dalam environment yang aman",
      color: "from-pink-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center",
      features: ["Post Pembelajaran", "Comment & Like", "Share Progress", "Study Groups"]
    }
  ];

  const sampleCourses = [
    {
      title: "Perkalian Dasar",
      subject: "Matematika",
      grade: "Kelas 3",
      progress: 75,
      duration: "30 menit",
      difficulty: "Mudah",
      students: 45,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop&crop=center",
      description: "Pelajari dasar-dasar perkalian dengan metode yang mudah dipahami"
    },
    {
      title: "Menulis Cerita Pendek",
      subject: "Bahasa Indonesia", 
      grade: "Kelas 4",
      progress: 60,
      duration: "45 menit",
      difficulty: "Sedang",
      students: 38,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop&crop=center",
      description: "Belajar menulis cerita pendek yang menarik dan berkesan"
    },
    {
      title: "Sistem Tata Surya",
      subject: "IPA",
      grade: "Kelas 5",
      progress: 30,
      duration: "40 menit", 
      difficulty: "Sedang",
      students: 52,
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop&crop=center",
      description: "Jelajahi keajaiban tata surya dan planet-planet di dalamnya"
    },
    {
      title: "Keragaman Budaya Indonesia",
      subject: "IPS",
      grade: "Kelas 6",
      progress: 90,
      duration: "35 menit",
      difficulty: "Mudah",
      students: 41,
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=250&fit=crop&crop=center",
      description: "Mengenal kekayaan budaya Indonesia dari Sabang sampai Merauke"
    },
    {
      title: "Penggunaan Internet Aman",
      subject: "Literasi Digital",
      grade: "Kelas 5",
      progress: 20,
      duration: "25 menit",
      difficulty: "Mudah", 
      students: 29,
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=250&fit=crop&crop=center",
      description: "Belajar cara menggunakan internet dengan aman dan bijak"
    },
    {
      title: "Pecahan dan Desimal",
      subject: "Matematika",
      grade: "Kelas 4",
      progress: 85,
      duration: "50 menit",
      difficulty: "Sulit",
      students: 33,
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop&crop=center",
      description: "Memahami konsep pecahan dan desimal dengan cara yang mudah"
    }
  ];

  const filteredCourses = sampleCourses.filter(course => {
    const gradeMatch = selectedGrade === 'all' || course.grade.includes(selectedGrade.replace('grade', ''));
    const subjectMatch = selectedSubject === 'all' || 
      (selectedSubject === 'math' && course.subject === 'Matematika') ||
      (selectedSubject === 'indonesian' && course.subject === 'Bahasa Indonesia') ||
      (selectedSubject === 'science' && course.subject === 'IPA') ||
      (selectedSubject === 'social' && course.subject === 'IPS') ||
      (selectedSubject === 'digital' && course.subject === 'Literasi Digital');
    return gradeMatch && subjectMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Mudah': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Sedang': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Sulit': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop&crop=center" 
            alt="Students learning"
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
                  src="/assets/icons/logo.png" 
                  alt="SinarIlmu Logo" 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const sibling = target.nextElementSibling as HTMLElement | null;
                    if (sibling) sibling.style.display = 'block';
                  }}
                />
                <span className="text-white font-bold text-2xl hidden">SI</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold font-heading text-gray-900 dark:text-white mb-6"
            >
              Platform <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Pembelajaran</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-4xl mx-auto mb-8"
            >
              Jelajahi berbagai materi pembelajaran interaktif yang dirancang khusus untuk siswa SD dengan metode yang menyenangkan dan mudah dipahami.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold font-heading text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Mulai Belajar Sekarang
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400 font-semibold font-heading rounded-2xl text-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
              >
                Lihat Progress
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Learning Methods Section */}
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
              Metode <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Pembelajaran</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-3xl mx-auto">
              Berbagai cara belajar yang menyenangkan dan interaktif untuk meningkatkan pemahaman siswa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={method.image} 
                    alt={method.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-body mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  <div className="space-y-2">
                    {method.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Browser Section */}
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
              Jelajahi <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Materi</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-3xl mx-auto">
              Pilih kelas dan mata pelajaran sesuai kebutuhan belajarmu
            </p>
          </motion.div>

          {/* Filter Section */}
          <div className="mb-12">
            {/* Grade Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold font-heading text-gray-900 dark:text-white mb-4">
                Pilih Kelas:
              </h3>
              <div className="flex flex-wrap gap-3">
                {grades.map((grade) => (
                  <button
                    key={grade.id}
                    onClick={() => setSelectedGrade(grade.id)}
                    className={`px-6 py-3 rounded-full text-sm font-medium font-heading transition-all duration-200 ${
                      selectedGrade === grade.id
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {grade.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold font-heading text-gray-900 dark:text-white mb-4">
                Pilih Mata Pelajaran:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`p-4 rounded-xl text-center transition-all duration-200 relative overflow-hidden group ${
                      selectedSubject === subject.id
                        ? 'ring-2 ring-primary-500 transform scale-105'
                        : 'hover:scale-105 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {subject.id !== 'all' && (
                      <div className="h-24 mb-3 rounded-lg overflow-hidden">
                        <img 
                          src={subject.image} 
                          alt={subject.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className={`${subject.id === 'all' ? 'py-8' : ''}`}>
                      <div className={`text-sm font-medium font-heading ${
                        selectedSubject === subject.id 
                          ? 'text-primary-600 dark:text-primary-400' 
                          : 'text-gray-700 dark:text-gray-200'
                      }`}>
                        {subject.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{course.subject}</span>
                      <span>{course.grade}</span>
                    </div>
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{course.students} siswa terdaftar</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Progress</span>
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold font-heading rounded-xl hover:shadow-lg transition-all duration-300">
                    {course.progress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-gray-400">🔍</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-2">
                Tidak ada materi ditemukan
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-body">
                Coba ubah filter kelas atau mata pelajaran
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop&crop=center" 
            alt="Students celebrating"
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
              Siap Memulai Petualangan Belajar?
            </h2>
            <p className="text-xl text-white/90 font-body max-w-3xl mx-auto mb-8">
              Bergabunglah dengan ribuan siswa lainnya dan rasakan pengalaman belajar yang menyenangkan dengan SinarIlmu
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-primary-600 font-semibold font-heading px-8 py-4 rounded-2xl text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg"
              >
                Daftar Gratis Sekarang
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white font-semibold font-heading px-8 py-4 rounded-2xl text-lg hover:bg-white/10 transition-all duration-200"
              >
                Lihat Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Learn;