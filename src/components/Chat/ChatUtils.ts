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
  enableGeneralKnowledge: boolean;
  intelligentFallback: boolean;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  category?: string;
  subject?: string;
  isError?: boolean;
  confidence?: number;
}

export interface QuickResponses {
  [key: string]: string[];
}

export interface ChatInteraction {
  timestamp: string;
  question: string;
  responseLength: number;
  subject: string;
  responseType: 'ai' | 'rule' | 'fallback';
}

export interface LearningProgress {
  subject: string;
  topic: string;
  status: string;
  timestamp: string;
}

export interface MessageIntent {
  intent: string;
  keywords: string[];
}

export interface LearningInsights {
  totalQuestions: number;
  favoriteSubject: string;
  streak: number;
  improvement: string;
}

export interface SystemHealth {
  status: string;
  lastActivity: string;
  cacheSize: number;
  recommendations: number;
}

// Enhanced chat configuration
export const chatConfig: ChatConfig = {
  maxMessages: 50,
  maxMessageLength: 1000,
  typingDelay: {
    min: 1000,
    max: 3000
  },
  enableQuickResponses: true,
  enableLearningTracking: true,
  enableGeneralKnowledge: true,
  intelligentFallback: true
};

// Enhanced knowledge categories
export const KNOWLEDGE_CATEGORIES = {
  akademik: ['matematika', 'ipa', 'ips', 'bahasa indonesia', 'pkn', 'seni budaya'],
  umum: ['teknologi', 'sejarah dunia', 'geografi', 'kesehatan', 'olahraga', 'hiburan'],
  kehidupan: ['motivasi', 'tips belajar', 'pengembangan diri', 'karir masa depan'],
  aktual: ['berita', 'peristiwa terkini', 'tren', 'inovasi'],
  budaya: ['tradisi indonesia', 'bahasa daerah', 'kuliner', 'festival', 'adat istiadat'],
  sains: ['astronomi', 'fisika sederhana', 'kimia dasar', 'biologi', 'lingkungan']
};

// Preprocess message function
export const preprocessMessage = (message: string): string => {
  if (!message || typeof message !== 'string') return '';
  
  return message
    .trim()
    .replace(/\s+/g, ' ')
    .substring(0, chatConfig.maxMessageLength);
};

// Enhanced postprocess response function
export const postprocessResponse = (response: string): string => {
  if (!response || typeof response !== 'string') {
    return "Maaf, saya tidak bisa memproses permintaan itu. Coba tanya hal lain! 😊";
  }

  const wellFormattedIndicators = [
    '🔢 **', '🌱 **', '🤖 **', '🏫 **', '🌏 **', '💡 **', 
    '🎯 **', '📚 **', '🔬 **', '🎨 **', '⚽ **', '🍜 **'
  ];
  
  if (wellFormattedIndicators.some(indicator => response.includes(indicator))) {
    return response;
  }

  return cleanApiResponse(response);
};

// Enhanced math expression evaluator
const evaluateMathExpression = (expression: string): string | null => {
  try {
    // Remove non-math characters but preserve basic operations
    const cleanExpr = expression
      .replace(/[^0-9+\-*/().\s]/g, '')
      .trim();
    
    // Basic validation
    if (!/^[0-9+\-*/().\s]+$/.test(cleanExpr)) {
      return null;
    }
    
    if (cleanExpr.length > 100) return null;
    
    // Safe evaluation using Function constructor
    const result = Function('"use strict"; return (' + cleanExpr + ')')();
    
    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
      return Number(result.toFixed(10)).toString();
    }
    
    return null;
  } catch (error) {
    return null;
  }
};

