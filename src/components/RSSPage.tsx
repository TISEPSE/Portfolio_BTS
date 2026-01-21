import { Clock, ExternalLink, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Footer } from "./Footer";

// ============================================================================
// TYPES
// ============================================================================

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  category: string;
}

interface RSSFeed {
  url: string;
  name: string;
  category: string;
}

// ============================================================================
// CONFIGURATION DES FLUX RSS
// ============================================================================

const RSS_FEEDS: RSSFeed[] = [
  // Flux Bing Actualités - Recherches personnalisées
  {
    url: "https://www.bing.com/news/search?q=cryptographie&qft=sortbydate%3d%221%22%2Binterval%3d%227%22&form=YFNR&format=rss&cc=fr",
    name: "Cryptographie",
    category: "securite",
  },
  {
    url: "https://www.bing.com/news/search?q=cybers%C3%A9curit%C3%A9&qft=sortbydate%3d%221%22%2Binterval%3d%227%22&form=YFNR&format=rss&cc=fr",
    name: "Cybersécurité",
    category: "securite",
  },
  {
    url: "https://www.bing.com/news/search?q=intelligence+artificielle&qft=sortbydate%3d%221%22%2Binterval%3d%227%22&form=YFNR&format=rss&cc=fr",
    name: "Intelligence Artificielle",
    category: "tech",
  },
  {
    url: "https://www.bing.com/news/search?q=cloud+computing&qft=sortbydate%3d%221%22%2Binterval%3d%227%22&form=YFNR&format=rss&cc=fr",
    name: "Cloud Computing",
    category: "tech",
  },
  // Flux officiels
  {
    url: "https://www.cert.ssi.gouv.fr/feed/",
    name: "CERT-FR",
    category: "securite",
  },
  {
    url: "https://korben.info/feed",
    name: "Korben",
    category: "tech",
  },
];

const CATEGORIES = [
  { id: "all", name: "Tous" },
  { id: "securite", name: "Sécurité" },
  { id: "tech", name: "Tech" },
];

// API rss2json pour contourner les problèmes CORS
const RSS2JSON_API = "https://api.rss2json.com/v1/api.json?rss_url=";

// ============================================================================
// UTILITAIRES
// ============================================================================

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "À l'instant";
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `Il y a ${Math.floor(diffInSeconds / 86400)}j`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function stripHtml(html: string): string {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export function RSSPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [articles, setArticles] = useState<RSSItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeeds = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const allArticles: RSSItem[] = [];

      // Fetch tous les flux en parallèle
      const feedPromises = RSS_FEEDS.map(async (feed) => {
        try {
          const response = await fetch(`${RSS2JSON_API}${encodeURIComponent(feed.url)}`);

          if (!response.ok) {
            console.warn(`Erreur pour ${feed.name}: ${response.status}`);
            return [];
          }

          const data = await response.json();

          if (data.status !== "ok") {
            console.warn(`Flux invalide pour ${feed.name}`);
            return [];
          }

          return data.items.map((item: any) => ({
            title: item.title,
            link: item.link,
            description: stripHtml(item.description || "").slice(0, 300) + "...",
            pubDate: item.pubDate,
            source: feed.name,
            category: feed.category,
          }));
        } catch (err) {
          console.warn(`Erreur lors du fetch de ${feed.name}:`, err);
          return [];
        }
      });

      const results = await Promise.all(feedPromises);
      results.forEach((items) => allArticles.push(...items));

      // Trier par date (plus récent en premier)
      allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      setArticles(allArticles);

      if (allArticles.length === 0) {
        setError("Aucun article récupéré. Vérifiez votre connexion internet.");
      }
    } catch (err) {
      setError("Erreur lors de la récupération des flux RSS");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  // ============================================================================
  // RENDU
  // ============================================================================

  return (
    <>
      <div className="min-h-screen pt-24 pb-16 px-5 sm:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10 text-center"
          >
            <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-4 sm:mb-6"></div>
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Veille Technologique
            </h1>
            <p className="text-base sm:text-lg text-black/50 max-w-2xl mx-auto">
              Actualités en temps réel sur la cybersécurité et les nouvelles technologies
            </p>
          </motion.div>

          {/* Filtres et bouton refresh */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-lg transition-all text-sm sm:text-base active:scale-95 ${
                  selectedCategory === category.id
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-300 hover:border-slate-400"
                }`}
              >
                {category.name}
              </button>
            ))}

            <button
              onClick={fetchFeeds}
              disabled={isLoading}
              className="ml-auto min-h-[44px] px-4 py-2.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 transition-all active:scale-95 flex items-center gap-2 text-sm sm:text-base disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>
          </motion.div>

          {/* État de chargement */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="w-12 h-12 text-slate-400 animate-spin mb-4" />
              <p className="text-slate-600">Chargement des flux RSS...</p>
            </motion.div>
          )}

          {/* État d'erreur */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4"
            >
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-900 font-semibold mb-1">Erreur</h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={fetchFeeds}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Réessayer
                </button>
              </div>
            </motion.div>
          )}

          {/* Liste des articles */}
          {!isLoading && !error && (
            <div className="space-y-4 sm:space-y-5">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={`${article.link}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.2 + (index * 0.08),
                    ease: [0.25, 0.1, 0.25, 1] 
                  }}
                  className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
                    <h3 className="flex-1 text-base sm:text-lg font-semibold leading-snug">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-black/60 whitespace-nowrap shrink-0">
                      <Clock size={14} className="shrink-0" />
                      <span>{formatTimeAgo(article.pubDate)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs sm:text-sm font-medium">
                      {article.source}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-black/70 mb-4 sm:mb-5 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>

                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[44px] py-2 text-sm sm:text-base text-slate-900 hover:gap-3 active:scale-[0.98] transition-all"
                  >
                    <span>Lire l'article</span>
                    <ExternalLink size={16} className="shrink-0" />
                  </a>
                </motion.article>
              ))}
            </div>
          )}

          {/* Message si aucun article */}
          {!isLoading && !error && filteredArticles.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <p className="text-sm sm:text-base text-black/60">
                Aucun article dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
