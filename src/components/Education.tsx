import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

export function Education() {
  const formations = [
    {
      title: 'Titre de la formation',
      period: '2023 - 2024',
      institution: 'Établissement de formation',
      description: 'Description détaillée de la formation et des compétences acquises pendant ce parcours. Incluez les technologies maîtrisées et les projets réalisés.',
      skills: ['HTML/CSS', 'JavaScript', 'React']
    },
    {
      title: 'Autre formation',
      period: '2022 - 2023',
      institution: 'Nom de l\'établissement',
      description: 'Description de cette formation avec les compétences développées et les projets marquants réalisés durant cette période.',
      skills: ['Node.js', 'MongoDB', 'API REST']
    },
    {
      title: 'Formation complémentaire',
      period: '2021 - 2022',
      institution: 'Institution',
      description: 'Description de la formation initiale avec les fondamentaux acquis et les premières expériences en développement web.',
      skills: ['Git', 'Responsive Design', 'UX/UI']
    }
  ];

  return (
    <section id="formations" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4">Mes formations</h2>
        </motion.div>

        <div className="space-y-8">
          {formations.map((formation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 pb-8 border-l-2 border-slate-200 last:pb-0"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-900 rounded-full" />
              
              <div className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="mb-2">{formation.title}</h3>
                    <p className="text-black/60">{formation.institution}</p>
                  </div>
                  <div className="flex items-center gap-2 text-black/60">
                    <Calendar size={16} />
                    <span>{formation.period}</span>
                  </div>
                </div>
                
                <p className="mb-6 text-black/70">{formation.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {formation.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}