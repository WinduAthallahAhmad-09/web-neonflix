"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "@/data/movies";
import { GlitchText } from "@/components/ui/GlitchText";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { NeonButton } from "@/components/ui/NeonButton";
import { soundFx } from "@/lib/soundFx";
import { getYoutubeId } from "@/lib/utils";
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
import { Holographic3DPoster } from "./Holographic3DPoster";
import { CinemaDossierTabs } from "./CinemaDossierTabs";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Movie Intel & Dossier Tabs (7-8 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 xl:col-span-8 flex flex-col items-start gap-5"
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

            {/* Title with Ultra-HD Glitch Text */}
            <div className="space-y-1">
              <GlitchText
                text={movie.title}
                as="h1"
                intensity="medium"
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wider drop-shadow-[0_0_30px_rgba(255,0,51,0.6)]"
              />
              <p className="font-[family-name:var(--font-orbitron)] text-base sm:text-lg text-neon-magenta tracking-widest uppercase">
                // {movie.tagline}
              </p>
            </div>

            {/* Genre & Rating Badges */}
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

            {/* Cinema Dossier Tabs (Interactive Story, Full Cast & Crew, Specs) */}
            <CinemaDossierTabs movie={movie} />

            {/* Action CTAs */}
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

          {/* Right Column: 3D Holographic Poster Cartridge Pod (5-4 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center"
          >
            <Holographic3DPoster
              movie={movie}
              onPlayTrailer={() => {
                soundFx.playSelect(true);
                setShowTrailer(true);
              }}
            />
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
                  src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(movie.trailerUrl)}?autoplay=1`}
                  title={`${movie.title} Trailer`}
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
