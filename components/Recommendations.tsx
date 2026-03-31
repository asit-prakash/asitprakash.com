import { motion } from 'framer-motion';
import Image from 'next/image';
import { recommendations, recommendationsLink } from '../data/portfolio';

const slideAlternate = {
  hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? -30 : 30 }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18, delay: i * 0.12 },
  }),
};

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

const Recommendations = () => {
  return (
    <section id="recommendations" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-blue-500/[0.02] dark:bg-blue-500/[0.03] rounded-full blur-[120px] animate-blob-drift" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div custom={0} variants={slideAlternate} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              What People Say
            </h2>
            <p className="text-slate-500 max-w-xl">
              Recommendations from colleagues and managers I&apos;ve worked with.{' '}
              <a
                href={recommendationsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
              >
                View all on LinkedIn &rarr;
              </a>
            </p>
          </motion.div>

          <div className="columns-1 md:columns-2 gap-5 space-y-5">
            {recommendations.map((rec, i) => (
              <motion.a
                key={rec.name}
                href={rec.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                custom={i + 1}
                variants={slideAlternate}
                className="card-glass group relative bg-white/60 dark:bg-slate-900/30 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 block break-inside-avoid"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-200/50 dark:ring-slate-700/50 group-hover:ring-blue-500/40 transition-all duration-300">
                    <Image
                      src={rec.image}
                      alt={rec.name}
                      width={48}
                      height={48}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-slate-900 dark:text-white font-semibold text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {rec.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-snug line-clamp-2">
                      {rec.title}
                    </p>
                  </div>
                </div>

                <div className="relative pl-2">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600/30 dark:from-blue-500/30 via-blue-600/10 dark:via-blue-500/10 to-transparent rounded-full" />
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line pl-4">
                    {rec.text}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                  <span className="text-slate-600 text-xs">
                    {rec.date} &middot; {rec.relationship}
                  </span>
                  <span className="text-blue-600/60 dark:text-blue-400/60 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    <LinkedInIcon />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Recommendations;
