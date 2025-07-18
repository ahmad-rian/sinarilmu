import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X, MessageCircle, Minimize2, Maximize2, RefreshCw, Zap, Clock, BookOpen, Trophy, Target } from 'lucide-react';
import { 
  getRuleBasedResponse, 
  preprocessMessage, 
  postprocessResponse, 
  quickResponses, 
  chatConfig,
  saveChatHistory,
  loadChatHistory,
  trackChatInteraction,
  trackLearningProgress,
  getLearningRecommendations
} from './ChatUtils';

const GarudaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! Saya Garuda, asisten AI untuk platform SinarIlmu! 🚀 Saya siap membantu kamu belajar Matematika, IPA, IPS, dan berbagai hal menarik lainnya. Mau belajar apa hari ini?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      category: 'greeting'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('umum');
  const [learningStreak, setLearningStreak] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeQuickCategory, setActiveQuickCategory] = useState('akademik');
  const [isMobile, setIsMobile] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatStartTime = useRef(Date.now());

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load chat history dan learning stats saat component mount
  useEffect(() => {
    try {
      const savedMessages = loadChatHistory();
      if (savedMessages && savedMessages.length > 1) {
        setMessages(savedMessages);
      }
      
      // Load learning stats
      const stats = JSON.parse(localStorage.getItem('learning_stats') || '{}');
      setLearningStreak(stats.streak || 0);
      setTotalQuestions(stats.totalQuestions || 0);
    } catch (error) {
      console.warn('Error loading chat history:', error);
    }
  }, []);

  // Auto-save messages dengan enhanced tracking
  useEffect(() => {
    if (messages.length > 1) {
      try {
        saveChatHistory(messages);
        
        // Update learning stats
        const userMessages = messages.filter(msg => msg.sender === 'user');
        const stats = {
          streak: learningStreak,
          totalQuestions: userMessages.length,
          lastActivity: new Date().toISOString(),
          subjects: {}
        };
        
        // Track subjects discussed
        userMessages.forEach(msg => {
          const subject = detectSubjectFromMessage(msg.text);
          stats.subjects[subject] = (stats.subjects[subject] || 0) + 1;
        });
        
        localStorage.setItem('learning_stats', JSON.stringify(stats));
        setTotalQuestions(userMessages.length);
      } catch (error) {
        console.warn('Error saving chat data:', error);
      }
    }
  }, [messages, learningStreak]);

  // Enhanced message handling dengan proper async dan error handling
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const cleanMessage = preprocessMessage(inputMessage.trim());
    
    if (cleanMessage.length > chatConfig.maxMessageLength) {
      alert(`Pesan terlalu panjang! Maksimal ${chatConfig.maxMessageLength} karakter.`);
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: cleanMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      subject: detectSubjectFromMessage(cleanMessage)
    };

    // Add user message immediately
    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      return newMessages.length > chatConfig.maxMessages 
        ? newMessages.slice(-chatConfig.maxMessages)
        : newMessages;
    });

    setInputMessage('');
    setIsTyping(true);
    setIsLoading(true);
    setCurrentSubject(userMessage.subject);

    // Realistic typing delay
    const complexity = Math.min(cleanMessage.length / 10, 10);
    const typingDelay = chatConfig.typingDelay.min + (complexity * 200);
    
    try {
      // Wait for typing animation
      await new Promise(resolve => setTimeout(resolve, typingDelay));

      console.log('Processing message:', cleanMessage);
      
      // Get AI response with fallback
      let rawResponse;
      try {
        rawResponse = await getRuleBasedResponse(cleanMessage);
      } catch (apiError) {
        console.warn('AI API failed, using fallback:', apiError);
        rawResponse = getFallbackResponse(cleanMessage, userMessage.subject);
      }
      
      // Clean up response - remove unnecessary asterisks and formatting issues
      const cleanedResponse = cleanUpResponse(rawResponse);
      const finalResponse = postprocessResponse(cleanedResponse);
      
      const botMessage = {
        id: Date.now() + 1,
        text: finalResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        category: detectResponseCategory(finalResponse),
        subject: userMessage.subject
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Track interaction
      try {
        trackChatInteraction(cleanMessage, finalResponse);
        
        // Track learning progress for academic subjects
        if (['matematika', 'ipa', 'ips'].includes(userMessage.subject)) {
          trackLearningProgress(userMessage.subject, 'general', 'engaged');
          
          // Update streak
          const today = new Date().toDateString();
          const lastActivity = localStorage.getItem('last_learning_day');
          if (lastActivity !== today) {
            setLearningStreak(prev => prev + 1);
            localStorage.setItem('last_learning_day', today);
          }
        }

        // Show recommendations periodically
        if (messages.length > 0 && messages.length % 8 === 0) {
          setShowRecommendations(true);
        }
      } catch (trackingError) {
        console.warn('Error tracking interaction:', trackingError);
      }

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Enhanced error handling with helpful fallback
      const errorMessage = {
        id: Date.now() + 1,
        text: getErrorMessage(error),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        isError: true,
        category: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  // Function to clean up response and improve formatting
  const cleanUpResponse = (response) => {
    if (!response || typeof response !== 'string') {
      return "Maaf, saya tidak bisa memproses permintaan itu. Coba tanya hal lain! 😊";
    }

    return response
      // Remove excessive asterisks used for emphasis
      .replace(/\*{2,}/g, '') 
      // Clean up markdown-style formatting that looks messy
      .replace(/\*([^*]+)\*/g, '$1')
      // Add line breaks for better readability
      .replace(/([.!?])\s+([A-Z🔢🔬🌏💻📚📈📊🎉🚀])/g, '$1\n\n$2')
      // Add breaks after emojis that end sentences
      .replace(/([.!?][🔢🔬🌏💻📚📈📊🎉🚀🤔💡🌟])\s+([A-Z])/g, '$1\n\n$2')
      // Remove multiple spaces but preserve line breaks
      .replace(/ +/g, ' ')
      // Clean up excessive line breaks
      .replace(/\n{3,}/g, '\n\n')
      // Trim whitespace
      .trim();
  };

  // Fallback response when AI fails
  const getFallbackResponse = (message, subject) => {
    const fallbackResponses = {
      matematika: "Matematika itu seru! Coba tanya saya tentang penjumlahan, pengurangan, perkalian, atau pembagian. Saya juga bisa bantu dengan soal cerita! 🔢",
      ipa: "IPA penuh dengan hal menarik! Tanya saya tentang alam, hewan, tumbuhan, atau eksperimen sederhana yang bisa kamu coba di rumah! 🔬",
      ips: "Mari belajar tentang Indonesia! Saya bisa ceritakan tentang budaya, sejarah, atau keunikan daerah di Indonesia! 🇮🇩",
      platform: "SinarIlmu adalah platform pembelajaran digital terbaik untuk anak-anak Desa Pliken! Kami membantu 813 siswa di 4 SDN dengan teknologi modern! 💻",
      umum: "Saya siap membantu kamu belajar! Tanya saja tentang Matematika, IPA, IPS, atau hal menarik lainnya. Apa yang ingin kamu pelajari hari ini? 🎓"
    };

    return fallbackResponses[subject] || fallbackResponses.umum;
  };

  // Enhanced error message generator
  const getErrorMessage = (error) => {
    if (error.message?.includes('fetch')) {
      return "Koneksi internet bermasalah. Tapi jangan khawatir, saya tetap bisa membantu dengan pengetahuan dasar! Coba tanya tentang Matematika, IPA, atau IPS! 📶";
    }
    
    if (error.message?.includes('timeout')) {
      return "Respons AI terlalu lama. Mari kita coba lagi dengan pertanyaan yang lebih sederhana! 😊";
    }
    
    return "Ada gangguan kecil, tapi saya tetap semangat membantu! Coba tanya tentang pelajaran atau SinarIlmu ya! 🚀";
  };

  // Enhanced quick response categories
  const quickResponseCategories = {
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

  const handleQuickResponse = (response) => {
    setInputMessage(response);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Utility functions
  const detectSubjectFromMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('matematika') || lowerMessage.includes('mtk') || lowerMessage.includes('hitung')) return 'matematika';
    if (lowerMessage.includes('ipa') || lowerMessage.includes('sains') || lowerMessage.includes('biologi')) return 'ipa';
    if (lowerMessage.includes('ips') || lowerMessage.includes('sosial') || lowerMessage.includes('indonesia')) return 'ips';
    if (lowerMessage.includes('sinarilmu') || lowerMessage.includes('platform')) return 'platform';
    
    return 'umum';
  };

  const detectResponseCategory = (response) => {
    if (response.includes('matematika') || response.includes('🔢')) return 'matematika';
    if (response.includes('IPA') || response.includes('🔬')) return 'ipa';
    if (response.includes('IPS') || response.includes('🌏')) return 'ips';
    if (response.includes('SinarIlmu') || response.includes('💻')) return 'platform';
    return 'conversational';
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear chat function
  const clearChat = () => {
    const initialMessage = {
      id: 1,
      text: "Chat telah direset! Saya Garuda, siap membantu kamu belajar lagi. Ada yang bisa saya bantu? 🚀",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      category: 'greeting'
    };
    setMessages([initialMessage]);
    localStorage.removeItem('sinarilmu_chat_history');
    setCurrentSubject('umum');
    setShowRecommendations(false);
    chatStartTime.current = Date.now();
  };

  // Helper functions for UI
  const getSessionDuration = () => {
    const duration = Math.floor((Date.now() - chatStartTime.current) / 1000 / 60);
    return duration < 1 ? '<1' : duration;
  };

  const getSubjectIcon = (subject) => {
    switch(subject) {
      case 'matematika': return '🔢';
      case 'ipa': return '🔬';
      case 'ips': return '🌏';
      case 'platform': return '💻';
      default: return '💬';
    }
  };

  const getSubjectColor = (subject) => {
    switch(subject) {
      case 'matematika': return 'text-blue-600 dark:text-blue-400';
      case 'ipa': return 'text-green-600 dark:text-green-400';
      case 'ips': return 'text-orange-600 dark:text-orange-400';
      case 'platform': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Format message text with proper line breaks and paragraphs
  const formatMessageText = (text) => {
    if (!text || typeof text !== 'string') return '';
    
    // Split by multiple line breaks for paragraphs
    const paragraphs = text.split(/\n\s*\n/);
    
    return paragraphs.map((paragraph, pIndex) => {
      // Split individual lines within paragraphs
      const lines = paragraph.split('\n').filter(line => line.trim() !== '');
      
      return (
        <div key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>
          {lines.map((line, lIndex) => (
            <div key={lIndex} className={lIndex > 0 ? 'mt-1' : ''}>
              {line.trim()}
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <div className="fixed z-50 bottom-4 right-4">
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
          >
            <MessageCircle size={24} />
            
            {/* Learning Stats Badge */}
            {learningStreak > 0 && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Trophy size={10} />
                {learningStreak}
              </div>
            )}
            
            {/* Hover Text - Hidden on mobile */}
            {!isMobile && (
              <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Garuda AI - Asisten Pembelajaran
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
              isMobile 
                ? 'fixed inset-0 w-full h-full' 
                : isMinimized 
                  ? 'w-80 h-16 rounded-2xl' 
                  : 'w-96 h-[650px] rounded-2xl'
            }`}
          >
            {/* Enhanced Header */}
            <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between flex-shrink-0 ${
              isMobile 
                ? '' 
                : isMinimized 
                  ? 'rounded-2xl' 
                  : 'rounded-t-2xl'
            }`}>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    Garuda AI 
                    <span className="bg-green-500 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Zap size={8} />
                      SMART
                    </span>
                  </h3>
                  {!isMinimized && (
                    <p className="text-xs text-white/80 truncate">
                      {isLoading ? 'Mengetik...' : `${getSubjectIcon(currentSubject)} Asisten Pembelajaran • Online 24/7`}
                    </p>
                  )}
                  {isMinimized && (
                    <p className="text-xs text-white/80 truncate">
                      {totalQuestions} pertanyaan • Streak {learningStreak}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                {!isMobile && (
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title={isMinimized ? 'Perbesar' : 'Perkecil'}
                  >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                  </button>
                )}
                {!isMinimized && (
                  <button
                    onClick={clearChat}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Reset Chat"
                  >
                    <RefreshCw size={16} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Tutup"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Enhanced Status Bar */}
            {!isMinimized && (
              <>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-b border-green-200 dark:border-green-800 p-3 flex-shrink-0">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-green-700 dark:text-green-300">
                        <BookOpen size={12} />
                        Smart Learning AI
                      </span>
                      <span className="flex items-center gap-1 text-blue-700 dark:text-blue-300">
                        <Clock size={12} />
                        {getSessionDuration()}m
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {learningStreak > 0 && (
                        <span className="flex items-center gap-1 text-yellow-700 dark:text-yellow-300">
                          <Trophy size={12} />
                          {learningStreak}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
                        <Target size={12} />
                        {totalQuestions}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-0">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : message.isError
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {message.sender === 'bot' && (
                            <Bot size={16} className={`mt-1 flex-shrink-0 ${
                              message.isError ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'
                            }`} />
                          )}
                          {message.sender === 'user' && (
                            <User size={16} className="mt-1 text-white flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm leading-relaxed break-words">
                              {formatMessageText(message.text)}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <p className={`text-xs ${
                                message.sender === 'user' 
                                  ? 'text-white/70' 
                                  : message.isError
                                  ? 'text-red-500/70'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                {message.timestamp}
                              </p>
                              {message.subject && message.subject !== 'umum' && (
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  message.sender === 'user' 
                                    ? 'bg-white/20 text-white/80' 
                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                                }`}>
                                  {getSubjectIcon(message.subject)} {message.subject}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Enhanced Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Garuda sedang berpikir...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Learning Recommendations */}
                {showRecommendations && (
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-t border-yellow-200 dark:border-yellow-800 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-200 flex items-center gap-1">
                        <Trophy size={14} />
                        Rekomendasi Belajar
                      </h4>
                      <button
                        onClick={() => setShowRecommendations(false)}
                        className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {getLearningRecommendations().slice(0, 2).map((rec, index) => (
                        <p key={index} className="text-xs text-yellow-700 dark:text-yellow-300">
                          • {rec}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Quick Responses */}
                {chatConfig.enableQuickResponses && messages.length <= 3 && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Zap size={12} />
                        Mulai belajar dengan:
                      </p>
                      <div className="flex gap-1 overflow-x-auto">
                        {Object.keys(quickResponseCategories).map((category) => (
                          <button
                            key={category}
                            onClick={() => setActiveQuickCategory(category)}
                            className={`px-2 py-1 rounded-full text-xs capitalize transition-all whitespace-nowrap ${
                              activeQuickCategory === category
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {quickResponseCategories[activeQuickCategory].map((response, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickResponse(response)}
                          className="px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all text-left border border-blue-200 dark:border-gray-600"
                          disabled={isLoading}
                        >
                          {response}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Input Section */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <div onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      placeholder="Tanya tentang Matematika, IPA, IPS, atau hal lainnya..."
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm disabled:opacity-50"
                      disabled={isLoading}
                      maxLength={chatConfig.maxMessageLength}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-3 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      {isLoading ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                    </button>
                  </div>
                  
                  {/* Enhanced Footer Info */}
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <BookOpen size={10} />
                        Pembelajaran Adaptif
                      </span>
                      <span className="flex items-center gap-1">
                        <Bot size={10} />
                        AI Powered
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`${
                        inputMessage.length > chatConfig.maxMessageLength * 0.8 
                          ? 'text-orange-500' 
                          : 'text-gray-400'
                      }`}>
                        {inputMessage.length}/{chatConfig.maxMessageLength}
                      </span>
                      {currentSubject !== 'umum' && (
                        <span className={`${getSubjectColor(currentSubject)}`}>
                          {getSubjectIcon(currentSubject)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GarudaChat;