import { useState, useEffect } from 'react';
import { Github, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { GitHubProfile } from './GitHubProfile';
import { motion } from 'motion/react';

// ============================================================================
// TYPES - Typage strict de l'API GitHub
// ============================================================================

/**
 * Interface pour la réponse de l'API GitHub /users/{username}/repos
 * Seuls les champs nécessaires sont typés (l'API retourne ~80 champs)
 */
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
  pushed_at: string;
}

/**
 * Interface pour les projets affichés (transformation des données GitHub)
 */
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
  stars: number;
  updatedAt: Date;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

// Récupération sécurisée du username depuis les variables d'environnement
// Le username est stocké dans le fichier .env et n'est jamais committé dans le code
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

if (!GITHUB_USERNAME) {
  console.error('⚠️ VITE_GITHUB_USERNAME non défini dans le fichier .env');
}

// Endpoint public de l'API GitHub (pas besoin de token pour les repos publics)
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Limite de repos à afficher (pour éviter de surcharger l'UI)
const MAX_REPOS = 12;

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export function ProjectsPage() {
  // États de gestion du cycle de vie de la requête
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Fonction de fetch avec gestion d'erreur robuste
     * Stratégie : Fetch natif avec useEffect (simple, sans dépendances externes)
     * Alternative : React Query ou SWR pour un cache avancé (overkill ici)
     */
    async function fetchGitHubRepos() {
      try {
        setIsLoading(true);
        setError(null);

        // Paramètres de requête : tri par dernière activité, limite à MAX_REPOS
        const response = await fetch(
          `${GITHUB_API_URL}?sort=pushed&direction=desc&per_page=${MAX_REPOS}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              // Optionnel : Ajouter un token pour augmenter les limites rate (5000/h vs 60/h)
              // Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            },
          }
        );

        if (!response.ok) {
          // Gestion des erreurs HTTP avec messages spécifiques
          if (response.status === 404) {
            throw new Error('Utilisateur GitHub introuvable');
          } else if (response.status === 403) {
            throw new Error('Limite de requêtes API atteinte, réessayez plus tard');
          } else {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
          }
        }

        const data: GitHubRepo[] = await response.json();

        // Transformation des données : filtrage et mapping
        const transformedProjects: Project[] = data
          // Filtrer les forks (optionnel, selon préférence)
          .filter((repo) => !repo.fork)
          // Mapper vers notre interface Project
          .map((repo) => ({
            id: repo.id,
            title: repo.name,
            // Fallback si pas de description
            description: repo.description || 'Aucune description disponible',
            // Stratégie technologies : topics (tags GitHub) + language principal
            technologies: [
              ...repo.topics,
              ...(repo.language ? [repo.language] : []),
            ].slice(0, 5), // Limite à 5 badges max pour éviter le débordement
            github: repo.html_url,
            demo: repo.homepage || null,
            stars: repo.stargazers_count,
            updatedAt: new Date(repo.pushed_at || repo.updated_at),
          }))
          // Tri par nombre d'étoiles pour mettre en avant les meilleurs projets
          .sort((a, b) => b.stars - a.stars);

        setProjects(transformedProjects);
      } catch (err) {
        // Gestion d'erreur TypeScript-safe
        const message = err instanceof Error ? err.message : 'Erreur inconnue';
        setError(message);
        console.error('Erreur lors du fetch GitHub:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGitHubRepos();
  }, []); // Dépendances vides : fetch uniquement au mount du composant

  // ============================================================================
  // RENDU CONDITIONNEL - États de chargement et d'erreur
  // ============================================================================

  return (
    <div className="min-h-screen pt-24 pb-16 px-5 sm:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Contenu principal - masqué pendant le chargement et les erreurs */}
        {isLoading ? (
          // État de chargement - version sobre sans rotation
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50"
          >
            <div className="mb-6">
              <Loader2 className="w-16 h-16 text-slate-600" />
            </div>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-slate-700 font-medium"
            >
              Chargement des projets...
            </motion.p>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-slate-500 mt-2 text-center max-w-md px-4"
            >
              Récupération des données depuis GitHub...
            </motion.p>
          </motion.div>
        ) : error ? (
          // État d'erreur
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-900 font-semibold mb-1">
                Erreur lors du chargement
              </h3>
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                Réessayer
              </button>
            </div>
          </div>
        ) : (
          // État de succès - contenu principal avec animations améliorées
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <>
            {/* En-tête */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 sm:mb-16 text-center"
            >
          <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-4 sm:mb-6"></div>
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight px-4 sm:px-0">Mes Projets</h1>
          <p className="text-base sm:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
            Voici une sélection de mes projets sur GitHub. Chaque projet reflète mon parcours
            d'apprentissage et mes compétences en développement web.
          </p>
        </motion.div>

        {/* Profil GitHub complet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 sm:mb-12"
        >
          <GitHubProfile variant="full" />
        </motion.div>

        {/* État de succès : affichage des projets */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">Aucun projet public trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1] 
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md"
              >
                {/* Titre du projet */}
                <h3 className="mb-3 font-semibold text-lg sm:text-xl">{project.title}</h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-black/70 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

                {/* Badges de technologies (topics + language) */}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Liens vers GitHub et démo */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-[0.98] transition-all text-sm sm:text-base"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-all text-sm sm:text-base"
                    >
                      <ExternalLink size={16} />
                      <span>Démo</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
          </>
          </motion.div>
        )}
      </div>
    </div>
  );
}