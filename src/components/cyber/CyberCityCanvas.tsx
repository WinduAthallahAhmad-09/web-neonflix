"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CyberCityCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050508, 1);
    container.appendChild(renderer.domElement);

    // --- Perspective Neon Grid Floor ---
    const gridHelper = new THREE.GridHelper(120, 60, 0xff0033, 0x330011);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Second cyan top grid ceiling (inverted horizon)
    const topGrid = new THREE.GridHelper(120, 40, 0x00f7ff, 0x002233);
    topGrid.position.y = 25;
    scene.add(topGrid);

    // --- Cyberpunk Skyscrapers / Monoliths in Background ---
    const buildingsGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const buildingMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x120815, wireframe: false }),
      new THREE.MeshBasicMaterial({ color: 0x0d0d18, wireframe: false }),
    ];
    const wireframeMatRed = new THREE.MeshBasicMaterial({
      color: 0xff0044,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMatCyan = new THREE.MeshBasicMaterial({
      color: 0x00f7ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const buildingCount = 45;
    for (let i = 0; i < buildingCount; i++) {
      const h = 8 + Math.random() * 22;
      const w = 2.5 + Math.random() * 4;
      const d = 2.5 + Math.random() * 4;
      const x = (Math.random() - 0.5) * 80;
      const z = -20 - Math.random() * 50;

      // Keep center somewhat open
      if (Math.abs(x) < 8) continue;

      const mesh = new THREE.Mesh(boxGeo, buildingMaterials[i % 2]);
      mesh.scale.set(w, h, d);
      mesh.position.set(x, -2 + h / 2, z);
      buildingsGroup.add(mesh);

      // Wireframe overlay
      const wire = new THREE.Mesh(
        boxGeo,
        i % 3 === 0 ? wireframeMatCyan : wireframeMatRed
      );
      wire.scale.set(w * 1.01, h * 1.01, d * 1.01);
      wire.position.set(x, -2 + h / 2, z);
      buildingsGroup.add(wire);
    }
    scene.add(buildingsGroup);

    // --- Floating Cyber Particles / Digital Dust ---
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 1] = Math.random() * 25 - 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      // Color variation: red, magenta, cyan
      if (i % 3 === 0) {
        particleColors[i * 3] = 1.0;
        particleColors[i * 3 + 1] = 0.0;
        particleColors[i * 3 + 2] = 0.2;
      } else if (i % 3 === 1) {
        particleColors[i * 3] = 1.0;
        particleColors[i * 3 + 1] = 0.18;
        particleColors[i * 3 + 2] = 0.47;
      } else {
        particleColors[i * 3] = 0.0;
        particleColors[i * 3 + 1] = 0.97;
        particleColors[i * 3 + 2] = 1.0;
      }
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse Movement Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // --- Animation Loop ---
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetX += (mouseX * 2.5 - targetX) * 0.05;
      targetY += (-mouseY * 1.5 - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = 3 + targetY;
      camera.lookAt(0, 4, -25);

      // Animate floor grid moving forward (infinite synthwave motion)
      gridHelper.position.z = (elapsedTime * 4) % 2;
      topGrid.position.z = (elapsedTime * 2) % 3;

      // Animate particles floating upward
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.03;
        if (positions[i] > 25) {
          positions[i] = -2;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.65 }}
    />
  );
}
