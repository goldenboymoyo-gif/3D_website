import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroScene from './HeroScene.jsx';
import SocialLinks from './SocialLinks.jsx';
import Logo from './Logo.jsx';

const TECH_STACK = [
  'React', 'Next.js', 'Node.js', 'TypeScript',
  'Tailwind CSS', 'Three.js', 'Firebase', 'MongoDB',
];

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.7 })
        .from('.hero-line span', { yPercent: 110, duration: 1, stagger: 0.1 }, '-=0.3')
        .from('.hero-sub', { y: 16, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-cta', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.4')
        .from('.hero-right-card', { y: 20, opacity: 0, duration: 0.9 }, '-=0.5');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-hero-gradient flex items-center"
    >
      <HeroScene />

      {/* readability scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-base/10 via-transparent to-base pointer-events-none" />

      {/* Main content — centered vertically, aligned left */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-3xl pt-20 md:pt-0">
        <div className="hero-eyebrow font-body text-xs tracking-[0.35em] text-crimson uppercase mb-6">
          Victoria Falls, Zimbabwe
        </div>

        <h1 className="font-display font-semibold text-ink leading-[0.98] text-[clamp(2rem,5vw,4rem)]">
          <span className="hero-line block overflow-hidden"><span className="inline-block">Hi, I'm Bright Moyo</span></span>
          <span className="hero-line block overflow-hidden"><span className="inline-block text-crimson">Software Developer &amp; Digital Marketer</span></span>
        </h1>

        <p className="hero-sub mt-6 text-muted text-base md:text-lg max-w-lg leading-relaxed">
          I craft digital experiences that perform — combining clean code, thoughtful design, and marketing strategy from first sketch to shipped product.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="hero-cta bg-crimson text-white px-8 py-4 text-xs uppercase tracking-[0.12em] font-medium hover:opacity-80 transition-opacity duration-300"
            data-cursor-hover
          >
            View Projects
          </a>
          <a
            href="/Bright_Moyo_Resume (1).docx"
            className="hero-cta border border-white/20 text-ink px-8 py-4 text-xs uppercase tracking-[0.12em] font-medium hover:border-crimson hover:text-crimson transition-all duration-300"
            data-cursor-hover
          >
            Download Resume
          </a>
        </div>

        <div className="hero-cta mt-8">
          <SocialLinks size="md" variant="outline" />
        </div>
      </div>

      {/* Floating card — absolute bottom-right, out of the way of the 3D scene */}
      <div className="hero-right-card hidden lg:block absolute bottom-20 right-12 z-10">
        <div className="glass border border-white/10 p-5 space-y-4 w-[260px]">
          <div className="flex items-center gap-3">
            <Logo size={36} className="text-ink" />
            <div>
              <div className="font-display text-sm text-ink tracking-wide">Bright Moyo</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-muted">Dev + Marketing</div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-muted">Available for work</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {TECH_STACK.map((t) => (
              <span key={t} className="text-[9px] px-2 py-0.5 bg-white/5 text-ink/70 rounded-full border border-white/5">
                {t}
              </span>
            ))}
          </div>

          <div className="h-px bg-white/10" />

          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="font-display text-sm text-ink">14<span className="text-crimson">+</span></div>
              <div className="text-[8px] uppercase tracking-widest text-muted">Projects</div>
            </div>
            <div>
              <div className="font-display text-sm text-ink">22<span className="text-crimson">+</span></div>
              <div className="text-[8px] uppercase tracking-widest text-muted">Stack</div>
            </div>
            <div>
              <div className="font-display text-sm text-ink">2026</div>
              <div className="text-[8px] uppercase tracking-widest text-muted">Started</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
