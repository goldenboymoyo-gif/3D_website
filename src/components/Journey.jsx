import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { label: 'Started learning HTML & CSS' },
  { label: 'Learned JavaScript' },
  { label: 'Built my first responsive website' },
  { label: 'Started learning React' },
  { label: 'Designed UI/UX projects' },
  { label: 'Built HomeLink' },
  { label: 'Built Ironvale Construction' },
  { label: 'Built Vic Falls TeleVivi' },
  { label: 'Built VFBA Attendance System' },
  { label: 'Built Brief Wire News App' },
  { label: 'Building BoxArena (African Boxing Platform)' },
  { label: 'Learning Backend Development (Firebase & Python)' },
  { label: 'Future Goal', future: true },
];

export default function Journey() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.journey-head > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      // Draw the connecting line as the section scrolls through view
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: '.journey-track',
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );

      gsap.utils.toArray('.journey-item').forEach((item) => {
        gsap.from(item, {
          x: -30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="journey-head mb-16 max-w-xl">
          <div className="font-body text-xs tracking-[0.3em] text-crimson uppercase mb-4">The Long Version</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink">My Journey</h2>
        </div>

        <div className="journey-track relative pl-10">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-white/10" />
          <div ref={lineRef} className="absolute left-[7px] top-1 bottom-1 w-px bg-crimson" />

          {MILESTONES.map((m, i) => (
            <div key={i} className={`journey-item relative pb-10 last:pb-0 ${m.future ? 'pb-0' : ''}`}>
              <div
                className={`absolute -left-10 top-1 w-4 h-4 rounded-full border-2 ${
                  m.future ? 'bg-crimson border-crimson' : 'bg-base border-crimson/60'
                }`}
              />
              {m.future ? (
                <div className="border border-crimson/30 bg-crimson/5 p-6">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-crimson mb-2">Future Goal</div>
                  <p className="font-display text-lg md:text-xl text-ink leading-snug">
                    Become a Full Stack Software Developer building products used across Africa.
                  </p>
                </div>
              ) : (
                <p className="text-ink/90 text-base md:text-lg">{m.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
