"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "@/data/movies";
import { GlitchText } from "@/components/ui/GlitchText";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { NeonButton } from "@/components/ui/NeonButton";
import { soundFx } from "@/lib/soundFx";
import {
  Play,
  Sparkles,
  Star,
  Clock,
  Radio,
  Tv,
  Volume2,
  X,
  Crosshair,
  User,
  Shield,
} from "lucide-react";

interface MovieHeroProps {
  movie: Movie;
}

export function MovieHero({ movie }: MovieHeroProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div className="relative w-full min-h-[85vh] flex items-center pt-28 pb-16 overflow-hidden select-none">
      {/* --- Ultra-HD 4K Cinematic Backdrop Viewport --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          unoptimized
          className="object-cover object-center filter brightness-95 contrast-115 opacity-60 scale-105"
        />
        {/* Dynamic Multi-layered Vignette & Glow Shaders */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,15,0.7)_100%)]" />

        {/* Animated Cyber Grid CRT Scanline Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30"></div>
      </div>

      {/* --- Main Content Grid Container --- */}
      <div className="container mx-auto px-4 sm:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Movie Intel & Synopses (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 flex flex-col items-start gap-4"
          >
            {/* Top Status Telemetry Tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-neon-red/15 border border-neon-red text-neon-red font-bold animate-pulse">
                <Radio size={12} /> ULTRA-HD HOLO-THEATER TRANSMISSION
              </span>
              <span className="px-2 py-0.5 bg-dark-card border border-white/20 text-white">
                {movie.ageRating}
              </span>
              <span className="text-neon-cyan font-bold">
                JAKARTA GRID // EXCLUSIVE 4K
              </span>
            </div>

            {/* Genre & Specs Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {movie.genre.map((g, idx) => (
                <NeonBadge
                  key={g}
                  variant={idx === 0 ? "red" : idx === 1 ? "cyan" : "magenta"}
                  className="text-xs px-2.5 py-0.5 font-bold"
                >
                  {g}
                </NeonBadge>
              ))}
              <div className="flex items-center gap-1 px-2.5 py-0.5 bg-dark-card border border-neon-yellow/60 text-neon-yellow font-mono text-xs font-bold shadow-[0_0_10px_rgba(245,255,0,0.3)]">
                <Star size={12} className="fill-neon-yellow text-neon-yellow" />
                {movie.rating} / 10
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 bg-dark-card border border-dark-border text-gray-300 font-mono text-xs">
                <Clock size={12} className="text-neon-magenta" />
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}m ({movie.duration} MIN)
              </div>
            </div>

            {/* Title with Ultra-HD Glitch Text */}
            <div className="space-y-1">
              <GlitchText
                text={movie.title}
                as="h1"
                intensity="medium"
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wider drop-shadow-[0_0_30px_rgba(255,0,51,0.6)]"
              />
              <p className="font-[family-name:var(--font-orbitron)] text-base sm:text-xl text-neon-magenta tracking-widest uppercase">
                // {movie.tagline}
              </p>
            </div>

            {/* Synopsis Briefing Box */}
            <div className="relative p-5 bg-dark-card/85 border-l-4 border-neon-red border-y border-r border-dark-border backdrop-blur-xl max-w-3xl text-gray-200 text-sm sm:text-base leading-relaxed shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <div className="text-[9px] font-mono text-neon-red tracking-widest mb-1.5 flex items-center gap-1.5">
                <Crosshair size={12} /> [SIMULATION_SYNOPSIS_LOG]
              </div>
              {movie.synopsis}
            </div>

            {/* Director & Cast Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl text-xs font-mono">
              <div className="p-3 bg-dark-surface/90 border border-dark-border flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-neon-cyan/10 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan">
                  <User size={16} />
                </div>
                <div>
                  <div className="text-[9px] text-gray-400">DIRECTOR / ARCHITECT</div>
                  <div className="text-white font-bold">{movie.director}</div>
                </div>
              </div>

              <div className="p-3 bg-dark-surface/90 border border-dark-border flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-neon-magenta/10 border border-neon-magenta/40 flex items-center justify-center text-neon-magenta">
                  <Shield size={16} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[9px] text-gray-400">OPERATIVE CAST</div>
                  <div className="text-white font-bold truncate">
                    {movie.cast.join(", ")}
                  </div>
                </div>
              </div>
            </div>

            {/* Audio & Visual Specs Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px]">
              <span className="text-gray-400 flex items-center gap-1">
                <Tv size={12} className="text-neon-cyan" /> VISUAL:
              </span>
              {(movie.visualSpecs || ["IMAX 3D 4K", "DOLBY VISION", "120FPS"]).map((v) => (
                <span
                  key={v}
                  className="px-2 py-0.5 bg-dark-surface border border-neon-cyan/30 text-neon-cyan font-bold"
                >
                  {v}
                </span>
              ))}

              <span className="text-gray-400 flex items-center gap-1 ml-2">
                <Volume2 size={12} className="text-neon-magenta" /> AUDIO:
              </span>
              {(movie.audioSpecs || ["DOLBY ATMOS 7.1.4", "DTS:X"]).map((a) => (
                <span
                  key={a}
                  className="px-2 py-0.5 bg-dark-surface border border-neon-magenta/30 text-neon-magenta font-bold"
                >
                  {a}
                </span>
              ))}
            </div>

            {/* Action CTA Button */}
            <div className="flex flex-wrap gap-4 pt-2">
              <NeonButton
                variant="secondary"
                size="lg"
                onClick={() => {
                  soundFx.playSelect(true);
                  setShowTrailer(true);
                }}
              >
                <Play size={16} className="fill-neon-cyan" />
                PLAY TRAILER FEED
              </NeonButton>
            </div>
          </motion.div>

          {/* Right Column: 3D Holographic Poster Cartridge Pod (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col items-center justify-center"
          >
            <div className="relative p-3 bg-dark-card border-2 border-neon-red/60 rounded-none shadow-[0_0_35px_rgba(255,0,51,0.35)] group">
              {/* Top Frame Telemetry */}
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-2 border-b border-dark-border pb-1.5">
                <span className="text-neon-red font-bold flex items-center gap-1">
                  <Radio size={10} className="animate-ping" /> HOLO_POSTER_HD
                </span>
                <span className="text-neon-green">4K ULTRA</span>
              </div>

              {/* Poster 4K Container */}
              <div className="relative w-64 sm:w-72 h-96 sm:h-[420px] overflow-hidden border border-dark-border bg-black">
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-100 contrast-110"
                />
                {/* Laser scan line passing over poster on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-red/20 to-transparent h-16 animate-[scanline_3s_linear_infinite] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-dark-bg/95 border border-neon-red/40 text-center">
                  <div className="text-xs font-mono font-bold text-white">
                    {movie.title}
                  </div>
                  <div className="text-[10px] font-mono text-neon-cyan">
                    ID: #{movie.id.toUpperCase()} // RELEASED {movie.releaseDate}
                  </div>
                </div>
              </div>

              {/* Bottom Frame Coordinates */}
              <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mt-2">
                <span>COORD: JKT-GRID</span>
                <span className="text-neon-magenta">STATUS: ACTIVE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- Video Trailer Modal --- */}
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
              className="relative w-full max-w-4xl bg-dark-card border-2 border-neon-cyan p-4 shadow-[0_0_50px_rgba(0,247,255,0.5)]"
            >
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-dark-border">
                <div className="flex items-center gap-2 text-neon-cyan font-mono text-sm font-bold">
                  <Crosshair size={16} /> 4K STREAM FEED // {movie.title}
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setShowTrailer(false);
                  }}
                  className="w-8 h-8 rounded bg-dark-surface border border-neon-cyan/50 text-white flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="aspect-video w-full bg-black border border-dark-border relative flex items-center justify-center overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
