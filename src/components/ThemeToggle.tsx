import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
};

const ThemeToggle = ({ 
  size = "sm", 
  className = "",
  variant = "default"
}: { 
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "default" | "floating" | "pill";
}) => {
  const { isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: "p-2.5 w-10 h-10",
    md: "p-3 w-12 h-12", 
    lg: "p-3.5 w-14 h-14"
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "floating":
        return `
          bg-white/90 dark:bg-gray-800/90 backdrop-blur-md
          border border-gray-200/50 dark:border-gray-700/50
          shadow-lg hover:shadow-xl
          hover:bg-white dark:hover:bg-gray-800
        `;
      case "pill":
        return `
          bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700
          border border-primary-200/50 dark:border-gray-600/50
          hover:from-primary-100 hover:to-secondary-100 dark:hover:from-gray-700 dark:hover:to-gray-600
        `;
      default:
        return `
          bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm
          border border-gray-200/30 dark:border-gray-700/30
          hover:bg-gray-200/80 dark:hover:bg-gray-700/80
        `;
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative rounded-full transition-all duration-300 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
        group overflow-hidden
        ${sizeClasses[size]} ${getVariantClasses()} ${className}
      `}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{ 
          scale: isDark ? [1, 1.2, 1] : [1, 1.1, 1],
          rotate: isDark ? 180 : 0 
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-secondary-500 dark:text-secondary-400"
            >
              {/* Modern Sun Icon */}
              <svg 
                className={iconSizeClasses[size]} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <circle cx="12" cy="12" r="4"/>
                <path d="m12 2 0 2"/>
                <path d="m12 20 0 2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="m2 12 2 0"/>
                <path d="m20 12 2 0"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-primary-600 dark:text-primary-400"
            >
              {/* Modern Moon Icon */}
              <svg 
                className={iconSizeClasses[size]} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary-500/20"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: isDark ? 1 : 0, opacity: isDark ? 0 : 0.5 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Glow effect for dark mode */}
      {isDark && (
        <motion.div
          className="absolute inset-0 rounded-full bg-secondary-400/30 blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
};

// Enhanced version with label (optional)
export const ThemeToggleWithLabel = ({ 
  size = "md",
  showLabel = true,
  variant = "default" 
}: {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  variant?: "default" | "floating" | "pill";
}) => {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle size={size} variant={variant} />
      {showLabel && (
        <motion.span
          initial={false}
          animate={{ opacity: 1 }}
          className="text-sm font-medium text-gray-600 dark:text-gray-400 font-body"
        >
          {isDark ? 'Dark' : 'Light'} Mode
        </motion.span>
      )}
    </div>
  );
};

export default ThemeToggle;