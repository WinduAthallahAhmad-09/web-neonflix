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
            ? "w-full border-neon-red shadow-[0_15px_45px_rgba(255,0,51,0.32)] ring-1 ring-neon-red/50 z-20"
            : isAnyHovered
            ? "w-full md:w-3/4 lg:w-3/4 border-white/10 opacity-70 hover:opacity-100 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10"
            : "w-full md:w-3/4 lg:w-3/4 border-white/10 hover:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10"
        }`}
        style={{
          transition:
            "width 850ms cubic-bezier(0.16, 1, 0.3, 1), border-color 500ms ease, box-shadow 500ms ease, opacity 400ms ease",
        }}
      >
        {/* Background Visual */}
        <div className="absolute inset-0 z-0 bg-black">
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
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-black/60 to-black/30" />
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isHovered
                ? "bg-gradient-to-r from-black/95 via-black/60 to-transparent"
                : "bg-gradient-to-r from-black/95 via-black/75 to-black/40"
            }`}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neon-yellow/40 text-neon-yellow text-xs font-bold font-mono shadow-md">
                <Star size={13} className="fill-neon-yellow" />
                {movie.rating.toFixed(1)} / 10
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-gray-200 text-xs font-mono">
                {movie.ageRating}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {movie.visualSpecs?.[0] && (
                <span className="px-3 py-1 rounded-full bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan text-[10px] font-mono font-bold tracking-wider uppercase hidden sm:inline">
                  {movie.visualSpecs[0]}
                </span>
              )}

              {/* Expanded Audio Specs or Hover Teaser */}
              {isHovered ? (
                movie.audioSpecs?.[0] && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-[10px] font-mono font-bold tracking-wider uppercase hidden sm:inline"
                  >
                    {movie.audioSpecs[0]}
                  </motion.span>
                )
              ) : (
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-gray-400 text-[10px] font-mono tracking-wider group-hover:text-neon-red group-hover:border-neon-red/40 transition-colors">
                  <span>EXPAND</span>
                  <ChevronRight size={12} className="text-neon-red animate-pulse" />
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
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 border border-white/15 text-gray-300 backdrop-blur-sm"
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
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              {movie.title}
            </h3>

            {/* Tagline */}
            <p className="text-xs sm:text-sm text-neon-red font-mono font-semibold tracking-wide">
              {movie.tagline}
            </p>

            {/* Synopsis - Compact when normal, full and relaxed when expanded */}
            <AnimatePresence mode="wait">
              {isHovered ? (
                <motion.p
                  key="full-synopsis"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-xs sm:text-sm text-gray-200 line-clamp-3 sm:line-clamp-4 leading-relaxed"
                >
                  {movie.synopsis}
                </motion.p>
              ) : (
                <p
                  key="short-synopsis"
                  className="text-xs text-gray-400 line-clamp-2 leading-relaxed"
                >
                  {movie.synopsis}
                </p>
              )}
            </AnimatePresence>

            {/* Actions & Cast/Director Row */}
            <div className="flex items-center gap-4 pt-3 flex-wrap">
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

              {/* Rich Director & Cast credits appear smoothly when hovered */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-[11px] font-mono text-gray-400 hidden sm:flex items-center gap-2 flex-wrap"
                >
                  <span>
                    Dir. <strong className="text-gray-200">{movie.director}</strong>
                  </span>
                  {movie.cast && movie.cast.length > 0 && (
                    <>
                      <span className="text-white/20">•</span>
                      <span className="line-clamp-1">
                        Starring:{" "}
                        <strong className="text-gray-200">
                          {movie.cast.slice(0, 3).join(", ")}
                        </strong>
                      </span>
                    </>
                  )}
                  <span className="text-white/20">•</span>
                  <span className="text-neon-cyan flex items-center gap-1 font-bold">
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
