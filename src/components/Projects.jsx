import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PROJECTS } from '../data/projects.js';
import ProjectThumb from './ProjectThumb.jsx';
import ProjectModal from './ProjectModal.jsx';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateY: px * 8, rotateX: -py * 8, scale: 1.02, duration: 0.4, ease: 'power2.out' });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="project-card group glass border border-white/10 overflow-hidden [transform-style:preserve-3d] hover:shadow-glow transition-shadow duration-300 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project); } }}
      role="button"
      tabIndex={0}
      data-cursor-hover
    >
      <ProjectThumb title={project.title} category={project.category} image={project.image} index={index} />

      <div className="p-6">
        <div className="text-[11px] uppercase tracking-[0.18em] text-crimson mb-2">{project.category}</div>
        <h3 className="font-display text-lg text-ink mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2.5 py-1 bg-white/5 text-ink/70 rounded-full">{t}</span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] px-2.5 py-1 bg-white/5 text-ink/70 rounded-full">+{project.tech.length - 3}</span>
          )}
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.08em] text-crimson hover:text-white transition-colors font-medium"
            data-cursor-hover
          >
            View Live Site
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const activeIndex = PROJECTS.findIndex((p) => p === activeProject);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-head > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.project-card', {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-28 md:py-36 px-6 md:px-12 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="projects-head mb-16 max-w-xl">
          <div className="font-body text-xs tracking-[0.3em] text-crimson uppercase mb-4">Selected Work</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink">Featured Projects</h2>
        </div>

        <div className="projects-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={setActiveProject} />
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} index={activeIndex} onClose={() => setActiveProject(null)} />
    </section>
  );
}
