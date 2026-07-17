import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiCode, FiGitBranch, FiFigma, FiDatabase, FiServer, FiTerminal, FiTrendingUp,
} from 'react-icons/fi';
import { SiReact, SiTailwindcss, SiJavascript, SiPython, SiTypescript, SiFirebase, SiSqlite, SiVercel, SiHtml5, SiCss } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    name: 'Frontend',
    icon: FiCode,
    skills: [
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    name: 'Backend',
    icon: FiServer,
    skills: [
      { name: 'Node.js', icon: FiServer },
      { name: 'Python', icon: SiPython },
    ],
  },
  {
    name: 'Database',
    icon: FiDatabase,
    skills: [
      { name: 'Firebase', icon: SiFirebase },
      { name: 'SQLite', icon: SiSqlite },
    ],
  },
  {
    name: 'Tools',
    icon: FiTerminal,
    skills: [
      { name: 'Git', icon: FiGitBranch },
      { name: 'GitHub', icon: FiGitBranch },
      { name: 'Figma', icon: FiFigma },
      { name: 'VS Code', icon: FiTerminal },
      { name: 'Vercel', icon: SiVercel },
    ],
  },
  {
    name: 'Digital Marketing',
    icon: FiTrendingUp,
    skills: [
      { name: 'SEO', icon: FiTrendingUp },
      { name: 'Analytics', icon: FiTrendingUp },
      { name: 'Campaign Strategy', icon: FiTrendingUp },
      { name: 'Brand Growth', icon: FiTrendingUp },
      { name: 'Conversion', icon: FiTrendingUp },
    ],
  },
];

function SkillCard({ skill }) {
  const ref = useRef(null);
  const Icon = skill.icon;

  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 16,
      rotateX: -py * 16,
      scale: 1.04,
      duration: 0.4,
      ease: 'power2.out',
    });
  };
  const handleLeave = () => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="skill-card group relative border border-white/10 bg-surface/40 p-6 flex flex-col items-center gap-3 [transform-style:preserve-3d] transition-shadow duration-300 hover:shadow-glow"
      style={{ perspective: 800 }}
      data-cursor-hover
    >
      <Icon className="text-3xl text-muted group-hover:text-crimson transition-colors duration-300" />
      <span className="text-sm text-ink/90">{skill.name}</span>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.skills-head > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="skills-head mb-16 max-w-xl">
          <div className="font-body text-xs tracking-[0.3em] text-crimson uppercase mb-4">What I Work With</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink">Skills &amp; Tools</h2>
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <cat.icon className="text-crimson" size={18} />
              <h3 className="text-sm uppercase tracking-[0.15em] text-muted">{cat.name}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {cat.skills.map((s) => (
                <SkillCard key={s.name} skill={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
