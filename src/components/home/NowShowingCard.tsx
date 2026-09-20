"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Movie } from "@/data/movies";
import { soundFx } from "@/lib/soundFx";
import { Star, Clock, Ticket, ChevronRight } from "lucide-react";

interface NowShowingCardProps {
  movie: Movie;
}

/**
 * Widescreen Cinema Showcase Card
 * Exactly matches the user's reference layout:
 * - High-definition full-width cinematic backdrop
 * - Top badges: Ratings, Age Rating, IMAX & Dolby Audio specs
 * - Bottom details: Genre pills, duration, Title (Orbitron), Tagline, full synopsis,
 *   direct TIMES & TICKETS CTA, and Director/Cast credits.
 */
export function NowShowingCard({ movie }: NowShowingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => soundFx.playHover()}
      className="group relative h-[460px] sm:h-[500px] lg:h-[520px] w-full rounded-3xl overflow-hidden cursor-pointer select-none border border-white/10 hover:border-neon-red transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(255,0,51,0.28)] hover:ring-1 hover:ring-neon-red/50"
    >
      {/* ── Background Visual: Cinematic Backdrop ── */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          fill
          unoptimized
          className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Multi-layer Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent max-w-4xl" />
      </div>

      {/* ── Card Content Container ── */}
      <div className="relative z-10 h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
        {/* Top Bar: Ratings, Age, Studio & Audio Specs */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Rating Badge */}
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neon-yellow/40 text-neon-yellow text-xs font-bold font-mono shadow-md">
              <Star size={13} className="fill-neon-yellow" />
              {movie.rating.toFixed(1)} / 10
            </span>

            {/* Age Rating */}
            <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-gray-200 text-xs font-mono">
              {movie.ageRating}
            </span>
          </div>

          {/* Studio & Audio Spec Badges */}
          <div className="flex items-center gap-2">
            {movie.visualSpecs?.[0] && (
              <span className="px-3 py-1 rounded-full bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan text-[10px] font-mono font-bold tracking-wider uppercase hidden sm:inline shadow-sm">
                {movie.visualSpecs[0]}
              </span>
            )}
            {movie.audioSpecs?.[0] && (
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-[10px] font-mono font-bold tracking-wider uppercase hidden md:inline shadow-sm">
                {movie.audioSpecs[0]}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Area: Details & CTA */}
        <div className="flex flex-col gap-3 max-w-2xl">
          {/* Genre Pills & Duration */}
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

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-neon-red font-mono font-semibold tracking-wide">
            {movie.tagline}
          </p>

          {/* Synopsis */}
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed drop-shadow-sm">
            {movie.synopsis}
          </p>

          {/* Action Button & Credits */}
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

            <div className="text-[11px] font-mono text-gray-400 hidden sm:flex items-center gap-2">
              <span>
                Dir. <strong className="text-gray-200">{movie.director}</strong>
              </span>
              {movie.cast && movie.cast.length > 0 && (
                <>
                  <span className="text-white/20">•</span>
                  <span className="line-clamp-1">
                    Starring: <strong className="text-gray-200">{movie.cast.slice(0, 3).join(", ")}</strong>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
