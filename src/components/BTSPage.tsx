import { motion } from 'motion/react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Footer } from './Footer';

type NiveauType = 'maitrise' | 'en_cours' | 'non_maitrise';

interface Projet {
  nom: string;
  description: string;
}

interface Competence {
  libelle: string;
  niveau: NiveauType;
  projet: Projet;
  justification: string;
}

interface Bloc {
  titre: string;
  competences: Competence[];
}

export function BTSPage() {
  const projets = {
    bookByClick: {
      nom: 'Book-By-Click',
      description: 'Application web de prise de rendez-vous en ligne (React, Flask, PostgreSQL, Docker)'
    },
    portfolio: {
      nom: 'Portfolio personnel',
      description: 'Site vitrine présentant mes compétences, projets et veille technologique'
    }
  };

  const blocs: Bloc[] = [
    {
      titre: 'Bloc 1 : Support et mise à disposition de services informatiques',
      competences: [
        {
          libelle: 'Gérer le patrimoine informatique',
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: 'Utilisation de GLPI pour la gestion du parc informatique, GitHub pour le versionnage et Docker pour la gestion des conteneurs (actifs numériques).'
        },
        {
          libelle: "Répondre aux incidents et aux demandes d'assistance",
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: "Gestion rigoureuse des incidents via GitHub : historique Git propre, plusieurs branches de développement et suivi des corrections de dysfonctionnements."
        },
        {
          libelle: "Développer la présence en ligne de l'organisation",
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: "Réalisation d'un site web complet pour la prise de rendez-vous en ligne."
        },
        {
          libelle: 'Travailler en mode projet',
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: "Réalisation effectuée en équipe avec une analyse des besoins (Use Cases) et une planification via Git."
        },
        {
          libelle: 'Mettre à disposition des utilisateurs un service',
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: 'Déploiement sur un VPS, documentation utilisateur et technique accessible en ligne.'
        },
        {
          libelle: 'Organiser son développement professionnel',
          niveau: 'maitrise',
          projet: projets.portfolio,
          justification: "Mise en place d'une veille technologique accessible sur le portfolio et intégration d'un formulaire de contact sur l'application pour recueillir les retours utilisateurs."
        }
      ]
    },
    {
      titre: "Bloc 2 : Conception et développement d'applications (Option SLAM)",
      competences: [
        {
          libelle: 'Concevoir et développer une solution applicative',
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: 'Utilisation de React 19, Flask (API REST), architecture 3-tiers et environnement Docker.'
        },
        {
          libelle: 'Assurer la maintenance corrective ou évolutive',
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: 'Précisé comme compétence travaillée ; gestion des versions et migrations de base de données.'
        },
        {
          libelle: 'Gérer les données',
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: "Conception de la base de données (MCD/MLD), utilisation de PostgreSQL 15 et de l'ORM SQLAlchemy."
        }
      ]
    },
    {
      titre: 'Bloc 3 : Cybersécurité des services informatiques (Option SLAM)',
      competences: [
        {
          libelle: 'Protéger les données à caractère personnel',
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: "Mise en place d'un contrôle d'accès basé sur la séparation des rôles (Admin, Pro, Client)."
        },
        {
          libelle: "Préserver l'identité numérique de l'organisation",
          niveau: 'maitrise',
          projet: projets.portfolio,
          justification: 'Documentation professionnelle centralisée et utilisation de dépôts publics structurés.'
        },
        {
          libelle: 'Sécuriser les équipements et les usages des utilisateurs',
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: 'Gestion des sessions via JWT et hachage des mots de passe (sécurité native).'
        },
        {
          libelle: "Garantir la disponibilité, l'intégrité et la confidentialité",
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: "Isolation par Docker, utilisation de SQLAlchemy pour sécuriser les requêtes et traçabilité des échanges par e-mail."
        },
        {
          libelle: "Assurer la cybersécurité d'une solution applicative",
          niveau: 'maitrise',
          projet: projets.bookByClick,
          justification: "Intégration de la sécurité dès la conception : authentification robuste et validation des données."
        }
      ]
    }
  ];

  const getNiveauBadge = (niveau: NiveauType) => {
    switch (niveau) {
      case 'maitrise':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
            <CheckCircle2 size={14} />
            Maîtrisé
          </span>
        );
      case 'en_cours':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium">
            <Clock size={14} />
            Maîtrise partielle
          </span>
        );
      case 'non_maitrise':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
            <XCircle size={14} />
            Non maîtrisé
          </span>
        );
    }
  };

  return (
    <>
      <div className="min-h-screen pt-24 pb-16 px-5 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-12 text-center"
          >
            <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-4 sm:mb-6"></div>
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight px-4 sm:px-0">
              Compétences BTS SIO
            </h1>
            <p className="text-base sm:text-lg text-black/50 max-w-2xl mx-auto px-4 sm:px-6">
              Tableau de synthèse des compétences acquises durant ma formation
            </p>
          </motion.div>

          <div className="space-y-8">
            {blocs.map((bloc, blocIndex) => (
              <motion.div
                key={blocIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + blocIndex * 0.1 }}
              >
                <h2 className="text-lg font-semibold text-slate-700 mb-3 px-1">{bloc.titre}</h2>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  {/* Version desktop */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-900 text-white">
                          <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide w-1/3">Compétence</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide w-44">État de validation</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide w-48">Projet</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Justification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bloc.competences.map((competence, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm text-black/80 font-medium">{competence.libelle}</td>
                            <td className="px-6 py-4">{getNiveauBadge(competence.niveau)}</td>
                            <td className="px-6 py-4">
                              <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium mb-1">
                                {competence.projet.nom}
                              </span>
                              <p className="text-xs text-black/50 leading-snug">{competence.projet.description}</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-black/70">{competence.justification}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Version mobile - cartes empilées */}
                  <div className="md:hidden divide-y divide-slate-100">
                    {bloc.competences.map((competence, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                        className="p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-semibold text-black/90">{competence.libelle}</h3>
                          {getNiveauBadge(competence.niveau)}
                        </div>
                        <div>
                          <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium mb-1">
                            {competence.projet.nom}
                          </span>
                          <p className="text-xs text-black/50 leading-snug">{competence.projet.description}</p>
                        </div>
                        <p className="text-sm text-black/70">{competence.justification}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
