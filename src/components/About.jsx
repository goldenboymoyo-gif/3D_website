import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Projects Completed', value: 14, suffix: '+' },
  { label: 'Technologies Learned', value: 22, suffix: '+' },
  { label: 'Started', value: 2026, suffix: '', isYear: true },
  { label: 'Personal & Client Projects', value: 9, suffix: '' },
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
      gsap.from('.about-portrait', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
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

          <div className="about-reveal mt-8 grid grid-cols-3 gap-4">
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

        <div className="about-reveal">
          <div className="relative aspect-[4/5] max-w-sm ml-auto overflow-hidden border border-white/10 about-portrait">
            <img
              src={profileImg}
              alt="Bright Moyo — Software Developer"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/70 to-transparent" />
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
