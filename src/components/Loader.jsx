import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo.jsx';

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf;
    let current = 0;
    const tick = () => {
      current += Math.random() * 14;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onDone, 700);
        }, 300);
        return;
      }
      setProgress(current);
      raf = setTimeout(tick, 160);
    };
    tick();
    return () => clearTimeout(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9000] bg-base flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo size={72} className="text-ink mb-6" />
          </motion.div>
          <motion.div
            className="font-display text-2xl tracking-[0.3em] text-ink mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            BRIGHT<span className="text-crimson">.</span>MOYO
          </motion.div>
          <div
            className="w-56 h-[1px] bg-white/10 relative overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.floor(progress)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Loading progress"
          >
            <motion.div
              className="absolute left-0 top-0 h-full bg-crimson"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
          <div className="mt-4 font-body text-xs tracking-[0.2em] text-muted">
            {Math.floor(progress).toString().padStart(2, '0')}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
