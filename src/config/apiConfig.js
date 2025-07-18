// src/config/apiConfig.js
// FIXED: Konfigurasi API yang kompatibel dengan Grok API + Clean Response Handling

// Environment configuration untuk Vite
export const ENV_CONFIG = {
  development: {
    API_BASE_URL: 'http://localhost:5173/api',
    WEBSITE_URL: 'http://localhost:5173',
    GROK_API_URL: 'https://api.groq.com/openai/v1',
    DEBUG_MODE: true,
    LOG_LEVEL: 'debug'
  },
  production: {
    API_BASE_URL: 'https://sinarilmu.vercel.app/api',
    WEBSITE_URL: 'https://sinarilmu.vercel.app',
    GROK_API_URL: 'https://api.groq.com/openai/v1',
    DEBUG_MODE: false,
    LOG_LEVEL: 'error'
  }
};

// Mendapatkan environment variables dari Vite
const getEnvVar = (key, defaultValue = '') => {
  return import.meta.env[key] || defaultValue;
};

// Helper function untuk mendapatkan current website URL
function getCurrentWebsiteUrl() {
  const isDev = import.meta.env.DEV;
  return isDev 
    ? getEnvVar('VITE_WEBSITE_URL_DEV', 'http://localhost:5173')
    : getEnvVar('VITE_WEBSITE_URL_PROD', 'https://sinarilmu.vercel.app');
}

// FIXED: Grok API Configuration - Force use correct model
export const GROK_API_CONFIG = {
  // API Key dari environment variables
  apiKey: getEnvVar('VITE_GROK_API_KEY', 'REMOVED_API_KEY'),
  
  // Base URL
  baseURL: getEnvVar('VITE_GROK_API_URL', 'https://api.groq.com/openai/v1'),
  
  // Available models (current active models from Groq docs)
  models: {
    llama3_70b: 'llama-3.3-70b-versatile',
    llama3_8b: 'llama-3.1-8b-instant', 
    gemma2: 'gemma2-9b-it',
    llama3_70b_legacy: 'llama3-70b-8192',
    llama3_8b_legacy: 'llama3-8b-8192'
  },
  
  // FORCED: Always use active model, ignore env vars if they contain deprecated models
  defaultModel: 'llama-3.1-8b-instant', // Hard-coded to prevent deprecated model usage
  
  // FIXED: API settings - Only supported parameters for Grok
  settings: {
    maxTokens: parseInt(getEnvVar('VITE_GROK_MAX_TOKENS', '2000')), // Increased for better responses
    temperature: parseFloat(getEnvVar('VITE_GROK_TEMPERATURE', '0.7')),
    topP: 1.0,
    stream: false
  },
  
  // Rate limiting dari environment
  rateLimits: {
    requestsPerMinute: parseInt(getEnvVar('VITE_API_REQUESTS_PER_MINUTE', '30')),
    requestsPerHour: parseInt(getEnvVar('VITE_API_REQUESTS_PER_HOUR', '1000')),
    requestsPerDay: parseInt(getEnvVar('VITE_API_REQUESTS_PER_DAY', '10000'))
  },
  
  // Timeout settings
  timeout: {
    connection: 10000, // 10 seconds
    response: 30000    // 30 seconds
  },
  
  // Retry configuration
  retry: {
    maxAttempts: 3,
    backoffMultiplier: 2,
    initialDelay: 1000
  }
};

