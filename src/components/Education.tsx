import { motion } from 'motion/react';
import { Calendar, ExternalLink } from 'lucide-react';

export function Education() {
  const formations = [
    {
      title: 'Formation React',
      period: 'En cours',
      institution: 'Codecademy',
      description: 'Apprentissage du développement d\'applications web modernes avec React. Maîtrise des composants, hooks, state management et création d\'interfaces utilisateur interactives et performantes.',
      skills: ['React', 'JSX', 'Hooks', 'Components', 'Props', 'State Management'],
      link: 'https://www.codecademy.com/profiles/TISEPSE'
    },
    {
      title: 'Formation Flask',
      period: 'En cours',
      institution: 'Codecademy',
      description: 'Développement d\'applications web avec Flask, un framework Python léger et puissant. Apprentissage de la création d\'APIs REST, gestion des routes, templates et bases de données.',
      skills: ['Flask', 'Python', 'REST API', 'Jinja2', 'SQLAlchemy', 'Backend'],
      link: 'https://www.codecademy.com/profiles/TISEPSE'
    },
    {
      title: 'Formation Python',
      period: 'En cours',
      institution: 'Codecademy',
      description: 'Formation complète en Python couvrant les fondamentaux du langage, la programmation orientée objet, le traitement de données et les applications pratiques du développement web.',
      skills: ['Python', 'OOP', 'Data Structures', 'Algorithms', 'Backend'],
      link: 'https://www.codecademy.com/profiles/TISEPSE'
    },
    {
      title: 'Baccalauréat Technologique STI2D',
      period: 'Obtenu',
      institution: 'Sciences et Technologies de l\'Industrie et du Développement Durable',
      description: 'Formation technique axée sur l\'innovation technologique et le développement durable. Acquisition de compétences en conception, prototypage et analyse de systèmes techniques.',
      skills: ['Innovation', 'Technologies', 'Conception', 'Développement Durable']
    }
  ];

  return (
    <section id="formations" className="py-20 sm:py-24 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 sm:mb-16 text-center"
        >
          <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-4 sm:mb-6"></div>
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight px-4 sm:px-0">Mes formations</h2>
          <p className="text-base sm:text-lg text-black/50 max-w-2xl mx-auto px-4 sm:px-6">
            Mon parcours académique et mes formations professionnelles
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {formations.map((formation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-6 sm:pl-8 pb-6 sm:pb-8 border-l-2 border-slate-200 last:pb-0"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-900 rounded-full ring-4 ring-white" />

              <div className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-[shadow,border-color] duration-300">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-2 text-lg sm:text-xl font-semibold">{formation.title}</h3>
                    <p className="text-sm text-black/60 font-medium">{formation.institution}</p>
                  </div>

                  <div className="flex items-center gap-2 text-black/60 bg-slate-50 px-3 py-1.5 rounded-lg shrink-0">
                    <Calendar size={16} className="shrink-0" />
                    <span className="text-sm whitespace-nowrap">{formation.period}</span>
                  </div>
                </div>

                <p className="mb-4 text-sm sm:text-base text-black/70 leading-relaxed">{formation.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {formation.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm hover:bg-slate-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {formation.link && (
                  <a
                    href={formation.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[44px] py-2 text-sm sm:text-base text-slate-900 hover:text-slate-600 active:scale-[0.98] transition-all"
                  >
                    <ExternalLink size={16} className="shrink-0" />
                    <span>Voir mon profil Codecademy</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