// Enhanced math explanation generator
const getMathExplanation = (expression: string, result: string): string => {
  const cleanExpr = expression.replace(/[^0-9+\-*/().\s]/g, '').trim();
  
  if (cleanExpr.includes('*') && (cleanExpr.includes('+') || cleanExpr.includes('-'))) {
    return `Ingat urutan operasi matematika (BODMAS): tanda kurung → perkalian/pembagian → penjumlahan/pengurangan. Jadi ${cleanExpr} = ${result}`;
  }
  
  if (cleanExpr.includes('/')) {
    return `Pembagian: membagi angka menjadi bagian-bagian yang sama. ${cleanExpr} = ${result}`;
  }
  
  if (cleanExpr.includes('*')) {
    return `Perkalian: penjumlahan berulang. ${cleanExpr} = ${result}`;
  }
  
  return `Perhitungan sederhana: ${cleanExpr} = ${result}`;
};

// Enhanced academic responses
const getMathBasicsResponse = (): string => {
  return `🔢 **Matematika Dasar - Lengkap untuk SD**

**🧮 Operasi Dasar:**
• **Penjumlahan (+):** 15 + 27 = 42
• **Pengurangan (−):** 50 - 18 = 32  
• **Perkalian (×):** 8 × 9 = 72
• **Pembagian (÷):** 84 ÷ 12 = 7

**📏 Urutan Operasi (BODMAS):**
1. **B**rack (Kurung) () dulu
2. **O**rder (Pangkat) ^ 
3. **D**ivision & **M**ultiplication (÷ ×) dari kiri
4. **A**ddition & **S**ubtraction (+ −) dari kiri

**💡 Contoh Kompleks:** 
5 + 3 × (8 - 6)²
= 5 + 3 × (2)²
= 5 + 3 × 4  
= 5 + 12 = 17

**🎯 Tips Belajar:**
• Latih tabel perkalian 1-12
• Gunakan jari untuk penjumlahan dasar
• Buat soal cerita untuk pemahaman

Mau coba soal? Ketik operasi matematika apa saja! 🚀`;
};

const getIPAResponse = (): string => {
  return `🔬 **IPA - Ilmu Pengetahuan Alam**

**🌱 Topik Utama:**
• **Makhluk Hidup:** Tumbuhan, hewan, manusia
• **Benda & Materi:** Padat, cair, gas
• **Energi:** Cahaya, panas, listrik, bunyi
• **Lingkungan:** Ekosistem, pelestarian alam

**🧪 Eksperimen Sederhana:**
• Menanam kacang hijau dalam kapas
• Mencampur air dengan minyak
• Membuat pelangi dengan prisma
• Mengamati pertumbuhan tanaman

**🎯 Fakta Menarik:**
• Pohon menghasilkan oksigen untuk bernapas
• Air berubah bentuk: es → air → uap
• Matahari adalah sumber energi utama
• Manusia bagian dari ekosistem

Mari jelajahi keajaiban alam! 🌟`;
};

const getIPSResponse = (): string => {
  return `🌏 **IPS - Ilmu Pengetahuan Sosial**

**🇮🇩 Kebanggaan Indonesia:**
• **17.508 Pulau:** Dari Sabang sampai Merauke
• **1.340 Suku:** Keberagaman yang memukau
• **700+ Bahasa:** Kekayaan komunikasi
• **Bhinneka Tunggal Ika:** Berbeda tapi tetap satu

**🏛️ Sejarah Heroik:**
• Proklamasi 17 Agustus 1945
• Pahlawan: Soekarno, Hatta, Kartini
• Kerajaan: Majapahit, Sriwijaya
• Perjuangan kemerdekaan

**🗺️ Geografi Istimewa:**
• Gunung berapi aktif terbanyak
• Hutan hujan tropis luas
• Laut dan selat strategis
• Tanah subur untuk pertanian

Indonesia negara istimewa! 🏆`;
};

const getBahasaIndonesiaResponse = (): string => {
  return `📚 **Bahasa Indonesia - Bahasa Pemersatu**

**🎭 Jenis Sastra:**
• **Pantun:** 4 baris, rima a-b-a-b
• **Puisi:** Ungkapan perasaan indah
• **Cerita:** Dongeng, fabel, legenda
• **Drama:** Pertunjukan dialog

**📝 Contoh Pantun:**
*Buah mangga buah rambutan*
*Di pohon tinggi bergoyang*
*Mari kita rajin belajar*
*Agar masa depan cemerlang*

**🔤 Struktur Kalimat:**
• **SPOK:** Subjek + Predikat + Objek + Keterangan
• Contoh: Adik (S) membaca (P) buku (O) di perpustakaan (K)

Mari lestarikan bahasa Indonesia! 🇮🇩`;
};

