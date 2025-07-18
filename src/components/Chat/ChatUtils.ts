// src/components/Chat/ChatUtils.ts
import { apiClient, SINARILMU_AI_CONTEXT, cleanApiResponse } from '../../config/apiConfig';

// Types
export interface ChatConfig {
  maxMessages: number;
  maxMessageLength: number;
  typingDelay: {
    min: number;
    max: number;
  };
  enableQuickResponses: boolean;
  enableLearningTracking: boolean;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  category?: string;
  subject?: string;
  isError?: boolean;
}

export interface QuickResponses {
  [key: string]: string[];
}

export interface ChatInteraction {
  timestamp: string;
  question: string;
  responseLength: number;
  subject: string;
}

export interface LearningProgress {
  subject: string;
  topic: string;
  status: string;
  timestamp: string;
}

// Chat configuration
export const chatConfig: ChatConfig = {
  maxMessages: 50,
  maxMessageLength: 500,
  typingDelay: {
    min: 1000,
    max: 3000
  },
  enableQuickResponses: true,
  enableLearningTracking: true
};

// Preprocess message function
export const preprocessMessage = (message: string): string => {
  if (!message || typeof message !== 'string') return '';
  
  return message
    .trim()
    .replace(/\s+/g, ' ')
    .substring(0, chatConfig.maxMessageLength);
};

// Postprocess response function - preserve formatting
export const postprocessResponse = (response: string): string => {
  if (!response || typeof response !== 'string') {
    return "Maaf, saya tidak bisa memproses permintaan itu. Coba tanya hal lain! 😊";
  }

  // Don't clean responses that are already well-formatted (from our rule-based system)
  if (response.includes('🔢 **Matematika Dasar') || 
      response.includes('🌱 **Fotosintesis') || 
      response.includes('🤖 **Halo! Saya Garuda') ||
      response.includes('🏫 **SinarIlmu')) {
    return response; // Return as-is for our formatted responses
  }

  // Only clean external API responses
  return cleanApiResponse(response);
};

// Enhanced rule-based response with better subject handling
export const getRuleBasedResponse = async (message: string): Promise<string> => {
  try {
    const lowerMessage = message.toLowerCase().trim();
    
    // Handle math expressions first
    const mathResult = evaluateMathExpression(message);
    if (mathResult !== null) {
      return `Hasil perhitungan: ${mathResult} 🔢\n\nPenjelasan: ${getMathExplanation(message, mathResult)}`;
    }
    
    // Handle specific educational topics with enhanced responses
    if (lowerMessage.includes('matematika dasar') || lowerMessage.includes('ajari matematika')) {
      return getMathBasicsResponse();
    }
    
    if (lowerMessage.includes('fotosintesis')) {
      return getFotosintesisResponse();
    }
    
    if (lowerMessage.includes('sinarilmu') || lowerMessage.includes('apa itu sinar ilmu')) {
      return getSinarIlmuResponse();
    }
    
    if (lowerMessage.includes('ipa') || lowerMessage.includes('sains')) {
      return getIPAResponse();
    }
    
    if (lowerMessage.includes('ips') || lowerMessage.includes('indonesia')) {
      return getIPSResponse();
    }
    
    if (lowerMessage.includes('siapa kamu') || lowerMessage.includes('siapa anda')) {
      return getIntroductionResponse();
    }
    
    // Try AI response if available
    try {
      const aiResponse = await apiClient.makeGrokRequest(
        message, 
        SINARILMU_AI_CONTEXT.systemPrompt
      );
      
      if (aiResponse.success && aiResponse.response) {
        return aiResponse.response;
      }
    } catch (error) {
      console.warn('AI API failed, using fallback:', error);
    }
    
    // Fallback to general response
    return getGeneralResponse(message);
    
  } catch (error) {
    console.error('Error in getRuleBasedResponse:', error);
    return getErrorResponse();
  }
};

