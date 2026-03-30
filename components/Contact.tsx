import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail, HiLocationMarker, HiChevronDown } from 'react-icons/hi';
import { personalInfo, education, certifications } from '../data/portfolio';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Contact = () => {
  const [showCreds, setShowCreds] = useState(false);

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Let&apos;s Connect
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Open to opportunities, collaborations, or just a good tech conversation.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 font-medium"
            >
              <HiMail size={20} />
              {personalInfo.email}
            </a>
            <div className="flex items-center gap-2 text-slate-500">
              <HiLocationMarker size={18} />
              <span className="text-sm">{personalInfo.location}</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-12">
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
                className="w-12 h-12 rounded-xl bg-slate-900/50 border border-slate-800/50 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <link.icon size={20} />
              </a>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <button
              onClick={() => setShowCreds((s) => !s)}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-400 text-sm transition-colors"
            >
              Education &amp; Certifications
              <HiChevronDown
                size={16}
                className={`transition-transform duration-300 ${showCreds ? 'rotate-180' : ''}`}
              />
            </button>

            {showCreds && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-6 grid sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left"
              >
                <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-5">
                  <h3 className="text-white text-sm font-semibold mb-2">Education</h3>
                  <p className="text-slate-300 text-sm">{education.degree}</p>
                  <p className="text-slate-500 text-xs">{education.institution}</p>
                  <p className="text-slate-600 text-xs font-mono">{education.period}</p>
                </div>
                <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-5">
                  <h3 className="text-white text-sm font-semibold mb-2">Certifications</h3>
                  <ul className="space-y-1">
                    {certifications.map((c) => (
                      <li key={c} className="text-slate-400 text-xs flex items-start gap-1.5">
                        <span className="text-blue-400/60 mt-1 flex-shrink-0">&#x2022;</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
