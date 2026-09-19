"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getNowShowing, Movie } from "@/data/movies";
import { GlitchText } from "@/components/ui/GlitchText";
import { NeonButton } from "@/components/ui/NeonButton";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { MeteorShower } from "@/components/effects/MeteorShower";
import { Spotlight } from "@/components/effects/Spotlight";
import { soundFx } from "@/lib/soundFx";
import { Play, Sparkles, ChevronLeft, ChevronRight, Star, Clock, Radio, Crosshair, X } from "lucide-react";

// Full-screen cinematic hero with auto-rotating movies (Carousel Hero)
export function HeroSection({ movie: initialMovie }: { movie: Movie }) {
  const movies = getNowShowing();
  const [activeIdx, setActiveIdx] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const movie = movies[activeIdx] ?? initialMovie;

  // Auto rotate every 7s
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(t);
  }, [movies.length]);

  const goNext = () => {
    soundFx.playClick();
    setActiveIdx((p) => (p + 1) % movies.length);
  };
  const goPrev = () => {
    soundFx.playClick();
    setActiveIdx((p) => (p - 1 + movies.length) % movies.length);
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden">
      {/* ── Full-bleed backdrop ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={movie.backdropUrl}
            alt={movie.title}
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          {/* Layered gradient shaders */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/75 to-dark-bg/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-dark-bg/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Interactive Spotlight follows mouse ── */}
      <Spotlight fill="rgba(255,0,51,0.12)" className="z-10" />

      {/* ── Meteor Shower ── */}
      <MeteorShower count={12} />

      {/* ── Moving grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,0,51,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── CRT Scanlines ── */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-25"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 pb-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* ── Left: Movie Info ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id + "info"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col gap-5"
            >
              {/* Status badge */}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neon-red/20 border border-neon-red/50 text-white text-[11px] font-[family-name:var(--font-orbitron)] font-bold tracking-wider shadow-[0_0_12px_rgba(255,0,51,0.3)]">
                  <Radio size={10} className="animate-ping text-neon-red" />
                  FEATURED PREMIERE
                </span>
                <span className="text-xs font-mono text-neon-cyan/80">
                  {activeIdx + 1} OF {movies.length} — JAKARTA HOLO-SCREEN
                </span>
              </div>

              {/* Title */}
              <div>
                <GlitchText
                  text={movie.title}
                  as="h1"
                  intensity="low"
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight leading-none drop-shadow-[0_0_40px_rgba(255,0,51,0.5)]"
                />
                <p className="mt-3 text-neon-magenta text-base sm:text-lg font-[family-name:var(--font-orbitron)] tracking-[0.3em] uppercase">
                  {movie.tagline}
                </p>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2">
                {movie.genre.slice(0, 3).map((g, i) => (
                  <NeonBadge key={g} variant={i === 0 ? "red" : i === 1 ? "cyan" : "magenta"}>
                    {g}
                  </NeonBadge>
                ))}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-yellow/10 border border-neon-yellow/40 text-neon-yellow text-xs font-mono font-bold shadow-[0_0_10px_rgba(245,255,0,0.2)]">
                  <Star size={11} className="fill-neon-yellow" />
                  {movie.rating} / 10
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-card/80 border border-white/10 text-gray-300 text-xs font-mono">
                  <Clock size={11} className="text-neon-cyan" />
                  {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                </div>
                <span className="px-3 py-1 rounded-full bg-dark-card border border-white/10 text-gray-300 text-xs font-mono">
                  {movie.ageRating}
                </span>
              </div>

              {/* Clean Rounded Synopsis */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-4 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                {movie.synopsis}
              </p>

              {/* Visual + Audio specs */}
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                {(movie.visualSpecs ?? []).map((v) => (
                  <span key={v} className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-neon-cyan font-bold tracking-wider">
                    {v}
                  </span>
                ))}
                {(movie.audioSpecs ?? []).map((a) => (
                  <span key={a} className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-neon-magenta font-bold tracking-wider">
                    {a}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={`/movies/${movie.id}`}>
                  <NeonButton variant="primary" size="lg" className="group">
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                    BOOK NOW
                  </NeonButton>
                </Link>
                <NeonButton
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    soundFx.playSelect();
                    setShowTrailer(true);
                  }}
                >
                  <Play size={16} className="fill-neon-cyan" />
                  WATCH TRAILER
                </NeonButton>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Right: Floating Poster + Thumbnail Carousel ── */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center gap-6">
            {/* Main floating poster with clean rounded corners */}
            <AnimatePresence mode="wait">
              <motion.div
                key={movie.id + "poster"}
                initial={{ opacity: 0, scale: 0.92, rotateY: -6 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.6 }}
                className="relative w-64 h-[380px] rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(255,0,51,0.25)] overflow-hidden bg-dark-card/60 backdrop-blur-xl"
              >
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                {/* Bottom clean info pill */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 backdrop-blur-md border-t border-white/10">
                  <div className="text-[10px] font-mono text-neon-cyan font-bold">DIRECTOR: {movie.director}</div>
                  <div className="text-[10px] font-sans text-gray-300 truncate mt-0.5">{movie.cast.slice(0, 3).join(", ")}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Clean Rounded Thumbnail strip */}
            <div className="flex gap-2.5">
              {movies.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveIdx(i);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`relative w-12 h-16 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                    i === activeIdx
                      ? "border-neon-red scale-110 shadow-[0_0_15px_rgba(255,0,51,0.6)]"
                      : "border-white/10 hover:border-white/30 opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image src={m.posterUrl} alt={m.title} fill unoptimized className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Navigation arrows (Rounded Full) ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          <button
            onClick={goPrev}
            onMouseEnter={() => soundFx.playHover()}
            className="w-11 h-11 rounded-full bg-dark-card/80 border border-white/15 hover:border-neon-red hover:bg-neon-red/20 text-white flex items-center justify-center transition-all cursor-pointer group shadow-lg backdrop-blur-md"
          >
            <ChevronLeft size={20} className="group-hover:text-neon-red" />
          </button>
          <button
            onClick={goNext}
            onMouseEnter={() => soundFx.playHover()}
            className="w-11 h-11 rounded-full bg-dark-card/80 border border-white/15 hover:border-neon-red hover:bg-neon-red/20 text-white flex items-center justify-center transition-all cursor-pointer group shadow-lg backdrop-blur-md"
          >
            <ChevronRight size={20} className="group-hover:text-neon-red" />
          </button>
        </div>

        {/* ── Progress indicator dots (Rounded Full) ── */}
        <div className="flex justify-center gap-2 mt-8">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                soundFx.playClick();
                setActiveIdx(i);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === activeIdx
                  ? "w-8 h-2 bg-neon-red shadow-[0_0_10px_#ff0033]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Trailer Modal ── */}
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
              className="relative w-full max-w-4xl bg-dark-card border-2 border-neon-cyan p-4 shadow-[0_0_60px_rgba(0,247,255,0.4)]"
            >
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-dark-border">
                <div className="flex items-center gap-2 text-neon-cyan font-mono text-sm font-bold">
                  <Crosshair size={16} /> TRAILER STREAM // {movie.title}
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setShowTrailer(false);
                  }}
                  className="w-8 h-8 bg-dark-surface border border-neon-cyan/50 text-white flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="aspect-video w-full bg-black border border-dark-border overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Trailer"
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
