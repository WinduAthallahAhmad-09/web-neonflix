"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Movie } from "@/data/movies";
import { soundFx } from "@/lib/soundFx";
import { Star, Radio, Sparkles } from "lucide-react";

interface Holographic3DPosterProps {
  movie: Movie;
  onPlayTrailer?: () => void;
}

/**
 * Holographic3DPoster - 21st.dev & Aceternity inspired 3D Perspective Tilt Card.
 * Tracks cursor coordinates to tilt smoothly with spring physics in 3D space,
 * with specular iridescent glare and multi-layered floating z-index badges.
 */
export function Holographic3DPoster({ movie, onPlayTrailer }: Holographic3DPosterProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 25 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Map mouse coordinates to 3D rotation angles (-15deg to 15deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.2, 0.55, 0.2]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="flex items-center justify-center select-none">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onPlayTrailer}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-64 sm:w-72 md:w-80 h-[400px] sm:h-[460px] md:h-[490px] rounded-2xl bg-black/80 border border-white/15 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,0,51,0.25)] group cursor-pointer transition-shadow duration-300 hover:shadow-[0_30px_70px_rgba(255,0,51,0.35)]"
      >
        {/* Floating Cyber Brackets (translateZ: 60px) */}
        <div
          style={{ transform: "translateZ(60px)" }}
          className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-neon-red pointer-events-none rounded-tl-sm transition-transform duration-300 group-hover:scale-110"
        />
        <div
          style={{ transform: "translateZ(60px)" }}
          className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-neon-cyan pointer-events-none rounded-br-sm transition-transform duration-300 group-hover:scale-110"
        />

        {/* Poster Surface (translateZ: 25px) */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="relative w-full h-full rounded-xl overflow-hidden bg-black"
        >
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            priority
            unoptimized
            className="object-cover filter contrast-110 brightness-100 transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Holographic Specular Glare Layer */}
          <motion.div
            style={{
              opacity: glareOpacity,
              left: glareX,
            }}
            className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-tr from-transparent via-white/30 to-transparent mix-blend-overlay pointer-events-none transform -rotate-45 transition-opacity"
          />

          {/* Vignette Shadow Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/25 to-transparent pointer-events-none" />

          {/* Top Floating Badge Bar (translateZ: 45px) */}
          <div
            style={{ transform: "translateZ(45px)" }}
            className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neon-yellow/50 text-neon-yellow text-xs font-mono font-bold shadow-md">
              <Star size={12} className="fill-neon-yellow" />
              {movie.rating} / 10
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neon-cyan/50 text-neon-cyan text-[10px] font-mono font-bold shadow-md">
              <Radio size={10} className="animate-pulse" />
              4K ULTRA HD
            </div>
          </div>

          {/* Bottom Floating Info Pill (translateZ: 50px) */}
          <div
            style={{ transform: "translateZ(50px)" }}
            className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 backdrop-blur-xl border border-white/15 flex flex-col gap-1 shadow-xl group-hover:border-neon-red/60 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-neon-cyan tracking-wider uppercase font-bold">
                HOLO_CARTRIDGE_3D
              </span>
              <span className="text-[10px] font-mono text-gray-400">
                {movie.ageRating}
              </span>
            </div>
            <div className="text-xs font-bold text-white font-[family-name:var(--font-orbitron)] line-clamp-1 group-hover:text-neon-red transition-colors">
              {movie.title}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