const getPKNResponse = (): string => {
  return `🇮🇩 **PKN - Pendidikan Kewarganegaraan**

**⭐ Pancasila - Dasar Negara:**
1. **Ketuhanan Yang Maha Esa**
2. **Kemanusiaan yang Adil dan Beradab**
3. **Persatuan Indonesia**
4. **Kerakyatan yang Dipimpin oleh Hikmat**
5. **Keadilan Sosial bagi Seluruh Rakyat Indonesia**

**🏛️ Lembaga Negara:**
• **Presiden:** Kepala negara dan pemerintahan
• **DPR:** Membuat undang-undang  
• **MPR:** Lembaga tertinggi negara
• **Mahkamah Agung:** Lembaga kehakiman

**🎌 Simbol Negara:**
• Bendera: Merah Putih
• Lambang: Garuda Pancasila  
• Lagu: Indonesia Raya

Jadilah warga negara yang baik! 🏆`;
};

const getTechnologyResponse = (): string => {
  return `💻 **Teknologi - Mengubah Dunia**

**🌐 Internet & Komunikasi:**
• **World Wide Web:** Jaringan informasi global
• **Media Sosial:** Menghubungkan orang
• **Video Call:** Bicara meski berjauhan
• **Email:** Surat elektronik super cepat

**🤖 Teknologi Terdepan:**
• **AI:** Komputer yang "pintar"
• **Robot:** Mesin yang bisa bekerja
• **Virtual Reality:** Dunia maya terasa nyata
• **Smartphone:** Komputer mini

**⚡ Dampak Positif:**
• Mempermudah komunikasi dan belajar
• Menghemat waktu dan tenaga
• Membuka peluang kerja baru

Teknologi adalah alat - gunakan dengan bijak! 🚀`;
};

const getHealthResponse = (): string => {
  return `🏥 **Kesehatan - Investasi Terbaik**

**🥗 4 Sehat 5 Sempurna:**
• **Nasi/Roti:** Sumber energi
• **Sayuran:** Vitamin dan mineral
• **Lauk-pauk:** Protein untuk otot
• **Buah-buahan:** Vitamin C dan serat
• **Susu:** Kalsium untuk tulang

**💧 Hidup Sehat:**
• Minum air 8 gelas per hari
• Tidur 8-10 jam untuk anak
• Olahraga minimal 30 menit/hari
• Cuci tangan pakai sabun
• Sikat gigi 2x sehari

Kesehatan adalah harta terbesar! 🌟`;
};

const getSportsResponse = (): string => {
  return `⚽ **Olahraga - Tubuh Sehat, Jiwa Kuat**

**🏆 Olahraga Populer Indonesia:**
• **Sepak Bola:** Timnas Garuda
• **Bulu Tangkis:** Greysia/Apriyani juara Olimpiade  
• **Renang:** Atlet kebanggaan Indonesia
• **Atletik:** Lari, lompat, lempar

**🎯 Manfaat Olahraga:**
• **Fisik:** Otot kuat, jantung sehat
• **Mental:** Percaya diri, disiplin
• **Sosial:** Berteman, sportivitas
• **Akademik:** Fokus belajar meningkat

Olahraga bukan hanya kompetisi, tapi gaya hidup sehat! 🌟`;
};

const getCultureResponse = (): string => {
  return `🎭 **Budaya Indonesia - Kekayaan Tak Ternilai**

**🗺️ Keragaman Budaya:**
• **34 Provinsi:** Masing-masing unik
• **1.340 Suku Bangsa:** Dari Sabang sampai Merauke
• **700+ Bahasa Daerah:** Khazanah komunikasi
• **Bhinneka Tunggal Ika:** Berbeda tapi satu

**🎪 Seni Pertunjukan:**
• **Wayang:** Cerita Ramayana, Mahabharata
• **Kecak:** Tari api Bali
• **Saman:** Tari seribu tangan Aceh
• **Reog:** Singa barong Ponorogo

Indonesia = museum budaya hidup terbesar dunia! 🇮🇩`;
};

