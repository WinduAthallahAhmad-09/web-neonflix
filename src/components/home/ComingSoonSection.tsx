"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getComingSoon } from "@/data/movies";
import { Sparkles, Calendar } from "lucide-react";

/**
 * ComingSoonSection - Clean, minimalist cinema poster gallery.
 * Removed all clutter (countdown timer, synopsis accordion, teaser & reminder buttons)
 * per user request, showcasing solely the high-resolution movie posters.
 */
export function ComingSoonSection() {
  const comingSoonMovies = getComingSoon();

  return (
    <section id="coming-soon" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
      {/* Clean & Sleek Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-neon-red font-mono text-xs font-semibold tracking-widest uppercase mb-2">
            <Sparkles size={14} className="animate-pulse text-neon-red" />
            IN THEATERS // NEXT CYCLE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight">
            COMING SOON
          </h2>
        </div>

        <p className="text-xs sm:text-sm font-mono text-gray-400">
          OFFICIAL TEASER POSTERS
        </p>
      </div>

      {/* Pure Poster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {comingSoonMovies.map((movie) => {
          const releaseDateObj = new Date(movie.releaseDate);
          const releaseMonth = releaseDateObj.toLocaleDateString("en-US", {
            month: "short",
          });
          const releaseYear = releaseDateObj.getFullYear();

          return (
            <motion.div
              key={movie.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group flex flex-col cursor-pointer select-none"
            >
              {/* Poster Card */}
              <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-neon-red/60 group-hover:shadow-[0_15px_40px_rgba(255,0,51,0.25)] transition-all duration-500">
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Floating Release Date Pill */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold tracking-wider text-white flex items-center gap-1.5 shadow-lg">
                  <Calendar size={12} className="text-neon-red" />
                  <span>{releaseMonth} {releaseYear}</span>
                </div>

                {/* Age Rating Pill */}
                <div className="absolute bottom-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-gray-300">
                  {movie.ageRating}
                </div>
              </div>

              {/* Movie Title & Genre */}
              <div className="mt-4 px-1">
                <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-base sm:text-lg text-white group-hover:text-neon-red transition-colors line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-xs font-mono text-gray-400 mt-1">
                  {movie.genre.slice(0, 2).join(" • ")}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
