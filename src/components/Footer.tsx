import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="projets" className="py-12 px-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="mb-2 text-white">Baptiste Demé</h3>
            <p className="text-white/60">Développeur Full-Stack</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/20 rounded-lg hover:bg-white hover:text-slate-900 transition-all"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/20 rounded-lg hover:bg-white hover:text-slate-900 transition-all"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-3 border border-white/20 rounded-lg hover:bg-white hover:text-slate-900 transition-all"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/10 text-center text-white/60">
          <p>© 2025 Baptiste Demé. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}