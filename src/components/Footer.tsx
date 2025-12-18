import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="projets" className="py-10 sm:py-12 px-5 sm:px-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="text-center md:text-left">
            <h3 className="mb-1.5 sm:mb-2 text-lg sm:text-xl text-white font-semibold">Baptiste Demé</h3>
            <p className="text-sm sm:text-base text-white/60">Développeur Full-Stack</p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/TISEPSE"
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[48px] min-h-[48px] p-3.5 sm:p-3 border border-white/20 rounded-lg hover:bg-white hover:text-slate-900 active:scale-95 transition-all flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/baptiste-dem%C3%A9-26916a304/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[48px] min-h-[48px] p-3.5 sm:p-3 border border-white/20 rounded-lg hover:bg-white hover:text-slate-900 active:scale-95 transition-all flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="min-w-[48px] min-h-[48px] p-3.5 sm:p-3 border border-white/20 rounded-lg hover:bg-white hover:text-slate-900 active:scale-95 transition-all flex items-center justify-center"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="pt-5 sm:pt-6 border-t border-white/10 text-center text-white/60">
          <p className="text-sm sm:text-base">© 2025 Baptiste Demé. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}