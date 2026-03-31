import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { impactMetrics } from '../data/portfolio';

function AnimatedValue({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span>
      {inView ? display : 0}
      {suffix}
    </span>
  );
}

const ImpactStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '100px' });

  return (
    <section id="impact" ref={ref} className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] dark:from-blue-500/[0.03] to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {impactMetrics.map((metric, i) => {
            const match = metric.value.match(/^(\d+)(.*)$/);
            const num = match ? parseInt(match[1]) : 0;
            const suffix = match ? match[2] : '';

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 100, damping: 16, delay: i * 0.1 }}
                className="card-glass group relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 sm:p-6 text-center hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                  <AnimatedValue value={num} suffix={suffix} inView={inView} />
                </div>
                <div className="text-slate-900 dark:text-white text-sm font-medium mb-0.5">{metric.label}</div>
                <div className="text-slate-500 dark:text-slate-500 text-xs">{metric.detail}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStrip;
