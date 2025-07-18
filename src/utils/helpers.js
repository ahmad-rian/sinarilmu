// src/utils/helpers.js
// Helper functions untuk aplikasi SinarIlmu

import { STORAGE_KEYS, GAMIFIKASI, THEME_COLORS } from './constants';

// ===== DATE & TIME HELPERS =====
export const formatDate = (date, locale = 'id-ID') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date, locale = 'id-ID') => {
  return new Date(date).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date, locale = 'id-ID') => {
  return new Date(date).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
  
  if (diffInSeconds < 60) return 'Baru saja';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari lalu`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} bulan lalu`;
  return `${Math.floor(diffInSeconds / 31536000)} tahun lalu`;
};

// ===== STORAGE HELPERS =====
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// ===== STRING HELPERS =====
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
  return str.replace(/\w\S*/g, txt => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const truncate = (str, length = 100, ending = '...') => {
  if (str.length <= length) return str;
  return str.substring(0, length - ending.length) + ending;
};

export const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const removeHtmlTags = (str) => {
  return str.replace(/<[^>]*>/g, '');
};

// ===== NUMBER HELPERS =====
export const formatNumber = (num, locale = 'id-ID') => {
  return new Intl.NumberFormat(locale).format(num);
};

export const formatCurrency = (amount, currency = 'IDR', locale = 'id-ID') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatPercentage = (value, decimals = 1) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ===== ARRAY HELPERS =====
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const uniqueArray = (array, key = null) => {
  if (key) {
    return array.filter((item, index, self) => 
      index === self.findIndex(t => t[key] === item[key])
    );
  }
  return [...new Set(array)];
};

// ===== VALIDATION HELPERS =====
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

export const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const isStrongPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
};

// ===== GAMIFICATION HELPERS =====
export const calculateLevel = (points) => {
  const level = GAMIFIKASI.levels.find(level => 
    points >= level.minPoin && points <= level.maxPoin
  );
  return level || GAMIFIKASI.levels[0];
};

export const getNextLevel = (currentPoints) => {
  const currentLevel = calculateLevel(currentPoints);
  const currentIndex = GAMIFIKASI.levels.findIndex(level => level.level === currentLevel.level);
  return GAMIFIKASI.levels[currentIndex + 1] || null;
};

export const calculateProgress = (currentPoints) => {
  const currentLevel = calculateLevel(currentPoints);
  const progress = ((currentPoints - currentLevel.minPoin) / 
    (currentLevel.maxPoin - currentLevel.minPoin)) * 100;
  return Math.min(progress, 100);
};

export const getPointsToNextLevel = (currentPoints) => {
  const nextLevel = getNextLevel(currentPoints);
  if (!nextLevel) return 0;
  return nextLevel.minPoin - currentPoints;
};

// ===== COLOR HELPERS =====
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const getContrastColor = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
};

// ===== DEVICE HELPERS =====
export const isMobile = () => {
  return window.innerWidth <= 768;
};

export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = () => {
  return window.innerWidth > 1024;
};

export const getDeviceType = () => {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

// ===== ANALYTICS HELPERS =====
export const trackEvent = (event, properties = {}) => {
  try {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', event, properties);
    }
    
    // Custom analytics
    const analytics = getStorageItem('analytics_events', []);
    analytics.push({
      event,
      properties,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    
    // Keep only last 100 events
    if (analytics.length > 100) {
      analytics.splice(0, analytics.length - 100);
    }
    
    setStorageItem('analytics_events', analytics);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

export const getAnalyticsData = () => {
  return getStorageItem('analytics_events', []);
};

// ===== ERROR HANDLING HELPERS =====
export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  
  // Log error untuk analytics
  trackEvent('error_occurred', {
    message: error.message,
    context,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  
  // Return user-friendly message
  return 'Terjadi kesalahan. Silakan coba lagi.';
};

export const withErrorBoundary = (fn, fallback = null) => {
  try {
    return fn();
  } catch (error) {
    handleError(error, 'withErrorBoundary');
    return fallback;
  }
};

// ===== PERFORMANCE HELPERS =====
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  trackEvent('performance_measure', {
    name,
    duration: end - start,
    timestamp: new Date().toISOString()
  });
  
  return result;
};

// ===== CHAT HELPERS =====
export const saveChatSession = (messages, stats = {}) => {
  const sessionData = {
    messages,
    stats,
    timestamp: new Date().toISOString(),
    sessionId: generateSessionId()
  };
  
  return setStorageItem(STORAGE_KEYS.chatHistory, sessionData);
};

export const loadChatSession = () => {
  const sessionData = getStorageItem(STORAGE_KEYS.chatHistory);
  
  // Check if session is not expired (24 hours)
  if (sessionData && sessionData.timestamp) {
    const sessionTime = new Date(sessionData.timestamp);
    const now = new Date();
    const hoursDiff = (now - sessionTime) / (1000 * 60 * 60);
    
    if (hoursDiff < 24) {
      return sessionData;
    }
  }
  
  return null;
};

export const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const exportChatHistory = (format = 'json') => {
  const chatData = loadChatSession();
  if (!chatData) return null;
  
  switch (format) {
    case 'json':
      return JSON.stringify(chatData, null, 2);
    case 'txt':
      return chatData.messages
        .map(msg => `[${msg.timestamp}] ${msg.sender}: ${msg.text}`)
        .join('\n');
    case 'csv':
      const headers = 'timestamp,sender,message\n';
      const rows = chatData.messages
        .map(msg => `${msg.timestamp},${msg.sender},"${msg.text.replace(/"/g, '""')}"`)
        .join('\n');
      return headers + rows;
    default:
      return JSON.stringify(chatData, null, 2);
  }
};

// ===== UTILITY FUNCTIONS =====
export const downloadFile = (content, filename, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  }
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const parseQueryString = (search = window.location.search) => {
  const params = new URLSearchParams(search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, value);
    }
  });
  return searchParams.toString();
};

// Export semua functions
export default {
  // Date & Time
  formatDate,
  formatTime,
  formatDateTime,
  getTimeAgo,
  
  // Storage
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  clearStorage,
  
  // String
  capitalize,
  capitalizeWords,
  truncate,
  slugify,
  removeHtmlTags,
  
  // Number
  formatNumber,
  formatCurrency,
  formatPercentage,
  clamp,
  randomBetween,
  
  // Array
  shuffleArray,
  getRandomItem,
  chunkArray,
  uniqueArray,
  
  // Validation
  isValidEmail,
  isValidPhone,
  isValidUsername,
  isStrongPassword,
  
  // Gamification
  calculateLevel,
  getNextLevel,
  calculateProgress,
  getPointsToNextLevel,
  
  // Color
  hexToRgb,
  rgbToHex,
  getContrastColor,
  
  // Device
  isMobile,
  isTablet,
  isDesktop,
  getDeviceType,
  
  // Analytics
  trackEvent,
  getAnalyticsData,
  
  // Error Handling
  handleError,
  withErrorBoundary,
  
  // Performance
  debounce,
  throttle,
  measurePerformance,
  
  // Chat
  saveChatSession,
  loadChatSession,
  generateSessionId,
  exportChatHistory,
  
  // Utility
  downloadFile,
  copyToClipboard,
  generateUniqueId,
  parseQueryString,
  buildQueryString
};