"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import Link from "next/link";
import { Movie, movies as defaultMovieList } from "@/data/movies";
import { getYoutubeId } from "@/lib/utils";
import {
  Ticket,
  Play,
  Star,
  Tv,
  X,
  Crosshair,
  Sparkles,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LuminaInteractiveListProps {
  movies?: Movie[];
}

export function LuminaInteractiveList({
  movies = defaultMovieList,
}: LuminaInteractiveListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

  // Map movies to slides with backdrops, taglines, ratings and tech badges
  const slides = movies.slice(0, 5).map((m) => ({
    id: m.id,
    title: m.title,
    tagline: m.tagline,
    description: m.synopsis.length > 150 ? m.synopsis.slice(0, 145) + "..." : m.synopsis,
    media: m.backdropUrl || m.posterUrl,
    rating: m.rating.toFixed(1),
    ageRating: m.ageRating,
    studio: (m.visualSpecs && m.visualSpecs[0]) || "IMAX 3D 4K",
    audio: (m.audioSpecs && m.audioSpecs[0]) || "DOLBY ATMOS",
    duration: `${Math.floor(m.duration / 60)}h ${m.duration % 60}m`,
    trailerUrl: m.trailerUrl,
  }));

  const activeSlide = slides[currentIdx] || slides[0];

  useEffect(() => {
    let isDisposed = false;
    let animId: number | null = null;
    let autoSlideTimer: any = null;
    let progressAnimation: any = null;

    // --- WebGL Shader Configuration ---
    const SLIDER_CONFIG: any = {
      settings: {
        transitionDuration: 1.8,
        autoSlideSpeed: 6000,
        currentEffect: "glass",
        globalIntensity: 1.0,
        speedMultiplier: 1.0,
        distortionStrength: 1.1,
        colorEnhancement: 1.0,
        glassRefractionStrength: 1.2,
        glassChromaticAberration: 1.2,
        glassBubbleClarity: 1.0,
        glassEdgeGlow: 1.0,
        glassLiquidFlow: 1.2,
      },
    };

    let currentSlideIndex = 0;
    let isTransitioning = false;
    let shaderMaterial: THREE.ShaderMaterial | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    const slideTextures: THREE.Texture[] = [];
    let texturesLoaded = false;
    let sliderEnabled = false;

    const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
    const PROGRESS_UPDATE_INTERVAL = 40;
    const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

    // --- Shaders (Cover UV logic + Glass Refraction & Chromatic Aberration) ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture1, uTexture2;
      uniform float uProgress;
      uniform vec2 uResolution, uTexture1Size, uTexture2Size;
      uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength;
      uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
      varying vec2 vUv;

      vec2 getCoverUV(vec2 uv, vec2 textureSize) {
        vec2 s = uResolution / textureSize;
        float scale = max(s.x, s.y);
        vec2 scaledSize = textureSize * scale;
        vec2 offset = (uResolution - scaledSize) * 0.5;
        return (uv * uResolution - offset) / scaledSize;
      }

      vec4 glassEffect(vec2 uv, float progress) {
        float time = progress * 5.0 * uSpeedMultiplier;
        vec2 uv1 = getCoverUV(uv, uTexture1Size);
        vec2 uv2 = getCoverUV(uv, uTexture2Size);
        float maxR = length(uResolution) * 0.85;
        float br = progress * maxR;
        vec2 p = uv * uResolution;
        vec2 c = uResolution * 0.5;
        float d = length(p - c);
        float nd = d / max(br, 0.001);
        float param = smoothstep(br + 3.0, br - 3.0, d);

        vec4 img;
        if (param > 0.0) {
          float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
          vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
          vec2 distUV = uv2 - dir * ro;
          distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
          float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
          img = vec4(
            texture2D(uTexture2, distUV + dir * ca * 1.2).r,
            texture2D(uTexture2, distUV + dir * ca * 0.2).g,
            texture2D(uTexture2, distUV - dir * ca * 0.8).b,
            1.0
          );
          if (uGlassEdgeGlow > 0.0) {
            float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
            img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
          }
        } else {
          img = texture2D(uTexture2, uv2);
        }

        vec4 oldImg = texture2D(uTexture1, uv1);
        if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
        return mix(oldImg, img, param);
      }

      void main() {
        gl_FragColor = glassEffect(vUv, uProgress);
      }
    `;

    const splitText = (text: string) => {
      return text
        .split("")
        .map(
          (char) =>
            `<span style="display: inline-block; opacity: 0;">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
    };

    const updateContent = (idx: number) => {
      if (isDisposed) return;
      setCurrentIdx(idx);

      const titleEl = containerRef.current?.querySelector(
        "#mainTitle"
      ) as HTMLElement | null;
      const descEl = containerRef.current?.querySelector(
        "#mainDesc"
      ) as HTMLElement | null;
      const taglineEl = containerRef.current?.querySelector(
        "#mainTagline"
      ) as HTMLElement | null;

      if (titleEl && descEl) {
        gsap.to(titleEl.children, {
          y: -20,
          opacity: 0,
          duration: 0.35,
          stagger: 0.015,
          ease: "power2.in",
        });
        gsap.to(descEl, { y: -10, opacity: 0, duration: 0.3, ease: "power2.in" });
        if (taglineEl) gsap.to(taglineEl, { opacity: 0, duration: 0.25 });

        setTimeout(() => {
          if (isDisposed) return;
          titleEl.innerHTML = splitText(slides[idx].title);
          descEl.textContent = slides[idx].description;
          if (taglineEl) taglineEl.textContent = `// ${slides[idx].tagline}`;

          gsap.set(titleEl.children, { opacity: 0 });
          gsap.set(descEl, { y: 20, opacity: 0 });
          if (taglineEl) gsap.set(taglineEl, { y: 10, opacity: 0 });

          // Stagger Up Reveal
          gsap.set(titleEl.children, { y: 24 });
          gsap.to(titleEl.children, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.025,
            ease: "power3.out",
          });
          if (taglineEl) {
            gsap.to(taglineEl, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.15,
              ease: "power3.out",
            });
          }
          gsap.to(descEl, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.25,
            ease: "power3.out",
          });
        }, 380);
      }
    };

    const updateNavigationState = (idx: number) => {
      const items = containerRef.current?.querySelectorAll(".slide-nav-item");
      items?.forEach((el, i) => el.classList.toggle("active", i === idx));
    };

    const updateSlideProgress = (idx: number, prog: number) => {
      const el = containerRef.current
        ?.querySelectorAll(".slide-nav-item")
        [idx]?.querySelector(".slide-progress-fill") as HTMLElement | null;
      if (el) {
        el.style.width = `${prog}%`;
        el.style.opacity = "1";
      }
    };

    const fadeSlideProgress = (idx: number) => {
      const el = containerRef.current
        ?.querySelectorAll(".slide-nav-item")
        [idx]?.querySelector(".slide-progress-fill") as HTMLElement | null;
      if (el) {
        el.style.opacity = "0";
        setTimeout(() => {
          if (el) el.style.width = "0%";
        }, 250);
      }
    };

    const quickResetProgress = (idx: number) => {
      const el = containerRef.current
        ?.querySelectorAll(".slide-nav-item")
        [idx]?.querySelector(".slide-progress-fill") as HTMLElement | null;
      if (el) {
        el.style.transition = "width 0.2s ease-out";
        el.style.width = "0%";
        setTimeout(() => {
          if (el) el.style.transition = "width 0.1s ease, opacity 0.3s ease";
        }, 200);
      }
    };

    const updateCounter = (idx: number) => {
      const sn = containerRef.current?.querySelector("#slideNumber");
      if (sn) sn.textContent = String(idx + 1).padStart(2, "0");
      const st = containerRef.current?.querySelector("#slideTotal");
      if (st) st.textContent = String(slides.length).padStart(2, "0");
    };

    const stopAutoSlideTimer = () => {
      if (progressAnimation) clearInterval(progressAnimation);
      if (autoSlideTimer) clearTimeout(autoSlideTimer);
      progressAnimation = null;
      autoSlideTimer = null;
    };

    const startAutoSlideTimer = () => {
      if (!texturesLoaded || !sliderEnabled || isDisposed) return;
      stopAutoSlideTimer();

      let progress = 0;
      const increment = (100 / SLIDE_DURATION()) * PROGRESS_UPDATE_INTERVAL;

      progressAnimation = setInterval(() => {
        if (!sliderEnabled || isDisposed) {
          stopAutoSlideTimer();
          return;
        }
        progress += increment;
        updateSlideProgress(currentSlideIndex, progress);

        if (progress >= 100) {
          clearInterval(progressAnimation);
          progressAnimation = null;
          fadeSlideProgress(currentSlideIndex);
          if (!isTransitioning) {
            navigateToSlide((currentSlideIndex + 1) % slides.length);
          }
        }
      }, PROGRESS_UPDATE_INTERVAL);
    };

    const safeStartTimer = (delay = 0) => {
      stopAutoSlideTimer();
      if (sliderEnabled && texturesLoaded && !isDisposed) {
        if (delay > 0) autoSlideTimer = setTimeout(startAutoSlideTimer, delay);
        else startAutoSlideTimer();
      }
    };

    const navigateToSlide = (targetIndex: number) => {
      if (isTransitioning || targetIndex === currentSlideIndex || !shaderMaterial)
        return;
      stopAutoSlideTimer();
      quickResetProgress(currentSlideIndex);

      const currentTexture = slideTextures[currentSlideIndex];
      const targetTexture = slideTextures[targetIndex];
      if (!currentTexture || !targetTexture) return;

      isTransitioning = true;
      shaderMaterial.uniforms.uTexture1.value = currentTexture;
      shaderMaterial.uniforms.uTexture2.value = targetTexture;
      shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
      shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;

      updateContent(targetIndex);

      currentSlideIndex = targetIndex;
      updateCounter(currentSlideIndex);
      updateNavigationState(currentSlideIndex);

      gsap.fromTo(
        shaderMaterial.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: TRANSITION_DURATION(),
          ease: "power2.inOut",
          onComplete: () => {
            if (shaderMaterial && !isDisposed) {
              shaderMaterial.uniforms.uProgress.value = 0;
              shaderMaterial.uniforms.uTexture1.value = targetTexture;
              shaderMaterial.uniforms.uTexture1Size.value =
                targetTexture.userData.size;
              isTransitioning = false;
              safeStartTimer(100);
            }
          },
        }
      );
    };

    const createSlidesNavigation = () => {
      const nav = containerRef.current?.querySelector("#slidesNav");
      if (!nav) return;
      nav.innerHTML = "";

      slides.forEach((slide, i) => {
        const item = document.createElement("div");
        item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
        item.dataset.slideIndex = String(i);
        item.innerHTML = `
          <div class="slide-progress-line"><div class="slide-progress-fill"></div></div>
          <div class="slide-nav-title">${slide.title}</div>
        `;
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!isTransitioning && i !== currentSlideIndex) {
            stopAutoSlideTimer();
            quickResetProgress(currentSlideIndex);
            navigateToSlide(i);
          }
        });
        nav.appendChild(item);
      });
    };

    const loadImageTexture = (src: string) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(
          src,
          (tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.userData = {
              size: new THREE.Vector2(tex.image.width, tex.image.height),
            };
            resolve(tex);
          },
          undefined,
          reject
        );
      });

    const initRenderer = async () => {
      const canvas = containerRef.current?.querySelector(
        ".webgl-canvas"
      ) as HTMLCanvasElement | null;
      if (!canvas || !containerRef.current) return;

      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || window.innerHeight;

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: null },
          uTexture2: { value: null },
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uTexture1Size: { value: new THREE.Vector2(1, 1) },
          uTexture2Size: { value: new THREE.Vector2(1, 1) },
          uGlobalIntensity: { value: 1.0 },
          uSpeedMultiplier: { value: 1.0 },
          uDistortionStrength: { value: 1.2 },
          uGlassRefractionStrength: { value: 1.1 },
          uGlassChromaticAberration: { value: 1.2 },
          uGlassBubbleClarity: { value: 1.0 },
          uGlassEdgeGlow: { value: 1.0 },
          uGlassLiquidFlow: { value: 1.2 },
        },
        vertexShader,
        fragmentShader,
      });

      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

      for (const s of slides) {
        try {
          slideTextures.push(await loadImageTexture(s.media));
        } catch (e) {
          console.warn("Failed texture load:", s.media);
        }
      }

      if (slideTextures.length >= 2 && !isDisposed) {
        shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
        shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
        shaderMaterial.uniforms.uTexture1Size.value =
          slideTextures[0].userData.size;
        shaderMaterial.uniforms.uTexture2Size.value =
          slideTextures[1].userData.size;
        texturesLoaded = true;
        sliderEnabled = true;

        containerRef.current?.classList.add("loaded");
        safeStartTimer(500);
      }

      const render = () => {
        if (isDisposed) return;
        animId = requestAnimationFrame(render);
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };
      render();
    };

    createSlidesNavigation();
    updateCounter(0);

    // Initial content setup
    const tEl = containerRef.current?.querySelector("#mainTitle");
    const dEl = containerRef.current?.querySelector("#mainDesc");
    const tagEl = containerRef.current?.querySelector("#mainTagline");
    if (tEl && dEl) {
      tEl.innerHTML = splitText(slides[0].title);
      dEl.textContent = slides[0].description;
      if (tagEl) tagEl.textContent = `// ${slides[0].tagline}`;

      gsap.fromTo(
        tEl.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.03,
          ease: "power3.out",
          delay: 0.3,
        }
      );
      if (tagEl) {
        gsap.fromTo(
          tagEl,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
        );
      }
      gsap.fromTo(
        dEl,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.6 }
      );
    }

    initRenderer();

    const handleResize = () => {
      if (!containerRef.current || !renderer || !shaderMaterial) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      shaderMaterial.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
      stopAutoSlideTimer();
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [movies]);

  return (
    <div
      id="now-showing"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 select-none scroll-mt-24"
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-neon-red font-mono text-xs font-semibold tracking-widest uppercase mb-2">
            <Flame size={14} className="text-neon-red animate-pulse" />
            JAKARTA THEATERS // LIVE SELECTION
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-space-grotesk)] font-extrabold text-white tracking-tight">
            NOW SHOWING
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-geist-mono)] text-gray-400">
          <Sparkles size={14} className="text-neon-cyan" />
          <span>CINEMATIC WEBGL GLASSSLIDER // 2026</span>
        </div>
      </div>

      {/* ── Lumina Interactive WebGL Slider Showcase Container ── */}
      <main
        className="slider-wrapper relative w-full h-[620px] sm:h-[680px] lg:h-[720px] rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.9)] group"
        ref={containerRef}
      >
        {/* WebGL Three.js Canvas */}
        <canvas className="webgl-canvas absolute inset-0 w-full h-full z-0 pointer-events-none" />

        {/* Multi-layered Cinematic Shader Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-black/60 pointer-events-none z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,15,0.75)_100%)] pointer-events-none z-1" />

        {/* Top Badges (Rating, Studio & Duration) */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neon-red/50 text-neon-red text-xs font-mono font-bold shadow-lg">
              {activeSlide.ageRating}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neon-yellow/50 text-neon-yellow text-xs font-mono font-bold shadow-lg">
              <Star size={12} className="fill-neon-yellow" />
              {activeSlide.rating} / 10
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neon-cyan/50 text-neon-cyan text-xs font-mono font-bold shadow-lg">
              <Tv size={12} className="mr-1.5" /> {activeSlide.studio}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-gray-300 text-xs font-mono shadow-lg">
              {activeSlide.duration}
            </span>
          </div>
        </div>

        {/* Left Side Slide Number */}
        <span
          className="slide-number absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 font-[family-name:var(--font-rajdhani)] text-3xl sm:text-4xl font-extrabold text-white/80 z-10 pointer-events-none tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          id="slideNumber"
        >
          01
        </span>

        {/* Right Side Slide Total */}
        <span
          className="slide-total absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 font-[family-name:var(--font-rajdhani)] text-3xl sm:text-4xl font-extrabold text-white/40 z-10 pointer-events-none tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          id="slideTotal"
        >
          05
        </span>

        {/* Center Main Slide Content */}
        <div className="slide-content absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-4 z-10 pointer-events-none flex flex-col items-center">
          <p
            id="mainTagline"
            className="text-neon-magenta font-[family-name:var(--font-space-grotesk)] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 drop-shadow-md"
          >
            // {activeSlide.tagline}
          </p>

          <h1
            className="slide-title font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-4 drop-shadow-[0_5px_30px_rgba(0,0,0,0.9)] max-w-3xl"
            id="mainTitle"
          ></h1>

          <p
            className="slide-description font-[family-name:var(--font-plus-jakarta)] text-xs sm:text-sm md:text-base text-gray-200/90 leading-relaxed max-w-2xl mx-auto mb-6 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] font-light"
            id="mainDesc"
          ></p>

          {/* Integrated Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto">
            <Link
              href={`/movies/${activeSlide.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neon-red hover:bg-neon-red/90 text-white font-[family-name:var(--font-space-grotesk)] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,0,51,0.6)] hover:shadow-[0_0_35px_rgba(255,0,51,0.8)] hover:scale-105 active:scale-95"
            >
              <Ticket size={16} />
              BOOK SHOWTIME & SEATS
            </Link>

            <button
              type="button"
              onClick={() => setShowTrailer(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/75 hover:bg-black/90 border border-white/25 hover:border-neon-cyan text-white font-[family-name:var(--font-space-grotesk)] font-bold text-xs sm:text-sm tracking-wider transition-all backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
            >
              <Play size={15} className="fill-neon-cyan text-neon-cyan" />
              WATCH TRAILER
            </button>
          </div>
        </div>

        {/* Bottom Horizontal Slides Navigation Bar with Progress Fill Lines */}
        <nav
          className="slides-navigation absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 z-20 grid grid-cols-2 sm:grid-cols-5 gap-4 pointer-events-auto"
          id="slidesNav"
        ></nav>
      </main>

      {/* ── Global Trailer Video Modal ── */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-dark-card border-2 border-neon-cyan p-4 shadow-[0_0_50px_rgba(0,247,255,0.5)] rounded-2xl"
            >
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-dark-border">
                <div className="flex items-center gap-2 text-neon-cyan font-mono text-sm font-bold">
                  <Crosshair size={16} /> 4K STREAM FEED // {activeSlide.title}
                </div>
                <button
                  type="button"
                  onClick={() => setShowTrailer(false)}
                  className="w-8 h-8 rounded-lg bg-dark-surface border border-neon-cyan/50 text-white flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="aspect-video w-full bg-black border border-dark-border relative flex items-center justify-center overflow-hidden rounded-xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(
                    activeSlide.trailerUrl
                  )}?autoplay=1`}
                  title={`${activeSlide.title} Official Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Embedded CSS for WebGL Glass Slider Navigation & Progress Line ── */}
      <style jsx global>{`
        .slides-navigation {
          display: grid;
          gap: 1.25rem;
        }
        .slide-nav-item {
          cursor: pointer;
          position: relative;
          text-align: left;
          padding: 0.5rem 0;
          opacity: 0.45;
          transition: opacity 0.3s ease, transform 0.2s ease;
        }
        .slide-nav-item:hover {
          opacity: 0.85;
        }
        .slide-nav-item.active {
          opacity: 1;
        }
        .slide-progress-line {
          width: 100%;
          height: 2.5px;
          background: rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          margin-bottom: 0.65rem;
          border-radius: 9999px;
        }
        .slide-progress-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #ff0033, #ff2e77);
          box-shadow: 0 0 10px #ff0033;
          border-radius: 9999px;
          transition: width 0.1s linear, opacity 0.25s ease;
        }
        .slide-nav-title {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .slide-nav-item.active .slide-nav-title {
          color: #00f7ff;
          text-shadow: 0 0 12px rgba(0, 247, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

// Export default Component alias matching user's request
export const Component = LuminaInteractiveList;
export default LuminaInteractiveList;
