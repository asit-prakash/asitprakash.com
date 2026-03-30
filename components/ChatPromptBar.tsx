import { motion } from 'framer-motion';

const PROMPTS = [
  'What\u2019s his expertise?',
  'Projects he\u2019s built',
  'How to reach him',
];

function openChat(message?: string) {
  window.dispatchEvent(
    new CustomEvent('open-chat', { detail: { message } }),
  );
}

const ChatPromptBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px' }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="pb-10 sm:pb-14"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => openChat()}
          className="w-full group relative bg-gradient-to-r from-blue-500/[0.08] via-cyan-500/[0.06] to-blue-500/[0.08] border border-blue-500/20 hover:border-blue-500/40 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="text-slate-300 text-sm sm:text-base font-medium group-hover:text-white transition-colors">
              Curious about me? Ask anything
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-600 group-hover:text-blue-400 ml-auto transition-colors flex-shrink-0"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2 pl-10">
            {PROMPTS.map((prompt) => (
              <span
                key={prompt}
                onClick={(e) => {
                  e.stopPropagation();
                  openChat(prompt);
                }}
                className="text-xs px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300/80 hover:text-blue-300 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-200 cursor-pointer"
              >
                {prompt}
              </span>
            ))}
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default ChatPromptBar;
