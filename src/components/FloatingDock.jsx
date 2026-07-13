import { useEffect, useState } from 'react';
import SocialLinks from './SocialLinks.jsx';

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Social links"
      className={`hidden md:flex fixed left-6 bottom-8 z-[400] flex-col items-center gap-4 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <SocialLinks size="sm" variant="ghost" className="flex-col" />
      <div className="w-px h-16 bg-white/15" />
    </nav>
  );
}
