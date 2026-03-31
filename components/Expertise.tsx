import { motion } from 'framer-motion';
import { expertiseAreas } from '../data/portfolio';

const iconMap: Record<string, JSX.Element> = {
  layers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  brain: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
      <path d="M10 21h4" />
      <path d="M9 9h.01M15 9h.01M10 13a2 2 0 1 0 4 0" />
    </svg>
  ),
  users: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18, delay: i * 0.15 },
  }),
};

const Expertise = () => {
  return (
    <section id="expertise" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/[0.03] dark:bg-blue-500/[0.04] rounded-full blur-[120px] animate-blob-drift" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div custom={0} variants={slideInLeft} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              What I Do Best
            </h2>
            <p className="text-slate-500 max-w-xl">
              Core areas where I deliver the most value.
            </p>
          </motion.div>

          {/* Bento grid: first card spans full width, other two side by side */}
          <div className="grid sm:grid-cols-2 gap-5">
            {expertiseAreas.map((area, i) => (
              <motion.div
                key={area.title}
                custom={i + 1}
                variants={slideInLeft}
                className={`card-glass group relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 ${
                  i === 0 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="text-blue-600 dark:text-blue-400 mb-5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {iconMap[area.icon]}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {area.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                  {area.description}
                </p>

                <ul className="space-y-1.5">
                  {area.highlights.map((h) => (
                    <li key={h} className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-600/60 dark:bg-blue-400/60 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;
