import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiReact, SiJavascript, SiTailwindcss, SiFirebase, SiNodedotjs, SiFigma } from 'react-icons/si';
import Logo from './Logo.jsx';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Projects Completed', value: 14, suffix: '+' },
  { label: 'Technologies Learned', value: 22, suffix: '+' },
  { label: 'Started', value: 2026, suffix: '', isYear: true },
  { label: 'Personal & Client Projects', value: 9, suffix: '' },
];

const FLOATING_ICONS = [
  { Icon: SiReact, x: -60, y: -40, delay: 0, size: 22 },
  { Icon: SiJavascript, x: 80, y: -30, delay: 0.3, size: 18 },
  { Icon: SiTailwindcss, x: -70, y: 50, delay: 0.6, size: 20 },
  { Icon: SiFirebase, x: 85, y: 45, delay: 0.9, size: 16 },
  { Icon: SiNodedotjs, x: -40, y: 90, delay: 1.2, size: 18 },
  { Icon: SiFigma, x: 60, y: 85, delay: 1.5, size: 17 },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => setDisplay(Math.floor(obj.val)),
        });
      },
    });
    return () => trigger.kill();
  }, [value]);

  return (
    <div ref={ref} className="font-display text-4xl md:text-5xl text-ink">
      {display}
      <span className="text-crimson">{suffix}</span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const logoAreaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.about-logo-reveal', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.floating-icon', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: logoAreaRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-surface/40 py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <div className="about-reveal font-body text-xs tracking-[0.3em] text-crimson uppercase mb-4">About Me</div>
          <h2 className="about-reveal font-display text-3xl md:text-4xl text-ink mb-6">
            Code, Craft, and a Bit of Zambezi Grit
          </h2>
          <p className="about-reveal text-muted leading-relaxed mb-4">
            I'm a software developer and UI/UX designer based in Victoria Falls,
            Zimbabwe, focused on building modern web applications that combine
            beautiful design with genuinely good user experience. I enjoy
            turning ideas into polished digital products — and I'm always
            mid-way through learning the next thing.
          </p>
          <p className="about-reveal text-muted leading-relaxed">
            My work spans product design, frontend engineering, and increasingly
            backend systems — usually all three on the same project, since I like
            owning an idea from sketch to shipped feature.
          </p>

          <div className="about-reveal mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-white/10 p-5">
              <h4 className="text-crimson text-xs uppercase tracking-widest mb-2">Mission</h4>
              <p className="text-sm text-muted">Build products that feel effortless to use, even when the engineering behind them isn't.</p>
            </div>
            <div className="border border-white/10 p-5">
              <h4 className="text-crimson text-xs uppercase tracking-widest mb-2">Vision</h4>
              <p className="text-sm text-muted">Become the kind of developer who ships products end-to-end, design included.</p>
            </div>
            <div className="border border-white/10 p-5">
              <h4 className="text-crimson text-xs uppercase tracking-widest mb-2">Values</h4>
              <p className="text-sm text-muted">Craft over speed, clarity over cleverness, and finishing what I start.</p>
            </div>
          </div>
        </div>

        <div className="about-reveal" ref={logoAreaRef}>
          {/* Logo showcase card with floating icons */}
          <div className="relative aspect-[4/5] max-w-sm ml-auto about-logo-reveal">
            {/* Background card */}
            <div className="absolute inset-0 glass border border-white/10 overflow-hidden">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              {/* Crimson gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-crimson/5 to-transparent" />
            </div>

            {/* Rotating ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-52 h-52 rounded-full border border-crimson/20 animate-[spin_20s_linear_infinite]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-44 h-44 rounded-full border border-white/10 animate-[spin_30s_linear_infinite_reverse]" />
            </div>

            {/* Central logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Logo size={120} className="text-ink relative z-10" />
                {/* Glow behind logo */}
                <div className="absolute inset-0 blur-3xl bg-crimson/15 rounded-full scale-150" />
              </div>
            </div>

            {/* Floating tech icons */}
            {FLOATING_ICONS.map(({ Icon, x, y, delay, size }, i) => (
              <div
                key={i}
                className="floating-icon absolute top-1/2 left-1/2 text-muted/40 hover:text-crimson transition-colors duration-300"
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                <Icon size={size} />
              </div>
            ))}

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface/80 to-transparent" />
          </div>

          <div className="grid grid-cols-2 gap-8 mt-10 max-w-sm ml-auto">
            {STATS.map((s) => (
              <div key={s.label}>
                {s.isYear ? (
                  <div className="font-display text-4xl md:text-5xl text-ink">{s.value}</div>
                ) : (
                  <Counter value={s.value} suffix={s.suffix} />
                )}
                <div className="text-xs uppercase tracking-widest text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
