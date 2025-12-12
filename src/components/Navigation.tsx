import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'projects' | 'rss';
  setCurrentPage: (page: 'home' | 'projects' | 'rss') => void;
}

export function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setCurrentPage('home');
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navigateToPage = (page: 'home' | 'projects' | 'rss') => {
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigateToPage('home')}
            className="text-xl tracking-tight hover:opacity-70 transition-opacity"
          >
            Baptiste Demé
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('accueil')} 
              className={`hover:opacity-70 transition-opacity ${currentPage === 'home' ? 'opacity-100' : 'opacity-60'}`}
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('a-propos')} 
              className={`hover:opacity-70 transition-opacity ${currentPage === 'home' ? 'opacity-100' : 'opacity-60'}`}
            >
              À propos
            </button>
            <button 
              onClick={() => scrollToSection('formations')} 
              className={`hover:opacity-70 transition-opacity ${currentPage === 'home' ? 'opacity-100' : 'opacity-60'}`}
            >
              Formations
            </button>
            <button 
              onClick={() => navigateToPage('projects')} 
              className={`hover:opacity-70 transition-opacity ${currentPage === 'projects' ? 'opacity-100' : 'opacity-60'}`}
            >
              Projets
            </button>
            <button 
              onClick={() => navigateToPage('rss')} 
              className={`hover:opacity-70 transition-opacity ${currentPage === 'rss' ? 'opacity-100' : 'opacity-60'}`}
            >
              Actualités
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col gap-4">
            <button onClick={() => scrollToSection('accueil')} className="text-left hover:opacity-70 transition-opacity">
              Accueil
            </button>
            <button onClick={() => scrollToSection('a-propos')} className="text-left hover:opacity-70 transition-opacity">
              À propos
            </button>
            <button onClick={() => scrollToSection('formations')} className="text-left hover:opacity-70 transition-opacity">
              Formations
            </button>
            <button onClick={() => navigateToPage('projects')} className="text-left hover:opacity-70 transition-opacity">
              Projets
            </button>
            <button onClick={() => navigateToPage('rss')} className="text-left hover:opacity-70 transition-opacity">
              Actualités
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}