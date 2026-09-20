"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "@/data/movies";
import { getYoutubeId } from "@/lib/utils";
import {
  ArrowUpRight,
  Play,
  Sparkles,
  Star,
  Ticket,
  Clock,
  User,
  Tv,
  Volume2,
  X,
  Crosshair,
  Award,
} from "lucide-react";

interface LuminaCinemaListProps {
  movies: Movie[];
}

/**
 * LuminaCinemaList - 21st.dev inspired "Lumina Interactive List" component.
 * Features dual-column split-screen, hover-reactive focus isolation (dimming),
 * smooth spring typography motion, and morphing image preview with ambient lumina glow.
 */
export function LuminaCinemaList({ movies }: LuminaCinemaListProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

  // Focus on top 5 featured movies
  const featuredMovies = movies.slice(0, 5);
  const activeMovie = featuredMovies[activeIndex] || featuredMovies[0];

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10 select-none">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-5 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-neon-cyan font-mono text-xs font-semibold tracking-widest uppercase mb-2">
            <Sparkles size={14} className="text-neon-cyan animate-pulse" />
            CURATED SELECTION // TOP 5 JAKARTA PREMIERE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-space-grotesk)] font-extrabold text-white tracking-tight">
            FEATURED MASTERPIECES
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-geist-mono)] text-gray-400">
          <Award size={14} className="text-neon-yellow" />
          <span>RANKED BY AUDIENCE SCORE // 2026</span>
        </div>
      </div>

      {/* ── Split-Screen Showcase Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ── Left Column: Interactive Vertical List (01 - 05) ── */}
        <div className="lg:col-span-6 flex flex-col divide-y divide-white/10">
          {featuredMovies.map((movie, idx) => {
            const isActive = activeIndex === idx;
            const indexNumber = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={movie.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`group py-5 sm:py-6 px-3 sm:px-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  isActive
                    ? "bg-white/[0.04] opacity-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <div className="flex items-baseline gap-4 sm:gap-6 min-w-0 pr-4">
                  {/* Monospace 2-digit Index */}
                  <span
                    className={`font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm font-bold tracking-widest transition-colors ${
                      isActive
                        ? "text-neon-cyan"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {indexNumber}
                  </span>

                  {/* Title & Metadata */}
                  <div className="flex flex-col min-w-0">
                    <motion.h3
                      animate={{ x: isActive ? 10 : 0 }}
                      transition={{ type: "spring", stiffness: 360, damping: 26 }}
                      className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight transition-colors truncate ${
                        isActive
                          ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {movie.title}
                    </motion.h3>

                    <div className="flex items-center gap-2 text-[11px] font-[family-name:var(--font-plus-jakarta)] text-zinc-400 mt-1">
                      <span className="text-neon-red font-semibold uppercase">
                        {movie.genre[0]}
                      </span>
                      <span>•</span>
                      <span>
                        {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                      </span>
                      <span>•</span>
                      <span className="text-zinc-500">{movie.ageRating}</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Arrow Button */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-[0_0_15px_rgba(0,247,255,0.4)] scale-105"
                      : "text-zinc-600 border border-transparent group-hover:text-zinc-300 group-hover:border-white/10"
                  }`}
                >
                  <ArrowUpRight size={18} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Right Column: Dynamic Media Preview (Lumina Showcase Card) ── */}
        <div className="lg:col-span-6 relative">
          {/* Ambient Lumina Backlight Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-neon-red/25 via-neon-cyan/15 to-transparent blur-3xl rounded-3xl pointer-events-none -z-10 transition-all duration-700 opacity-75" />

          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMovie.id}
                initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                {/* Backdrop Image */}
                <Image
                  src={activeMovie.backdropUrl || activeMovie.posterUrl}
                  alt={activeMovie.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center filter brightness-95 contrast-105"
                />

                {/* Dark Shading Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/80 via-transparent to-transparent" />

                {/* Top Floating Telemetry Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-neon-red/50 text-neon-red text-[10px] font-mono font-bold">
                      {activeMovie.ageRating}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-neon-yellow/50 text-neon-yellow text-xs font-mono font-bold shadow-md">
                      <Star size={12} className="fill-neon-yellow" />
                      {activeMovie.rating} / 10
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-neon-cyan/50 text-neon-cyan text-[10px] font-mono font-bold">
                    {(activeMovie.visualSpecs && activeMovie.visualSpecs[0]) || "IMAX 3D 4K"}
                  </span>
                </div>

                {/* Bottom Overlay Info & Action CTAs */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 flex flex-col justify-end z-10">
                  <p className="text-neon-magenta text-xs font-[family-name:var(--font-space-grotesk)] tracking-widest uppercase mb-1 font-semibold">
                    // {activeMovie.tagline}
                  </p>

                  <h4 className="text-xl sm:text-2xl font-[family-name:var(--font-space-grotesk)] font-extrabold text-white tracking-tight mb-2">
                    {activeMovie.title}
                  </h4>

                  <p className="text-zinc-300 text-xs sm:text-sm line-clamp-2 mb-5 font-[family-name:var(--font-plus-jakarta)] font-light leading-relaxed">
                    {activeMovie.synopsis}
                  </p>

                  {/* Dual Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/movies/${activeMovie.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon-red hover:bg-neon-red/90 text-white font-[family-name:var(--font-space-grotesk)] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,0,51,0.5)] hover:shadow-[0_0_25px_rgba(255,0,51,0.7)]"
                    >
                      <Ticket size={15} />
                      BOOK SHOWTIME
                    </Link>

                    <button
                      type="button"
                      onClick={() => setShowTrailer(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/70 hover:bg-black/90 border border-white/20 hover:border-neon-cyan text-white font-[family-name:var(--font-space-grotesk)] font-bold text-xs tracking-wider transition-all backdrop-blur-md cursor-pointer"
                    >
                      <Play size={14} className="fill-neon-cyan text-neon-cyan" />
                      PLAY TRAILER
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Video Trailer Modal ── */}
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
                  <Crosshair size={16} /> 4K PREVIEW // {activeMovie.title}
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
                    activeMovie.trailerUrl
                  )}?autoplay=1`}
                  title={`${activeMovie.title} Official Trailer`}
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
