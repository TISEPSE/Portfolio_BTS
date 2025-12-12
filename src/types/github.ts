// ============================================================================
// TYPES GITHUB API - Typage complet des réponses de l'API GitHub
// ============================================================================

/**
 * Profil utilisateur GitHub
 * Endpoint : GET /users/{username}
 * Doc : https://docs.github.com/en/rest/users/users#get-a-user
 */
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

/**
 * Repository GitHub
 * Endpoint : GET /users/{username}/repos
 * Doc : https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
 */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: 'public' | 'private';
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch: string;
}

/**
 * Langages d'un repository avec statistiques en bytes
 * Endpoint : GET /repos/{owner}/{repo}/languages
 * Doc : https://docs.github.com/en/rest/repos/repos#list-repository-languages
 *
 * Exemple de réponse :
 * {
 *   "TypeScript": 156432,
 *   "JavaScript": 45234,
 *   "CSS": 12456
 * }
 */
export interface GitHubLanguages {
  [language: string]: number; // nombre de bytes de code
}

/**
 * Statistiques GitHub calculées côté client
 */
export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  publicGists: number;
  mostUsedLanguages: LanguageStat[];
}

/**
 * Statistique d'un langage avec pourcentage
 */
export interface LanguageStat {
  name: string;
  percentage: number;
  bytes: number;
  color?: string; // Couleur associée au langage (optionnel)
}

/**
 * Données GitHub complètes (user + repos)
 */
export interface GitHubData {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  stats: GitHubStats;
  isLoading: boolean;
  error: string | null;
}

/**
 * Repository enrichi avec pourcentages de langages
 */
export interface EnrichedRepo extends GitHubRepo {
  languageStats: LanguageStat[];
  totalBytes: number;
}
