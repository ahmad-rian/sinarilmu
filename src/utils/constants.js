// src/utils/constants.js
// Konstanta untuk aplikasi SinarIlmu - Browser Compatible Version

// Informasi Aplikasi
export const APP_INFO = {
  name: 'SinarIlmu',
  version: '1.0.0',
  description: 'Platform pembelajaran digital untuk Desa Pliken',
  author: 'SinarIlmu Team',
  contact: {
    email: 'info@sinarilmu.com',
    phone: '+62-xxx-xxxx-xxxx'
  }
};

// Data Desa Pliken
export const DESA_PLIKEN = {
  nama: 'Desa Pliken',
  populasi: 9485,
  lokasi: 'Kecamatan Kembaran, Kabupaten Banyumas, Jawa Tengah',
  koordinat: {
    lat: -7.3297,
    lng: 109.2381
  }
};

// Data Sekolah Mitra
export const SEKOLAH_MITRA = [
  {
    id: 1,
    nama: 'SDN 1 Pliken',
    siswa: 245,
    program: 12,
    alamat: 'Jl. Raya Pliken No. 1',
    kepalaSekolah: 'Drs. Suharto, M.Pd',
    status: 'aktif'
  },
  {
    id: 2,
    nama: 'SDN 2 Pliken',
    siswa: 198,
    program: 10,
    alamat: 'Jl. Pendidikan No. 15',
    kepalaSekolah: 'Siti Aminah, S.Pd',
    status: 'aktif'
  },
  {
    id: 3,
    nama: 'SDN 3 Pliken',
    siswa: 167,
    program: 8,
    alamat: 'Jl. Merdeka No. 23',
    kepalaSekolah: 'Bambang Sutrisno, S.Pd',
    status: 'aktif'
  },
  {
    id: 4,
    nama: 'SDN 4 Pliken',
    siswa: 203,
    program: 11,
    alamat: 'Jl. Pancasila No. 7',
    kepalaSekolah: 'Retno Wulandari, M.Pd',
    status: 'aktif'
  }
];

// Statistik Platform
export const PLATFORM_STATS = {
  totalSiswa: 813,
  totalSekolah: 4,
  totalProgram: 41,
  durasi: '4 minggu',
  digitalPlatform: '100%'
};

// Fitur Utama
export const FITUR_UTAMA = [
  {
    id: 1,
    icon: '🎮',
    title: 'Gamifikasi Interaktif',
    description: 'Belajar sambil bermain dengan sistem poin, badge, dan leaderboard yang memotivasi siswa untuk terus belajar',
    kategori: 'engagement'
  },
  {
    id: 2,
    icon: '📱',
    title: 'Media Sosial Edukatif',
    description: 'Platform diskusi aman untuk siswa berbagi pengetahuan dan berkolaborasi dalam pembelajaran',
    kategori: 'social'
  },
  {
    id: 3,
    icon: '🧩',
    title: 'Kuis Adaptif',
    description: 'Evaluasi pembelajaran yang menyesuaikan tingkat kesulitan berdasarkan kemampuan dan progress siswa',
    kategori: 'assessment'
  },
  {
    id: 4,
    icon: '👥',
    title: 'Komunitas Belajar',
    description: 'Forum diskusi dan kolaborasi real-time antar siswa, guru, dan orang tua untuk mendukung pembelajaran',
    kategori: 'community'
  },
  {
    id: 5,
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Pantau progress belajar dengan visualisasi data yang mudah dipahami oleh siswa dan guru',
    kategori: 'analytics'
  },
  {
    id: 6,
    icon: '🎯',
    title: 'Pembelajaran Personal',
    description: 'Konten pembelajaran yang disesuaikan dengan gaya dan kecepatan belajar setiap siswa',
    kategori: 'personalization'
  }
];

// Timeline Program
export const TIMELINE_PROGRAM = [
  {
    week: 1,
    title: 'Survei & Pengembangan',
    description: 'Pemetaan kebutuhan mendalam melalui observasi langsung, wawancara dengan stakeholder, dan launching platform beta dengan fitur utama yang telah dioptimalkan',
    icon: '🔍',
    status: 'completed',
    tanggal: '1-7 Januari 2024'
  },
  {
    week: 2,
    title: 'Sosialisasi & Training',
    description: 'Penyuluhan komprehensif ke seluruh SD mitra, pelatihan intensif guru dan staff, serta workshop untuk optimalisasi penggunaan platform pembelajaran',
    icon: '📢',
    status: 'completed',
    tanggal: '8-14 Januari 2024'
  },
  {
    week: 3,
    title: 'Monitoring & Optimasi',
    description: 'Pemantauan real-time penggunaan platform, analisis data pembelajaran, dan perbaikan berkelanjutan berdasarkan feedback dari pengguna aktif',
    icon: '📈',
    status: 'in-progress',
    tanggal: '15-21 Januari 2024'
  },
  {
    week: 4,
    title: 'Evaluasi & Scaling',
    description: 'Evaluasi menyeluruh dampak platform, dokumentasi best practices, dan perencanaan strategis untuk pengembangan fase selanjutnya',
    icon: '🚀',
    status: 'planned',
    tanggal: '22-28 Januari 2024'
  }
];

