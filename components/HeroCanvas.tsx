"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  // Dissolve the particle field as the hero scrolls away.
  // Lives here (not the page) so the target exists — this component is
  // dynamically imported and mounts after the page's intro effect runs.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !mount.parentElement) return;
    const tween = gsap.to(mount, {
      opacity: 0,
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: mount.parentElement,
        start: "top top",
        end: "75% top",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isLight = resolvedTheme === "light";

    // A lighter particle field on phones — a small 3D touch without the battery cost
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isTablet = window.matchMedia("(max-width: 1023px)").matches;
    const PARTICLE_COUNT = isMobile ? 38 : isTablet ? 60 : 120;
    const CONNECT_DIST = isMobile ? 8 : isTablet ? 9 : 11;
    const MAX_LINES = isMobile ? 46 : isTablet ? 80 : 180;

    // Start the cursor offscreen so nothing reaches toward the centre until the pointer moves
    mouseRef.current = { x: 1e4, y: 1e4 };
    let pointerActive = false;

    let w = mount.clientWidth;
    let h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isTablet });
    renderer.setSize(w, h);
    // Cap pixel ratio at 1.5 — above that is wasted GPU work
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const geo = new THREE.SphereGeometry(0.06, 5, 5);
    const particles: { mesh: THREE.Mesh; vx: number; vy: number }[] = [];

    const accentColor  = isLight ? 0x2f9c91 : 0x3dd0c0;
    const neutralColor = isLight ? 0xc0c0b8 : 0x3a3a3a;
    const lineColor    = isLight ? 0x2f9c91 : 0x3dd0c0;
    const cursorColor  = isLight ? 0x9a7424 : 0xcba24f;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.6 ? accentColor : neutralColor,
        transparent: true,
        opacity: Math.random() * 0.55 + 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 8
      );
      mesh.scale.setScalar(Math.random() * 1.3 + 0.6);
      scene.add(mesh);
      particles.push({
        mesh,
        vx: (Math.random() - 0.5) * 0.022,
        vy: (Math.random() - 0.5) * 0.014,
      });
    }

    const lineMat = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.18,
    });
    const linePool: THREE.Line[] = [];
    for (let i = 0; i < MAX_LINES; i++) {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
      const l = new THREE.Line(g, lineMat.clone());
      l.visible = false;
      scene.add(l);
      linePool.push(l);
    }

    // Gold lines that reach from the cursor to nearby particles
    const CURSOR_LINKS = 14;
    const cursorMat = new THREE.LineBasicMaterial({ color: cursorColor, transparent: true, opacity: 0.5 });
    const cursorLines: THREE.Line[] = [];
    for (let i = 0; i < CURSOR_LINKS; i++) {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
      const cl = new THREE.Line(g, cursorMat.clone());
      cl.visible = false;
      scene.add(cl);
      cursorLines.push(cl);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerActive = true;
      mouseRef.current = {
        x: ((e.clientX - rect.left) / w - 0.5) * 55,
        y: -((e.clientY - rect.top) / h - 0.5) * 35,
      };
    };

    const onResize = () => {
      w = mount.clientWidth;
      h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    let frameId: number;
    let li = 0;

    const tick = () => {
      linePool.forEach((l) => (l.visible = false));
      cursorLines.forEach((l) => (l.visible = false));
      li = 0;

      particles.forEach((p) => {
        p.mesh.position.x += p.vx;
        p.mesh.position.y += p.vy;
        if (Math.abs(p.mesh.position.x) > 27.5) p.vx *= -1;
        if (Math.abs(p.mesh.position.y) > 17.5) p.vy *= -1;
        const dx = p.mesh.position.x - mouseRef.current.x;
        const dy = p.mesh.position.y - mouseRef.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 7 && d > 0) {
          p.mesh.position.x += (dx / d) * 0.1;
          p.mesh.position.y += (dy / d) * 0.1;
        }
      });

      for (let i = 0; i < particles.length && li < MAX_LINES; i++) {
        for (let j = i + 1; j < particles.length && li < MAX_LINES; j++) {
          const dx = particles[i].mesh.position.x - particles[j].mesh.position.x;
          const dy = particles[i].mesh.position.y - particles[j].mesh.position.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const line = linePool[li++];
            const pos = line.geometry.attributes.position.array as Float32Array;
            pos[0] = particles[i].mesh.position.x;
            pos[1] = particles[i].mesh.position.y;
            pos[2] = particles[i].mesh.position.z;
            pos[3] = particles[j].mesh.position.x;
            pos[4] = particles[j].mesh.position.y;
            pos[5] = particles[j].mesh.position.z;
            line.geometry.attributes.position.needsUpdate = true;

            // Lines close to the cursor glow a touch brighter
            const mx = (pos[0] + pos[3]) / 2 - mouseRef.current.x;
            const my = (pos[1] + pos[4]) / 2 - mouseRef.current.y;
            const md = Math.sqrt(mx * mx + my * my);
            const boost = md < 9 ? 1 + (1 - md / 9) * 0.8 : 1;
            (line.material as THREE.LineBasicMaterial).opacity =
              (1 - d / CONNECT_DIST) * 0.26 * boost;
            line.visible = true;
          }
        }
      }

      // Gold links from the cursor to nearby particles — a "grounding" gesture (desktop pointer)
      let ci = 0;
      for (let i = 0; i < particles.length && ci < CURSOR_LINKS; i++) {
        const dx = particles[i].mesh.position.x - mouseRef.current.x;
        const dy = particles[i].mesh.position.y - mouseRef.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 8) {
          const line = cursorLines[ci++];
          const pos = line.geometry.attributes.position.array as Float32Array;
          pos[0] = mouseRef.current.x; pos[1] = mouseRef.current.y; pos[2] = 0;
          pos[3] = particles[i].mesh.position.x; pos[4] = particles[i].mesh.position.y; pos[5] = particles[i].mesh.position.z;
          line.geometry.attributes.position.needsUpdate = true;
          (line.material as THREE.LineBasicMaterial).opacity = (1 - d / 8) * 0.55;
          line.visible = true;
        }
      }

      // Subtle parallax — the field leans toward the cursor for depth
      if (pointerActive) {
        camera.position.x += (mouseRef.current.x * 0.05 - camera.position.x) * 0.04;
        camera.position.y += (mouseRef.current.y * 0.05 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      tick();
    };

    // Reduced motion: render one static constellation frame, no loop
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tick();
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={mountRef}
      data-hero-canvas
      className="absolute inset-0"
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  );
}
