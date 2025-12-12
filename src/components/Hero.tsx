import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: 'home' | 'projects' | 'rss') => void;
}

export function Hero({ setCurrentPage }: HeroProps) {
  const scrollToAbout = () => {
    const element = document.getElementById('a-propos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-6">
            Baptiste Demé
          </h1>

          <p className="mb-4 text-xl text-black/80">
            Développeur Full-Stack
          </p>

          <p className="mb-8 max-w-2xl mx-auto text-black/70">
            Je suis un jeune développeur motivé, toujours prêt à explorer et à monter en compétences 
            dans l'univers de la tech. Mon but ? Créer des expériences numériques percutantes qui 
            captivent l'attention des utilisateurs.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setCurrentPage('projects')}
              className="group px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <span>Voir mes projets</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToAbout}
              className="px-6 py-3 border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all"
            >
              En savoir plus
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-3 border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