const getSinarIlmuResponse = (): string => {
  return `🏫 **SinarIlmu - Platform Pembelajaran Digital**

📍 **Lokasi:** Desa Pliken, Kembaran, Banyumas, Jawa Tengah

👥 **Melayani 813 siswa** di 4 Sekolah Dasar

🏆 **Pencapaian:**
• 92% siswa aktif menggunakan platform
• Nilai siswa meningkat 23%
• 95% guru terbantu platform

🚀 **Fitur Unggulan:**
• **AI Garuda:** Asisten pembelajaran (saya!)
• **Materi Interaktif:** Video, games, kuis
• **Tracking Progress:** Pantau perkembangan
• **Multi-Platform:** HP, tablet, komputer

Bangga jadi bagian transformasi pendidikan Indonesia! 🇮🇩✨`;
};

const getIntroductionResponse = (): string => {
  return `🤖 **Halo! Saya Garuda AI**

🚀 **Tentang Saya:**
• **Nama:** Garuda AI (burung kebanggaan Indonesia)
• **Profesi:** Asisten pembelajaran SinarIlmu
• **Spesialisasi:** Matematika, IPA, IPS, Bahasa Indonesia

📚 **Yang Bisa Saya Bantu:**
• 🔢 **Matematika:** Operasi dasar, geometri
• 🔬 **IPA:** Sains, alam, eksperimen
• 🌏 **IPS:** Indonesia, budaya, sejarah
• 💡 **Pengetahuan Umum:** Teknologi, kesehatan

🎯 **Keunggulan:**
• **24/7 Online:** Siap membantu kapan saja
• **Sabar:** Tidak bosan dengan pertanyaan
• **Ramah Anak:** Komunikasi aman dan mendidik

Tanya apa saja! 🌟`;
};

// Enhanced academic response handler
const getAcademicResponse = (lowerMessage: string): string | null => {
  if (lowerMessage.includes('matematika') || lowerMessage.includes('mtk') || lowerMessage.includes('ajari matematika')) {
    return getMathBasicsResponse();
  }
  
  if (lowerMessage.includes('ipa') || lowerMessage.includes('sains') || lowerMessage.includes('ilmu pengetahuan alam')) {
    return getIPAResponse();
  }
  
  if (lowerMessage.includes('ips') || lowerMessage.includes('indonesia') || lowerMessage.includes('sejarah indonesia')) {
    return getIPSResponse();
  }
  
  if (lowerMessage.includes('bahasa indonesia') || lowerMessage.includes('pantun') || lowerMessage.includes('puisi')) {
    return getBahasaIndonesiaResponse();
  }
  
  if (lowerMessage.includes('pkn') || lowerMessage.includes('pancasila') || lowerMessage.includes('kewarganegaraan')) {
    return getPKNResponse();
  }
  
  return null;
};

// General knowledge response handler
const getGeneralKnowledgeResponse = (lowerMessage: string): string | null => {
  if (lowerMessage.includes('teknologi') || lowerMessage.includes('komputer') || lowerMessage.includes('internet')) {
    return getTechnologyResponse();
  }
  
  if (lowerMessage.includes('kesehatan') || lowerMessage.includes('gizi') || lowerMessage.includes('makanan sehat')) {
    return getHealthResponse();
  }
  
  if (lowerMessage.includes('olahraga') || lowerMessage.includes('sepak bola') || lowerMessage.includes('basket')) {
    return getSportsResponse();
  }
  
  if (lowerMessage.includes('budaya indonesia') || lowerMessage.includes('tradisi') || lowerMessage.includes('adat')) {
    return getCultureResponse();
  }
  
  return null;
};

