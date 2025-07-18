// src/components/layout/Layout.tsx
import React from 'react';
import type { ReactNode } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import GarudaChat from '../Chat/GarudaChat';

// Type untuk props children
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Chat Garuda AI */}
      <GarudaChat />
    </div>
  );
};

export default Layout;