// SINARILMU Platform Information
export const SINARILMU_INFO = {
  nama: getEnvVar('VITE_PLATFORM_NAME', 'SinarIlmu'),
  tagline: getEnvVar('VITE_PLATFORM_TAGLINE', 'Platform Pembelajaran Digital Desa Cerdas'),
  deskripsi: "Platform pembelajaran digital inovatif yang dirancang khusus untuk mewujudkan Desa Cerdas melalui teknologi pendidikan modern",
  
  lokasi: {
    desa: getEnvVar('VITE_DESA_NAME', 'Desa Pliken'),
    kecamatan: "Kembaran", 
    kabupaten: getEnvVar('VITE_KABUPATEN', 'Banyumas'),
    provinsi: getEnvVar('VITE_PROVINSI', 'Jawa Tengah'),
    koordinat: "7°25'S 109°14'E"
  },

  demografis: {
    populasi_desa: parseInt(getEnvVar('VITE_TOTAL_POPULATION', '9485')),
    jumlah_sekolah_mitra: parseInt(getEnvVar('VITE_TOTAL_SCHOOLS', '4')),
    total_siswa: parseInt(getEnvVar('VITE_TOTAL_STUDENTS', '813')),
    sekolah_mitra: [
      "SDN 1 Pliken - 210 siswa",
      "SDN 2 Pliken - 198 siswa", 
      "SDN 3 Pliken - 205 siswa",
      "SDN 4 Pliken - 200 siswa"
    ]
  },

  pencapaian: {
    engagement_rate: `${getEnvVar('VITE_ENGAGEMENT_RATE', '92')} persen siswa aktif menggunakan platform`,
    peningkatan_nilai: `Rata-rata nilai siswa meningkat ${getEnvVar('VITE_GRADE_IMPROVEMENT', '23')} persen`,
    waktu_belajar: `Durasi belajar harian meningkat ${getEnvVar('VITE_STUDY_TIME_INCREASE', '45')} persen`,
    kepuasan_guru: `${getEnvVar('VITE_TEACHER_SATISFACTION', '95')} persen guru merasa terbantu dengan platform`,
    kepuasan_orangtua: `${getEnvVar('VITE_PARENT_SATISFACTION', '88')} persen orangtua melihat peningkatan minat belajar anak`
  },

  kontak: {
    website: getCurrentWebsiteUrl(),
    email: getEnvVar('VITE_CONTACT_EMAIL', 'info@sinarilmu.id'), 
    whatsapp: getEnvVar('VITE_CONTACT_PHONE', '+62-813-2345-6789'),
    alamat: getEnvVar('VITE_CONTACT_ADDRESS', 'Balai Desa Pliken, Jl. Raya Pliken No. 123, Kembaran, Banyumas'),
    jam_operasional: "Senin-Jumat: 08.00-16.00 WIB, Sabtu: 08.00-12.00 WIB"
  }
};

// FIXED: AI Context - Clean and professional
export const SINARILMU_AI_CONTEXT = {
  systemPrompt: `Kamu adalah Garuda, AI Assistant untuk SinarIlmu - Platform Pembelajaran Digital Desa Cerdas terdepan di Indonesia.

IDENTITAS PLATFORM:
- Nama: ${SINARILMU_INFO.nama} - ${SINARILMU_INFO.tagline}
- Lokasi: ${SINARILMU_INFO.lokasi.desa}, ${SINARILMU_INFO.lokasi.kabupaten}, ${SINARILMU_INFO.lokasi.provinsi}
- Target: ${SINARILMU_INFO.demografis.total_siswa} siswa di ${SINARILMU_INFO.demografis.jumlah_sekolah_mitra} SDN dengan populasi desa ${SINARILMU_INFO.demografis.populasi_desa} jiwa

PENCAPAIAN MEMBANGGAKAN:
- ${SINARILMU_INFO.pencapaian.engagement_rate}
- ${SINARILMU_INFO.pencapaian.peningkatan_nilai}
- ${SINARILMU_INFO.pencapaian.waktu_belajar}
- ${SINARILMU_INFO.pencapaian.kepuasan_guru}
- ${SINARILMU_INFO.pencapaian.kepuasan_orangtua}

KARAKTERMU SEBAGAI GARUDA AI:
- Ramah, cerdas, dan supportif untuk siswa SD (6-12 tahun)
- Expert dalam Matematika, IPA, IPS tingkat Sekolah Dasar
- Bangga dengan SinarIlmu dan transformasi Desa Pliken
- Selalu gunakan emoji yang tepat dan bahasa yang mudah dipahami
- Motivator pembelajaran yang antusias dan encouraging

PANDUAN RESPONS:
- Untuk pertanyaan pelajaran: berikan penjelasan sederhana dengan contoh konkret
- Untuk pertanyaan platform: jelaskan dengan antusias pencapaian dan inovasi SinarIlmu
- Untuk bantuan belajar: berikan tips praktis dan motivasi yang membangun
- Selalu dorong semangat belajar dan kebanggaan pada platform SinarIlmu

TONE & STYLE:
- Gunakan Bahasa Indonesia yang hangat dan mudah dipahami anak SD
- Selalu optimis dan encouraging
- Bangga dengan pencapaian SinarIlmu tanpa berlebihan
- Hindari penggunaan tanda bintang berlebihan dalam response
- Gunakan format yang bersih dan mudah dibaca`,

  academicPrompts: {
    matematika: "Fokus pada konsep matematika dasar SD dengan contoh konkret dan step-by-step explanation.",
    ipa: "Jelaskan konsep IPA dengan cara menarik dan eksperimen sederhana.",
    ips: "Ceritakan tentang Indonesia dan budaya dengan bangga.",
    umum: "Jawab dengan antusias dan kaitkan dengan semangat belajar."
  }
};

