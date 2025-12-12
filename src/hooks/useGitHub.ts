// ============================================================================
// HOOK CUSTOM - useGitHub pour consommer les données GitHub facilement
// ============================================================================

import { useState, useEffect } from 'react';
import type { GitHubData } from '../types/github';
import { fetchAllGitHubData } from '../services/github.service';

/**
 * Options pour le hook useGitHub
 */
interface UseGitHubOptions {
  /**
   * Désactive le fetch automatique au mount
   * Utile si vous voulez contrôler manuellement le fetch
   */
  autoFetch?: boolean;

  /**
   * Callback appelé après un fetch réussi
   */
  onSuccess?: (data: GitHubData) => void;

  /**
   * Callback appelé en cas d'erreur
   */
  onError?: (error: string) => void;
}

/**
 * Hook personnalisé pour récupérer les données GitHub
 *
 * Gère automatiquement :
 * - Le cycle de vie du fetch (loading, error, success)
 * - Le cache (via le service)
 * - Les erreurs avec messages explicites
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, repos, stats, isLoading, error, refetch } = useGitHub();
 *
 *   if (isLoading) return <Loader />;
 *   if (error) return <Error message={error} />;
 *
 *   return (
 *     <div>
 *       <h1>{user?.name}</h1>
 *       <p>Repos: {stats.totalRepos}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useGitHub(options: UseGitHubOptions = {}) {
  const { autoFetch = true, onSuccess, onError } = options;

  const [data, setData] = useState<GitHubData>({
    user: null,
    repos: [],
    stats: {
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      followers: 0,
      following: 0,
      publicGists: 0,
      mostUsedLanguages: [],
    },
    isLoading: false,
    error: null,
  });

  /**
   * Fonction de fetch principale
   * Peut être appelée manuellement pour refetch
   */
  const fetchData = async () => {
    setData((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await fetchAllGitHubData();

      const newData: GitHubData = {
        user: result.user,
        repos: result.repos,
        stats: result.stats,
        isLoading: false,
        error: null,
      };

      setData(newData);

      // Callback de succès
      if (onSuccess) {
        onSuccess(newData);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur lors de la récupération des données GitHub';

      setData((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      // Callback d'erreur
      if (onError) {
        onError(errorMessage);
      }

      // Log pour debugging
      console.error('Erreur useGitHub:', err);
    }
  };

  // Fetch automatique au mount si autoFetch = true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]);

  return {
    // Données
    user: data.user,
    repos: data.repos,
    stats: data.stats,

    // États
    isLoading: data.isLoading,
    error: data.error,

    // Actions
    refetch: fetchData, // Pour forcer un nouveau fetch
  };
}

/**
 * Variante du hook qui retourne uniquement le profil utilisateur
 * Plus léger si vous n'avez pas besoin des repos
 */
export function useGitHubProfile(options: UseGitHubOptions = {}) {
  const { user, isLoading, error, refetch } = useGitHub(options);

  return {
    profile: user,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Variante du hook qui retourne uniquement les repos
 * Utile pour la page Projects
 */
export function useGitHubRepos(options: UseGitHubOptions = {}) {
  const { repos, stats, isLoading, error, refetch } = useGitHub(options);

  return {
    repos,
    stats,
    isLoading,
    error,
    refetch,
  };
}
