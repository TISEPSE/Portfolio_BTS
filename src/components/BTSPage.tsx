import { motion } from 'motion/react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Footer } from './Footer';

type NiveauType = 'maitrise' | 'en_cours' | 'non_maitrise';

interface Competence {
  libelle: string;
  niveau: NiveauType;
  projet: string;
  realisation: string;
}

export function BTSPage() {
  const competences: Competence[] = [
    {
      libelle: 'Gérer le patrimoine informatique',
      niveau: 'maitrise',
      projet: 'Projet 1',
      realisation: 'Réalisation 1'
    },
    {
      libelle: 'Répondre aux incidents et aux demandes',
      niveau: 'en_cours',
      projet: 'Projet 2',
      realisation: 'Réalisation 2'
    },
    {
      libelle: 'Développer la présence en ligne',
      niveau: 'maitrise',
      projet: 'Projet 3',
      realisation: 'Réalisation 3'
    },
    {
      libelle: 'Travailler en mode projet',
      niveau: 'en_cours',
      projet: 'Projet 4',
      realisation: 'Réalisation 4'
    },
    {
      libelle: 'Mettre à disposition des utilisateurs un service informatique',
      niveau: 'non_maitrise',
      projet: 'Projet 5',
      realisation: 'Réalisation 5'
    },
    {
      libelle: 'Organiser son développement professionnel',
      niveau: 'maitrise',
      projet: 'Projet 6',
      realisation: 'Réalisation 6'
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
            En cours
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
          >
            {/* Version desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Libellé</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Niveau</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Projet</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Réalisation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {competences.map((competence, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-black/80 font-medium">{competence.libelle}</td>
                      <td className="px-6 py-4">{getNiveauBadge(competence.niveau)}</td>
                      <td className="px-6 py-4 text-sm text-black/70">{competence.projet}</td>
                      <td className="px-6 py-4 text-sm text-black/70">{competence.realisation}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Version mobile - cartes empilées */}
            <div className="md:hidden divide-y divide-slate-100">
              {competences.map((competence, index) => (
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
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-black/50 block mb-1">Projet</span>
                      <span className="text-black/70">{competence.projet}</span>
                    </div>
                    <div>
                      <span className="text-black/50 block mb-1">Réalisation</span>
                      <span className="text-black/70">{competence.realisation}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