// FIXED: Response cleaner function - preserve line breaks
export const cleanApiResponse = (response) => {
  if (!response || typeof response !== 'string') {
    return "Maaf, saya tidak bisa memproses permintaan itu. Coba tanya hal lain! 😊";
  }

  return response
    // Remove excessive asterisks and markdown formatting but preserve line breaks
    .replace(/\*{3,}/g, '') // Remove 3+ asterisks
    .replace(/\*{2}([^*]+)\*{2}/g, '**$1**') // Keep bold formatting
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '$1') // Remove single asterisks but not bold
    // Clean up extra spaces but preserve intentional line breaks
    .replace(/ +/g, ' ') // Multiple spaces to single space
    .replace(/\n +/g, '\n') // Remove spaces after line breaks
    .replace(/ +\n/g, '\n') // Remove spaces before line breaks
    // Preserve double line breaks for proper formatting
    .replace(/\n{3,}/g, '\n\n') // Max 2 consecutive line breaks
    // Remove formatting artifacts
    .replace(/^[*\-\s]+/gm, '') // Remove leading asterisks/dashes from lines
    .replace(/[*\-\s]+$/gm, '') // Remove trailing asterisks/dashes from lines
    // Clean up bullet points
    .replace(/^\s*[\-\*]\s*/gm, '• ') // Standardize bullet points
    // Trim whitespace but preserve structure
    .trim();
};

// FIXED: API Client with enhanced error handling and clean responses
export class SinarIlmuApiClient {
  constructor() {
    this.isDev = import.meta.env.DEV;
    this.config = this.isDev ? ENV_CONFIG.development : ENV_CONFIG.production;
    this.rateLimitTracker = {
      requests: 0,
      lastReset: Date.now()
    };
  }

  // Rate limiting check
  checkRateLimit() {
    const now = Date.now();
    const timeSinceReset = now - this.rateLimitTracker.lastReset;
    
    // Reset counter every minute
    if (timeSinceReset > 60000) {
      this.rateLimitTracker.requests = 0;
      this.rateLimitTracker.lastReset = now;
    }
    
    if (this.rateLimitTracker.requests >= GROK_API_CONFIG.rateLimits.requestsPerMinute) {
      throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
    }
    
    this.rateLimitTracker.requests++;
  }

