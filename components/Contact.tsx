import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { personalInfo, education, certifications } from '../data/portfolio';

const floatUp = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 16, delay: i * 0.1 },
  }),
};

const Contact = () => {
  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] dark:bg-blue-500/[0.04] rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div custom={0} variants={floatUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Let&apos;s Connect
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Open to opportunities, collaborations, or just a good tech conversation.
            </p>
          </motion.div>

          <motion.div custom={1} variants={floatUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.03] font-medium"
            >
              <HiMail size={20} />
              {personalInfo.email}
            </a>
            <div className="flex items-center gap-2 text-slate-500">
              <HiLocationMarker size={18} />
              <span className="text-sm">{personalInfo.location}</span>
            </div>
          </motion.div>

          <motion.div custom={2} variants={floatUp} className="flex items-center justify-center gap-4 mb-12">
            {[
              { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
              { icon: FaXTwitter, href: personalInfo.twitter, label: 'Twitter' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-12 h-12 rounded-xl bg-white/60 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <link.icon size={20} />
              </a>
            ))}
          </motion.div>

          {/* Bento: education wider, certs narrower */}
          <motion.div custom={3} variants={floatUp} className="grid sm:grid-cols-5 gap-4 max-w-xl mx-auto">
            <div className="card-glass sm:col-span-2 bg-white/60 dark:bg-slate-900/30 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 hover:border-blue-500/20 transition-all duration-300">
              <h3 className="text-slate-900 dark:text-white text-sm font-semibold mb-2 flex items-center gap-2">
                <svg className="text-blue-600 dark:text-blue-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                Education
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">{education.degree}</p>
              <p className="text-slate-500 text-xs">{education.institution}</p>
              <p className="text-slate-600 text-xs font-mono">{education.period}</p>
            </div>
            <div className="card-glass sm:col-span-3 bg-white/60 dark:bg-slate-900/30 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 hover:border-blue-500/20 transition-all duration-300">
              <h3 className="text-slate-900 dark:text-white text-sm font-semibold mb-2 flex items-center gap-2">
                <svg className="text-blue-600 dark:text-blue-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
                Certifications
              </h3>
              <ul className="space-y-1">
                {certifications.map((c) => (
                  <li key={c} className="text-slate-600 dark:text-slate-400 text-xs flex items-start gap-1.5">
                    <span className="text-blue-600/60 dark:text-blue-400/60 mt-1 flex-shrink-0">&#x2022;</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
