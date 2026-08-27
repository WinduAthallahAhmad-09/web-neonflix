"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/data/movies";
import { GlitchText } from "@/components/ui/GlitchText";
import { NeonButton } from "@/components/ui/NeonButton";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { soundFx } from "@/lib/soundFx";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, Crosshair, Radio, X } from "lucide-react";

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-8 overflow-hidden">
      {/* Background Holographic Viewport with Chamfered Frame */}
      <div className="absolute inset-0 z-0">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-35 scale-105 filter brightness-90 contrast-125"
        />
        {/* Layered Cyberpunk Gradient Shaders */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/50 to-transparent" />
        
        {/* Animated Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40"></div>
      </div>

      {/* Hero Content Container with Tactical Framing */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Mission Dossier / Movie Briefing */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-8 flex flex-col items-start gap-4"
        >
          {/* Tactical Mission Header Badge */}
          <div className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[10px] sm:text-xs">
            <span className="flex items-center gap-1 px-2 py-0.5 bg-neon-red/15 border border-neon-red/60 text-neon-red font-bold animate-pulse">
              <Radio size={10} /> FEATURED SIMULATION
            </span>
            <span className="text-gray-400">
              SECTOR: <span className="text-white">JKT_CENTRAL</span>
            </span>
            <span className="text-gray-600">//</span>
            <span className="text-neon-cyan">CLASS: IMAX 4DX</span>
          </div>

          {/* Glitch Title */}
          <div className="space-y-1">
            <GlitchText
              text={movie.title}
              as="h1"
              intensity="medium"
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wider drop-shadow-[0_0_25px_rgba(255,0,51,0.6)]"
            />
            <p className="font-[family-name:var(--font-orbitron)] text-base sm:text-xl text-neon-magenta tracking-widest uppercase">
              // {movie.tagline}
            </p>
          </div>

          {/* Genre Badges & Tech Specs */}
          <div className="flex flex-wrap items-center gap-2 my-1">
            {movie.genre.map((g, i) => (
              <NeonBadge
                key={g}
                variant={i === 0 ? "red" : i === 1 ? "magenta" : "cyan"}
              >
                {g}
              </NeonBadge>
            ))}
            <span className="px-2 py-0.5 bg-dark-card border border-dark-border text-gray-300 text-xs font-mono">
              ⏱ {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
            </span>
            <span className="px-2 py-0.5 bg-dark-card border border-neon-yellow/50 text-neon-yellow text-xs font-mono font-bold">
              ★ {movie.rating} / 10
            </span>
            <span className="px-2 py-0.5 bg-dark-card border border-dark-border text-gray-400 text-xs font-mono">
              {movie.ageRating}
            </span>
          </div>

          {/* Tactical Mission Briefing Text */}
          <div className="relative p-4 bg-dark-card/75 border-l-2 border-neon-red border-y border-r border-dark-border backdrop-blur-md max-w-2xl text-gray-300 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
            <div className="text-[9px] font-mono text-neon-red/80 tracking-widest mb-1 flex items-center gap-1">
              <Crosshair size={10} /> [MISSION_BRIEFING_LOG]
            </div>
            {movie.synopsis}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href={`/movies/${movie.id}`}>
              <NeonButton variant="primary" size="lg" className="group">
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                INITIATE BOOKING
              </NeonButton>
            </Link>

            <NeonButton
              variant="secondary"
              size="lg"
              onClick={() => {
                soundFx.playSelect(true);
                setShowTrailerModal(true);
              }}
            >
              <Play size={16} className="fill-neon-cyan" />
              RUN TRAILER PROTOCOL
            </NeonButton>
          </div>
        </motion.div>

        {/* Right Column: Holographic HUD Display Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center"
        >
          <div className="relative p-3 bg-dark-card/90 border border-neon-red/40 rounded-none shadow-[0_0_30px_rgba(255,0,51,0.2)]">
            {/* Top HUD Frame Details */}
            <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 mb-2 border-b border-dark-border pb-1">
              <span className="text-neon-red font-bold">HOLO_POD_01</span>
              <span>LIVE FEED</span>
            </div>

            {/* Poster with Cyber Frame */}
            <div className="relative w-64 h-96 overflow-hidden border border-dark-border group">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2 left-2 right-2 text-center p-2 bg-dark-bg/90 border border-neon-red/40">
                <div className="text-[10px] font-mono text-neon-cyan">DIRECTOR: {movie.director}</div>
                <div className="text-[9px] font-mono text-gray-400">CAST: {movie.cast.slice(0, 2).join(", ")}</div>
              </div>
            </div>

            {/* Bottom HUD Coordinates */}
            <div className="flex justify-between items-center text-[9px] font-mono text-neon-magenta mt-2">
              <span>STATUS: OPERATIONAL</span>
              <span>INDEX: #{movie.id.toUpperCase()}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trailer Scanner Modal */}
      <AnimatePresence>
        {showTrailerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setShowTrailerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-dark-card border-2 border-neon-red p-4 shadow-[0_0_50px_rgba(255,0,51,0.5)]"
            >
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-dark-border">
                <div className="flex items-center gap-2 text-neon-red font-mono text-sm font-bold">
                  <Crosshair size={16} /> TRAILER STREAM // {movie.title}
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setShowTrailerModal(false);
                  }}
                  className="w-8 h-8 rounded bg-dark-surface border border-neon-red/50 text-white flex items-center justify-center hover:bg-neon-red hover:text-black transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="aspect-video w-full bg-black border border-dark-border relative flex items-center justify-center overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Cyberpunk Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
