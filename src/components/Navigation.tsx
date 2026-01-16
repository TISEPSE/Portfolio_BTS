import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  currentPage: 'home' | 'projects' | 'bts' | 'rss';
  setCurrentPage: (page: 'home' | 'projects' | 'bts' | 'rss') => void;
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
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-3.5 sm:py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateToPage('home')}
            className="text-lg sm:text-xl tracking-tight hover:opacity-70 active:scale-95 transition-all min-h-[44px] flex items-center"
          >
            Baptiste Demé
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-slate-900 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-slate-900 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full min-h-[44px] flex items-center"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('a-propos')}
              className="text-slate-900 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-slate-900 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full min-h-[44px] flex items-center"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('formations')}
              className="text-slate-900 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-slate-900 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full min-h-[44px] flex items-center"
            >
              Formations
            </button>
            <button
              onClick={() => navigateToPage('projects')}
              className="text-slate-900 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-slate-900 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full min-h-[44px] flex items-center"
            >
              Projets
            </button>
            <button
              onClick={() => navigateToPage('bts')}
              className="text-slate-900 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-slate-900 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full min-h-[44px] flex items-center"
            >
              BTS
            </button>
            <button
              onClick={() => navigateToPage('rss')}
              className="text-slate-900 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-slate-900 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full min-h-[44px] flex items-center"
            >
              Veille
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-95 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-5 pb-3 flex flex-col gap-1">
                {[
                  { label: 'Accueil', action: () => scrollToSection('accueil') },
                  { label: 'À propos', action: () => scrollToSection('a-propos') },
                  { label: 'Formations', action: () => scrollToSection('formations') },
                  { label: 'Projets', action: () => navigateToPage('projects') },
                  { label: 'BTS', action: () => navigateToPage('bts') },
                  { label: 'Veille', action: () => navigateToPage('rss') }
                ].map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    onClick={item.action}
                    className="text-left text-base text-slate-900 min-h-[48px] px-2 flex items-center relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-slate-900 after:left-2 after:bottom-3 after:transition-all after:duration-300 active:after:w-[calc(100%-1rem)]"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}