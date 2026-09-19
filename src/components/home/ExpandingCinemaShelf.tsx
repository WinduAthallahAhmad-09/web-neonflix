"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "@/data/movies";
import { soundFx } from "@/lib/soundFx";
import { Star, Clock, Ticket, Film, Sparkles, ChevronRight, Play } from "lucide-react";

interface ExpandingCinemaShelfProps {
  movies: Movie[];
}

/**
 * ExpandingCinemaShelf - Apple TV / Netflix style interactive expanding cinema shelf.
 * All movies sit seamlessly in one cohesive horizontal shelf:
 * - Hovering any movie card smoothly expands it to flex-[3.8] with full backdrop, synopsis, and booking CTA.
 * - Other cards shrink into vertical teaser strips with clean ratings and vertical titles.
 * - Eliminates grid gaps completely for an ultra-tidy, interactive 5-movie presentation.
 */
export function ExpandingCinemaShelf({ movies }: ExpandingCinemaShelfProps) {
  const [activeId, setActiveId] = useState<string>(movies[0]?.id || "");

  return (
    <div className="w-full">
      {/* ── Desktop & Tablet: Expanding Flex Shelf ── */}
      <div className="hidden md:flex h-[540px] w-full gap-3.5 items-stretch relative">
        {movies.map((movie) => {
          const isActive = movie.id === activeId;

          return (
            <div
              key={movie.id}
              onMouseEnter={() => {
                if (!isActive) {
                  soundFx.playHover();
                  setActiveId(movie.id);
                }
              }}
              onClick={() => {
                if (!isActive) {
                  soundFx.playClick();
                  setActiveId(movie.id);
                }
              }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-500 ease-out border ${
                isActive
                  ? "flex-[3.5] lg:flex-[4] border-neon-red shadow-[0_15px_40px_rgba(255,0,51,0.25)] ring-1 ring-neon-red/50"
                  : "flex-1 border-white/10 hover:border-white/30 filter brightness-85 hover:brightness-100 hover:scale-[1.01]"
              }`}
            >
              {/* Background Visual (Backdrop when Active, Poster when Collapsed) */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={isActive ? movie.backdropUrl || movie.posterUrl : movie.posterUrl}
                  alt={movie.title}
                  fill
                  unoptimized
                  className={`object-cover object-center transition-transform duration-700 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />

                {/* Cinematic Overlays */}
                {isActive ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-black/60 to-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 group-hover:from-black/70" />
                )}
              </div>

              {/* ── EXPANDED STATE (Active Card Content) ── */}
              {isActive && (
                <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
                  {/* Top Bar: Ratings, Age, Visual Specs */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {/* Rating Badge */}
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-neon-yellow/40 text-neon-yellow text-xs font-bold font-mono shadow-md">
                        <Star size={13} className="fill-neon-yellow" />
                        {movie.rating} / 10
                      </span>

                      {/* Age Rating */}
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-gray-200 text-xs font-mono">
                        {movie.ageRating}
                      </span>
                    </div>

                    {/* Studio Spec Badge */}
                    {movie.visualSpecs?.[0] && (
                      <span className="px-3 py-1 rounded-full bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan text-[10px] font-mono font-bold tracking-wider uppercase hidden sm:inline">
                        {movie.visualSpecs[0]}
                      </span>
                    )}
                  </div>

                  {/* Bottom Area: Animated Details & CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col gap-3 max-w-xl"
                  >
                    {/* Genre Pills */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {movie.genre.slice(0, 3).map((g) => (
                        <span
                          key={g}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 border border-white/15 text-gray-300"
                        >
                          {g}
                        </span>
                      ))}
                      <span className="text-xs text-gray-400 font-mono flex items-center gap-1 ml-2">
                        <Clock size={12} className="text-neon-cyan" />
                        {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                      </span>
                    </div>

                    {/* Movie Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                      {movie.title}
                    </h3>

                    {/* Tagline & Synopsis */}
                    <p className="text-xs sm:text-sm text-neon-red font-mono font-semibold tracking-wide">
                      {movie.tagline}
                    </p>
                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {movie.synopsis}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-3">
                      <Link href={`/movies/${movie.id}`}>
                        <button
                          type="button"
                          onClick={() => soundFx.playClick()}
                          className="px-6 py-2.5 rounded-full bg-neon-red hover:bg-red-600 text-white font-[family-name:var(--font-orbitron)] font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,0,51,0.6)] hover:shadow-[0_0_35px_rgba(255,0,51,0.9)] flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                          <Ticket size={15} />
                          TIMES & TICKETS
                          <ChevronRight size={15} />
                        </button>
                      </Link>

                      <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
                        Dir. {movie.director}
                      </span>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ── COLLAPSED STATE (Vertical Teaser Strip) ── */}
              {!isActive && (
                <div className="relative z-10 h-full p-3.5 flex flex-col justify-between items-center">
                  {/* Top Rating */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-neon-yellow text-xs font-bold font-mono">
                    {movie.rating}
                  </div>

                  {/* Vertical Cyberpunk Title Strip */}
                  <div className="flex flex-col items-center gap-2 py-4">
                    <span
                      className="font-[family-name:var(--font-orbitron)] text-xs font-bold text-gray-300 tracking-widest uppercase opacity-80 group-hover:opacity-100 group-hover:text-white transition-opacity [writing-mode:vertical-rl] rotate-180 line-clamp-1 max-h-[220px]"
                    >
                      {movie.title}
                    </span>
                  </div>

                  {/* Bottom Age Badge */}
                  <div className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-gray-400 border border-white/10">
                    {movie.ageRating}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Mobile: Smooth Horizontal Snap Carousel ── */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar -mx-4 px-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[280px] w-[80vw] max-w-[340px] snap-center rounded-2xl bg-dark-card/90 border border-white/10 overflow-hidden flex flex-col shadow-xl"
          >
            {/* Poster */}
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={movie.backdropUrl || movie.posterUrl}
                alt={movie.title}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-black/40" />

              {/* Rating */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-neon-yellow/30 text-neon-yellow text-xs font-bold">
                <Star size={12} className="fill-neon-yellow" />
                {movie.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono mb-1">
                  <Clock size={12} className="text-neon-cyan" />
                  {Math.floor(movie.duration / 60)}h {movie.duration % 60}m • {movie.genre[0]}
                </div>
                <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-base text-white line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                  {movie.tagline}
                </p>
              </div>

              <Link href={`/movies/${movie.id}`} className="mt-2">
                <button
                  type="button"
                  onClick={() => soundFx.playClick()}
                  className="w-full py-2.5 rounded-full bg-neon-red hover:bg-red-600 text-white font-[family-name:var(--font-orbitron)] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,0,51,0.5)] flex items-center justify-center gap-2"
                >
                  <Ticket size={14} />
                  TIMES & TICKETS
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
