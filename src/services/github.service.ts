// ============================================================================
// GITHUB API SERVICE - Service centralisé avec cache intelligent
// ============================================================================

import type {
  GitHubUser,
  GitHubRepo,
  GitHubLanguages,
  GitHubStats,
  LanguageStat,
  EnrichedRepo,
} from '../types/github';

// Configuration
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;
const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes

// Validation du username au chargement du module
if (!GITHUB_USERNAME) {
  console.error('⚠️ VITE_GITHUB_USERNAME non défini dans le fichier .env');
}

/**
 * Interface pour le cache avec timestamp
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * Cache en mémoire - réutilisé entre les appels
 * Stratégie : Simple in-memory cache avec expiration
 * Alternative : localStorage (persistance), React Query (cache avancé)
 */
class GitHubCache {
  private cache = new Map<string, CacheEntry<unknown>>();

  /**
   * Récupère une entrée du cache si elle est valide
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Stocke une entrée dans le cache
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Vide tout le cache
   */
  clear(): void {
    this.cache.clear();
  }
}

// Instance singleton du cache
const cache = new GitHubCache();

/**
 * Headers par défaut pour les requêtes GitHub
 */
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  // Si un token est défini, l'ajouter pour augmenter les limites rate
  // Sans token : 60 req/h
  // Avec token : 5000 req/h
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Fonction de fetch générique avec gestion d'erreur
 */
async function fetchGitHub<T>(endpoint: string, cacheKey: string): Promise<T> {
  // Vérifier le cache d'abord
  const cached = cache.get<T>(cacheKey);
  if (cached !== null) {
    return cached;
  }

  const url = `${GITHUB_API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, { headers: getHeaders() });

    // Gestion des erreurs HTTP spécifiques
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Ressource GitHub introuvable : ${endpoint}`);
      } else if (response.status === 403) {
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        const resetTime = rateLimitReset
          ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
          : 'inconnue';
        throw new Error(
          `Limite de requêtes GitHub atteinte. Réinitialisation à ${resetTime}`
        );
      } else if (response.status === 401) {
        throw new Error('Token GitHub invalide');
      } else {
        throw new Error(`Erreur GitHub API ${response.status}: ${response.statusText}`);
      }
    }

    const data: T = await response.json();

    // Stocker dans le cache
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    // Propager l'erreur avec contexte
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erreur réseau lors de la communication avec GitHub');
  }
}

// ============================================================================
// API PUBLIQUE DU SERVICE
// ============================================================================

/**
 * Récupère le profil utilisateur GitHub
 */
export async function fetchUserProfile(): Promise<GitHubUser> {
  if (!GITHUB_USERNAME) {
    throw new Error('Username GitHub non configuré');
  }

  return fetchGitHub<GitHubUser>(
    `/users/${GITHUB_USERNAME}`,
    `user:${GITHUB_USERNAME}`
  );
}

/**
 * Récupère tous les repositories publics de l'utilisateur
 * @param options - Options de tri et filtrage
 */
export async function fetchUserRepos(options?: {
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  perPage?: number;
}): Promise<GitHubRepo[]> {
  if (!GITHUB_USERNAME) {
    throw new Error('Username GitHub non configuré');
  }

  const {
    sort = 'pushed',
    direction = 'desc',
    perPage = 100,
  } = options || {};

  const params = new URLSearchParams({
    sort,
    direction,
    per_page: perPage.toString(),
  });

  return fetchGitHub<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?${params}`,
    `repos:${GITHUB_USERNAME}:${sort}:${direction}:${perPage}`
  );
}

/**
 * Récupère les statistiques de langages pour un repository
 * @param owner - Propriétaire du repo
 * @param repo - Nom du repo
 */
export async function fetchRepoLanguages(
  owner: string,
  repo: string
): Promise<GitHubLanguages> {
  return fetchGitHub<GitHubLanguages>(
    `/repos/${owner}/${repo}/languages`,
    `languages:${owner}:${repo}`
  );
}

/**
 * Enrichit un repository avec les pourcentages de langages
 * @param repo - Repository à enrichir
 */
export async function enrichRepoWithLanguages(
  repo: GitHubRepo
): Promise<EnrichedRepo> {
  try {
    const languages = await fetchRepoLanguages(
      GITHUB_USERNAME!,
      repo.name
    );

    // Calcul du total de bytes
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

    // Transformation en tableau avec pourcentages
    const languageStats: LanguageStat[] = Object.entries(languages)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage); // Tri décroissant

    return {
      ...repo,
      languageStats,
      totalBytes,
    };
  } catch (error) {
    // En cas d'erreur, retourner le repo sans enrichissement
    console.warn(`Impossible de récupérer les langages pour ${repo.name}:`, error);
    return {
      ...repo,
      languageStats: [],
      totalBytes: 0,
    };
  }
}

/**
 * Calcule des statistiques globales à partir des repos et du profil
 * @param user - Profil utilisateur
 * @param repos - Liste des repositories
 */
export function calculateGitHubStats(
  user: GitHubUser | null,
  repos: GitHubRepo[]
): GitHubStats {
  // Filtrer les forks pour les stats (optionnel)
  const ownRepos = repos.filter((repo) => !repo.fork);

  // Calcul des totaux
  const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0);

  // Comptage des langages
  const languageCount = new Map<string, number>();
  ownRepos.forEach((repo) => {
    if (repo.language) {
      languageCount.set(
        repo.language,
        (languageCount.get(repo.language) || 0) + 1
      );
    }
  });

  // Top 5 des langages les plus utilisés
  const mostUsedLanguages: LanguageStat[] = Array.from(languageCount.entries())
    .map(([name, count]) => ({
      name,
      bytes: count, // Ici on utilise le count comme proxy
      percentage: (count / ownRepos.length) * 100,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  return {
    totalRepos: ownRepos.length,
    totalStars,
    totalForks,
    followers: user?.followers || 0,
    following: user?.following || 0,
    publicGists: user?.public_gists || 0,
    mostUsedLanguages,
  };
}

/**
 * Récupère toutes les données GitHub (profil + repos + stats)
 * Fonction all-in-one pour simplifier l'usage
 */
export async function fetchAllGitHubData() {
  const [user, repos] = await Promise.all([
    fetchUserProfile(),
    fetchUserRepos({ sort: 'pushed', perPage: 100 }),
  ]);

  const stats = calculateGitHubStats(user, repos);

  return { user, repos, stats };
}

/**
 * Vide le cache GitHub (utile pour forcer un refresh)
 */
export function clearGitHubCache(): void {
  cache.clear();
}
