import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

import cutoutDesktop from '../assets/hero-portrait-cutout-desktop.png';
import depthDesktop from '../assets/hero-portrait-depth-desktop.png';
import cutoutMobile from '../assets/hero-portrait-cutout-mobile.png';
import depthMobile from '../assets/hero-portrait-depth-mobile.png';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_MAX_DEPTH = 0.045;
const MOBILE_MAX_DEPTH = 0.03;
const LERP_SPEED = 0.06;
const IDLE_SPEED = 0.4;
const IDLE_AMPLITUDE = 0.012;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uColor;
  uniform sampler2D uDepth;
  uniform vec2 uOffset;
  uniform float uMaxDepth;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float depth = texture2D(uDepth, vUv).r;
    vec2 uv = vUv + depth * uOffset * uMaxDepth;
    uv = clamp(uv, 0.0, 1.0);
    vec4 color = texture2D(uColor, uv);
    gl_FragColor = vec4(color.rgb, color.a * uOpacity);
  }
`;

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('webgl2'));
  } catch {
    return false;
  }
}

export default function HeroPortrait3D({ className = '' }) {
  const mountRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const fallbackRef = useRef(null);

  const fallbackPointerHandler = useCallback((e) => {
    const el = fallbackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 8,
      rotateX: -py * 8,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, []);

  const fallbackPointerLeave = useCallback(() => {
    if (fallbackRef.current) {
      gsap.to(fallbackRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
    }
  }, []);

  useEffect(() => {
    if (!webglAvailable()) {
      setWebglFailed(true);
      return;
    }

    const mount = mountRef.current;
    if (!mount) return;

    const reduced = prefersReducedMotion();
    const touch = isTouchDevice();
    const isMobile = window.innerWidth < 1024;
    const maxDepth = isMobile ? MOBILE_MAX_DEPTH : DESKTOP_MAX_DEPTH;
    const cutoutSrc = isMobile ? cutoutMobile : cutoutDesktop;
    const depthSrc = isMobile ? depthMobile : depthDesktop;

    // ── Three.js setup ──
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: null },
        uDepth: { value: null },
        uOffset: { value: new THREE.Vector2(0, 0) },
        uMaxDepth: { value: maxDepth },
        uOpacity: { value: 1.0 },
      },
      transparent: true,
      depthWrite: false,
    });

    const geo = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    // Store base scale for scroll-dissolve scale-down
    let baseScaleX = 1;
    let baseScaleY = 1;

    function fitPlane(sceneW, sceneH, tex) {
      if (!tex || !tex.image) return;
      const imgAspect = tex.image.width / tex.image.height;
      const sceneAspect = sceneW / sceneH;
      if (imgAspect > sceneAspect) {
        baseScaleX = 1;
        baseScaleY = sceneAspect / imgAspect;
      } else {
        baseScaleX = imgAspect / sceneAspect;
        baseScaleY = 1;
      }
      mesh.scale.set(baseScaleX, baseScaleY, 1);
    }

    // ── Load textures ──
    const loader = new THREE.TextureLoader();
    let colorTex = null;
    let depthTex = null;

    loader.load(cutoutSrc, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      material.uniforms.uColor.value = tex;
      colorTex = tex;
      fitPlane(mount.clientWidth, mount.clientHeight, tex);
    });

    loader.load(depthSrc, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      material.uniforms.uDepth.value = tex;
      depthTex = tex;
    });

    // ── Animation state ──
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let time = 0;
    let paused = false;
    let frameId = null;
    let disposed = false;

    function tick() {
      if (disposed) return;
      frameId = requestAnimationFrame(tick);
      if (paused) return;

      time += 0.016;
      currentX += (targetX - currentX) * LERP_SPEED;
      currentY += (targetY - currentY) * LERP_SPEED;

      const idleX = Math.sin(time * IDLE_SPEED) * IDLE_AMPLITUDE;
      const idleY = Math.cos(time * IDLE_SPEED * 0.7) * IDLE_AMPLITUDE;

      material.uniforms.uOffset.value.set(
        currentX + idleX,
        -(currentY + idleY)
      );

      renderer.render(scene, camera);
    }

    function tickStatic() {
      if (disposed) return;
      renderer.render(scene, camera);
    }

    // ── Pointer tracking (desktop non-reduced) ──
    const cleanups = [];

    const onPointerMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      if (disposed) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      if (colorTex) fitPlane(mount.clientWidth, mount.clientHeight, colorTex);
    };

    const checkVisibility = () => {
      const rect = mount.getBoundingClientRect();
      const offscreen = rect.bottom < -100 || rect.top > window.innerHeight + 100;
      paused = offscreen;
    };

    // ── ScrollTrigger dissolve ──
    const heroSection = mount.closest('section');
    let scrollTriggerInstance = null;

    if (heroSection) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: heroSection,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          material.uniforms.uOpacity.value = 1 - p;
          const s = 1 - p * 0.08;
          mesh.scale.set(baseScaleX * s, baseScaleY * s, 1);
        },
      });
    }

    // ── Decide mode and start ──
    if (reduced) {
      // Static render, no animation
      tickStatic();
      // Still dissolve on scroll even in reduced-motion
    } else if (!touch) {
      // Desktop: pointer + idle + scroll visibility
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('resize', onResize);
      window.addEventListener('scroll', checkVisibility, { passive: true });
      cleanups.push(
        () => window.removeEventListener('pointermove', onPointerMove),
        () => window.removeEventListener('resize', onResize),
        () => window.removeEventListener('scroll', checkVisibility),
      );
      tick();
    } else {
      // Mobile touch device
      window.addEventListener('resize', onResize);
      cleanups.push(() => window.removeEventListener('resize', onResize));

      let cancelled = false;
      const onOrientation = (e) => {
        if (cancelled || e.gamma === null || e.beta === null) return;
        targetX = Math.max(-1, Math.min(1, (e.gamma / 45) * 0.5));
        targetY = Math.max(-1, Math.min(1, ((e.beta - 45) / 45) * 0.5));
      };

      const startOrientation = () => {
        if (cancelled) return;
        window.addEventListener('deviceorientation', onOrientation);
        cleanups.push(() => window.removeEventListener('deviceorientation', onOrientation));
        tick();
      };

      const startIdle = () => {
        if (cancelled) return;
        tick();
      };

      // iOS 13+ requires permission prompt
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then((state) => { state === 'granted' ? startOrientation() : startIdle(); })
          .catch(() => startIdle());
      } else if (typeof DeviceOrientationEvent !== 'undefined') {
        // Check if device actually fires orientation events
        let gotEvent = false;
        const probe = (e) => { if (e.gamma !== null) gotEvent = true; };
        window.addEventListener('deviceorientation', probe);
        setTimeout(() => {
          window.removeEventListener('deviceorientation', probe);
          gotEvent ? startOrientation() : startIdle();
        }, 300);
      } else {
        startIdle();
      }

      cleanups.push(() => { cancelled = true; });
    }

    // ── Unified cleanup ──
    return () => {
      disposed = true;
      if (frameId !== null) cancelAnimationFrame(frameId);
      cleanups.forEach((fn) => fn());
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      renderer.dispose();
      geo.dispose();
      material.dispose();
      if (colorTex) colorTex.dispose();
      if (depthTex) depthTex.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ── WebGL fallback: static cutout + CSS tilt ──
  if (webglFailed) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const src = isMobile ? cutoutMobile : cutoutDesktop;
    return (
      <div
        ref={fallbackRef}
        className={`w-full h-full flex items-center justify-center [perspective:900px] ${className}`}
        onMouseMove={fallbackPointerHandler}
        onMouseLeave={fallbackPointerLeave}
        aria-hidden="true"
      >
        <img
          src={src}
          alt=""
          className="max-w-full max-h-full object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`w-full h-full ${className}`}
      style={{ contain: 'layout paint' }}
      aria-hidden="true"
    />
  );
}
