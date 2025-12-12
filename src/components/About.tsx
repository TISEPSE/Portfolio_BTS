import { motion } from 'motion/react';
import { Code2, Lightbulb, TrendingUp } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Code2,
      title: 'Développement Full-Stack',
      description: 'Maîtrise des technologies front-end et back-end pour créer des solutions complètes'
    },
    {
      icon: Lightbulb,
      title: 'Solutions Innovantes',
      description: 'Créativité et innovation au service de projets qui marquent les esprits'
    },
    {
      icon: TrendingUp,
      title: 'Apprentissage Continu',
      description: 'Toujours en quête de nouvelles compétences et technologies émergentes'
    }
  ];

  return (
    <section id="a-propos" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4">À propos</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="mb-6 text-black/70">
              Passionné par le développement web et les nouvelles technologies, je me consacre à créer 
              des solutions innovantes et performantes. Mon parcours m'a permis d'acquérir des compétences 
              solides en développement front-end et back-end.
            </p>
            <p className="text-black/70">
              Toujours en quête d'apprentissage, j'aime relever de nouveaux défis et collaborer sur des 
              projets stimulants qui repoussent les limites de la créativité et de la technologie.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-black/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}