// Mata Pelajaran
export const MATA_PELAJARAN = [
  {
    id: 1,
    nama: 'Matematika',
    kelas: ['1', '2', '3', '4', '5', '6'],
    warna: '#3B82F6',
    icon: '🔢'
  },
  {
    id: 2,
    nama: 'Bahasa Indonesia',
    kelas: ['1', '2', '3', '4', '5', '6'],
    warna: '#EF4444',
    icon: '📚'
  },
  {
    id: 3,
    nama: 'IPA',
    kelas: ['3', '4', '5', '6'],
    warna: '#10B981',
    icon: '🔬'
  },
  {
    id: 4,
    nama: 'IPS',
    kelas: ['3', '4', '5', '6'],
    warna: '#F59E0B',
    icon: '🌍'
  },
  {
    id: 5,
    nama: 'Bahasa Inggris',
    kelas: ['4', '5', '6'],
    warna: '#8B5CF6',
    icon: '🇬🇧'
  },
  {
    id: 6,
    nama: 'Seni Budaya',
    kelas: ['1', '2', '3', '4', '5', '6'],
    warna: '#EC4899',
    icon: '🎨'
  }
];

// Gamifikasi
export const GAMIFIKASI = {
  levels: [
    { level: 1, nama: 'Pemula', minPoin: 0, maxPoin: 100, warna: '#94A3B8' },
    { level: 2, nama: 'Pelajar', minPoin: 101, maxPoin: 300, warna: '#60A5FA' },
    { level: 3, nama: 'Cerdas', minPoin: 301, maxPoin: 600, warna: '#34D399' },
    { level: 4, nama: 'Pintar', minPoin: 601, maxPoin: 1000, warna: '#FBBF24' },
    { level: 5, nama: 'Jenius', minPoin: 1001, maxPoin: 1500, warna: '#F87171' },
    { level: 6, nama: 'Master', minPoin: 1501, maxPoin: 9999, warna: '#A78BFA' }
  ],
  badges: [
    { id: 1, nama: 'First Login', deskripsi: 'Login pertama kali', poin: 10, icon: '🎯' },
    { id: 2, nama: 'Quiz Master', deskripsi: 'Menyelesaikan 10 kuis', poin: 50, icon: '🧩' },
    { id: 3, nama: 'Helpful Friend', deskripsi: 'Membantu 5 teman', poin: 30, icon: '🤝' },
    { id: 4, nama: 'Perfect Score', deskripsi: 'Mendapat nilai 100', poin: 100, icon: '⭐' },
    { id: 5, nama: 'Daily Streak', deskripsi: 'Login 7 hari berturut-turut', poin: 75, icon: '🔥' },
    { id: 6, nama: 'Knowledge Explorer', deskripsi: 'Belajar 5 mata pelajaran', poin: 80, icon: '🗺️' }
  ],
  aktivitas: [
    { nama: 'Login harian', poin: 5 },
    { nama: 'Menyelesaikan kuis', poin: 20 },
    { nama: 'Posting di forum', poin: 15 },
    { nama: 'Membantu teman', poin: 25 },
    { nama: 'Menyelesaikan tugas', poin: 30 },
    { nama: 'Ikut diskusi', poin: 10 }
  ]
};

// Pengaturan Chat
export const CHAT_CONFIG = {
  maxMessageLength: 500,
  maxMessages: 100,
  typingDelay: { min: 800, max: 2000 },
  autoSave: true,
  showTimestamp: true,
  enableQuickResponses: true,
  enableAnalytics: true,
  sessionTimeout: 30 * 60 * 1000, // 30 menit
  retryAttempts: 3
};

// Quick Responses untuk Chat
export const QUICK_RESPONSES = [
  "Apa itu SinarIlmu?",
  "Fitur apa saja yang tersedia?",
  "Bagaimana cara bergabung?",
  "Ceritakan tentang sekolah mitra",
  "Bagaimana gamifikasi bekerja?",
  "Tips belajar efektif",
  "Komunitas SinarIlmu seperti apa?",
  "Success story dari platform ini"
];

// Navigasi Menu
export const NAVIGATION_MENU = [
  { path: '/', label: 'Beranda', icon: '🏠' },
  { path: '/about', label: 'Tentang', icon: '📖' },
  { path: '/learn', label: 'Belajar', icon: '📚' },
  { path: '/schools', label: 'Sekolah', icon: '🏫' },
  { path: '/community', label: 'Komunitas', icon: '👥' }
];

// Theme Colors
export const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e'
  }
};