// Platform response handler
const getPlatformResponse = (lowerMessage: string): string | null => {
  if (lowerMessage.includes('sinarilmu') || lowerMessage.includes('apa itu sinar ilmu')) {
    return getSinarIlmuResponse();
  }
  
  if (lowerMessage.includes('siapa kamu') || lowerMessage.includes('siapa anda') || lowerMessage.includes('perkenalkan diri')) {
    return getIntroductionResponse();
  }
  
  return null;
};

// Enhanced error response
const getErrorResponse = (): string => {
  return `😅 **Oops! Ada Gangguan Kecil**

Maaf, sepertinya ada masalah teknis sebentar.

**💪 Saya Tetap Siap Membantu:**
• 🔢 Matematika: Operasi dasar, soal cerita
• 🔬 IPA: Sains menarik, eksperimen
• 🌏 IPS: Indonesia yang membanggakan
• 💡 Pengetahuan umum: teknologi, kesehatan, olahraga

Yuk coba lagi dengan pertanyaan yang lain! 🚀`;
};

// Message intent analyzer
const analyzeMessageIntent = (message: string): MessageIntent => {
  const questionWords = ['apa', 'siapa', 'dimana', 'kapan', 'mengapa', 'kenapa', 'bagaimana', 'berapa'];
  const helpWords = ['tolong', 'bantu', 'bantuan', 'help', 'bingung', 'tidak tahu'];
  const academicWords = ['belajar', 'pelajaran', 'sekolah', 'pr', 'tugas', 'ujian', 'nilai'];
  const personalWords = ['kamu', 'anda', 'siapa', 'nama', 'umur', 'tinggal'];
  const complimentWords = ['pintar', 'hebat', 'bagus', 'keren', 'terima kasih'];
  const greetingWords = ['halo', 'hai', 'hi', 'selamat', 'good', 'morning', 'siang', 'sore', 'malam'];
  
  const words = message.split(' ');
  const keywords: string[] = [];
  
  words.forEach(word => {
    if (word.length > 3) keywords.push(word);
  });
  
  if (questionWords.some(q => message.includes(q))) return { intent: 'question', keywords };
  if (helpWords.some(h => message.includes(h))) return { intent: 'help', keywords };
  if (academicWords.some(a => message.includes(a))) return { intent: 'academic', keywords };
  if (personalWords.some(p => message.includes(p))) return { intent: 'personal', keywords };
  if (complimentWords.some(c => message.includes(c))) return { intent: 'compliment', keywords };
  if (greetingWords.some(g => message.includes(g))) return { intent: 'greeting', keywords };
  
  return { intent: 'general', keywords };
};

// Intelligent fallback system
const getIntelligentFallback = (lowerMessage: string): string => {
  const messageAnalysis = analyzeMessageIntent(lowerMessage);
  
  switch (messageAnalysis.intent) {
    case 'question':
      return `🤔 **Pertanyaan Menarik!**

Saya belum bisa menjawab pertanyaan tentang "${messageAnalysis.keywords.join(', ')}" dengan detail.

**📚 Yang bisa saya bantu:**
• Matematika, IPA, IPS, Bahasa Indonesia
• Pengetahuan umum: teknologi, kesehatan, olahraga

Coba tanya hal lain yang menarik! 🚀`;
    
    case 'help':
      return `🆘 **Saya Siap Membantu!**

**📖 Bantuan Belajar:**
• PR Matematika, IPA, IPS
• Pengetahuan umum
• Tips belajar efektif

**💡 Cara bertanya:** Sebutkan mata pelajaran dan masalahnya

Coba tanya tentang pelajaran yang kamu butuhkan! 📚`;
    
    case 'greeting':
      return `👋 **Halo juga! Selamat datang di SinarIlmu!**

**🎯 Mau belajar apa hari ini?**
• 🔢 Matematika seru
• 🔬 IPA menakjubkan
• 🌏 IPS Indonesia
• 💡 Pengetahuan umum

Tanya apa saja yang ingin kamu ketahui! 🌈`;
    
    case 'compliment':
      return `😊 **Terima Kasih!**

Pujian seperti ini membuat saya semangat membantu!

**🌟 Yang membuat saya bahagia:**
• Bisa membantu kamu belajar
• Melihat kemajuan belajarmu
• Menjadi teman belajar yang baik

Ayo lanjut belajar hal menarik! 📚🚀`;
    
    default:
      return `💡 **Pertanyaan Menarik!**

Saya belum bisa memberikan jawaban terbaik.

**🎓 Saya ahli dalam:**
• Matematika, IPA, IPS, Bahasa Indonesia
• Pengetahuan umum: teknologi, kesehatan, olahraga

Coba tanya tentang topik-topik ini! 🚀`;
  }
};

