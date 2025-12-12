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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto">
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
              className="mb-8 flex justify-center"
            >
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-24 h-24 rounded-full border-2 border-slate-300 overflow-hidden group-hover:border-slate-900 transition-all">
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
          <h1 className="mb-8 text-5xl md:text-6xl lg:text-7xl font-bold">
            Baptiste Demé
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-2xl mx-auto text-lg text-black/70 leading-relaxed">
            Je suis un jeune développeur motivé, toujours prêt à explorer et à monter en compétences
            dans l'univers de la tech. Mon but ? Créer des expériences numériques percutantes qui
            captivent l'attention des utilisateurs.
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => setCurrentPage('projects')}
              className="group px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md"
            >
              <span>Voir mes projets</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToAbout}
              className="px-6 py-3 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all shadow-sm"
            >
              En savoir plus
            </button>
          </div>

          {/* Liens sociaux */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
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
