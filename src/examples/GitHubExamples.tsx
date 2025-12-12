// ============================================================================
// EXEMPLES D'UTILISATION - Cas d'usage avancés du hook useGitHub
// ============================================================================

import { useGitHub, useGitHubProfile, useGitHubRepos } from '../hooks/useGitHub';

/**
 * EXEMPLE 1 : Utilisation basique avec gestion complète des états
 */
export function Example1_BasicUsage() {
  const { user, repos, stats, isLoading, error, refetch } = useGitHub();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Erreur : {error}</p>
        <button onClick={refetch}>Réessayer</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.bio}</p>
      <p>Repos : {stats.totalRepos}</p>
      <p>Stars : {stats.totalStars}</p>

      <ul>
        {repos.slice(0, 5).map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * EXEMPLE 2 : Fetch manuel (sans autoFetch)
 */
export function Example2_ManualFetch() {
  const { user, isLoading, refetch } = useGitHub({
    autoFetch: false, // Ne charge pas automatiquement
  });

  return (
    <div>
      <button onClick={refetch} disabled={isLoading}>
        {isLoading ? 'Chargement...' : 'Charger mon profil GitHub'}
      </button>

      {user && (
        <div>
          <img src={user.avatar_url} alt={user.name || ''} width={100} />
          <h2>{user.name}</h2>
        </div>
      )}
    </div>
  );
}

/**
 * EXEMPLE 3 : Avec callbacks onSuccess et onError
 */
export function Example3_WithCallbacks() {
  const { user, stats } = useGitHub({
    onSuccess: (data) => {
      console.log('Données chargées avec succès !', data);
      // Exemple : Analytics
      // analytics.track('github_data_loaded', { repos: data.stats.totalRepos });
    },
    onError: (error) => {
      console.error('Erreur de chargement GitHub :', error);
      // Exemple : Tracking d'erreur
      // errorReporting.log(error);
    },
  });

  return (
    <div>
      <h1>{user?.name || 'Chargement...'}</h1>
      <p>Total repos : {stats.totalRepos}</p>
    </div>
  );
}

/**
 * EXEMPLE 4 : Utilisation du hook useGitHubProfile (plus léger)
 */
export function Example4_ProfileOnly() {
  const { profile, isLoading, error } = useGitHubProfile();

  if (isLoading) return <div>Chargement du profil...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!profile) return null;

  return (
    <div>
      <img src={profile.avatar_url} alt={profile.name || ''} />
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
      <p>Localisation : {profile.location}</p>
      <p>Followers : {profile.followers}</p>
      <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
        Voir sur GitHub
      </a>
    </div>
  );
}

/**
 * EXEMPLE 5 : Utilisation du hook useGitHubRepos (pour page Projects)
 */
export function Example5_ReposOnly() {
  const { repos, stats, isLoading, error } = useGitHubRepos();

  if (isLoading) return <div>Chargement des repos...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div>
      <h1>Mes {stats.totalRepos} projets</h1>
      <p>Total stars : {stats.totalStars}</p>

      <div>
        {repos
          .filter((repo) => !repo.fork)
          .slice(0, 10)
          .map((repo) => (
            <div key={repo.id}>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <p>Stars : {repo.stargazers_count}</p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                Voir le code
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

/**
 * EXEMPLE 6 : Affichage des top langages
 */
export function Example6_TopLanguages() {
  const { stats, isLoading } = useGitHub();

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Mes langages les plus utilisés</h2>
      <ul>
        {stats.mostUsedLanguages.map((lang) => (
          <li key={lang.name}>
            {lang.name} - {lang.percentage.toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * EXEMPLE 7 : Recherche dans les repos
 */
export function Example7_SearchRepos() {
  const { repos, isLoading } = useGitHub();
  const [search, setSearch] = useState('');

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un projet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{filteredRepos.length} résultat(s)</p>

      <ul>
        {filteredRepos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * EXEMPLE 8 : Filtre par langage
 */
export function Example8_FilterByLanguage() {
  const { repos, isLoading } = useGitHub();
  const [language, setLanguage] = useState<string | null>(null);

  // Extraire tous les langages uniques
  const allLanguages = Array.from(
    new Set(repos.map((repo) => repo.language).filter(Boolean))
  ) as string[];

  const filteredRepos = language
    ? repos.filter((repo) => repo.language === language)
    : repos;

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <select value={language || ''} onChange={(e) => setLanguage(e.target.value || null)}>
        <option value="">Tous les langages</option>
        {allLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <p>{filteredRepos.length} projet(s)</p>

      <ul>
        {filteredRepos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - {repo.language}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * EXEMPLE 9 : Bouton de refresh avec feedback
 */
export function Example9_RefreshButton() {
  const { user, refetch, isLoading } = useGitHub();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <div>
      <h1>{user?.name}</h1>

      <button onClick={handleRefresh} disabled={isLoading || isRefreshing}>
        {isRefreshing ? 'Actualisation...' : 'Rafraîchir les données'}
      </button>
    </div>
  );
}

/**
 * EXEMPLE 10 : Stats en temps réel avec enrichissement progressif
 */
export function Example10_ProgressiveEnrichment() {
  const { repos, isLoading } = useGitHub();
  const [enrichedCount, setEnrichedCount] = useState(0);

  useEffect(() => {
    if (repos.length > 0) {
      // Simuler un enrichissement progressif
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setEnrichedCount(count);
        if (count >= repos.length) {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [repos]);

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Enrichissement des repos</h2>
      <p>
        {enrichedCount} / {repos.length} repos traités
      </p>
      <progress value={enrichedCount} max={repos.length} />
    </div>
  );
}

// ============================================================================
// HELPER IMPORTS
// ============================================================================

import { useState, useEffect } from 'react';
