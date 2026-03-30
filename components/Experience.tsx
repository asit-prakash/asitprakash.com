import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companyExperiences } from '../data/portfolio';
import { HiArrowUp, HiChevronDown } from 'react-icons/hi';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const Experience = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '50px' }}
          transition={{ staggerChildren: 0.06 }}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Where I&apos;ve Worked
            </h2>
            <p className="text-slate-500 max-w-xl">
              Click any role to explore details.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-slate-700 to-transparent" />

            <div className="space-y-8">
              {companyExperiences.map((company) => (
                <motion.div
                  key={company.company}
                  variants={fadeInUp}
                  className="relative pl-8 sm:pl-14"
                >
                  <div className="absolute left-0 sm:left-4 top-2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-blue-400 bg-slate-950 z-10" />

                  <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-6 sm:p-8 hover:border-slate-700/80 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {company.company}
                      </h3>
                      <span className="text-slate-500 text-sm font-mono whitespace-nowrap">
                        {company.totalPeriod}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-5">{company.location}</p>

                    <div className="space-y-4">
                      {company.roles.map((role) => {
                        const roleKey = `${company.company}-${role.title}`;
                        const isOpen = expanded === roleKey;

                        return (
                          <div key={role.title}>
                            <button
                              onClick={() => setExpanded(isOpen ? null : roleKey)}
                              className="w-full text-left group"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h4 className="text-base sm:text-lg font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                                      {role.title}
                                    </h4>
                                    {role.promoted && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                        <HiArrowUp size={10} />
                                        Promoted
                                      </span>
                                    )}
                                    <span className="text-slate-600 text-xs font-mono">
                                      {role.period}
                                    </span>
                                  </div>
                                  <p className="text-slate-400 text-sm">{role.keyMetric}</p>
                                </div>
                                <HiChevronDown
                                  size={18}
                                  className={`text-slate-500 mt-1 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                />
                              </div>
                            </button>

                            <AnimatePresence>
                              {isOpen && role.projects.length > 0 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 space-y-5">
                                    {role.projects.map((project) => (
                                      <div key={project.name} className="pl-4 border-l-2 border-slate-800/60">
                                        <h5 className="text-slate-200 font-medium mb-2">
                                          {project.name}
                                        </h5>
                                        <p className="text-slate-500 text-sm mb-3">
                                          {project.description}
                                        </p>
                                        <ul className="space-y-1.5 mb-4">
                                          {project.achievements.map((a, i) => (
                                            <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                                              <span className="text-blue-400 mt-1.5 flex-shrink-0">
                                                <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                                                  <circle cx="3" cy="3" r="3" />
                                                </svg>
                                              </span>
                                              {a}
                                            </li>
                                          ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-2">
                                          {project.tech.map((t) => (
                                            <span key={t} className="px-2.5 py-0.5 text-xs font-mono text-blue-300/80 bg-blue-500/10 rounded-md">
                                              {t}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
