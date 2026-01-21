import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useGitHub } from '../hooks/useGitHub';

interface HeroProps {
  setCurrentPage: (page: 'home' | 'projects' | 'rss') => void;
}

export function Hero({ setCurrentPage }: HeroProps) {
  const { user } = useGitHub();

  const scrollToAbout = () => {
    const element = document.getElementById('a-propos');
    if (element) {
      // Calcul du centering parfait
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      const offset = elementTop - (windowHeight / 2) + (elementHeight / 2);
      
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center pt-20 px-5 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Avatar GitHub */}
          {user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 sm:mb-10 flex justify-center"
            >
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative touch-target-expand"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-24 md:h-24 rounded-full border-2 border-slate-300 overflow-hidden group-hover:border-slate-900 transition-all">
                  <img
                    src={user.avatar_url}
                    alt={user.name || user.login}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </motion.div>
          )}

          {/* Titre principal */}
          <h1 className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-4 sm:px-0">
            Baptiste Demé
          </h1>

          {/* Description */}
          <p className="mb-8 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg text-black/70 leading-relaxed px-4 sm:px-6">
            Je suis un jeune développeur motivé, toujours prêt à explorer et à monter en compétences
            dans l'univers de la tech. Mon but ? Créer des expériences numériques percutantes qui
            captivent l'attention des utilisateurs.
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 px-4 sm:px-0">
            <button
              onClick={() => setCurrentPage('projects')}
              className="group min-h-[44px] px-6 py-3.5 sm:py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md text-base sm:text-base"
            >
              <span>Voir mes projets</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToAbout}
              className="min-h-[44px] px-6 py-3.5 sm:py-3 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm text-base sm:text-base"
            >
              En savoir plus
            </button>
          </div>

          {/* Liens sociaux */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <a
              href="https://github.com/TISEPSE"
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[48px] min-h-[48px] p-3.5 sm:p-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95 transition-all shadow-sm flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/baptiste-dem%C3%A9-26916a304/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[48px] min-h-[48px] p-3.5 sm:p-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95 transition-all shadow-sm flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="min-w-[48px] min-h-[48px] p-3.5 sm:p-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95 transition-all shadow-sm flex items-center justify-center"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
