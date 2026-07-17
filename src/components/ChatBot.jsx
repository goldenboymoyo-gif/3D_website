import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiChevronRight } from 'react-icons/fi';
import Logo from './Logo.jsx';

const KB = [
  {
    keywords: ['project', 'work', 'portfolio', 'built', 'made', 'create'],
    answer: "Bright has built 14+ projects including:\n\n• **Vic Falls TeleVivi** — Tourism platform (React, GSAP)\n• **Ironvale Construction** — Corporate site (Three.js)\n• **HomeLink** — Real estate platform (React, Node.js, MongoDB)\n• **VFBA Attendance** — Gym management system (Next.js, Firebase)\n• **Boma Experience** — Tourism experience site (React)\n• **Brief Wire** — News application (React)\n\nVisit the Projects section to see them all!",
  },
  {
    keywords: ['skill', 'tech', 'stack', 'language', 'know', 'use', 'tool'],
    answer: "Bright's tech stack includes:\n\n**Frontend:** React, Next.js, JavaScript, TypeScript, HTML, CSS, Tailwind CSS, Three.js, GSAP, Framer Motion\n\n**Backend:** Node.js, Express, Python, Django\n\n**Database:** Firebase, MongoDB, SQLite\n\n**Tools:** Git, GitHub, Figma, VS Code, Vercel\n\n22+ technologies and always learning more!",
  },
  {
    keywords: ['experience', 'role', 'job', 'work', 'do'],
    answer: "Bright's experience includes:\n\n• **Software Developer** — Building responsive web apps\n• **Frontend Developer** — Scalable React applications\n• **UI/UX Designer** — Intuitive user experiences\n• **Digital Product Builder** — End-to-end product development\n• **Product Design Student** — Learning user research & strategy",
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'available'],
    answer: "You can reach Bright through:\n\n📧 **Email:** goldenboymoyo@gmail.com\n📱 **Phone:** +263 774 765 928\n📍 **Location:** Victoria Falls, Zimbabwe\n💼 **GitHub:** github.com/goldenboymoyo-gif\n🔗 **LinkedIn:** linkedin.com/in/bright-moyo-8728b83ab\n\nOr use the Contact section on this page!",
  },
  {
    keywords: ['about', 'who', 'name', 'intro', 'tell me'],
    answer: "Bright Moyo is a software developer and UI/UX designer based in Victoria Falls, Zimbabwe.\n\nHe combines clean engineering with considered design to build modern digital experiences. His work spans product design, frontend engineering, and backend systems — he likes owning ideas from sketch to shipped product.\n\nHe started coding in 2026 and has already completed 14+ projects across multiple technologies.",
  },
  {
    keywords: ['journey', 'timeline', 'history', 'learn', 'start'],
    answer: "Bright's journey:\n\n1. Started learning HTML & CSS\n2. Learned JavaScript\n3. Built first responsive website\n4. Started learning React\n5. Designed UI/UX projects\n6. Built HomeLink, Ironvale, TeleVivi\n7. Built VFBA Attendance System\n8. Currently learning backend (Django & Firebase)\n\n**Future goal:** Become a full-stack developer building products used across Africa.",
  },
  {
    keywords: ['location', 'where', 'live', 'city', 'country'],
    answer: "Bright is based in **Victoria Falls, Zimbabwe** — one of the Seven Natural Wonders of the World. He works remotely and is available for projects worldwide.",
  },
  {
    keywords: ['price', 'cost', 'rate', 'budget', 'charge'],
    answer: "Pricing depends on the project scope and complexity. Feel free to reach out via email at **goldenboymoyo@gmail.com** or through the Contact section with details about your project, and Bright will get back to you with a quote.",
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    answer: "You're welcome! Feel free to ask anything else about Bright's work, skills, or how to get in touch. Happy to help!",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'sup'],
    answer: "Hey there! 👋 I'm the assistant for Bright Moyo's portfolio. I can help you learn about:\n\n• His **projects** and work\n• His **skills** and tech stack\n• His **experience** and journey\n• How to **contact** him\n\nWhat would you like to know?",
  },
];

const QUICK_ACTIONS = [
  { label: 'Projects', query: 'What projects has Bright built?' },
  { label: 'Skills', query: 'What are Bright\'s skills?' },
  { label: 'Experience', query: 'What experience does Bright have?' },
  { label: 'Contact', query: 'How can I contact Bright?' },
];

function findAnswer(input) {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return "I'm not sure about that. Try asking about Bright's **projects**, **skills**, **experience**, or how to **contact** him. You can also visit the relevant sections on this page!";
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm here to help you learn about Bright Moyo. Ask me anything about his projects, skills, experience, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (text) => {
    const question = text || input.trim();
    if (!question) return;

    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const answer = findAnswer(question);
      setMessages((prev) => [...prev, { role: 'bot', text: answer }]);
      setTyping(false);
    }, 600 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[600] w-14 h-14 rounded-full bg-crimson text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        whileTap={{ scale: 0.9 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        data-cursor-hover
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FiX size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FiMessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[600] w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              height: 'min(520px, calc(100vh - 8rem))',
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Logo size={30} className="text-crimson shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm text-ink tracking-wide">Bright's Assistant</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-muted">Always online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-crimson text-white rounded-br-md'
                        : 'bg-white/5 text-ink/90 border border-white/5 rounded-bl-md'
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                  />
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length <= 2 && (
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((qa) => (
                  <button
                    key={qa.label}
                    onClick={() => send(qa.query)}
                    className="flex items-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-wider text-crimson border border-crimson/30 rounded-full hover:bg-crimson/10 transition-colors"
                    data-cursor-hover
                  >
                    {qa.label} <FiChevronRight size={10} />
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-crimson/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Bright..."
                  className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/50"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || typing}
                  className="text-crimson hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  data-cursor-hover
                >
                  <FiSend size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
