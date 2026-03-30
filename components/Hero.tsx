import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiArrowDown } from 'react-icons/hi';
import { personalInfo } from '../data/portfolio';

const socialLinks = [
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FaXTwitter, href: personalInfo.twitter, label: 'Twitter' },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-blue-400 text-base sm:text-lg mb-4 font-mono"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
        >
          <span className="text-white">{personalInfo.name}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl sm:text-2xl lg:text-3xl font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6"
        >
          {personalInfo.tagline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-slate-400 max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed"
        >
          {personalInfo.heroLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="#contact"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 font-medium"
          >
            Get In Touch
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-slate-700 text-slate-300 hover:border-blue-500/50 hover:text-blue-400 rounded-xl transition-all duration-300"
          >
            View Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex items-center justify-center gap-5"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-slate-500 hover:text-blue-400 transition-all duration-300 hover:-translate-y-1"
            >
              <link.icon size={22} />
            </a>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-late">
        <HiArrowDown className="text-slate-400 text-2xl animate-bounce-slow" />
      </div>
    </section>
  );
};

export default Hero;
