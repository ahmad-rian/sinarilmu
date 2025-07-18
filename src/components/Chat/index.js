// src/components/Chat/index.js
// Enhanced export dengan semua utilities

export { default } from './GarudaChat';
export { default as GarudaChat } from './GarudaChat';
export { default as ChatUtils } from './ChatUtils';

// Export individual functions untuk fleksibilitas
export {
  getRuleBasedResponse,
  preprocessMessage,
  postprocessResponse,
  quickResponses,
  chatConfig,
  saveChatHistory,
  loadChatHistory,
  trackChatInteraction,
  trackLearningProgress,
  getLearningRecommendations,
  getRandomResponse
} from './ChatUtils';

// Export constants
export const CHAT_SUBJECTS = {
  MATEMATIKA: 'matematika',
  IPA: 'ipa',
  IPS: 'ips',
  PLATFORM: 'platform',
  UMUM: 'umum'
};

export const CHAT_CATEGORIES = {
  GREETING: 'greeting',
  ACADEMIC: 'academic',
  HELP: 'help',
  CONVERSATIONAL: 'conversational',
  ERROR: 'error'
};

// Enhanced chat configuration
export const ENHANCED_CHAT_CONFIG = {
  ...chatConfig,
  version: '2.0',
  features: {
    learningTracking: true,
    adaptiveResponses: true,
    subjectDetection: true,
    progressAnalytics: true,
    quickResponses: true,
    multiLanguage: false, // Future feature
    voiceInput: false, // Future feature
    fileUpload: false // Future feature
  },
  subjects: {
    matematika: {
      icon: '🔢',
      color: 'blue',
      topics: ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'pecahan', 'geometri']
    },
    ipa: {
      icon: '🔬',
      color: 'green',
      topics: ['tumbuhan', 'hewan', 'tubuh_manusia', 'benda_materi', 'energi', 'cuaca']
    },
    ips: {
      icon: '🌏',
      color: 'orange',
      topics: ['indonesia', 'pulau', 'budaya', 'sejarah', 'ekonomi', 'geografi']
    },
    platform: {
      icon: '💻',
      color: 'purple',
      topics: ['fitur', 'sekolah', 'komunitas', 'gamifikasi']
    },
    umum: {
      icon: '💬',
      color: 'gray',
      topics: ['pengetahuan_umum', 'fakta_menarik', 'teknologi', 'olahraga']
    }
  },
  responseTypes: {
    educational: {
      priority: 'high',
      trackProgress: true,
      enableFollowUp: true
    },
    conversational: {
      priority: 'medium',
      trackProgress: false,
      enableFollowUp: false
    },
    platform: {
      priority: 'high',
      trackProgress: false,
      enableFollowUp: true
    }
  }
};