// Enhanced context generator for AI
const getEnhancedContext = (message: string): string => {
  const subject = detectSubject(message);
  const baseContext = SINARILMU_AI_CONTEXT.systemPrompt;
  
  let enhancedContext = baseContext;
  
  if (subject === 'matematika') {
    enhancedContext += `\n\nFOKUS MATEMATIKA: Berikan penjelasan step-by-step, gunakan contoh konkret, mudah dipahami anak SD.`;
  } else if (subject === 'ipa') {
    enhancedContext += `\n\nFOKUS IPA: Jelaskan konsep sains dengan menarik, berikan contoh kehidupan sehari-hari.`;
  } else if (subject === 'ips') {
    enhancedContext += `\n\nFOKUS IPS: Ceritakan tentang Indonesia dengan bangga, kaitkan dengan keberagaman budaya.`;
  }
  
  enhancedContext += `\n\nPENTING: Gunakan bahasa Indonesia yang baik, ramah untuk anak SD, dan mendidik.`;
  
  return enhancedContext;
};

// AI response enhancer
const enhanceAiResponse = (response: string, subject: string): string => {
  const subjectEmojis: { [key: string]: string } = {
    'matematika': '🔢',
    'ipa': '🔬',
    'ips': '🌏',
    'platform': '💻',
    'teknologi': '💡',
    'kesehatan': '🏥',
    'olahraga': '⚽',
    'budaya': '🎭',
    'umum': '📚'
  };
  
  const emoji = subjectEmojis[subject] || '💡';
  
  if (!response.startsWith(emoji)) {
    response = `${emoji} ${response}`;
  }
  
  if (response.length < 200 && !response.includes('?')) {
    response += '\n\nAda hal lain yang ingin kamu tahu? Tanya saja! 😊';
  }
  
  return response;
};

// Subject detection
const detectSubject = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('matematika') || lowerMessage.includes('mtk') || lowerMessage.includes('hitung') || /[0-9+\-*/]/.test(message)) {
    return 'matematika';
  }
  if (lowerMessage.includes('ipa') || lowerMessage.includes('sains') || lowerMessage.includes('biologi') || lowerMessage.includes('fisika')) {
    return 'ipa';
  }
  if (lowerMessage.includes('ips') || lowerMessage.includes('sejarah') || lowerMessage.includes('geografi') || lowerMessage.includes('indonesia')) {
    return 'ips';
  }
  if (lowerMessage.includes('bahasa indonesia') || lowerMessage.includes('pantun') || lowerMessage.includes('puisi')) {
    return 'bahasa';
  }
  if (lowerMessage.includes('pkn') || lowerMessage.includes('pancasila') || lowerMessage.includes('kewarganegaraan')) {
    return 'pkn';
  }
  if (lowerMessage.includes('teknologi') || lowerMessage.includes('komputer') || lowerMessage.includes('internet')) {
    return 'teknologi';
  }
  if (lowerMessage.includes('kesehatan') || lowerMessage.includes('gizi') || lowerMessage.includes('olahraga')) {
    return 'kesehatan';
  }
  if (lowerMessage.includes('budaya') || lowerMessage.includes('tradisi') || lowerMessage.includes('adat')) {
    return 'budaya';
  }
  if (lowerMessage.includes('sinarilmu') || lowerMessage.includes('platform') || lowerMessage.includes('garuda')) {
    return 'platform';
  }
  
  return 'umum';
};

