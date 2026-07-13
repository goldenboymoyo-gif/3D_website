import { FiArrowUp } from 'react-icons/fi';
import SocialLinks from './SocialLinks.jsx';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/10 px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl tracking-widest text-ink">BM<span className="text-crimson">.</span></span>
          <span className="text-xs text-muted hidden sm:inline">Bright Moyo — Software Developer</span>
        </div>

        <SocialLinks size="sm" variant="ghost" />

        <button
          onClick={scrollTop}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-ink hover:border-crimson hover:text-crimson transition-colors"
          aria-label="Back to top"
          data-cursor-hover
        >
          <FiArrowUp size={14} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-xs text-muted/70">
        © 2026 Bright Moyo. Built with React, Tailwind CSS &amp; GSAP.
      </div>
    </footer>
  );
}
