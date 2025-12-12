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
    // Padding vertical augmenté : py-24 → py-32 pour plus de hauteur de section
    <section id="a-propos" className="py-32 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section avec ligne décorative minimaliste et espacement augmenté */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
          // mb-16 → mb-20 pour plus d'espace avant le contenu
        >
          {/* Ligne décorative supérieure - élément visuel subtil */}
          <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-6"></div>

          {/* Titre agrandi avec meilleur espacement */}
          <h2 className="mb-6 text-5xl font-bold tracking-tight">À propos</h2>
          {/* mb-4 → mb-6, ajout de text-5xl, font-bold et tracking-tight pour plus d'impact */}

          {/* Sous-titre subtil ajouté pour enrichir la section */}
          <p className="text-lg text-black/50 max-w-2xl mx-auto">
            Développeur passionné par la création d'expériences web exceptionnelles
          </p>
        </motion.div>

        {/* Bloc de texte principal avec typographie agrandie */}
        <div className="max-w-4xl mx-auto mb-20">
          {/* max-w-3xl → max-w-4xl pour plus de largeur, mb-16 → mb-20 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Typographie agrandie avec line-height généreux */}
            <p className="mb-8 text-lg text-black/70 leading-relaxed">
              {/* mb-6 → mb-8, ajout de text-lg et leading-relaxed */}
              Passionné par le développement web et les nouvelles technologies, je me consacre à créer
              des solutions innovantes et performantes. Mon parcours m'a permis d'acquérir des compétences
              solides en développement front-end et back-end.
            </p>
            <p className="text-lg text-black/70 leading-relaxed">
              {/* Ajout de text-lg et leading-relaxed */}
              Toujours en quête d'apprentissage, j'aime relever de nouveaux défis et collaborer sur des
              projets stimulants qui repoussent les limites de la créativité et de la technologie.
            </p>
          </motion.div>
        </div>

        {/* Grid de features avec cards agrandies */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* gap-6 → gap-8 pour plus d'espace entre les cards */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
              // p-6 → p-8 pour plus de padding interne
              // rounded-lg → rounded-xl pour des coins plus arrondis
              // shadow-md → shadow-lg pour un effet hover plus prononcé
            >
              {/* Icône agrandie avec meilleur espacement */}
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                {/* w-12 h-12 → w-16 h-16 pour icône plus grande, mb-4 → mb-6 */}
                <feature.icon size={28} className="text-white" strokeWidth={1.5} />
                {/* size 24 → 28 pour icône plus visible */}
              </div>

              {/* Titre agrandi avec meilleur espacement */}
              <h3 className="mb-4 text-xl font-semibold tracking-tight">{feature.title}</h3>
              {/* mb-3 → mb-4, ajout de text-xl, font-semibold et tracking-tight */}

              {/* Description avec typographie plus généreuse */}
              <p className="text-base text-black/70 leading-relaxed">{feature.description}</p>
              {/* Ajout de text-base et leading-relaxed pour meilleure lisibilité */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
