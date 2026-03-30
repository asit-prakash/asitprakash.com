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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function SkillChip({ skill, size }: { skill: Skill; size: 'lg' | 'sm' }) {
  const Icon = iconLookup[skill.icon];
  const isLarge = size === 'lg';

  return (
    <div
      className={`group flex items-center gap-2.5 rounded-xl border transition-all duration-300 cursor-default ${
        isLarge
          ? 'bg-slate-900/50 border-slate-700/60 px-5 py-3.5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5'
          : 'bg-slate-900/30 border-slate-800/50 px-3.5 py-2 hover:border-slate-700/80'
      }`}
    >
      {Icon && (
        <Icon
          className={`flex-shrink-0 transition-colors ${
            isLarge
              ? 'text-blue-400 group-hover:text-cyan-400'
              : 'text-slate-500 group-hover:text-slate-400'
          }`}
          size={isLarge ? 22 : 16}
        />
      )}
      <span
        className={`font-medium transition-colors ${
          isLarge
            ? 'text-white text-sm group-hover:text-blue-100'
            : 'text-slate-400 text-xs group-hover:text-slate-300'
        }`}
      >
        {skill.name}
      </span>
    </div>
  );
}

const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '50px' }}
          transition={{ staggerChildren: 0.06 }}
        >
          <motion.div variants={fadeInUp} className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Tech Stack
            </h2>
            <p className="text-slate-500 max-w-xl">
              Core technologies I use daily, plus the broader toolkit.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-8">
            <p className="text-slate-600 text-xs uppercase tracking-widest font-semibold mb-4">
              Core Stack
            </p>
            <div className="flex flex-wrap gap-3">
              {primarySkills.map((skill) => (
                <SkillChip key={skill.name} skill={skill} size="lg" />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-slate-600 text-xs uppercase tracking-widest font-semibold mb-4">
              Also Work With
            </p>
            <div className="flex flex-wrap gap-2">
              {secondarySkills.map((skill) => (
                <SkillChip key={skill.name} skill={skill} size="sm" />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
