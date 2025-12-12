import { Github, ExternalLink } from 'lucide-react';

export function ProjectsPage() {
  const projects = [
    {
      title: 'Portfolio Personnel',
      description: 'Site portfolio moderne développé avec React et Tailwind CSS, présentant mes projets et compétences.',
      technologies: ['React', 'Tailwind CSS', 'TypeScript'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      title: 'Application E-Commerce',
      description: 'Plateforme e-commerce complète avec panier d\'achat, gestion des produits et intégration de paiement.',
      technologies: ['Next.js', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      title: 'Dashboard Analytics',
      description: 'Tableau de bord pour visualiser des données avec graphiques interactifs et rapports personnalisés.',
      technologies: ['React', 'Chart.js', 'Express'],
      github: 'https://github.com',
      demo: null
    },
    {
      title: 'API REST',
      description: 'API REST robuste avec authentification JWT, validation des données et documentation Swagger.',
      technologies: ['Node.js', 'Express', 'PostgreSQL'],
      github: 'https://github.com',
      demo: null
    },
    {
      title: 'Application de Gestion de Tâches',
      description: 'Application pour gérer des tâches quotidiennes avec système de notifications et synchronisation.',
      technologies: ['React', 'Firebase', 'Redux'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      title: 'Blog Personnel',
      description: 'Blog technique avec système de commentaires, catégories et recherche de contenu.',
      technologies: ['Next.js', 'Markdown', 'Vercel'],
      github: 'https://github.com',
      demo: 'https://example.com'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="mb-4">Mes Projets</h1>
          <p className="text-black/70 max-w-2xl">
            Voici une sélection de mes projets sur GitHub. Chaque projet reflète mon parcours d'apprentissage 
            et mes compétences en développement web.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <h3 className="mb-3">{project.title}</h3>
              <p className="text-black/70 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                >
                  <Github size={16} />
                  <span>Code</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all"
                  >
                    <ExternalLink size={16} />
                    <span>Démo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}