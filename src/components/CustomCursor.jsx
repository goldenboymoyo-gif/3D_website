import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) {
      document.body.classList.add('touch-device');
      return;
    }

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let isAnimating = false;
    const dot = dotRef.current;
    const ring = ringRef.current;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
      if (!isAnimating) {
        isAnimating = true;
        loop();
      }
    };
    window.addEventListener('mousemove', handleMove);

    let rafId;
    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      const dx = Math.abs(mouseX - ringX);
      const dy = Math.abs(mouseY - ringY);
      if (dx < 0.5 && dy < 0.5) {
        isAnimating = false;
        return;
      }
      rafId = requestAnimationFrame(loop);
    };

    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
      });
    };
    attachHoverListeners();

    // Re-attach when DOM changes (e.g. modal opens with new interactive elements)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