// Math expression evaluator (safe evaluation)
const evaluateMathExpression = (expression: string): string | null => {
  try {
    // Clean the expression
    const cleanExpr = expression
      .replace(/[^0-9+\-*/().\s]/g, '')
      .trim();
    
    // Basic math pattern check
    if (!/^[0-9+\-*/().\s]+$/.test(cleanExpr)) {
      return null;
    }
    
    // Simple math expressions only
    if (cleanExpr.length > 50) return null;
    
    // Use Function constructor for safe evaluation (limited scope)
    const result = Function('"use strict"; return (' + cleanExpr + ')')();
    
    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
      return Number(result.toFixed(10)).toString();
    }
    
    return null;
  } catch (error) {
    return null;
  }
};

// Math explanation generator
const getMathExplanation = (expression: string, result: string): string => {
  const cleanExpr = expression.replace(/[^0-9+\-*/().\s]/g, '').trim();
  
  if (cleanExpr.includes('*') && (cleanExpr.includes('+') || cleanExpr.includes('-'))) {
    return `Ingat urutan operasi matematika: perkalian (*) dihitung dulu, baru penjumlahan (+) dan pengurangan (-). Jadi ${cleanExpr} = ${result}`;
  }
  
  if (cleanExpr.includes('/')) {
    return `Pembagian dilakukan dari kiri ke kanan. ${cleanExpr} = ${result}`;
  }
  
  if (cleanExpr.includes('*')) {
    return `Perkalian: ${cleanExpr} = ${result}`;
  }
  
  return `Perhitungan: ${cleanExpr} = ${result}`;
};

// Math basics response
const getMathBasicsResponse = (): string => {
  return `🔢 **Matematika Dasar untuk SD**

**Operasi Dasar:**
• Penjumlahan (+): 5 + 3 = 8
• Pengurangan (-): 10 - 4 = 6  
• Perkalian (×): 4 × 3 = 12
• Pembagian (÷): 12 ÷ 3 = 4

**Urutan Operasi:**
1. Kurung () dulu
2. Perkalian × dan Pembagian ÷ 
3. Penjumlahan + dan Pengurangan -

**Contoh:** 5 + 6 - 8 × 3
= 5 + 6 - 24 (kali dulu)
= 11 - 24 
= -13

Mau coba soal lain? Ketik angka dan operasi matematika! 🎯`;
};

// SinarIlmu platform response - Clean and well-formatted
const getSinarIlmuResponse = (): string => {
  return `🏫 **SinarIlmu - Platform Pembelajaran Digital Desa Cerdas**

📍 **Lokasi:** Desa Pliken, Kembaran, Banyumas, Jawa Tengah

👥 **Melayani 813 siswa** di 4 Sekolah Dasar Negeri:
• SDN 1 Pliken - 210 siswa
• SDN 2 Pliken - 198 siswa  
• SDN 3 Pliken - 205 siswa
• SDN 4 Pliken - 200 siswa

🏆 **Pencapaian Membanggakan:**
• 92% siswa aktif menggunakan platform
• Rata-rata nilai siswa meningkat 23%
• Durasi belajar harian meningkat 45%
• 95% guru merasa terbantu dengan platform
• 88% orangtua melihat peningkatan minat belajar anak

Kami bangga mewujudkan Desa Cerdas melalui pendidikan digital yang inovatif! 🌟`;
};

// Introduction response
const getIntroductionResponse = (): string => {
  return `🤖 **Halo! Saya Garuda AI**

Saya adalah asisten pembelajaran digital untuk platform SinarIlmu! 🚀

**Yang bisa saya bantu:**
• 🔢 **Matematika** - Penjumlahan, pengurangan, perkalian, pembagian
• 🔬 **IPA** - Sains, alam, eksperimen sederhana
• 🌏 **IPS** - Indonesia, budaya, sejarah
• 💻 **SinarIlmu** - Info platform dan pencapaiannya

**Cara menggunakan:**
Tanya saja langsung! Contoh: "Apa itu fotosintesis?" atau "5 + 3 x 2"

Saya siap membantu kamu belajar kapan saja! 📚✨`;
};

