import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCode, FiLayout, FiFeather, FiBox, FiBookOpen } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  {
    title: 'Software Developer',
    desc: 'Designing and building responsive web applications using modern frontend technologies.',
    icon: FiCode,
  },
  {
    title: 'Frontend Developer',
    desc: 'Building scalable React applications with clean UI and engaging interactions.',
    icon: FiLayout,
  },
  {
    title: 'UI/UX Designer',
    desc: 'Designing intuitive user experiences and modern interfaces.',
    icon: FiFeather,
  },
  {
    title: 'Digital Product Builder',
    desc: 'Transforming ideas into functional digital products through design and development.',
    icon: FiBox,
  },
  {
    title: 'Product Design Student',
    desc: 'Learning user research, prototyping, product strategy, and interaction design.',
    icon: FiBookOpen,
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-head > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.exp-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-28 md:py-36 px-6 md:px-12 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="exp-head mb-16 max-w-xl">
          <div className="font-body text-xs tracking-[0.3em] text-crimson uppercase mb-4">What I Do</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink">Experience</h2>
        </div>

        <div className="exp-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLES.map((r) => (
            <div key={r.title} className="exp-card border border-white/10 p-7 hover:border-crimson/40 transition-colors duration-300" data-cursor-hover>
              <r.icon className="text-crimson text-2xl mb-4" />
              <h3 className="font-display text-lg text-ink mb-2">{r.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
