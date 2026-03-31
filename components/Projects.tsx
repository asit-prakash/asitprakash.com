import { motion } from 'framer-motion';
import { featuredProjects } from '../data/portfolio';

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20, delay: i * 0.12 },
  }),
};

const accentColors = [
  'from-blue-500/20 to-cyan-500/10',
  'from-violet-500/20 to-blue-500/10',
  'from-emerald-500/20 to-cyan-500/10',
  'from-amber-500/20 to-orange-500/10',
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-violet-500/[0.02] dark:bg-violet-500/[0.04] rounded-full blur-[120px] animate-blob-drift-reverse" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div custom={0} variants={scaleIn} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Things I&apos;ve Built
            </h2>
            <p className="text-slate-500 max-w-xl">
              End-to-end products I&apos;ve shipped — each with measurable impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i + 1}
                variants={scaleIn}
                className="card-glass group relative bg-white/60 dark:bg-slate-900/30 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div
                  className={`h-1.5 bg-gradient-to-r ${accentColors[i % accentColors.length]}`}
                />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-blue-600 dark:text-blue-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full px-2.5 py-0.5">
                      Enterprise
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-cyan-600 dark:text-cyan-400/90 text-sm font-medium mb-3">
                    {project.tagline}
                  </p>

                  <ul className="space-y-1.5 mb-3">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome} className="text-slate-600 dark:text-slate-400 text-sm flex items-start gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0">&#x2713;</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800/40 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
