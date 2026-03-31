import { motion } from 'framer-motion';
import { primarySkills, secondarySkills, Skill } from '../data/portfolio';
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiNestjs,
  SiNextdotjs,
  SiMysql,
  SiJavascript,
  SiRedis,
  SiDocker,
  SiMongodb,
  SiGooglebigquery,
  SiGooglecloud,
  SiFirebase,
  SiApachekafka,
  SiJest,
  SiStorybook,
  SiGit,
  SiLinux,
  SiExpress,
  SiWebpack,
} from 'react-icons/si';
import { IconType } from 'react-icons';

const iconLookup: Record<string, IconType> = {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiNestjs,
  SiNextdotjs,
  SiMysql,
  SiJavascript,
  SiRedis,
  SiDocker,
  SiMongodb,
  SiGooglebigquery,
  SiGooglecloud,
  SiFirebase,
  SiApachekafka,
  SiJest,
  SiStorybook,
  SiGit,
  SiLinux,
  SiExpress,
  SiWebpack,
};

const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: i * 0.035 },
  }),
};

function SkillChip({ skill, size, index }: { skill: Skill; size: 'lg' | 'sm'; index: number }) {
  const Icon = iconLookup[skill.icon];
  const isLarge = size === 'lg';

  return (
    <motion.div
      custom={index}
      variants={popIn}
      className={`group flex items-center gap-2.5 rounded-xl border transition-all duration-300 cursor-default ${
        isLarge
          ? 'card-glass bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 px-5 py-3.5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5'
          : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/50 px-3.5 py-2 hover:border-slate-700/80'
      }`}
    >
      {Icon && (
        <Icon
          className={`flex-shrink-0 transition-colors duration-300 ${
            isLarge
              ? 'text-blue-600 dark:text-blue-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
              : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-400'
          }`}
          size={isLarge ? 22 : 16}
        />
      )}
      <span
        className={`font-medium transition-colors duration-300 ${
          isLarge
            ? 'text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-100'
            : 'text-slate-500 dark:text-slate-400 text-xs group-hover:text-slate-700 dark:group-hover:text-slate-300'
        }`}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

const Skills = () => {
  return (
    <section id="skills" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-cyan-500/[0.02] dark:bg-cyan-500/[0.03] rounded-full blur-[120px] animate-blob-drift" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div custom={0} variants={popIn} className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Tech Stack
            </h2>
            <p className="text-slate-500 max-w-xl">
              Core technologies I use daily, plus the broader toolkit.
            </p>
          </motion.div>

          <div className="mb-8">
            <motion.p custom={1} variants={popIn} className="text-slate-600 text-xs uppercase tracking-widest font-semibold mb-4">
              Core Stack
            </motion.p>
            <div className="flex flex-wrap gap-3">
              {primarySkills.map((skill, i) => (
                <SkillChip key={skill.name} skill={skill} size="lg" index={i + 2} />
              ))}
            </div>
          </div>

          <div>
            <motion.p custom={8} variants={popIn} className="text-slate-600 text-xs uppercase tracking-widest font-semibold mb-4">
              Also Work With
            </motion.p>
            <div className="flex flex-wrap gap-2">
              {secondarySkills.map((skill, i) => (
                <SkillChip key={skill.name} skill={skill} size="sm" index={i + 9} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
