import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiDownload } from 'react-icons/fi';
import Logo from './Logo.jsx';
import SocialLinks from './SocialLinks.jsx';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
  }, [light]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled ? 'py-4 glass' : 'py-7 bg-transparent'
        }`}
      >
        <a href="#home" className="flex items-center gap-2" data-cursor-hover>
          <Logo size={28} className="text-ink" />
        </a>

        <ul className="hidden lg:flex gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs uppercase tracking-[0.14em] text-ink/80 hover:text-crimson transition-colors"
                data-cursor-hover
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <SocialLinks size="sm" variant="ghost" className="hidden xl:flex" />
          <button
            onClick={() => setLight((v) => !v)}
            className="text-ink/80 hover:text-crimson transition-colors"
            aria-label="Toggle theme"
            data-cursor-hover
          >
            {light ? <FiMoon size={16} /> : <FiSun size={16} />}
          </button>
          <a
            href="/resume.html?download=1"
            className="hidden md:flex items-center gap-2 border border-white/15 px-5 py-2.5 text-xs uppercase tracking-[0.1em] hover:border-crimson hover:text-crimson transition-colors"
            data-cursor-hover
          >
            <FiDownload size={13} /> Resume
          </a>
          <button
            className="lg:hidden flex flex-col gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            data-cursor-hover
          >
            <span className="w-6 h-[1.5px] bg-ink" />
            <span className="w-6 h-[1.5px] bg-ink" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[700] bg-base flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onKeyDown={(e) => { if (e.key === 'Escape') setMenuOpen(false); }}
        >
          <div className="mb-2">
            <Logo size={64} className="text-ink" />
          </div>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl text-ink"
              data-cursor-hover
            >
              {l.label}
            </a>
          ))}
          <SocialLinks size="md" variant="outline" className="mt-4" />
        </div>
      )}
    </>
  );
}
