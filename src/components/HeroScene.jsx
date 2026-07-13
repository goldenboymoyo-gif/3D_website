import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Abstract "developer workspace" stand-in for a Spline scene: a rotating
 * wireframe icosahedron core surrounded by a particle field, with subtle
 * mouse-parallax on the camera for depth. Swap this component out for a
 * real <spline-viewer> embed once you've built a scene in Spline —
 * everything here is plain Three.js so there's no external asset dependency.
 */
export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Wireframe core
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xdc2626, wireframe: true, transparent: true, opacity: 0.55 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const innerGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.18 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // Particle field forming a loose outer sphere
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

    // A few floating accent points (like "UI card" markers) in crimson
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
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = x * 0.4;
      targetRotX = y * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!prefersReducedMotion) {
        core.rotation.y += 0.0022;
        core.rotation.x += 0.0009;
        inner.rotation.y -= 0.0016;
        particles.rotation.y += 0.0006;
        accents.rotation.y += 0.0006;

        // ease scene rotation toward mouse target for parallax depth
        scene.rotation.y += (targetRotY - scene.rotation.y) * 0.04;
        scene.rotation.x += (targetRotX - scene.rotation.x) * 0.04;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      coreGeo.dispose(); coreMat.dispose();
      innerGeo.dispose(); innerMat.dispose();
      particleGeo.dispose(); particleMat.dispose();
      accentGeo.dispose(); accentMat.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
