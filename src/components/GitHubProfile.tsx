// ============================================================================
// COMPOSANT GITHUB PROFILE - Affichage du profil GitHub
// ============================================================================

import { motion } from 'motion/react';
import { MapPin, Link as LinkIcon, Users, GitFork, Star, Code } from 'lucide-react';
import { useGitHub } from '../hooks/useGitHub';

/**
 * Props pour contrôler l'affichage du composant
 */
interface GitHubProfileProps {
  /**
   * Variante d'affichage
   * - compact : Uniquement avatar + stats (pour Hero)
   * - full : Avatar + bio + stats complètes (pour About)
   */
  variant?: 'compact' | 'full';

  /**
   * Afficher le loader pendant le chargement
   */
  showLoader?: boolean;

  /**
   * Afficher les erreurs
   */
  showError?: boolean;
}

/**
 * Composant pour afficher le profil GitHub de l'utilisateur
 * Utilisable dans le Hero ou la section About
 */
export function GitHubProfile({
  variant = 'compact',
  showLoader = true,
  showError = true,
}: GitHubProfileProps) {
  const { user, stats, isLoading, error } = useGitHub();

  // Gestion du chargement
  if (isLoading && showLoader) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  // Gestion des erreurs
  if (error && showError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
        Impossible de charger le profil GitHub
      </div>
    );
  }

  // Si pas de données, ne rien afficher
  if (!user) return null;

  // ============================================================================
  // VARIANTE COMPACT - Pour Hero
  // ============================================================================
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Avatar */}
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
          {/* Badge GitHub au hover */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Code className="w-4 h-4 text-white" />
          </div>
        </a>

        {/* Stats compactes */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-black/70">
            <Star className="w-4 h-4" />
            <span className="font-medium">{stats.totalStars}</span>
            <span className="hidden sm:inline">stars</span>
          </div>
          <div className="flex items-center gap-2 text-black/70">
            <GitFork className="w-4 h-4" />
            <span className="font-medium">{stats.totalRepos}</span>
            <span className="hidden sm:inline">repos</span>
          </div>
          <div className="flex items-center gap-2 text-black/70">
            <Users className="w-4 h-4" />
            <span className="font-medium">{stats.followers}</span>
            <span className="hidden sm:inline">followers</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // ============================================================================
  // VARIANTE FULL - Pour About ou section dédiée
  // ============================================================================
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Colonne gauche : Avatar + infos */}
        <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
          {/* Avatar */}
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="w-32 h-32 rounded-full border-2 border-slate-300 overflow-hidden group-hover:border-slate-900 transition-all">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="w-full h-full object-cover"
              />
            </div>
          </a>

          {/* Nom + username */}
          <div className="text-center md:text-left">
            {user.name && (
              <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
            )}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 hover:text-slate-900 transition-colors"
            >
              @{user.login}
            </a>
          </div>

          {/* Localisation */}
          {user.location && (
            <div className="flex items-center gap-2 text-sm text-black/70">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}

          {/* Site web */}
          {user.blog && (
            <a
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-black/70 hover:text-slate-900 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
              <span className="truncate max-w-[200px]">{user.blog}</span>
            </a>
          )}
        </div>

        {/* Colonne droite : Bio + Stats */}
        <div className="flex-1 space-y-6">
          {/* Bio */}
          {user.bio && (
            <p className="text-black/70 leading-relaxed">{user.bio}</p>
          )}

          {/* Stats détaillées */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-black/70" />
                <span className="text-sm text-black/60">Repositories</span>
              </div>
              <p className="text-2xl font-semibold">{stats.totalRepos}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-black/70" />
                <span className="text-sm text-black/60">Stars</span>
              </div>
              <p className="text-2xl font-semibold">{stats.totalStars}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitFork className="w-4 h-4 text-black/70" />
                <span className="text-sm text-black/60">Forks</span>
              </div>
              <p className="text-2xl font-semibold">{stats.totalForks}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-black/70" />
                <span className="text-sm text-black/60">Followers</span>
              </div>
              <p className="text-2xl font-semibold">{stats.followers}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-black/70" />
                <span className="text-sm text-black/60">Following</span>
              </div>
              <p className="text-2xl font-semibold">{stats.following}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-black/70" />
                <span className="text-sm text-black/60">Gists</span>
              </div>
              <p className="text-2xl font-semibold">{stats.publicGists}</p>
            </div>
          </div>

          {/* Top langages */}
          {stats.mostUsedLanguages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-black/60 mb-3">
                Langages les plus utilisés
              </h4>
              <div className="flex flex-wrap gap-2">
                {stats.mostUsedLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm flex items-center gap-2"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-xs text-black/50">
                      {lang.percentage.toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