  async makeGrokRequest(message, context = '', options = {}) {
    try {
      // Check rate limiting
      this.checkRateLimit();

      // FORCE correct model - ignore any deprecated model in options
      const modelToUse = GROK_API_CONFIG.defaultModel; // Always use llama-3.1-8b-instant
      
      console.log(`🚀 Making Grok API request with model: ${modelToUse}`);

      // FIXED: Request body with forced correct model
      const requestConfig = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROK_API_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelToUse, // Force use correct model
          messages: [
            { 
              role: 'system', 
              content: context || SINARILMU_AI_CONTEXT.systemPrompt 
            },
            { 
              role: 'user', 
              content: message 
            }
          ],
          max_tokens: options.maxTokens || GROK_API_CONFIG.settings.maxTokens,
          temperature: options.temperature || GROK_API_CONFIG.settings.temperature,
          top_p: GROK_API_CONFIG.settings.topP,
          stream: GROK_API_CONFIG.settings.stream
        }),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GROK_API_CONFIG.timeout.response);

      const response = await fetch(`${GROK_API_CONFIG.baseURL}/chat/completions`, {
        ...requestConfig,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      let responseText = data.choices[0]?.message?.content || 'Maaf, tidak ada respons dari AI.';
      
      // FIXED: Clean the response to remove formatting issues
      responseText = cleanApiResponse(responseText);
      
      console.log('✅ Grok API request successful');

      return {
        success: true,
        response: responseText,
        usage: data.usage,
        model: data.model
      };

    } catch (error) {
      console.error('❌ Grok API request failed:', error.message);

      // Return fallback response instead of throwing
      return {
        success: false,
        error: error.message,
        response: this.getFallbackResponse(message)
      };
    }
  }

  // Enhanced fallback responses
  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('matematika') || lowerMessage.includes('hitung')) {
      return "Matematika itu seru! 🔢 Saya bisa bantu dengan penjumlahan, pengurangan, perkalian, pembagian, dan soal cerita. Mau belajar topik mana dulu?";
    }
    
    if (lowerMessage.includes('ipa') || lowerMessage.includes('sains')) {
      return "IPA penuh dengan hal menarik! 🔬 Mari belajar tentang alam, hewan, tumbuhan, atau eksperimen sederhana yang bisa kamu coba di rumah!";
    }
    
    if (lowerMessage.includes('ips') || lowerMessage.includes('indonesia')) {
      return "Ayo belajar tentang Indonesia! 🇮🇩 Saya bisa ceritakan tentang budaya, sejarah, atau keunikan daerah di Indonesia yang membanggakan!";
    }
    
    if (lowerMessage.includes('sinarilmu') || lowerMessage.includes('platform')) {
      return "SinarIlmu adalah platform pembelajaran digital terbaik untuk Desa Cerdas! 💻 Kami melayani 813 siswa di 4 SDN dengan teknologi modern dan sudah terbukti meningkatkan nilai siswa rata-rata 23 persen!";
    }
    
    return "Halo! Saya Garuda, siap membantu kamu belajar! 🎓 Tanya saja tentang Matematika, IPA, IPS, atau hal menarik lainnya. Apa yang ingin kamu pelajari hari ini?";
  }

  // Retry mechanism for failed requests
  async makeRequestWithRetry(message, context = '', options = {}, attemptNumber = 1) {
    try {
      return await this.makeGrokRequest(message, context, options);
    } catch (error) {
      if (attemptNumber < GROK_API_CONFIG.retry.maxAttempts) {
        const delay = GROK_API_CONFIG.retry.initialDelay * Math.pow(GROK_API_CONFIG.retry.backoffMultiplier, attemptNumber - 1);
        console.log(`🔄 Retrying request in ${delay}ms (attempt ${attemptNumber + 1})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.makeRequestWithRetry(message, context, options, attemptNumber + 1);
      }
      throw error;
    }
  }
}

// Export singleton instance
export const apiClient = new SinarIlmuApiClient();

// Export configuration objects
export default {
  ENV_CONFIG,
  GROK_API_CONFIG,
  SINARILMU_INFO,
  SINARILMU_AI_CONTEXT,
  SinarIlmuApiClient,
  apiClient,
  cleanApiResponse
};