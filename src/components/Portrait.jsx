import { useEffect, useRef } from "react";
import gsap from "gsap";
import bright3D from "../assets/bright_3D.png";

export default function Portrait() {
  const figRef = useRef(null);

  useEffect(() => {
    const el = figRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1);
      gsap.set(el, {
        y: progress * -80,
        opacity: 0.42 - progress * 0.35,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <img
      ref={figRef}
      src={bright3D}
      alt=""
      draggable="false"
      className="cutout-fig"
    />
  );
}
