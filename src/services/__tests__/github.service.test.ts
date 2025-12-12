// ============================================================================
// TESTS UNITAIRES - Service GitHub (exemple avec Vitest/Jest)
// ============================================================================

/**
 * NOTE : Ce fichier est un exemple de tests pour le service GitHub.
 * Pour l'exécuter, il faut installer les dépendances de test :
 *
 * npm install -D vitest @testing-library/react @testing-library/jest-dom
 *
 * Puis configurer Vitest dans vite.config.ts
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchUserProfile,
  fetchUserRepos,
  fetchRepoLanguages,
  calculateGitHubStats,
  clearGitHubCache,
} from '../github.service';
import type { GitHubUser, GitHubRepo } from '../../types/github';

// Mock des fetch
global.fetch = vi.fn();

describe('GitHub Service', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    vi.clearAllMocks();
    clearGitHubCache();
  });

  describe('fetchUserProfile', () => {
    it('devrait récupérer le profil utilisateur', async () => {
      const mockUser: GitHubUser = {
        login: 'TISEPSE',
        id: 12345,
        avatar_url: 'https://github.com/avatar.jpg',
        html_url: 'https://github.com/TISEPSE',
        name: 'Baptiste Demé',
        company: null,
        blog: 'https://portfolio.dev',
        location: 'France',
        email: null,
        bio: 'Développeur Full-Stack',
        twitter_username: null,
        public_repos: 42,
        public_gists: 5,
        followers: 100,
        following: 50,
        created_at: '2020-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
        headers: new Headers(),
      });

      const result = await fetchUserProfile();

      expect(result).toEqual(mockUser);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/users/'),
        expect.any(Object)
      );
    });

    it('devrait gérer les erreurs 404', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers(),
      });

      await expect(fetchUserProfile()).rejects.toThrow('Ressource GitHub introuvable');
    });

    it('devrait gérer les erreurs 403 (rate limit)', async () => {
      const resetTime = Math.floor(Date.now() / 1000) + 3600; // Dans 1h

      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        headers: new Headers({
          'X-RateLimit-Reset': resetTime.toString(),
        }),
      });

      await expect(fetchUserProfile()).rejects.toThrow('Limite de requêtes GitHub atteinte');
    });
  });

  describe('fetchUserRepos', () => {
    it('devrait récupérer les repositories', async () => {
      const mockRepos: GitHubRepo[] = [
        {
          id: 1,
          name: 'awesome-project',
          full_name: 'TISEPSE/awesome-project',
          description: 'Un super projet',
          html_url: 'https://github.com/TISEPSE/awesome-project',
          homepage: null,
          topics: ['react', 'typescript'],
          language: 'TypeScript',
          languages_url: 'https://api.github.com/repos/TISEPSE/awesome-project/languages',
          stargazers_count: 42,
          watchers_count: 42,
          forks_count: 10,
          open_issues_count: 2,
          fork: false,
          archived: false,
          disabled: false,
          visibility: 'public',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          pushed_at: '2024-01-15T00:00:00Z',
          size: 1024,
          default_branch: 'main',
        },
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
        headers: new Headers(),
      });

      const result = await fetchUserRepos();

      expect(result).toEqual(mockRepos);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('awesome-project');
    });

    it('devrait accepter les options de tri', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
        headers: new Headers(),
      });

      await fetchUserRepos({
        sort: 'created',
        direction: 'asc',
        perPage: 50,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('sort=created'),
        expect.any(Object)
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('direction=asc'),
        expect.any(Object)
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('per_page=50'),
        expect.any(Object)
      );
    });
  });

  describe('fetchRepoLanguages', () => {
    it('devrait récupérer les langages d\'un repo', async () => {
      const mockLanguages = {
        TypeScript: 156432,
        JavaScript: 45234,
        CSS: 12456,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockLanguages,
        headers: new Headers(),
      });

      const result = await fetchRepoLanguages('TISEPSE', 'awesome-project');

      expect(result).toEqual(mockLanguages);
    });
  });

  describe('calculateGitHubStats', () => {
    it('devrait calculer les statistiques correctement', () => {
      const mockUser: GitHubUser = {
        login: 'TISEPSE',
        id: 12345,
        avatar_url: '',
        html_url: '',
        name: 'Baptiste',
        company: null,
        blog: '',
        location: null,
        email: null,
        bio: null,
        twitter_username: null,
        public_repos: 10,
        public_gists: 5,
        followers: 100,
        following: 50,
        created_at: '',
        updated_at: '',
      };

      const mockRepos: GitHubRepo[] = [
        {
          id: 1,
          name: 'repo1',
          full_name: 'TISEPSE/repo1',
          description: null,
          html_url: '',
          homepage: null,
          topics: [],
          language: 'TypeScript',
          languages_url: '',
          stargazers_count: 10,
          watchers_count: 10,
          forks_count: 5,
          open_issues_count: 0,
          fork: false,
          archived: false,
          disabled: false,
          visibility: 'public',
          created_at: '',
          updated_at: '',
          pushed_at: '',
          size: 0,
          default_branch: 'main',
        },
        {
          id: 2,
          name: 'repo2',
          full_name: 'TISEPSE/repo2',
          description: null,
          html_url: '',
          homepage: null,
          topics: [],
          language: 'JavaScript',
          languages_url: '',
          stargazers_count: 20,
          watchers_count: 20,
          forks_count: 3,
          open_issues_count: 0,
          fork: false,
          archived: false,
          disabled: false,
          visibility: 'public',
          created_at: '',
          updated_at: '',
          pushed_at: '',
          size: 0,
          default_branch: 'main',
        },
        {
          id: 3,
          name: 'repo3',
          full_name: 'TISEPSE/repo3',
          description: null,
          html_url: '',
          homepage: null,
          topics: [],
          language: 'TypeScript',
          languages_url: '',
          stargazers_count: 5,
          watchers_count: 5,
          forks_count: 2,
          open_issues_count: 0,
          fork: true, // Fork - ne doit pas être compté
          archived: false,
          disabled: false,
          visibility: 'public',
          created_at: '',
          updated_at: '',
          pushed_at: '',
          size: 0,
          default_branch: 'main',
        },
      ];

      const stats = calculateGitHubStats(mockUser, mockRepos);

      // Devrait ignorer le fork
      expect(stats.totalRepos).toBe(2);

      // Total stars (10 + 20, le fork est ignoré)
      expect(stats.totalStars).toBe(30);

      // Total forks (5 + 3)
      expect(stats.totalForks).toBe(8);

      // Stats du profil
      expect(stats.followers).toBe(100);
      expect(stats.following).toBe(50);
      expect(stats.publicGists).toBe(5);

      // Top langages (TypeScript 50%, JavaScript 50%)
      expect(stats.mostUsedLanguages).toHaveLength(2);
      expect(stats.mostUsedLanguages[0].name).toBe('TypeScript');
      expect(stats.mostUsedLanguages[0].percentage).toBe(50);
      expect(stats.mostUsedLanguages[1].name).toBe('JavaScript');
      expect(stats.mostUsedLanguages[1].percentage).toBe(50);
    });

    it('devrait gérer les repos sans langage', () => {
      const mockRepos: GitHubRepo[] = [
        {
          id: 1,
          name: 'repo-sans-langage',
          full_name: 'TISEPSE/repo-sans-langage',
          description: null,
          html_url: '',
          homepage: null,
          topics: [],
          language: null, // Pas de langage
          languages_url: '',
          stargazers_count: 0,
          watchers_count: 0,
          forks_count: 0,
          open_issues_count: 0,
          fork: false,
          archived: false,
          disabled: false,
          visibility: 'public',
          created_at: '',
          updated_at: '',
          pushed_at: '',
          size: 0,
          default_branch: 'main',
        },
      ];

      const stats = calculateGitHubStats(null, mockRepos);

      expect(stats.mostUsedLanguages).toHaveLength(0);
    });
  });

  describe('Cache', () => {
    it('devrait mettre en cache les résultats', async () => {
      const mockUser: GitHubUser = {
        login: 'TISEPSE',
        id: 12345,
        avatar_url: '',
        html_url: '',
        name: 'Baptiste',
        company: null,
        blog: '',
        location: null,
        email: null,
        bio: null,
        twitter_username: null,
        public_repos: 10,
        public_gists: 5,
        followers: 100,
        following: 50,
        created_at: '',
        updated_at: '',
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockUser,
        headers: new Headers(),
      });

      // Premier appel
      await fetchUserProfile();
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Deuxième appel - devrait utiliser le cache
      await fetchUserProfile();
      expect(global.fetch).toHaveBeenCalledTimes(1); // Toujours 1 !

      // Clear cache et réessayer
      clearGitHubCache();
      await fetchUserProfile();
      expect(global.fetch).toHaveBeenCalledTimes(2); // Maintenant 2
    });
  });
});
