// src/config/apiConfig.ts
// SECURE: Konfigurasi API yang aman tanpa hardcoded secrets

// Types
interface EnvConfig {
  development: {
    API_BASE_URL: string;
    WEBSITE_URL: string;
    GROK_API_URL: string;
    DEBUG_MODE: boolean;
    LOG_LEVEL: string;
  };
  production: {
    API_BASE_URL: string;
    WEBSITE_URL: string;
    GROK_API_URL: string;
    DEBUG_MODE: boolean;
    LOG_LEVEL: string;
  };
}

interface GrokApiConfig {
  apiKey: string;
  baseURL: string;
  models: {
    llama3_70b: string;
    llama3_8b: string;
    gemma2: string;
    llama3_70b_legacy: string;
    llama3_8b_legacy: string;
  };
  defaultModel: string;
  settings: {
    maxTokens: number;
    temperature: number;
    topP: number;
    stream: boolean;
  };
  rateLimits: {
    requestsPerMinute: number;
    requestsPerHour: number;
    requestsPerDay: number;
  };
  timeout: {
    connection: number;
    response: number;
  };
  retry: {
    maxAttempts: number;
    backoffMultiplier: number;
    initialDelay: number;
  };
}

interface SinarIlmuInfo {
  nama: string;
  tagline: string;
  deskripsi: string;
  lokasi: {
    desa: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    koordinat: string;
  };
  demografis: {
    populasi_desa: number;
    jumlah_sekolah_mitra: number;
    total_siswa: number;
    sekolah_mitra: string[];
  };
  pencapaian: {
    engagement_rate: string;
    peningkatan_nilai: string;
    waktu_belajar: string;
    kepuasan_guru: string;
    kepuasan_orangtua: string;
  };
  kontak: {
    website: string;
    email: string;
    whatsapp: string;
    alamat: string;
    jam_operasional: string;
  };
}

interface SinarIlmuAiContext {
  systemPrompt: string;
  academicPrompts: {
    matematika: string;
    ipa: string;
    ips: string;
    umum: string;
  };
}

interface ApiResponse {
  success: boolean;
  response: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  model?: string;
  error?: string;
}

interface RateLimitTracker {
  requests: number;
  lastReset: number;
}

// Environment configuration untuk Vite
export const ENV_CONFIG: EnvConfig = {
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

// Mendapatkan environment variables dari Vite dengan fallback yang aman
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  try {
    const value = import.meta.env[key];
    if (!value && defaultValue === '' && key.includes('API_KEY')) {
      if (import.meta.env.DEV) {
        console.warn(`⚠️ Environment variable ${key} is not set. Using fallback mode.`);
      }
    }
    return value || defaultValue;
  } catch (error) {
    console.warn(`Failed to get environment variable ${key}, using default:`, defaultValue);
    return defaultValue;
  }
};

// Helper function untuk mendapatkan current website URL
const getCurrentWebsiteUrl = (): string => {
  try {
    const isDev = import.meta.env.DEV;
    return isDev 
      ? getEnvVar('VITE_WEBSITE_URL_DEV', 'http://localhost:5173')
      : getEnvVar('VITE_WEBSITE_URL_PROD', 'https://sinarilmu.vercel.app');
  } catch (error) {
    return 'https://sinarilmu.vercel.app';
  }
};

