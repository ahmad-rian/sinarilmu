// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Learn from './pages/Learn';
import Schools from './pages/Schools';
import Community from './pages/Community';
import NotFound from './pages/NotFound';

// Error Boundary Component
import ErrorBoundary from './components/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Analytics />
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;