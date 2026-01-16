import { motion } from 'motion/react';

export function About() {
  return (
    // Padding vertical responsive : réduit sur mobile pour économiser l'espace vertical
    <section id="a-propos" className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section avec ligne décorative minimaliste et espacement augmenté */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          {/* Ligne décorative supérieure - élément visuel subtil */}
          <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-4 sm:mb-6"></div>

          {/* Titre responsive avec meilleur espacement */}
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight px-4 sm:px-0">À propos</h2>

          {/* Sous-titre subtil ajouté pour enrichir la section */}
          <p className="text-base sm:text-lg text-black/50 max-w-2xl mx-auto px-4 sm:px-6">
            Développeur passionné par la création d'expériences web exceptionnelles
          </p>
        </motion.div>

        {/* Bloc de texte principal avec typographie agrandie */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="px-4 sm:px-6"
          >
            {/* Typographie responsive avec line-height généreux */}
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-black/70 leading-relaxed">
              Passionné par le développement web et les nouvelles technologies, je me consacre à créer
              des solutions innovantes et performantes. Mon parcours m'a permis d'acquérir des compétences
              solides en développement front-end et back-end.
            </p>
            <p className="text-base sm:text-lg text-black/70 leading-relaxed">
              Toujours en quête d'apprentissage, j'aime relever de nouveaux défis et collaborer sur des
              projets stimulants qui repoussent les limites de la créativité et de la technologie.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
