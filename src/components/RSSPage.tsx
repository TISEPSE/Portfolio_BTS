import { Clock, ExternalLink } from "lucide-react";
import { useState } from "react";

export function RSSPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");

  const categories = [
    { id: "all", name: "Tous" },
    { id: "vulnerabilities", name: "Vulnérabilités" },
    { id: "threats", name: "Menaces" },
    { id: "privacy", name: "Confidentialité" },
  ];

  const rssFeeds = [
    {
      title:
        "Nouvelle vulnérabilité critique détectée dans Log4j",
      source: "CERT-FR",
      category: "vulnerabilities",
      description:
        "Une faille de sécurité critique a été découverte dans la bibliothèque Apache Log4j, permettant l'exécution de code à distance. Les experts recommandent une mise à jour immédiate.",
      time: "Il y a 2 heures",
      url: "https://example.com",
    },
    {
      title:
        "Campagne de phishing massive ciblant les entreprises françaises",
      source: "ANSSI",
      category: "threats",
      description:
        "Une nouvelle campagne de phishing sophistiquée cible les entreprises du CAC 40 avec des emails frauduleux imitant des communications officielles.",
      time: "Il y a 5 heures",
      url: "https://example.com",
    },
    {
      title: "Mise à jour de sécurité majeure pour Chrome",
      source: "Google Security",
      category: "vulnerabilities",
      description:
        "Google publie une mise à jour d'urgence pour Chrome corrigeant 12 vulnérabilités dont 3 considérées comme critiques.",
      time: "Il y a 8 heures",
      url: "https://example.com",
    },
    {
      title:
        "RGPD : Nouvelles directives sur le traitement des données",
      source: "CNIL",
      category: "privacy",
      description:
        "La CNIL publie de nouvelles recommandations concernant le traitement et la protection des données personnelles dans le cadre du RGPD.",
      time: "Il y a 1 jour",
      url: "https://example.com",
    },
    {
      title:
        "Ransomware : Nouvelle variante cible les infrastructures critiques",
      source: "Kaspersky",
      category: "threats",
      description:
        "Des chercheurs en sécurité ont identifié une nouvelle souche de ransomware spécialement conçue pour cibler les systèmes industriels.",
      time: "Il y a 1 jour",
      url: "https://example.com",
    },
    {
      title:
        "Fuite de données massive chez un grand opérateur télécom",
      source: "BleepingComputer",
      category: "privacy",
      description:
        "Plus de 100 millions d'enregistrements clients ont été exposés suite à une mauvaise configuration d'une base de données.",
      time: "Il y a 2 jours",
      url: "https://example.com",
    },
    {
      title:
        "Authentification multi-facteurs : Les meilleures pratiques en 2025",
      source: "SecurityWeek",
      category: "privacy",
      description:
        "Guide complet sur l'implémentation et l'optimisation de l'authentification multi-facteurs dans les environnements d'entreprise.",
      time: "Il y a 3 jours",
      url: "https://example.com",
    },
    {
      title:
        "Zero Trust Architecture : Tendances et implémentation",
      source: "Gartner",
      category: "threats",
      description:
        "Analyse des dernières tendances en matière d'architecture Zero Trust et recommandations pour une migration réussie.",
      time: "Il y a 4 jours",
      url: "https://example.com",
    },
    {
      title: "Attaque DDoS record sur des serveurs européens",
      source: "Cloudflare",
      category: "threats",
      description:
        "Une attaque DDoS de plus de 3 Tbps a été détectée et mitigée, établissant un nouveau record.",
      time: "Il y a 5 jours",
      url: "https://example.com",
    },
    {
      title:
        "Patch Tuesday : Microsoft corrige 80 vulnérabilités",
      source: "Microsoft",
      category: "vulnerabilities",
      description:
        "Le dernier Patch Tuesday de Microsoft inclut des correctifs pour 80 vulnérabilités, dont 5 critiques.",
      time: "Il y a 1 semaine",
      url: "https://example.com",
    },
  ];

  const filteredFeeds =
    selectedCategory === "all"
      ? rssFeeds
      : rssFeeds.filter(
          (feed) => feed.category === selectedCategory,
        );

  return (
    <div className="min-h-screen pt-24 pb-16 px-5 sm:px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Categories Filter */}
        <div className="mb-6 sm:mb-8 flex flex-wrap gap-2.5 sm:gap-3">
          {categories.map((category) => (
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
        </div>

        {/* RSS Feeds List */}
        <div className="space-y-4 sm:space-y-5">
          {filteredFeeds.map((feed, index) => (
            <article
              key={index}
              className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
                <h3 className="flex-1 text-base sm:text-lg font-semibold leading-snug">{feed.title}</h3>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-black/60 whitespace-nowrap shrink-0">
                  <Clock size={14} className="shrink-0" />
                  <span>{feed.time}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-black/60 mb-3 font-medium">
                {feed.source}
              </p>
              <p className="text-sm sm:text-base text-black/70 mb-4 sm:mb-5 leading-relaxed">
                {feed.description}
              </p>

              <a
                href={feed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] py-2 text-sm sm:text-base text-slate-900 hover:gap-3 active:scale-[0.98] transition-all"
              >
                <span>Lire l'article</span>
                <ExternalLink size={16} className="shrink-0" />
              </a>
            </article>
          ))}
        </div>

        {/* No results message */}
        {filteredFeeds.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-sm sm:text-base text-black/60">
              Aucun article dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}