// Fotosintesis response
const getFotosintesisResponse = (): string => {
  return `🌱 **Fotosintesis - Cara Tumbuhan Membuat Makanan**

**Apa itu Fotosintesis?**
Fotosintesis adalah proses tumbuhan membuat makanan sendiri menggunakan sinar matahari! 🌞

**Yang Dibutuhkan:**
• ☀️ **Sinar matahari** - Sumber energi
• 💧 **Air** - Diserap dari tanah melalui akar
• 🌬️ **Karbon dioksida** - Gas dari udara masuk lewat daun
• 🍃 **Klorofil** - Zat hijau di daun

**Proses:**
1. Daun menyerap sinar matahari
2. Akar menyerap air dari tanah
3. Daun mengambil CO₂ dari udara
4. Semua bahan "dimasak" jadi makanan (glukosa)
5. Tumbuhan mengeluarkan oksigen untuk kita hirup! 🌿

**Kenapa Penting?**
Tanpa fotosintesis, tidak ada oksigen untuk bernapas dan tidak ada makanan di dunia!

Mau tahu lebih banyak tentang IPA lainnya? 🔬`;
};

// IPA response
const getIPAResponse = (): string => {
  return `🔬 **IPA (Ilmu Pengetahuan Alam) Seru!**

**Topik Menarik:**
• **Fotosintesis:** Tumbuhan membuat makanan dari sinar matahari 🌱
• **Siklus Air:** Air berputar dari laut ke langit ke tanah ☁️
• **Hewan & Habitat:** Dimana hewan tinggal dan makan 🐸
• **Tubuh Manusia:** Bagaimana jantung, paru-paru bekerja ❤️

**Eksperimen Mudah di Rumah:**
1. Tanam kacang hijau di kapas basah
2. Buat pelangi dengan air dan cermin
3. Amati es batu mencair

Mau belajar topik IPA yang mana? 🧪`;
};

// IPS response
const getIPSResponse = (): string => {
  return `🌏 **IPS (Ilmu Pengetahuan Sosial) Indonesia**

**Kebanggaan Indonesia:**
• **Budaya:** 1,340 suku bangsa dengan bahasa dan adat unik 🇮🇩
• **Alam:** 17,508 pulau dari Sabang sampai Merauke 🏝️
• **Sejarah:** Kemerdekaan 17 Agustus 1945 🎌
• **Pahlawan:** Soekarno, Hatta, Kartini, dan banyak lagi 👑

**Keunikan Daerah:**
• Jawa Tengah: Batik, Candi Borobudur, Gudeg
• Bali: Pura, Tari Kecak, Subak
• Papua: Rumah Honai, Tari Yospan

Indonesia Tanah Airku! Mau tahu lebih banyak tentang daerah mana? 🗺️`;
};

