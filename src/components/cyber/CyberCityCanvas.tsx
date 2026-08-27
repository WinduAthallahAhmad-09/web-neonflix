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
    scene.fog = new THREE.FogExp2(0x070710, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 20);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x070710, 1);
    container.appendChild(renderer.domElement);

    // --- Perspective Synthwave Floor Grid ---
    const gridHelper = new THREE.GridHelper(140, 70, 0xff0033, 0x440018);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Top Cyan Ceiling Grid
    const topGrid = new THREE.GridHelper(140, 50, 0x00f7ff, 0x002238);
    topGrid.position.y = 28;
    scene.add(topGrid);

    // --- Sky Searchlight Beams (Moving Lasers in Background) ---
    const beamCount = 4;
    const laserBeams: THREE.Mesh[] = [];
    const beamGeo = new THREE.CylinderGeometry(0.1, 3.5, 45, 8);
    const beamMat1 = new THREE.MeshBasicMaterial({
      color: 0xff0044,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const beamMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f7ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });

    for (let b = 0; b < beamCount; b++) {
      const beam = new THREE.Mesh(beamGeo, b % 2 === 0 ? beamMat1 : beamMat2);
      beam.position.set(-25 + b * 18, 12, -35);
      beam.rotation.z = (Math.random() - 0.5) * 0.4;
      scene.add(beam);
      laserBeams.push(beam);
    }

    // --- Cyberpunk Skyscrapers with Neon Billboards ---
    const buildingsGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const buildingMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x14081c }),
      new THREE.MeshBasicMaterial({ color: 0x0e0e1e }),
    ];
    const wireframeMatRed = new THREE.MeshBasicMaterial({
      color: 0xff0033,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireframeMatCyan = new THREE.MeshBasicMaterial({
      color: 0x00f7ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const billboardMatMagenta = new THREE.MeshBasicMaterial({
      color: 0xff2e77,
      transparent: true,
      opacity: 0.8,
    });
    const billboardMatCyan = new THREE.MeshBasicMaterial({
      color: 0x00f7ff,
      transparent: true,
      opacity: 0.85,
    });

    const buildingCount = 50;
    for (let i = 0; i < buildingCount; i++) {
      const h = 10 + Math.random() * 26;
      const w = 3 + Math.random() * 4.5;
      const d = 3 + Math.random() * 4.5;
      const x = (Math.random() - 0.5) * 90;
      const z = -15 - Math.random() * 55;

      if (Math.abs(x) < 7) continue;

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

      // Neon Billboard on top third of selected buildings
      if (i % 4 === 0) {
        const boardGeo = new THREE.PlaneGeometry(w * 0.8, 2);
        const board = new THREE.Mesh(
          boardGeo,
          i % 2 === 0 ? billboardMatMagenta : billboardMatCyan
        );
        board.position.set(x, -2 + h * 0.75, z + d / 2 + 0.05);
        buildingsGroup.add(board);
      }
    }
    scene.add(buildingsGroup);

    // --- Floating Glowing Cyber Particles ---
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 70;
      particlePositions[i * 3 + 1] = Math.random() * 30 - 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 70;

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
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
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
      targetX += (mouseX * 3 - targetX) * 0.05;
      targetY += (-mouseY * 2 - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = 3 + targetY;
      camera.lookAt(0, 5, -28);

      // Floor & top grid movement
      gridHelper.position.z = (elapsedTime * 4.5) % 2;
      topGrid.position.z = (elapsedTime * 2.5) % 3;

      // Animate searchlight laser beams swaying in the sky
      laserBeams.forEach((beam, idx) => {
        beam.rotation.z = Math.sin(elapsedTime * 0.8 + idx) * 0.35;
      });

      // Animate particles floating upward
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.04;
        if (positions[i] > 28) {
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
      style={{ opacity: 0.75 }}
    />
  );
}
