import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isLight = () => document.documentElement.classList.contains('light');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isLight() ? 0xf8f9fa : 0x0a0a0a);
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xdc2626, wireframe: true, transparent: true, opacity: 0.55 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const innerGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.18 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.035, transparent: true, opacity: 0.55, sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const accentGeo = new THREE.BufferGeometry();
    const accentCount = 24;
    const accentPositions = new Float32Array(accentCount * 3);
    for (let i = 0; i < accentCount; i++) {
      const r = 2.6 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      accentPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      accentPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      accentPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    accentGeo.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3));
    const accentMat = new THREE.PointsMaterial({ color: 0xdc2626, size: 0.09, transparent: true, opacity: 0.9 });
    const accents = new THREE.Points(accentGeo, accentMat);
    scene.add(accents);

    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;
    let frameId;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = x * 0.4;
      targetRotX = y * 0.25;
    };

    const handleDeviceOrientation = (e) => {
      if (e.gamma === null || e.beta === null) return;
      targetRotY = Math.max(-1, Math.min(1, (e.gamma / 45) * 0.5));
      targetRotX = Math.max(-1, Math.min(1, ((e.beta - 45) / 45) * 0.5));
    };

    const handleTouch = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = (touch.clientY / window.innerHeight) * 2 - 1;
        targetRotY = x * 0.4;
        targetRotX = y * 0.25;
      }
    };

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      window.addEventListener('touchmove', handleTouch, { passive: true });
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // React to theme changes
    const applyTheme = () => {
      const light = isLight();
      scene.background = new THREE.Color(light ? 0xf8f9fa : 0x0a0a0a);
      // Core wireframe: crimson in both modes, higher opacity in light
      coreMat.color.setHex(0xdc2626);
      coreMat.opacity = light ? 0.5 : 0.55;
      // Inner wireframe: dark in light mode, white in dark
      innerMat.color.setHex(light ? 0x111827 : 0xffffff);
      innerMat.opacity = light ? 0.25 : 0.18;
      // Particles: crimson in light mode for pop, white in dark
      particleMat.color.setHex(light ? 0xdc2626 : 0xffffff);
      particleMat.opacity = light ? 0.4 : 0.55;
      particleMat.size = light ? 0.045 : 0.035;
      // Accent dots: always crimson, stronger in light
      accentMat.color.setHex(0xdc2626);
      accentMat.opacity = light ? 1.0 : 0.9;
      accentMat.size = light ? 0.11 : 0.09;
    };
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.016;

      core.rotation.y += 0.0022;
      core.rotation.x += 0.0009;
      inner.rotation.y -= 0.0016;
      particles.rotation.y += 0.0006;
      accents.rotation.y += 0.0006;

      const idleX = Math.sin(time * 0.4) * 0.15;
      const idleY = Math.cos(time * 0.28) * 0.1;

      currentRotX += (targetRotX + idleX - currentRotX) * 0.04;
      currentRotY += (targetRotY + idleY - currentRotY) * 0.04;

      scene.rotation.y = currentRotY;
      scene.rotation.x = currentRotX;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      if (isTouchDevice) {
        window.removeEventListener('touchmove', handleTouch);
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      coreGeo.dispose(); coreMat.dispose();
      innerGeo.dispose(); innerMat.dispose();
      particleGeo.dispose(); particleMat.dispose();
      accentGeo.dispose(); accentMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
