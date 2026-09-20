"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "@/data/movies";
import { soundFx } from "@/lib/soundFx";
import { Star, Clock, Ticket, ChevronRight, Sparkles } from "lucide-react";

interface NowShowingRowCardProps {
  movie: Movie;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  isAnyHovered: boolean;
}

/**
 * NowShowingRowCard:
 * - Each card is centered horizontally at 3/4 width (75% width initially).
 * - When hovered, the card smoothly MELEBAR KE DUA SISI (expands outwards from the center) to full 100% width.
 * - Reveals full cinematic widescreen backdrop, complete synopsis, director, cast, and audio specs.
 * - Silky smooth 850ms cubic-bezier transition, zero vertical layout shift.
 */
export function NowShowingRowCard({
  movie,
  isHovered,
  onHover,
  isAnyHovered,
}: NowShowingRowCardProps) {
  return (
    <div className="w-full flex justify-center items-stretch">
      <div
        onMouseEnter={() => {
          soundFx.playHover();
          onHover(movie.id);
        }}
        onMouseLeave={() => onHover(null)}
        onClick={() => {
          soundFx.playClick();
          onHover(movie.id);
        }}
        className={`group relative h-[450px] sm:h-[480px] rounded-3xl overflow-hidden cursor-pointer select-none border transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          isHovered
            ? "w-full border-red-500/80 shadow-[0_20px_50px_rgba(229,9,20,0.25)] ring-1 ring-red-500/40 z-20"
            : isAnyHovered
            ? "w-full md:w-3/4 lg:w-3/4 border-white/10 opacity-60 hover:opacity-100 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10"
            : "w-full md:w-3/4 lg:w-3/4 border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10"
        }`}
        style={{
          transition:
            "width 850ms cubic-bezier(0.16, 1, 0.3, 1), border-color 500ms ease, box-shadow 500ms ease, opacity 400ms ease",
        }}
      >
        {/* Background Visual */}
        <div className="absolute inset-0 z-0 bg-[#08090d]">
          <Image
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            fill
            unoptimized
            className={`object-cover object-center ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            style={{
              transition: "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          {/* Multi-stop smooth directional scrim for 100% crystal clear text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/75 to-[#08090d]/20" />
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isHovered
                ? "bg-gradient-to-r from-[#08090d]/95 via-[#08090d]/70 to-transparent"
                : "bg-gradient-to-r from-[#08090d]/95 via-[#08090d]/80 to-[#08090d]/40"
            }`}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Soft Warm Amber Rating (Letterboxd/Apple TV+ style) */}
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-bold font-mono shadow-sm">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {movie.rating.toFixed(1)} / 10
              </span>
              {/* Translucent Age Rating Badge */}
              <span className="px-2.5 py-1 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-slate-300 text-xs font-mono">
                {movie.ageRating}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Frosted Glass Visual Spec */}
              {movie.visualSpecs?.[0] && (
                <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-slate-200 text-[10px] font-mono font-bold tracking-wider uppercase hidden sm:inline backdrop-blur-md">
                  {movie.visualSpecs[0]}
                </span>
              )}

              {/* Expanded Audio Specs or Hover Teaser */}
              {isHovered ? (
                movie.audioSpecs?.[0] && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-slate-200 text-[10px] font-mono font-bold tracking-wider uppercase hidden sm:inline backdrop-blur-md"
                  >
                    {movie.audioSpecs[0]}
                  </motion.span>
                )
              ) : (
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-slate-400 text-[10px] font-mono tracking-wider group-hover:text-rose-300 group-hover:border-rose-400/40 transition-colors">
                  <span>EXPAND</span>
                  <ChevronRight size={12} className="text-rose-400 animate-pulse" />
                </span>
              )}
            </div>
          </div>

          {/* Bottom Movie Details */}
          <div className="flex flex-col gap-2.5 max-w-3xl">
            {/* Genre Pills & Runtime */}
            <div className="flex items-center gap-2 flex-wrap">
              {movie.genre.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.07] border border-white/10 text-slate-300 backdrop-blur-sm"
                >
                  {g}
                </span>
              ))}
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1 ml-2">
                <Clock size={12} className="text-slate-400" />
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
              </span>
            </div>

            {/* Movie Title - Off-White Slate 50 */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-orbitron)] font-black text-slate-50 tracking-tight leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              {movie.title}
            </h3>

            {/* Tagline - Soft Rose / Crimson with subtle glowing accent dot (anti eye-strain) */}
            <p className="text-xs sm:text-sm text-rose-300/90 font-mono font-medium tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse inline-block" />
              {movie.tagline}
            </p>

            {/* Synopsis - Calm Slate 300 with high legibility */}
            <AnimatePresence mode="wait">
              {isHovered ? (
                <motion.p
                  key="full-synopsis"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-xs sm:text-sm text-slate-300 line-clamp-3 sm:line-clamp-4 leading-relaxed font-normal"
                >
                  {movie.synopsis}
                </motion.p>
              ) : (
                <p
                  key="short-synopsis"
                  className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal"
                >
                  {movie.synopsis}
                </p>
              )}
            </AnimatePresence>

            {/* Actions & Cast/Director Row */}
            <div className="flex items-center gap-4 pt-3 flex-wrap">
              {/* Premium Cinema Crimson Button */}
              <Link href={`/movies/${movie.id}`}>
                <button
                  type="button"
                  onClick={() => soundFx.playClick()}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-[family-name:var(--font-orbitron)] font-bold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(229,9,20,0.35)] hover:shadow-[0_6px_25px_rgba(229,9,20,0.55)] border border-red-400/30 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Ticket size={15} />
                  TIMES & TICKETS
                  <ChevronRight size={15} />
                </button>
              </Link>

              {/* Rich Director & Cast credits appear smoothly when hovered */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-[11px] font-mono text-slate-400 hidden sm:flex items-center gap-2 flex-wrap"
                >
                  <span>
                    Dir. <strong className="text-slate-200">{movie.director}</strong>
                  </span>
                  {movie.cast && movie.cast.length > 0 && (
                    <>
                      <span className="text-white/20">•</span>
                      <span className="line-clamp-1">
                        Starring:{" "}
                        <strong className="text-slate-200">
                          {movie.cast.slice(0, 3).join(", ")}
                        </strong>
                      </span>
                    </>
                  )}
                  <span className="text-white/20">•</span>
                  <span className="text-rose-400 flex items-center gap-1 font-bold">
                    <Sparkles size={11} /> NOW PLAYING
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
