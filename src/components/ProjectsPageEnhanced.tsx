// ============================================================================
// PROJECTS PAGE ENHANCED - Version améliorée avec pourcentages de langages
// ============================================================================

import { useState, useEffect } from 'react';
import { Github, ExternalLink, Loader2, AlertCircle, Star, GitFork } from 'lucide-react';
import { useGitHubRepos } from '../hooks/useGitHub';
import { enrichRepoWithLanguages } from '../services/github.service';
import type { EnrichedRepo } from '../types/github';

/**
 * Couleurs associées aux langages populaires (minimaliste)
 */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  React: '#61dafb',
  Svelte: '#ff3e00',
};

/**
 * Composant barre de progression pour les langages
 */
function LanguageBar({ stats }: { stats: EnrichedRepo['languageStats'] }) {
  if (stats.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Barre visuelle des pourcentages */}
      <div className="flex h-2 rounded-full overflow-hidden bg-slate-100">
        {stats.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: LANGUAGE_COLORS[lang.name] || '#94a3b8',
            }}
            title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Liste des langages avec pourcentages */}
      <div className="flex flex-wrap gap-2">
        {stats.slice(0, 3).map((lang) => (
          <div
            key={lang.name}
            className="flex items-center gap-2 text-xs text-black/70"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[lang.name] || '#94a3b8' }}
            />
            <span className="font-medium">{lang.name}</span>
            <span className="text-black/50">{lang.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Composant card de projet enrichi
 */
function ProjectCard({ repo }: { repo: EnrichedRepo }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group">
      {/* Header avec titre et stats */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg group-hover:text-slate-900 transition-colors">
          {repo.name}
        </h3>
        <div className="flex items-center gap-3 text-sm text-black/60">
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{repo.stargazers_count}</span>
            </div>
          )}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{repo.forks_count}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-black/70 mb-4 line-clamp-2 min-h-[3rem]">
        {repo.description || 'Aucune description disponible'}
      </p>

      {/* Barre de langages */}
      {repo.languageStats.length > 0 && (
        <div className="mb-4">
          <LanguageBar stats={repo.languageStats} />
        </div>
      )}

      {/* Topics (tags GitHub) */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-sm"
        >
          <Github size={16} />
          <span>Code</span>
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-sm"
          >
            <ExternalLink size={16} />
            <span>Démo</span>
          </a>
        )}
      </div>

      {/* Date de dernière mise à jour */}
      <div className="text-xs text-black/50 mt-3">
        Mis à jour le {new Date(repo.pushed_at).toLocaleDateString('fr-FR')}
      </div>
    </div>
  );
}

/**
 * Page des projets avec enrichissement des repos
 */
export function ProjectsPageEnhanced() {
  const { repos, stats, isLoading, error } = useGitHubRepos();
  const [enrichedRepos, setEnrichedRepos] = useState<EnrichedRepo[]>([]);
  const [isEnriching, setIsEnriching] = useState(false);

  // Enrichir les repos avec les pourcentages de langages
  useEffect(() => {
    if (repos.length === 0) return;

    async function enrichRepos() {
      setIsEnriching(true);

      try {
        // Filtrer les forks et limiter à 12 repos max
        const topRepos = repos
          .filter((repo) => !repo.fork)
          .slice(0, 12);

        // Enrichir les 6 premiers repos en priorité (au-dessus du fold)
        const priorityRepos = topRepos.slice(0, 6);
        const otherRepos = topRepos.slice(6);

        // Enrichir les repos prioritaires immédiatement
        const enrichedPriority = await Promise.all(
          priorityRepos.map(enrichRepoWithLanguages)
        );

        // Afficher les repos prioritaires tout de suite
        setEnrichedRepos(enrichedPriority);

        // Enrichir les autres repos en arrière-plan (lazy loading)
        if (otherRepos.length > 0) {
          const enrichedOthers = await Promise.all(
            otherRepos.map(enrichRepoWithLanguages)
          );
          setEnrichedRepos([...enrichedPriority, ...enrichedOthers]);
        }
      } catch (err) {
        console.error('Erreur lors de l\'enrichissement des repos:', err);
        // Fallback : afficher les repos sans enrichissement
        setEnrichedRepos(
          repos.filter((repo) => !repo.fork).slice(0, 12).map((repo) => ({
            ...repo,
            languageStats: [],
            totalBytes: 0,
          }))
        );
      } finally {
        setIsEnriching(false);
      }
    }

    enrichRepos();
  }, [repos]);

  // ============================================================================
  // RENDU
  // ============================================================================

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header avec stats */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Mes Projets</h1>
          <p className="text-black/70 max-w-2xl mb-6">
            Voici une sélection de mes projets GitHub. Chaque projet reflète mon parcours
            d'apprentissage et mes compétences en développement.
          </p>

          {/* Stats globales */}
          {!isLoading && !error && (
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-black/70">
                <Github className="w-4 h-4" />
                <span className="font-medium">{stats.totalRepos}</span>
                <span>repositories</span>
              </div>
              <div className="flex items-center gap-2 text-black/70">
                <Star className="w-4 h-4" />
                <span className="font-medium">{stats.totalStars}</span>
                <span>stars</span>
              </div>
              <div className="flex items-center gap-2 text-black/70">
                <GitFork className="w-4 h-4" />
                <span className="font-medium">{stats.totalForks}</span>
                <span>forks</span>
              </div>
            </div>
          )}
        </div>

        {/* État de chargement */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-slate-400 animate-spin mb-4" />
            <p className="text-slate-600">Chargement des projets GitHub...</p>
          </div>
        )}

        {/* État d'erreur */}
        {error && !isLoading && (
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
        )}

        {/* Grille de projets */}
        {!isLoading && !error && (
          <>
            {enrichedRepos.length === 0 && !isEnriching ? (
              <div className="text-center py-20">
                <p className="text-slate-600 text-lg">Aucun projet public trouvé</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrichedRepos.map((repo) => (
                  <ProjectCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}

            {/* Indicateur d'enrichissement en cours */}
            {isEnriching && enrichedRepos.length > 0 && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-black/60">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Chargement des statistiques détaillées...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