// Browser-safe environment variable helper
const getEnvironmentVariable = (key, defaultValue = '') => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Try to get from window.env (if you set it up)
    if (window.env && window.env[key]) {
      return window.env[key];
    }
    
    // Try to get from meta tags
    const metaTag = document.querySelector(`meta[name="env:${key}"]`);
    if (metaTag) {
      return metaTag.getAttribute('content');
    }
  }
  
  // Check if process is available (Node.js or bundler environment)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  return defaultValue;
};

// API Endpoints (browser-safe)
export const API_ENDPOINTS = {
  base: getEnvironmentVariable('REACT_APP_API_URL', 'http://localhost:3001'),
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register'
  },
  users: {
    profile: '/api/users/profile',
    progress: '/api/users/progress',
    achievements: '/api/users/achievements'
  },
  learning: {
    courses: '/api/learning/courses',
    quizzes: '/api/learning/quizzes',
    progress: '/api/learning/progress'
  },
  community: {
    forums: '/api/community/forums',
    posts: '/api/community/posts',
    comments: '/api/community/comments'
  }
};

// Storage Keys
export const STORAGE_KEYS = {
  chatHistory: 'sinarilmu_chat_history',
  chatStats: 'sinarilmu_chat_stats',
  userPreferences: 'sinarilmu_user_prefs',
  themeMode: 'sinarilmu_theme_mode',
  lastVisit: 'sinarilmu_last_visit'
};

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Koneksi internet bermasalah. Silakan coba lagi.',
  timeout: 'Waktu tunggu habis. Silakan coba lagi.',
  server: 'Server sedang bermasalah. Silakan coba lagi nanti.',
  validation: 'Data yang dimasukkan tidak valid.',
  unauthorized: 'Anda tidak memiliki akses untuk melakukan ini.',
  notFound: 'Halaman yang Anda cari tidak ditemukan.',
  generic: 'Terjadi kesalahan. Silakan coba lagi.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  login: 'Berhasil masuk ke akun Anda!',
  logout: 'Berhasil keluar dari akun.',
  register: 'Akun berhasil dibuat!',
  update: 'Data berhasil diperbarui.',
  delete: 'Data berhasil dihapus.',
  upload: 'File berhasil diunggah.',
  submit: 'Data berhasil dikirim.'
};

// Validation Rules
export const VALIDATION_RULES = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    minLength: 8,
    maxLength: 50,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/
  }
};

// Feature Flags
export const FEATURE_FLAGS = {
  enableChat: true,
  enableGamification: true,
  enableAnalytics: true,
  enableSocialFeatures: true,
  enableOfflineMode: false,
  enableVoiceInput: false,
  enableNotifications: true,
  enableDarkMode: true
};

// Default Settings
export const DEFAULT_SETTINGS = {
  language: 'id',
  theme: 'light',
  notifications: {
    email: true,
    push: false,
    sound: true
  },
  privacy: {
    showProfile: true,
    showProgress: true,
    showAchievements: true
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false
  }
};

// Social Links
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/sinarilmu',
  facebook: 'https://facebook.com/sinarilmu',
  twitter: 'https://twitter.com/sinarilmu',
  youtube: 'https://youtube.com/sinarilmu',
  linkedin: 'https://linkedin.com/company/sinarilmu'
};

// Contact Information
export const CONTACT_INFO = {
  alamat: 'Desa Pliken, Kecamatan Kembaran, Kabupaten Banyumas, Jawa Tengah',
  telepon: '+62-281-123456',
  email: 'info@sinarilmu.com',
  website: 'https://sinarilmu.com',
  jamOperasional: 'Senin - Jumat: 08:00 - 16:00 WIB'
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  chat: {
    opened: 'chat_opened',
    closed: 'chat_closed',
    messageSent: 'chat_message_sent',
    quickResponseUsed: 'chat_quick_response_used',
    cleared: 'chat_cleared'
  },
  navigation: {
    pageView: 'page_view',
    menuClick: 'menu_click',
    buttonClick: 'button_click',
    linkClick: 'link_click'
  },
  learning: {
    courseStarted: 'course_started',
    quizCompleted: 'quiz_completed',
    achievementUnlocked: 'achievement_unlocked',
    progressSaved: 'progress_saved'
  }
};

export default {
  APP_INFO,
  DESA_PLIKEN,
  SEKOLAH_MITRA,
  PLATFORM_STATS,
  FITUR_UTAMA,
  TIMELINE_PROGRAM,
  MATA_PELAJARAN,
  GAMIFIKASI,
  CHAT_CONFIG,
  QUICK_RESPONSES,
  NAVIGATION_MENU,
  THEME_COLORS,
  API_ENDPOINTS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
  FEATURE_FLAGS,
  DEFAULT_SETTINGS,
  SOCIAL_LINKS,
  CONTACT_INFO,
  ANALYTICS_EVENTS
};