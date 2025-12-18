import { motion } from 'motion/react';
import { Code2, Lightbulb, TrendingUp } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Code2,
      title: 'Développement Full-Stack',
      description: 'Maîtrise des technologies front-end et back-end pour créer des solutions complètes et performantes'
    },
    {
      icon: Lightbulb,
      title: 'Solutions Innovantes',
      description: 'Créativité et innovation au service de projets qui marquent les esprits et génèrent de la valeur'
    },
    {
      icon: TrendingUp,
      title: 'Apprentissage Continu',
      description: 'Toujours en quête de nouvelles compétences et technologies émergentes pour rester à la pointe'
    }
  ];

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

        {/* Grid de features avec cards responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-6 sm:p-7 md:p-8 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-[shadow,border-color] duration-300"
            >
              {/* Icône responsive avec meilleur espacement */}
              <div className="w-14 h-14 sm:w-15 sm:h-15 md:w-16 md:h-16 bg-slate-900 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                <feature.icon size={26} className="text-white sm:hidden md:block" strokeWidth={1.5} />
                <feature.icon size={24} className="text-white hidden sm:block md:hidden" strokeWidth={1.5} />
              </div>

              {/* Titre responsive avec meilleur espacement */}
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold tracking-tight">{feature.title}</h3>

              {/* Description avec typographie plus généreuse */}
              <p className="text-sm sm:text-base text-black/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
