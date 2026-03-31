import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPaperAirplane } from 'react-icons/hi';
import { getResponse, ChatResponse } from '../utils/chatEngine';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  suggestions?: string[];
}

const INITIAL_SUGGESTIONS = [
  'Who is Asit?',
  'What are his skills?',
  'Tell me about his projects',
];

function useScrollDirection() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setVisible(y < 100 || y < lastY.current);
      lastY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return visible;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

const URL_RE = /https?:\/\/[^\s)]+/g;
const RESUME_RE = /\[Download Resume\]\(\/resume\.pdf\)/;

function renderMessageText(text: string, sender: 'user' | 'bot') {
  if (sender === 'user') return text;

  if (RESUME_RE.test(text)) {
    const [before, after] = text.split(RESUME_RE);
    return (
      <>
        {before}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-300 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-200"
        >
          Download Resume
        </a>
        {after}
      </>
    );
  }

  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(URL_RE);
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const url = match[0];
    parts.push(
      <a
        key={match.index}
        href={url.startsWith('http') ? url : `https://${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-300 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-200"
      >
        {url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
      </a>,
    );
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 1 ? <>{parts}</> : text;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hey! I'm Asit's portfolio assistant. Ask me anything about his experience, skills, projects, or how to reach him.",
      sender: 'bot',
      suggestions: INITIAL_SUGGESTIONS,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(1);
  const isMobile = useIsMobile();
  const barVisible = useScrollDirection();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMobile) inputRef.current?.focus();
  }, [isOpen, isMobile]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const userMsg: Message = {
        id: idCounter.current++,
        text: text.trim(),
        sender: 'user',
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      const delay = 300 + Math.random() * 300;
      setTimeout(() => {
        const response: ChatResponse = getResponse(text);
        const botMsg: Message = {
          id: idCounter.current++,
          text: response.text,
          sender: 'bot',
          suggestions: response.suggestions,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, delay);
    },
    [],
  );

  useEffect(() => {
    function onOpenChat(e: Event) {
      const msg = (e as CustomEvent).detail?.message;
      setIsOpen(true);
      if (msg) setTimeout(() => sendMessage(msg), 150);
    }
    window.addEventListener('open-chat', onOpenChat);
    return () => window.removeEventListener('open-chat', onOpenChat);
  }, [sendMessage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleMobileBarSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsOpen(true);
    setTimeout(() => sendMessage(input), 100);
  };

  const messageList = (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
      {messages.map((msg) => (
        <div key={msg.id}>
          <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line break-words ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-md'
              }`}
            >
              {renderMessageText(msg.text, msg.sender)}
            </div>
          </div>
          {msg.sender === 'bot' && msg.suggestions && (
            <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
              {msg.suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-500 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-500 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-500 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );

  const chatHeader = (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
          AP
        </div>
        <div>
          <p className="text-slate-900 dark:text-white text-sm font-medium">Ask about Asit</p>
          <p className="text-green-400 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Online
          </p>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors p-1"
        aria-label="Close chat"
      >
        <HiX size={18} />
      </button>
    </div>
  );

  const chatInput = (
    <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-900/90 flex-shrink-0">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl transition-all"
          aria-label="Send message"
        >
          <HiPaperAirplane size={16} className="rotate-90" />
        </button>
      </div>
    </form>
  );

  // -----------------------------------------------------------------------
  // Mobile: sticky bottom bar + full-screen bottom sheet
  // -----------------------------------------------------------------------
  if (isMobile) {
    return (
      <>
        {/* Full-screen chat sheet */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col"
            >
              {chatHeader}
              {messageList}
              {chatInput}
              <div className="pb-[env(safe-area-inset-bottom)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky bottom bar — hides on scroll down */}
        {!isOpen && (
          <div
            className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
              barVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-800/60 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
              <form onSubmit={handleMobileBarSubmit} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  AP
                </div>
                <input
                  ref={mobileInputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsOpen(true)}
                  placeholder="Ask about Asit..."
                  className="flex-1 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl transition-all flex-shrink-0"
                  aria-label="Send message"
                >
                  <HiPaperAirplane size={16} className="rotate-90" />
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  // -----------------------------------------------------------------------
  // Desktop: floating popup + bubble
  // -----------------------------------------------------------------------
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[400px] h-[520px] bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {chatHeader}
            {messageList}
            {chatInput}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-slate-800 hover:bg-slate-700'
            : 'bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400'
        }`}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <HiX size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ChatBot;