// Response type detector
const determineResponseType = (response: string): 'ai' | 'rule' | 'fallback' => {
  if (response.includes('🔢 **') || response.includes('🔬 **') || response.includes('🌏 **')) {
    return 'rule';
  }
  if (response.includes('Maaf') || response.includes('belum bisa') || response.includes('gangguan')) {
    return 'fallback';
  }
  return 'ai';
};

// COMPREHENSIVE RULE-BASED RESPONSE SYSTEM
export const getRuleBasedResponse = async (message: string): Promise<string> => {
  try {
    const lowerMessage = message.toLowerCase().trim();
    const isComplexQuestion = message.length > 100 || 
                              message.includes('?') || 
                              message.includes('bagaimana') || 
                              message.includes('mengapa') || 
                              message.includes('kenapa') || 
                              message.includes('jelaskan');
    
    // 1. Handle math expressions first
    const mathResult = evaluateMathExpression(message);
    if (mathResult !== null) {
      return `🔢 **Hasil Perhitungan:** ${mathResult}\n\n💡 **Penjelasan:** ${getMathExplanation(message, mathResult)}`;
    }
    
    // 2. Handle educational topics
    const academicResponse = getAcademicResponse(lowerMessage);
    if (academicResponse) return academicResponse;
    
    // 3. Handle general knowledge
    const generalResponse = getGeneralKnowledgeResponse(lowerMessage);
    if (generalResponse) return generalResponse;
    
    // 4. Handle platform questions
    const platformResponse = getPlatformResponse(lowerMessage);
    if (platformResponse) return platformResponse;
    
    // 5. Try AI for complex questions
    if (isComplexQuestion || chatConfig.enableGeneralKnowledge) {
      try {
        const enhancedContext = getEnhancedContext(lowerMessage);
        const aiResponse = await apiClient.makeGrokRequest(message, enhancedContext);
        
        if (aiResponse.success && aiResponse.response) {
          return enhanceAiResponse(aiResponse.response, detectSubject(message));
        }
      } catch (error) {
        console.warn('AI API failed, using fallback:', error);
      }
    }
    
    // 6. Intelligent fallback
    return getIntelligentFallback(lowerMessage);
    
  } catch (error) {
    console.error('Error in getRuleBasedResponse:', error);
    return getErrorResponse();
  }
};

// Quick responses
export const quickResponses: QuickResponses = {
  akademik: [
    "Ajari saya matematika dasar!",
    "Apa itu fotosintesis?", 
    "Ceritakan tentang Indonesia!",
    "Bagaimana cara menghitung luas persegi?"
  ],
  umum: [
    "Apa itu teknologi AI?",
    "Makanan sehat untuk anak",
    "Olahraga yang menyenangkan",
    "Bagaimana cara menjaga lingkungan?"
  ],
  budaya: [
    "Cerita tentang budaya Indonesia",
    "Makanan khas daerah",
    "Permainan tradisional",
    "Bahasa daerah di Indonesia"
  ],
  bantuan: [
    "Saya butuh bantuan PR!",
    "Tips mengerjakan ujian?",
    "Cara mengatasi malas belajar?",
    "Bagaimana belajar yang efektif?"
  ]
};

// Chat history functions
export const saveChatHistory = (messages: Message[]): void => {
  try {
    const dataToSave = {
      messages: messages,
      timestamp: new Date().toISOString(),
      version: '2.0'
    };
    localStorage.setItem('sinarilmu_chat_history', JSON.stringify(dataToSave));
  } catch (error) {
    console.warn('Failed to save chat history:', error);
  }
};

export const loadChatHistory = (): Message[] | null => {
  try {
    const saved = localStorage.getItem('sinarilmu_chat_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      } else if (parsed.messages) {
        return parsed.messages;
      }
    }
    return null;
  } catch (error) {
    console.warn('Failed to load chat history:', error);
    return null;
  }
};

