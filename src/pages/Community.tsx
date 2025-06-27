import { motion, easeInOut } from 'framer-motion'; // Tambahkan import easeInOut
import { useState, useEffect } from 'react';

// Tambahkan tipe untuk post
type ForumPost = {
  id: number;
  title: string;
  author: string;
  authorType: string;
  school: string;
  category: string;
  replies: number;
  likes: number;
  timeAgo: string;
  content: string;
  tags: string[];
  avatar: string;
  image: string;
};

const Community = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

  useEffect(() => {
    document.title = 'Komunitas - SinarIlmu';
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
        // Perbaikan: gunakan easeInOut dari framer-motion, bukan string
        ease: easeInOut
      }
    }
  };

  const communityStats = {
    totalMembers: 1247,
    activeToday: 89,
    totalPosts: 2456,
    questionsAnswered: 1823
  };

  const leaderboard = [
    {
      rank: 1,
      name: "Adi Pratama",
      school: "SDN 1 Pliken",
      points: 2450,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      badge: "🏆",
      specialty: "Matematika"
    },
    {
      rank: 2,
      name: "Sari Dewi",
      school: "SDN 2 Pliken", 
      points: 2280,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c81c?w=100&h=100&fit=crop&crop=face",
      badge: "🥈",
      specialty: "Bahasa Indonesia"
    },
    {
      rank: 3,
      name: "Budi Santoso",
      school: "SDN 3 Pliken",
      points: 2150,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      badge: "🥉",
      specialty: "IPA"
    },
    {
      rank: 4,
      name: "Maya Putri",
      school: "SDN 4 Pliken",
      points: 1980,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      badge: "⭐",
      specialty: "IPS"
    },
    {
      rank: 5,
      name: "Rizki Ahmad",
      school: "SDN 1 Pliken",
      points: 1850,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      badge: "⭐",
      specialty: "Digital"
    }
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Cara mudah mengingat tabel perkalian 1-10",
      author: "Guru Sarah",
      authorType: "teacher",
      school: "SDN 2 Pliken", 
      category: "Matematika",
      replies: 23,
      likes: 45,
      timeAgo: "2 jam lalu",
      content: "Halo semuanya! Hari ini saya mau berbagi tips mudah untuk mengingat tabel perkalian. Pertama, gunakan jari tangan untuk perkalian 9, kemudian coba metode visual dengan gambar untuk memudahkan pemahaman anak-anak.",
      tags: ["matematika", "tips", "belajar"],
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Eksperimen sains sederhana: Membuat gunung berapi mini",
      author: "Pak Andi",
      authorType: "teacher", 
      school: "SDN 3 Pliken",
      category: "IPA",
      replies: 18,
      likes: 62,
      timeAgo: "4 jam lalu",
      content: "Anak-anak pasti senang dengan eksperimen ini! Bahan yang dibutuhkan: baking soda, cuka, pewarna makanan, dan botol plastik. Sangat aman dan mudah dilakukan di rumah maupun sekolah.",
      tags: ["ipa", "eksperimen", "praktik"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Bagaimana cara menulis cerita yang menarik?",
      author: "Dina Maharani",
      authorType: "student",
      school: "SDN 1 Pliken",
      category: "Bahasa Indonesia", 
      replies: 15,
      likes: 38,
      timeAgo: "6 jam lalu",
      content: "Hai teman-teman! Aku sering kesulitan menulis cerita. Ada yang punya tips untuk membuat cerita yang menarik? Terutama untuk membuat karakter yang hidup dan alur yang tidak membosankan.",
      tags: ["menulis", "cerita", "bahasa"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c81c?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Mengenal budaya Jawa Tengah melalui permainan tradisional",
      author: "Bu Ratna",
      authorType: "teacher",
      school: "SDN 4 Pliken",
      category: "IPS",
      replies: 31,
      likes: 71,
      timeAgo: "1 hari lalu", 
      content: "Permainan tradisional bukan hanya menyenangkan, tapi juga mengajarkan nilai-nilai budaya. Mari kita bahas beberapa permainan seperti congklak, engklek, dan petak umpet yang sarat makna.",
      tags: ["budaya", "permainan", "tradisional"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=300&fit=crop&crop=center"
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: "Matematika Kelas 4",
      members: 24,
      description: "Group belajar khusus materi matematika kelas 4. Diskusi soal, sharing tips, dan saling membantu memahami konsep yang sulit.",
      nextMeeting: "Besok, 16:00",
      topic: "Pecahan dan Desimal",
      moderator: "Bu Siti",
      isActive: true,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "English Club SD",
      members: 18,
      description: "Belajar bahasa Inggris dengan fun! Games, lagu, dan conversation practice untuk meningkatkan kemampuan berbahasa Inggris.",
      nextMeeting: "Rabu, 15:30",
      topic: "Daily Activities Vocabulary",
      moderator: "Mr. John",
      isActive: true,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Sains Explorer",
      members: 31,
      description: "Jelajahi dunia sains dengan eksperimen sederhana dan diskusi menarik. Cocok untuk anak-anak yang suka bertanya 'mengapa' dan 'bagaimana'.",
      nextMeeting: "Jumat, 14:00", 
      topic: "Sistem Tata Surya",
      moderator: "Pak Andi",
      isActive: true,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Cerita & Dongeng",
      members: 15,
      description: "Berbagi cerita, dongeng, dan tips menulis kreatif untuk anak-anak. Mengembangkan imajinasi dan kemampuan bercerita.",
      nextMeeting: "Sabtu, 10:00",
      topic: "Menulis Cerita Fantasi",
      moderator: "Bu Maya",
      isActive: false,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&crop=center"
    }
  ];

  const achievements = [
    {
      title: "First Post",
      description: "Membuat postingan pertama di forum komunitas",
      rarity: "Bronze",
      count: 234,
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Helper",
      description: "Membantu menjawab 10 pertanyaan dari teman-teman",
      rarity: "Silver", 
      count: 89,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Quiz Master",
      description: "Menyelesaikan 50 kuis dengan skor sempurna",
      rarity: "Gold",
      count: 45,
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Community Leader",
      description: "Aktif di komunitas selama 6 bulan berturut-turut",
      rarity: "Platinum",
      count: 12,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const events = [
    {
      id: 1,
      title: "Lomba Matematika Antar SD",
      date: "15 Februari 2025",
      time: "09:00 - 12:00",
      type: "Kompetisi",
      participants: 156,
      description: "Kompetisi matematika untuk siswa kelas 4-6 se-Desa Pliken. Ajang untuk menguji kemampuan dan meraih prestasi.",
      prize: "Hadiah Tablet & Sertifikat",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Workshop Digital Storytelling",
      date: "22 Februari 2025", 
      time: "13:00 - 15:00",
      type: "Workshop",
      participants: 45,
      description: "Belajar membuat cerita digital dengan tools sederhana. Kombinasi teknologi dan kreativitas untuk bercerita.",
      prize: "Sertifikat Keikutsertaan",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Science Fair Virtual",
      date: "1 Maret 2025",
      time: "08:00 - 16:00",
      type: "Pameran",
      participants: 89,
      description: "Pameran karya sains siswa SD se-Kecamatan Kembaran. Ajang untuk menampilkan kreativitas dan inovasi.",
      prize: "Hadiah Uang Tunai",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop&crop=center"
    }
  ];

  // Tambahkan tipe parameter pada fungsi
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Matematika': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'Bahasa Indonesia': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'IPA': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'IPS': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'Bronze': return 'from-orange-400 to-orange-600';
      case 'Silver': return 'from-gray-300 to-gray-500';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&crop=center" 
            alt="Community collaboration"
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
              Komunitas <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Belajar</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-400 font-body max-w-4xl mx-auto mb-8"
            >
              Bergabunglah dengan komunitas pembelajaran yang supportif. Diskusi, berbagi, dan belajar bersama siswa dan guru dari seluruh Desa Pliken dalam lingkungan yang aman dan mendidik.
            </motion.p>

            {/* Community Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-primary-600 dark:text-primary-400 mb-2">
                  {communityStats.totalMembers}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body text-sm">Total Member</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-green-600 dark:text-green-400 mb-2">
                  {communityStats.activeToday}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body text-sm">Aktif Hari Ini</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-secondary-600 dark:text-secondary-400 mb-2">
                  {communityStats.totalPosts}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body text-sm">Total Post</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-purple-600 dark:text-purple-400 mb-2">
                  {communityStats.questionsAnswered}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body text-sm">Pertanyaan Terjawab</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'forum', name: 'Forum Diskusi' },
              { id: 'leaderboard', name: 'Leaderboard' },
              { id: 'groups', name: 'Study Groups' },
              { id: 'events', name: 'Events' },
              { id: 'achievements', name: 'Achievements' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium font-heading transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Based on Active Tab */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Forum Tab */}
          {activeTab === 'forum' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
                  Forum Diskusi
                </h2>
                <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold font-heading rounded-xl hover:shadow-lg transition-all duration-300">
                  Buat Post Baru
                </button>
              </div>

              <div className="space-y-6">
                {forumPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <img 
                                src={post.avatar} 
                                alt={post.author}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold font-heading text-gray-900 dark:text-white">
                                  {post.author}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                                  {post.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{post.school} • {post.timeAgo}</p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-3">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 font-body mb-4 line-clamp-3">
                          {post.content}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>{post.replies} balasan</span>
                            <span>{post.likes} suka</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {post.tags.map((tag: string, idx: number) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-8 text-center">
                Leaderboard Mingguan
              </h2>

              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                      user.rank <= 3 
                        ? 'border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{user.badge}</div>
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.school}</p>
                          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                            Spesialis: {user.specialty}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-heading text-secondary-600 dark:text-secondary-400">
                          {user.points}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">poin</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Study Groups Tab */}
          {activeTab === 'groups' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
                  Study Groups
                </h2>
                <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold font-heading rounded-xl hover:shadow-lg transition-all duration-300">
                  Buat Group Baru
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {studyGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={group.image} 
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <div className={`w-3 h-3 rounded-full ${group.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-3">
                        {group.name}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 font-body mb-4 text-sm">
                        {group.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium w-20">Member:</span>
                          <span>{group.members} orang</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium w-20">Meeting:</span>
                          <span>{group.nextMeeting}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium w-20">Topik:</span>
                          <span>{group.topic}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium w-20">Mentor:</span>
                          <span>{group.moderator}</span>
                        </div>
                      </div>

                      <button className={`w-full py-3 rounded-xl font-medium font-heading transition-all duration-200 ${
                        group.isActive 
                          ? 'bg-primary-500 text-white hover:bg-primary-600' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}>
                        {group.isActive ? 'Gabung Group' : 'Tidak Aktif'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-8 text-center">
                Event Mendatang
              </h2>

              <div className="space-y-6">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                                {event.title}
                              </h3>
                              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                                {event.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{event.date}</span>
                              <span>{event.time}</span>
                              <span>{event.participants} peserta</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 font-body mb-4">
                          {event.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-secondary-600 dark:text-secondary-400 font-medium">
                            Prize: {event.prize}
                          </div>
                          <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold font-heading rounded-xl hover:shadow-lg transition-all duration-300">
                            Daftar Sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-8 text-center">
                Achievements
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={achievement.image} 
                        alt={achievement.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg -mt-10 relative z-10`}>
                        <span className="text-white font-bold text-lg">
                          {achievement.rarity === 'Bronze' ? '🥉' : 
                           achievement.rarity === 'Silver' ? '🥈' : 
                           achievement.rarity === 'Gold' ? '🥇' : '👑'}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white mb-2">
                        {achievement.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-body mb-4">
                        {achievement.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          achievement.rarity === 'Bronze'
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                            : achievement.rarity === 'Silver'
                            ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-300'
                            : achievement.rarity === 'Gold'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                            : achievement.rarity === 'Platinum'
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-300'
                        }`}>
                          {achievement.rarity}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {achievement.count} siswa
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop&crop=center" 
            alt="Community celebration"
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
              Bergabung dengan Komunitas
            </h2>
            <p className="text-xl text-white/90 font-body max-w-3xl mx-auto mb-8">
              Jadilah bagian dari komunitas pembelajaran yang supportif dan inspiring. Mari belajar, berbagi, dan berkembang bersama!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-primary-600 font-semibold font-heading px-8 py-4 rounded-2xl text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg"
              >
                Daftar Sekarang
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white font-semibold font-heading px-8 py-4 rounded-2xl text-lg hover:bg-white/10 transition-all duration-200"
              >
                Jelajahi Forum
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={selectedPost.avatar} 
                    alt={selectedPost.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold font-heading text-gray-900 dark:text-white">
                    {selectedPost.author}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedPost.school} • {selectedPost.timeAgo}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                {selectedPost.title}
              </h2>
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedPost.category)}`}>
                  {selectedPost.category}
                </span>
                {selectedPost.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                {selectedPost.content}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{selectedPost.replies} balasan</span>
                <span>{selectedPost.likes} suka</span>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                  Balas
                </button>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300">
                  Suka
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Community;