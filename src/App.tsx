import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { ProjectsPage } from './components/ProjectsPage';
import { RSSPage } from './components/RSSPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'projects' | 'rss'>('home');

  // Effet pour faire défiler vers le haut lorsque la page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="bg-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'projects' && <ProjectsPage />}
      {currentPage === 'rss' && <RSSPage />}
    </div>
  );
}