// Learning tracking
export const trackChatInteraction = (question: string, response: string): void => {
  try {
    const interaction: ChatInteraction = {
      timestamp: new Date().toISOString(),
      question: question.substring(0, 200),
      responseLength: response.length,
      subject: detectSubject(question),
      responseType: determineResponseType(response)
    };
    
    const history: ChatInteraction[] = JSON.parse(localStorage.getItem('chat_interactions') || '[]');
    history.push(interaction);
    
    const trimmed = history.slice(-200);
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
    
    localStorage.setItem('learning_progress', JSON.stringify(history.slice(-100)));
  } catch (error) {
    console.warn('Failed to track learning progress:', error);
  }
};

// Learning recommendations
export const getLearningRecommendations = (): string[] => {
  try {
    const interactions: ChatInteraction[] = JSON.parse(localStorage.getItem('chat_interactions') || '[]');
    const subjects: { [key: string]: number } = {};
    
    interactions.slice(-20).forEach(interaction => {
      subjects[interaction.subject] = (subjects[interaction.subject] || 0) + 1;
    });
    
    const recommendations: string[] = [];
    
    if (subjects.matematika >= 3) {
      recommendations.push("🔢 Lanjutkan dengan soal cerita matematika!");
    }
    
    if (subjects.ipa >= 2) {
      recommendations.push("🔬 Coba eksperimen IPA sederhana di rumah!");
    }
    
    if (subjects.ips >= 2) {
      recommendations.push("🌏 Eksplorasi keberagaman budaya Indonesia!");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("🌟 Mulai dengan matematika atau sains yang menyenangkan!");
    }
    
    return recommendations.slice(0, 3);
    
  } catch (error) {
    console.warn('Error getting recommendations:', error);
    return ["🚀 Terus semangat belajar dengan SinarIlmu!"];
  }
};

// Learning insights
export const getLearningInsights = (): LearningInsights => {
  try {
    const interactions: ChatInteraction[] = JSON.parse(localStorage.getItem('chat_interactions') || '[]');
    const subjects: { [key: string]: number } = {};
    
    interactions.forEach(interaction => {
      subjects[interaction.subject] = (subjects[interaction.subject] || 0) + 1;
    });
    
    const favoriteSubject = Object.keys(subjects).reduce((a, b) => 
      subjects[a] > subjects[b] ? a : b, 'umum'
    );
    
    return {
      totalQuestions: interactions.length,
      favoriteSubject,
      streak: 1,
      improvement: 'Tetap semangat belajar!'
    };
  } catch (error) {
    return {
      totalQuestions: 0,
      favoriteSubject: 'umum',
      streak: 0,
      improvement: 'Mulai petualangan belajar!'
    };
  }
};

// System health
export const getSystemHealth = (): SystemHealth => {
  try {
    const interactions = JSON.parse(localStorage.getItem('chat_interactions') || '[]');
    const lastActivity = interactions.length > 0 ? interactions[interactions.length - 1].timestamp : 'Never';
    const cacheSize = new Blob([localStorage.getItem('sinarilmu_chat_history') || '']).size;
    
    return {
      status: 'Healthy',
      lastActivity,
      cacheSize,
      recommendations: getLearningRecommendations().length
    };
  } catch (error) {
    return {
      status: 'Error',
      lastActivity: 'Unknown',
      cacheSize: 0,
      recommendations: 0
    };
  }
};

// Clear user data
export const clearAllUserData = (): void => {
  try {
    const keysToRemove = [
      'sinarilmu_chat_history',
      'sinarilmu_chat_backup',
      'chat_interactions',
      'learning_progress',
      'daily_stats'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log('🗑️ All user data cleared successfully');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

// Enhanced configuration
export const ENHANCED_CONFIG = {
  ...chatConfig,
  knowledgeCategories: KNOWLEDGE_CATEGORIES,
  supportedLanguages: ['id', 'en'],
  maxContextLength: 4000,
  intelligentRouting: true,
  adaptiveLearning: true
};