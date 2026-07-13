import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';
import ProjectThumb from './ProjectThumb.jsx';

export default function ProjectModal({ project, index, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (project) {
      closeRef.current?.focus();
      const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[800] bg-base/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass border border-white/10"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-ink hover:bg-crimson transition-colors"
              data-cursor-hover
              aria-label="Close"
            >
              <FiX />
            </button>

            <ProjectThumb title={project.title} category={project.category} image={project.image} index={index} />

            <div className="p-8">
              <div className="text-xs uppercase tracking-[0.2em] text-crimson mb-2">{project.category}</div>
              <h3 id="modal-title" className="font-display text-2xl md:text-3xl text-ink mb-4">{project.title}</h3>
              <p className="text-muted leading-relaxed mb-6">{project.description}</p>

              {project.highlights && (
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-widest text-ink/70 mb-3">Highlight Features</div>
                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((h) => (
                      <span key={h} className="text-xs px-3 py-1.5 border border-white/10 text-muted rounded-full">{h}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <div className="text-xs uppercase tracking-widest text-ink/70 mb-3">Technologies</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1.5 bg-white/5 text-ink/80 rounded-full">{t}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-crimson text-white px-6 py-3 text-xs uppercase tracking-[0.1em] font-medium hover:bg-white hover:text-base transition-colors"
                  data-cursor-hover
                >
                  <FiExternalLink /> Live Website
                </a>
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-white/15 text-ink px-6 py-3 text-xs uppercase tracking-[0.1em] font-medium hover:border-crimson hover:text-crimson transition-colors"
                    data-cursor-hover
                  >
                    <FiGithub /> GitHub
                  </a>
                ) : (
                  <span className="flex items-center gap-2 border border-white/10 text-muted/50 px-6 py-3 text-xs uppercase tracking-[0.1em] cursor-not-allowed">
                    <FiGithub /> Repository Private
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
