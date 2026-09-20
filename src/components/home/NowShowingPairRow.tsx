"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "@/data/movies";
import { soundFx } from "@/lib/soundFx";
import { Star, Clock, Ticket, ChevronRight } from "lucide-react";

interface NowShowingPairRowProps {
  movies: Movie[];
}

/**
 * NowShowingPairRow:
 * - Initially: Each movie card is half-width (50% width), showing rich movie info side-by-side.
 * - On Hover: The hovered card smoothly expands sideways (melebar ke samping) to ~80% width,
 *   revealing full widescreen backdrop, complete synopsis, specs, and director/cast credits.
 * - The adjacent card narrows into a sleek teaser strip.
 * - On Mouse Leave: Both smoothly glide back to 50% / 50% half-width!
 */
export function NowShowingPairRow({ movies }: NowShowingPairRowProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Single card in row (e.g. 5th movie)
  if (movies.length === 1) {
    const movie = movies[0];
    const isHovered = hoveredId === movie.id;

    return (
      <div className="w-full flex justify-center">
        <div
          onMouseEnter={() => {
            soundFx.playHover();
            setHoveredId(movie.id);
          }}
          onMouseLeave={() => setHoveredId(null)}
          className={`relative h-[460px] sm:h-[490px] rounded-3xl overflow-hidden cursor-pointer select-none border transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            isHovered
              ? "w-full border-neon-red shadow-[0_15px_40px_rgba(255,0,51,0.28)] ring-1 ring-neon-red/50"
              : "w-full md:w-1/2 border-white/10 hover:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          }`}
          style={{
            transition:
              "width 800ms cubic-bezier(0.16, 1, 0.3, 1), border-color 500ms ease, box-shadow 500ms ease",
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
                transition:
                  "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent max-w-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
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
                {isHovered && movie.audioSpecs?.[0] && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-[10px] font-mono font-bold tracking-wider uppercase hidden md:inline">
                    {movie.audioSpecs[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Content */}
            <div className="flex flex-col gap-2.5 max-w-2xl">
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

              <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                {movie.title}
              </h3>

              <p className="text-xs sm:text-sm text-neon-red font-mono font-semibold tracking-wide">
                {movie.tagline}
              </p>

              {isHovered && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                  className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed"
                >
                  {movie.synopsis}
                </motion.p>
              )}

              <div className="flex items-center gap-4 pt-2 flex-wrap">
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

                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] font-mono text-gray-400 hidden sm:flex items-center gap-2"
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
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pair of 2 movies in a row
  return (
    <div
      onMouseLeave={() => setHoveredId(null)}
      className="flex flex-col md:flex-row h-auto md:h-[470px] lg:h-[490px] w-full gap-5 items-stretch relative"
    >
      {movies.map((movie) => {
        const isHovered = hoveredId === movie.id;
        const isSiblingHovered = hoveredId !== null && !isHovered;

        return (
          <div
            key={movie.id}
            onMouseEnter={() => {
              soundFx.playHover();
              setHoveredId(movie.id);
            }}
            onClick={() => {
              soundFx.playClick();
              setHoveredId(movie.id);
            }}
            className={`relative rounded-3xl overflow-hidden cursor-pointer select-none border transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
              isHovered
                ? "flex-[3.5] lg:flex-[3.8] border-neon-red shadow-[0_15px_40px_rgba(255,0,51,0.28)] ring-1 ring-neon-red/50 z-20"
                : isSiblingHovered
                ? "flex-1 border-white/10 filter brightness-75 hover:brightness-100 z-10"
                : "flex-1 border-white/10 hover:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10"
            }`}
            style={{
              transition:
                "flex 850ms cubic-bezier(0.16, 1, 0.3, 1), border-color 500ms ease, box-shadow 500ms ease, filter 500ms ease",
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
                  transition:
                    "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-black/60 to-black/30" />
              <div
                className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent transition-opacity duration-700 ${
                  isSiblingHovered ? "opacity-90" : "opacity-100"
                }`}
              />
            </div>

            {/* ── EXPANDED OR EQUAL 50% HALF-WIDTH VIEW ── */}
            {!isSiblingHovered && (
              <div className="relative z-10 h-full p-6 sm:p-7 lg:p-8 flex flex-col justify-between">
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
                    {isHovered && movie.audioSpecs?.[0] && (
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-[10px] font-mono font-bold tracking-wider uppercase hidden lg:inline">
                        {movie.audioSpecs[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="flex flex-col gap-2.5 max-w-xl">
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

                  <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                    {movie.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neon-red font-mono font-semibold tracking-wide">
                    {movie.tagline}
                  </p>

                  {/* Synopsis expands when hovered */}
                  <AnimatePresence>
                    {isHovered ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45 }}
                        className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed"
                      >
                        {movie.synopsis}
                      </motion.p>
                    ) : (
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed hidden sm:block">
                        {movie.synopsis}
                      </p>
                    )}
                  </AnimatePresence>

                  {/* Action & Credits */}
                  <div className="flex items-center gap-4 pt-2 flex-wrap">
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

                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[11px] font-mono text-gray-400 hidden lg:flex items-center gap-2"
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
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── NARROWED TEASER STRIP (When Sibling Card is Hovered) ── */}
            {isSiblingHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 h-full p-4 flex flex-col justify-between items-center"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-neon-yellow text-xs font-bold font-mono">
                  {movie.rating.toFixed(1)}
                </div>

                <div className="flex flex-col items-center gap-2 py-4">
                  <span className="font-[family-name:var(--font-orbitron)] text-xs font-bold text-gray-300 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 line-clamp-1 max-h-[220px]">
                    {movie.title}
                  </span>
                </div>

                <div className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-gray-400 border border-white/10">
                  {movie.ageRating}
                </div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
