import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Portrait from './Portrait.jsx';
import { FiArrowDown } from 'react-icons/fi';
import SocialLinks from './SocialLinks.jsx';

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.7 })
        .from('.hero-line span', { yPercent: 110, duration: 1, stagger: 0.1 }, '-=0.3')
        .from('.hero-sub', { y: 16, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-cta', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.4')
        .from('.hero-scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.3');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-base flex items-center pt-20 md:pt-32"
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-8 md:pr-16 pointer-events-none hidden md:flex items-center justify-center" style={{ perspective: '2000px' }}>
        <div className="pointer-events-auto">
          <Portrait />
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-3xl">
        <div className="hero-eyebrow font-body text-xs tracking-[0.35em] text-crimson uppercase mb-6">
          Victoria Falls, Zimbabwe
        </div>

        <h1 className="font-display font-semibold text-ink leading-[0.98] text-[clamp(2rem,5vw,4rem)]">
          <span className="hero-line block overflow-hidden"><span className="inline-block">Hi, I'm Bright Moyo</span></span>
          <span className="hero-line block overflow-hidden"><span className="inline-block text-crimson">Software Developer</span></span>
        </h1>

        <p className="hero-sub mt-6 text-muted text-base md:text-lg max-w-lg leading-relaxed">
          I craft modern digital experiences — combining clean engineering with
          considered design, from first sketch to shipped product.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="hero-cta bg-crimson text-white px-8 py-4 text-xs uppercase tracking-[0.12em] font-medium hover:bg-white hover:text-base transition-colors duration-300"
            data-cursor-hover
          >
            View Projects
          </a>
          <a
            href="/resume.html?download=1"
            className="hero-cta border border-white/20 text-ink px-8 py-4 text-xs uppercase tracking-[0.12em] font-medium hover:border-crimson hover:text-crimson transition-colors duration-300"
            data-cursor-hover
          >
            Download Resume
          </a>
        </div>

        <div className="hero-cta mt-8">
          <SocialLinks size="md" variant="outline" />
        </div>
      </div>

      <div className="hero-scroll-cue absolute bottom-10 right-8 md:right-12 z-10 flex flex-col items-center gap-3 text-muted">
        <span className="text-[10px] tracking-[0.25em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        <FiArrowDown className="animate-bounce" size={14} />
      </div>
    </section>
  );
}
