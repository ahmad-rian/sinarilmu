import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';


import Home from './pages/Home';
import About from './pages/About';
import Learn from './pages/Learn';
import Schools from './pages/Schools';
import Community from './pages/Community';

import NotFound from './pages/NotFound';

function App() {
  return (
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
      </Layout>
    </Router>
  );
}

export default App;