// Utility functions untuk chat enhancement
export const chatUtils = {
  // Detect learning level based on conversation
  detectLearningLevel: (messages) => {
    const academicMessages = messages.filter(msg => 
      msg.subject && ['matematika', 'ipa', 'ips'].includes(msg.subject)
    );
    
    if (academicMessages.length < 3) return 'beginner';
    if (academicMessages.length < 10) return 'intermediate';
    return 'advanced';
  },

  // Generate learning path suggestions
  generateLearningPath: (currentSubject, userLevel = 'beginner') => {
    const paths = {
      matematika: {
        beginner: ['penjumlahan', 'pengurangan', 'perkalian dasar'],
        intermediate: ['perkalian lanjut', 'pembagian', 'pecahan sederhana'],
        advanced: ['pecahan kompleks', 'geometri', 'soal cerita']
      },
      ipa: {
        beginner: ['tumbuhan dasar', 'hewan sekitar', 'tubuh manusia'],
        intermediate: ['fotosintesis', 'rantai makanan', 'sistem tubuh'],
        advanced: ['ekosistem', 'siklus air', 'energi']
      },
      ips: {
        beginner: ['indonesia', 'pulau-pulau', 'budaya lokal'],
        intermediate: ['sejarah kemerdekaan', 'ekonomi sederhana', 'geografi'],
        advanced: ['pemerintahan', 'ekonomi kompleks', 'hubungan internasional']
      }
    };
    
    return paths[currentSubject]?.[userLevel] || ['pengetahuan dasar'];
  },

  // Calculate learning statistics
  calculateLearningStats: (messages) => {
    const stats = {
      totalMessages: messages.length,
      subjectDistribution: {},
      averageSessionLength: 0,
      learningStreak: 0,
      topicsCovered: new Set(),
      difficultyCoverage: { easy: 0, medium: 0, hard: 0 }
    };

    messages.forEach(message => {
      if (message.subject) {
        stats.subjectDistribution[message.subject] = 
          (stats.subjectDistribution[message.subject] || 0) + 1;
        stats.topicsCovered.add(message.subject);
      }
    });

    stats.topicsCovered = Array.from(stats.topicsCovered);
    return stats;
  },

  // Format time for display
  formatSessionTime: (minutes) => {
    if (minutes < 1) return 'Kurang dari 1 menit';
    if (minutes < 60) return `${minutes} menit`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} jam ${remainingMinutes} menit`;
  },

  // Get achievement badges
  getAchievementBadges: (stats) => {
    const badges = [];
    
    if (stats.totalMessages >= 10) badges.push({
      name: 'Pemula Aktif',
      icon: '🌟',
      description: 'Sudah bertanya 10 kali!'
    });
    
    if (stats.totalMessages >= 50) badges.push({
      name: 'Pembelajar Rajin',
      icon: '📚',
      description: 'Sudah bertanya 50 kali!'
    });
    
    if (stats.subjectDistribution.matematika >= 5) badges.push({
      name: 'Math Explorer',
      icon: '🔢',
      description: 'Expert dalam matematika!'
    });
    
    if (stats.subjectDistribution.ipa >= 5) badges.push({
      name: 'Science Enthusiast',
      icon: '🔬',
      description: 'Pecinta sains sejati!'
    });
    
    if (stats.subjectDistribution.ips >= 5) badges.push({
      name: 'Social Studies Master',
      icon: '🌏',
      description: 'Ahli ilmu sosial!'
    });
    
    if (stats.topicsCovered.length >= 3) badges.push({
      name: 'Multi-Subject Learner',
      icon: '🎯',
      description: 'Belajar berbagai mata pelajaran!'
    });
    
    return badges;
  },

  // Generate personalized encouragement
  generateEncouragement: (subject, difficulty = 'medium') => {
    const encouragements = {
      matematika: {
        easy: "Matematika itu mudah kalau sudah paham polanya! 🔢 Kamu pasti bisa!",
        medium: "Matematika membutuhkan latihan, tapi hasilnya sangat memuaskan! 💪 Terus semangat!",
        hard: "Matematika tingkat lanjut memang challenging, tapi kamu sudah menunjukkan kemampuan yang luar biasa! 🌟"
      },
      ipa: {
        easy: "IPA mengajarkan kita tentang dunia yang menakjubkan! 🌱 Terus explore ya!",
        medium: "Sains itu seru karena selalu ada hal baru untuk dipelajari! 🔬 Keep going!",
        hard: "Pemahaman sains yang mendalam akan membuka wawasan dunia! 🌍 Excellent progress!"
      },
      ips: {
        easy: "IPS membantu kita memahami masyarakat dan budaya! 🏛️ Sangat menarik!",
        medium: "Pengetahuan sosial yang baik membuat kita jadi warga negara yang lebih baik! 🇮🇩",
        hard: "Analisis sosial yang mendalam menunjukkan pemikiran kritis yang hebat! 🎓"
      }
    };
    
    return encouragements[subject]?.[difficulty] || "Terus semangat belajar! Kamu doing great! 🌟";
  },

  // Smart topic suggestion based on conversation history
  suggestNextTopic: (messages, currentSubject) => {
    const recentTopics = messages
      .filter(msg => msg.subject === currentSubject)
      .slice(-5)
      .map(msg => msg.text.toLowerCase());
    
    const suggestions = {
      matematika: {
        afterPenjumlahan: "Sekarang coba belajar pengurangan! Ini kebalikan dari penjumlahan.",
        afterPengurangan: "Sudah mahir penjumlahan dan pengurangan? Yuk lanjut ke perkalian!",
        afterPerkalian: "Perkalian sudah oke? Saatnya challenge pembagian!",
        afterPembagian: "Matematika dasar sudah kuat! Mau coba pecahan?",
        afterPecahan: "Pecahan sudah paham? Geometri sangat menarik untuk dipelajari!"
      },
      ipa: {
        afterTumbuhan: "Setelah tumbuhan, mau belajar tentang hewan? Sama-sama makhluk hidup!",
        afterHewan: "Tumbuhan dan hewan sudah, sekarang giliran tubuh manusia!",
        afterTubuhManusia: "Makhluk hidup sudah lengkap! Yuk pelajari benda-benda di sekitar kita!",
        afterBenda: "Benda dan materi sudah paham? Energi topik yang seru nih!",
        afterEnergi: "Energi sudah oke? Cuaca dan iklim juga menarik loh!"
      },
      ips: {
        afterIndonesia: "Indonesia sudah kenal baik? Mau explore pulau-pulau khusus?",
        afterPulau: "Pulau-pulau sudah familiar? Budaya Indonesia sangat beragam!",
        afterBudaya: "Budaya menarik kan? Sejarah Indonesia juga penuh perjuangan heroik!",
        afterSejarah: "Sejarah sudah, ekonomi juga penting untuk dipahami!",
        afterEkonomi: "Ekonomi sudah paham? Geografi Indonesia sangat unik!"
      }
    };
    
    // Simple topic progression logic
    const topicProgression = suggestions[currentSubject];
    if (!topicProgression) return "Mau lanjut belajar topik apa lagi?";
    
    // Check recent topics and suggest next
    if (recentTopics.some(topic => topic.includes('jumlah'))) {
      return topicProgression.afterPenjumlahan;
    }
    if (recentTopics.some(topic => topic.includes('kurang'))) {
      return topicProgression.afterPengurangan;
    }
    // Add more conditions as needed
    
    return "Mau explore topik baru yang menarik?";
  }
};

// Advanced chat analytics
export const chatAnalytics = {
  // Track learning progress over time
  trackProgressOverTime: (timeframe = 'week') => {
    const analytics = JSON.parse(localStorage.getItem('chat_analytics') || '{}');
    const now = new Date();
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      
      const dayData = analytics[dateString] || { messageCount: 0, subjectQueries: {} };
      data.push({
        date: date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }),
        messages: dayData.messageCount,
        subjects: dayData.subjectQueries
      });
    }
    
    return data;
  },

  // Get peak learning hours
  getPeakLearningHours: () => {
    const analytics = JSON.parse(localStorage.getItem('chat_analytics') || '{}');
    const hourCounts = new Array(24).fill(0);
    
    Object.values(analytics).forEach(dayData => {
      if (dayData.interactions) {
        dayData.interactions.forEach(interaction => {
          if (interaction.hour !== undefined) {
            hourCounts[interaction.hour]++;
          }
        });
      }
    });
    
    return hourCounts.map((count, hour) => ({
      hour: `${hour}:00`,
      count,
      label: hour < 12 ? 'AM' : 'PM'
    }));
  },

  // Generate learning insights
  generateLearningInsights: () => {
    const stats = JSON.parse(localStorage.getItem('learning_stats') || '{}');
    const analytics = JSON.parse(localStorage.getItem('chat_analytics') || '{}');
    
    const insights = [];
    
    // Most active subject
    const subjects = stats.subjects || {};
    const mostActive = Object.entries(subjects)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (mostActive) {
      insights.push({
        type: 'strength',
        title: `Kuat di ${mostActive[0]}`,
        description: `Kamu sudah ${mostActive[1]} kali bertanya tentang ${mostActive[0]}! 💪`,
        icon: '🎯'
      });
    }
    
    // Learning consistency
    const recentDays = Object.keys(analytics).slice(-7);
    const activeDays = recentDays.filter(day => analytics[day].messageCount > 0);
    
    if (activeDays.length >= 3) {
      insights.push({
        type: 'consistency',
        title: 'Konsisten Belajar',
        description: `Kamu aktif belajar ${activeDays.length} hari dalam seminggu terakhir! 📅`,
        icon: '🔥'
      });
    }
    
    // Learning variety
    const subjectCount = Object.keys(subjects).length;
    if (subjectCount >= 3) {
      insights.push({
        type: 'variety',
        title: 'Pembelajar Serbaguna',
        description: `Kamu belajar ${subjectCount} mata pelajaran berbeda! 🌟`,
        icon: '🎨'
      });
    }
    
    return insights;
  }
};

