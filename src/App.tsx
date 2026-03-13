import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { ProjectsPage } from './components/ProjectsPage';
import { BTSPage } from './components/BTSPage';
import { RSSPage } from './components/RSSPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projets" element={<ProjectsPage />} />
          <Route path="/bts" element={<BTSPage />} />
          <Route path="/veille" element={<RSSPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