// SECURE: Grok API Configuration - No hardcoded API keys
export const GROK_API_CONFIG: GrokApiConfig = {
  // API Key dari environment variables - SECURE
  apiKey: getEnvVar('VITE_GROK_API_KEY', ''),
  
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
  
  // Default model - Always use active model
  defaultModel: getEnvVar('VITE_GROK_DEFAULT_MODEL', 'llama-3.1-8b-instant'),
  
  // API settings - Only supported parameters for Grok
  settings: {
    maxTokens: Math.min(parseInt(getEnvVar('VITE_GROK_MAX_TOKENS', '2000')), 4096),
    temperature: Math.max(0, Math.min(parseFloat(getEnvVar('VITE_GROK_TEMPERATURE', '0.7')), 2)),
    topP: 1.0,
    stream: false
  },
  
  // Rate limiting dari environment
  rateLimits: {
    requestsPerMinute: Math.max(1, parseInt(getEnvVar('VITE_API_REQUESTS_PER_MINUTE', '30'))),
    requestsPerHour: Math.max(10, parseInt(getEnvVar('VITE_API_REQUESTS_PER_HOUR', '1000'))),
    requestsPerDay: Math.max(100, parseInt(getEnvVar('VITE_API_REQUESTS_PER_DAY', '10000')))
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
export const SINARILMU_INFO: SinarIlmuInfo = {
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
    populasi_desa: Math.max(0, parseInt(getEnvVar('VITE_TOTAL_POPULATION', '9485'))),
    jumlah_sekolah_mitra: Math.max(0, parseInt(getEnvVar('VITE_TOTAL_SCHOOLS', '4'))),
    total_siswa: Math.max(0, parseInt(getEnvVar('VITE_TOTAL_STUDENTS', '813'))),
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

// AI Context - Clean and professional
export const SINARILMU_AI_CONTEXT: SinarIlmuAiContext = {
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
    matematika: "Fokus pada konsep matematika dasar SD dengan contoh konkret dan step-by-step explanation yang mudah dipahami.",
    ipa: "Jelaskan konsep IPA dengan cara menarik menggunakan eksperimen sederhana dan contoh kehidupan sehari-hari.",
    ips: "Ceritakan tentang Indonesia dan budaya dengan bangga, sertakan fakta menarik dan nilai-nilai kebangsaan.",
    umum: "Jawab dengan antusias dan kaitkan dengan semangat belajar, berikan motivasi positif."
  }
};

// Response cleaner function - preserve line breaks
export const cleanApiResponse = (response: string): string => {
  if (!response || typeof response !== 'string') {
    return "Maaf, saya tidak bisa memproses permintaan itu. Coba tanya hal lain! 😊";
  }

  try {
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
  } catch (error) {
    console.warn('Error cleaning response:', error);
    return response.trim();
  }
};

// API Client with enhanced error handling and clean responses
export class SinarIlmuApiClient {
  public isDev: boolean;
  public config: typeof ENV_CONFIG.development | typeof ENV_CONFIG.production;
  public rateLimitTracker: RateLimitTracker;

  constructor() {
    try {
      this.isDev = import.meta.env.DEV;
      this.config = this.isDev ? ENV_CONFIG.development : ENV_CONFIG.production;
    } catch (error) {
      // Fallback if import.meta.env is not available
      this.isDev = false;
      this.config = ENV_CONFIG.production;
    }
    
    this.rateLimitTracker = {
      requests: 0,
      lastReset: Date.now()
    };
  }

  // Check if API key is available
  checkApiKey(): boolean {
    const apiKey = GROK_API_CONFIG.apiKey;
    if (!apiKey || apiKey.trim() === '') {
      if (this.isDev) {
        console.warn('⚠️ Groq API Key is not configured. Using fallback mode.');
      }
      return false;
    }
    return true;
  }

  // Rate limiting check
  checkRateLimit(): boolean {
    try {
      const now = Date.now();
      const timeSinceReset = now - this.rateLimitTracker.lastReset;
      
      // Reset counter every minute
      if (timeSinceReset > 60000) {
        this.rateLimitTracker.requests = 0;
        this.rateLimitTracker.lastReset = now;
      }
      
      if (this.rateLimitTracker.requests >= GROK_API_CONFIG.rateLimits.requestsPerMinute) {
        console.warn('Rate limit exceeded. Please wait a moment before trying again.');
        return false;
      }
      
      this.rateLimitTracker.requests++;
      return true;
    } catch (error) {
      console.warn('Error checking rate limit:', error);
      return true; // Allow request if rate limit check fails
    }
  }

  async makeGrokRequest(
    message: string, 
    context: string = '', 
    options: { maxTokens?: number; temperature?: number } = {}
  ): Promise<ApiResponse> {
    try {
      // Validate input
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return {
          success: false,
          error: 'Invalid message',
          response: this.getFallbackResponse('invalid')
        };
      }

      // Check if API key is configured
      if (!this.checkApiKey()) {
        return {
          success: false,
          error: 'API key not configured',
          response: this.getFallbackResponse(message)
        };
      }

      // Check rate limiting
      if (!this.checkRateLimit()) {
        return {
          success: false,
          error: 'Rate limit exceeded',
          response: 'Maaf, terlalu banyak permintaan. Silakan tunggu sebentar dan coba lagi! 😊'
        };
      }

      const modelToUse = GROK_API_CONFIG.defaultModel;
      
      if (this.isDev) {
        console.log(`🚀 Making Grok API request with model: ${modelToUse}`);
      }

      // Prepare request body with validation
      const requestBody = {
        model: modelToUse,
        messages: [
          { 
            role: 'system', 
            content: context || SINARILMU_AI_CONTEXT.systemPrompt 
          },
          { 
            role: 'user', 
            content: message.trim().substring(0, 2000) // Limit message length
          }
        ],
        max_tokens: Math.min(options.maxTokens || GROK_API_CONFIG.settings.maxTokens, 4096),
        temperature: Math.max(0, Math.min(options.temperature || GROK_API_CONFIG.settings.temperature, 2)),
        top_p: GROK_API_CONFIG.settings.topP,
        stream: GROK_API_CONFIG.settings.stream
      };

      // Request configuration
      const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROK_API_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      };

      // Add timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GROK_API_CONFIG.timeout.response);

      const response = await fetch(`${GROK_API_CONFIG.baseURL}/chat/completions`, {
        ...requestConfig,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Handle HTTP errors
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('API Error:', response.status, errorText);
        
        return {
          success: false,
          error: `HTTP ${response.status}: ${errorText}`,
          response: this.getFallbackResponse(message)
        };
      }

      // Parse response
      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from API');
      }

      let responseText = data.choices[0].message.content || 'Maaf, tidak ada respons dari AI.';
      
      // Clean the response to remove formatting issues
      responseText = cleanApiResponse(responseText);
      
      if (this.isDev) {
        console.log('✅ Grok API request successful');
      }

      return {
        success: true,
        response: responseText,
        usage: data.usage,
        model: data.model
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (this.isDev) {
        console.error('❌ Grok API request failed:', errorMessage);
      }

      // Return fallback response instead of throwing
      return {
        success: false,
        error: errorMessage,
        response: this.getFallbackResponse(message)
      };
    }
  }

  // Enhanced fallback responses
  getFallbackResponse(message: string): string {
    if (!message || typeof message !== 'string') {
      return "Halo! Saya Garuda, siap membantu kamu belajar! 🎓 Tanya saja tentang Matematika, IPA, IPS, atau hal menarik lainnya. Apa yang ingin kamu pelajari hari ini?";
    }

    const lowerMessage = message.toLowerCase();
    
    // Math expressions
    if (/\d+\s*[+\-*/]\s*\d+/.test(message)) {
      try {
        // Simple math evaluation
        const sanitized = message.replace(/[^0-9+\-*/().\s]/g, '');
        if (sanitized.length > 0 && sanitized.length < 50) {
          // eslint-disable-next-line no-eval
          const result = eval(sanitized);
          if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
            return `🔢 Hasil dari ${message} adalah ${result}`;
          }
        }
      } catch (error) {
        // Fall through to regular math response
      }
    }
    
    if (lowerMessage.includes('matematika') || lowerMessage.includes('hitung') || lowerMessage.includes('mtk')) {
      return `🔢 **Matematika itu Seru!**

Saya bisa bantu kamu dengan:
• Penjumlahan, pengurangan, perkalian, pembagian
• Soal cerita yang menarik
• Konsep geometri dasar
• Tips menghitung cepat

Mau belajar topik mana dulu? Atau langsung tanya soal matematika yang ingin diselesaikan! 📚`;
    }
    
    if (lowerMessage.includes('ipa') || lowerMessage.includes('sains')) {
      return `🔬 **IPA Penuh Keajaiban!**

Mari belajar tentang:
• Alam dan lingkungan sekitar
• Hewan dan tumbuhan
• Eksperimen sederhana
• Fenomena alam yang menarik

Apa yang ingin kamu ketahui tentang dunia sains? Saya siap menjelaskan dengan cara yang menyenangkan! 🌟`;
    }
    
    if (lowerMessage.includes('ips') || lowerMessage.includes('indonesia') || lowerMessage.includes('sejarah')) {
      return `🇮🇩 **Ayo Belajar tentang Indonesia!**

Saya bisa ceritakan tentang:
• Kebudayaan Indonesia yang beragam
• Sejarah pahlawan nasional
• Keunikan daerah di Indonesia
• Nilai-nilai Pancasila

Indonesia negara yang luar biasa! Mau tahu tentang apa? 🏛️`;
    }
    
    if (lowerMessage.includes('sinarilmu') || lowerMessage.includes('platform') || lowerMessage.includes('garuda')) {
      return `🏫 **SinarIlmu - Platform Kebanggaan!**

SinarIlmu adalah platform pembelajaran digital terbaik untuk Desa Cerdas!

✨ **Pencapaian Membanggakan:**
• Melayani 813 siswa di 4 SDN
• 92% siswa aktif menggunakan platform
• Nilai siswa meningkat rata-rata 23%
• 95% guru terbantu dengan platform

Berlokasi di Desa Pliken, Banyumas, Jawa Tengah - kami bangga menjadi bagian transformasi pendidikan Indonesia! 🚀`;
    }
    
    // General greeting and introduction
    if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('siapa')) {
      return `👋 **Halo! Saya Garuda AI**

Saya adalah asisten pembelajaran digital SinarIlmu yang siap membantu kamu belajar dengan menyenangkan!

🎯 **Yang Bisa Saya Bantu:**
• 🔢 Matematika - Hitung-menghitung seru
• 🔬 IPA - Sains yang menakjubkan
• 🌏 IPS - Indonesia yang membanggakan
• 💡 Pengetahuan umum lainnya

Tanya apa saja yang ingin kamu pelajari hari ini! 📚✨`;
    }
    
    // Default fallback
    return `💡 **Pertanyaan Menarik!**

Saya belum bisa memberikan jawaban yang tepat, tapi saya siap membantu dengan:

📚 **Mata Pelajaran:**
• Matematika - Hitung-menghitung dan soal cerita
• IPA - Sains menarik dan eksperimen
• IPS - Indonesia yang membanggakan

💬 **Cara Bertanya:**
Sebutkan mata pelajaran dan topik yang ingin kamu pelajari!

Coba tanya tentang hal-hal di atas ya! 🌟`;
  }

  // Retry mechanism for failed requests
  async makeRequestWithRetry(
    message: string, 
    context: string = '', 
    options: { maxTokens?: number; temperature?: number } = {}, 
    attemptNumber: number = 1
  ): Promise<ApiResponse> {
    try {
      const result = await this.makeGrokRequest(message, context, options);
      
      // If request failed but it's not the last attempt, retry
      if (!result.success && attemptNumber < GROK_API_CONFIG.retry.maxAttempts) {
        const delay = GROK_API_CONFIG.retry.initialDelay * Math.pow(GROK_API_CONFIG.retry.backoffMultiplier, attemptNumber - 1);
        
        if (this.isDev) {
          console.log(`🔄 Retrying request in ${delay}ms (attempt ${attemptNumber + 1})`);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.makeRequestWithRetry(message, context, options, attemptNumber + 1);
      }
      
      return result;
    } catch (error) {
      if (attemptNumber < GROK_API_CONFIG.retry.maxAttempts) {
        const delay = GROK_API_CONFIG.retry.initialDelay * Math.pow(GROK_API_CONFIG.retry.backoffMultiplier, attemptNumber - 1);
        
        if (this.isDev) {
          console.log(`🔄 Retrying request in ${delay}ms (attempt ${attemptNumber + 1})`);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.makeRequestWithRetry(message, context, options, attemptNumber + 1);
      }
      
      // If all retries failed, return fallback
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        response: this.getFallbackResponse(message)
      };
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