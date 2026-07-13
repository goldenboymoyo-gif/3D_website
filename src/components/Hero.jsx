import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroScene from './HeroScene.jsx';
import { FiArrowDown } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';
import SocialLinks from './SocialLinks.jsx';

export default function Hero() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.7 })
        .from('.hero-line span', { yPercent: 110, duration: 1, stagger: 0.1 }, '-=0.3')
        .from('.hero-sub', { y: 16, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-cta', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.4')
        .from('.hero-scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-portrait-card', { y: 30, opacity: 0, scale: 0.92, duration: 0.9, ease: 'power3.out' }, '-=0.9');

      // gentle continuous float
      gsap.to('.hero-portrait-card', {
        y: 14,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleCardMove = (e) => {
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateY: px * 10, rotateX: -py * 10, duration: 0.5, ease: 'power2.out' });
  };
  const handleCardLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
  };

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-hero-gradient flex items-center pt-20 md:pt-32"
    >
      <HeroScene />

      {/* readability scrim so text stays legible over the 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-base/10 via-transparent to-base pointer-events-none" />

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

      {/* Floating profile card — sits over the 3D scene on larger screens */}
      <div
        ref={cardRef}
        onMouseMove={handleCardMove}
        onMouseLeave={handleCardLeave}
        className="hero-portrait-card hidden lg:block absolute right-[8%] top-1/2 -translate-y-1/2 z-10 [transform-style:preserve-3d]"
        style={{ perspective: 900 }}
        data-cursor-hover
      >
        <div className="relative w-64 aspect-[4/5] overflow-hidden border border-white/15 shadow-glow">
          <img src={profileImg} alt="Bright Moyo" className="w-full h-full object-cover" fetchpriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent" />
        </div>
      </div>

      <div className="hero-scroll-cue absolute bottom-10 right-8 md:right-12 z-10 flex flex-col items-center gap-3 text-muted">
        <span className="text-[10px] tracking-[0.25em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        <FiArrowDown className="animate-bounce" size={14} />
      </div>
    </section>
  );
}