// General response
const getGeneralResponse = (_message: string): string => {
  const responses = [
    "Halo! Saya Garuda dari SinarIlmu! 🚀 Tanya saja tentang Matematika, IPA, IPS, atau platform kami!",
    "Sebagai AI pembelajaran dari Desa Pliken, saya siap membantu! 📚 Mau belajar apa hari ini?",
    "SinarIlmu melayani 813 siswa dengan teknologi modern! 💻 Ada yang bisa saya bantu?",
    "Saya ahli Matematika, IPA, dan IPS tingkat SD! 🎓 Silakan bertanya!"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Error response
const getErrorResponse = (): string => {
  return "Maaf, ada gangguan kecil! 😅 Tapi saya tetap siap membantu belajar Matematika, IPA, IPS, atau cerita tentang SinarIlmu! Coba tanya lagi ya! 🎯";
};

// Quick responses
export const quickResponses: QuickResponses = {
  akademik: [
    "Ajari saya matematika dasar!",
    "Apa itu fotosintesis?", 
    "Ceritakan tentang Indonesia!",
    "Bagaimana cara menghitung luas persegi?"
  ],
  bantuan: [
    "Saya butuh bantuan PR!",
    "Tips mengerjakan ujian?",
    "Cara mengatasi malas belajar?",
    "Bagaimana belajar yang efektif?"
  ],
  platform: [
    "Apa itu SinarIlmu?",
    "Fitur apa saja yang tersedia?",
    "Bagaimana cara bergabung?",
    "Ceritakan tentang sekolah mitra!"
  ],
  fun: [
    "Kasih fakta menarik dong!",
    "Cerita tentang teknologi!",
    "Ajarkan permainan matematika!",
    "Apa hewan terbesar di dunia?"
  ]
};

// Chat history functions
export const saveChatHistory = (messages: Message[]): void => {
  try {
    localStorage.setItem('sinarilmu_chat_history', JSON.stringify(messages));
  } catch (error) {
    console.warn('Failed to save chat history:', error);
  }
};

export const loadChatHistory = (): Message[] | null => {
  try {
    const saved = localStorage.getItem('sinarilmu_chat_history');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load chat history:', error);
    return null;
  }
};

// Learning tracking functions
export const trackChatInteraction = (question: string, response: string): void => {
  try {
    const interaction: ChatInteraction = {
      timestamp: new Date().toISOString(),
      question: question.substring(0, 100),
      responseLength: response.length,
      subject: detectSubject(question)
    };
    
    const history: ChatInteraction[] = JSON.parse(localStorage.getItem('chat_interactions') || '[]');
    history.push(interaction);
    
    // Keep only last 100 interactions
    const trimmed = history.slice(-100);
    localStorage.setItem('chat_interactions', JSON.stringify(trimmed));
  } catch (error) {
    console.warn('Failed to track interaction:', error);
  }
};

export const trackLearningProgress = (subject: string, topic: string, status: string): void => {
  try {
    const progress: LearningProgress = {
      subject,
      topic,
      status,
      timestamp: new Date().toISOString()
    };
    
    const history: LearningProgress[] = JSON.parse(localStorage.getItem('learning_progress') || '[]');
    history.push(progress);
    
    localStorage.setItem('learning_progress', JSON.stringify(history.slice(-50)));
  } catch (error) {
    console.warn('Failed to track learning progress:', error);
  }
};

export const getLearningRecommendations = (): string[] => {
  try {
    const interactions: ChatInteraction[] = JSON.parse(localStorage.getItem('chat_interactions') || '[]');
    const subjects: { [key: string]: number } = {};
    
    interactions.forEach(interaction => {
      subjects[interaction.subject] = (subjects[interaction.subject] || 0) + 1;
    });
    
    const recommendations: string[] = [];
    
    if (subjects.matematika >= 3) {
      recommendations.push("Coba latihan soal cerita matematika untuk pemahaman yang lebih dalam!");
    }
    
    if (subjects.ipa >= 2) {
      recommendations.push("Lakukan eksperimen IPA sederhana di rumah!");
    }
    
    if (subjects.ips >= 2) {
      recommendations.push("Pelajari lebih banyak tentang budaya daerah Indonesia!");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Mulai dengan matematika dasar atau eksplorasi IPA yang menyenangkan!");
    }
    
    return recommendations;
  } catch (error) {
    return ["Terus semangat belajar dengan SinarIlmu!"];
  }
};

// Helper function to detect subject
const detectSubject = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('matematika') || lowerMessage.includes('hitung') || /[0-9+\-*/]/.test(message)) {
    return 'matematika';
  }
  if (lowerMessage.includes('ipa') || lowerMessage.includes('sains')) {
    return 'ipa';
  }
  if (lowerMessage.includes('ips') || lowerMessage.includes('indonesia')) {
    return 'ips';
  }
  if (lowerMessage.includes('sinarilmu') || lowerMessage.includes('platform')) {
    return 'platform';
  }
  
  return 'umum';
};