import { motion } from 'framer-motion';
import { featuredProjects } from '../data/portfolio';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Things I&apos;ve Built
            </h2>
            <p className="text-slate-500 max-w-xl">
              End-to-end products I&apos;ve shipped — each with measurable impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="group relative bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-blue-400">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-2.5 py-1">
                    Enterprise
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-cyan-400/90 text-sm font-medium mb-4">
                  {project.tagline}
                </p>

                <div className="space-y-3">
                  <ul className="space-y-1.5">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome} className="text-slate-400 text-sm flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5 flex-shrink-0">&#x2713;</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/50">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs font-mono text-slate-500">
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
