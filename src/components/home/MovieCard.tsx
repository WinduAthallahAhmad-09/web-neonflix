"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Movie } from "@/data/movies";
import { soundFx } from "@/lib/soundFx";
import { Star, Clock, ArrowRight, Play } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="group relative"
    >
      <Link
        href={`/movies/${movie.id}`}
        onClick={() => soundFx.playClick()}
        onMouseEnter={() => soundFx.playHover()}
        className="block"
      >
        {/* Modern Clean Card with Smooth Rounded Corners */}
        <div className="relative rounded-2xl bg-dark-card/80 border border-white/10 overflow-hidden backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:border-neon-red/60 hover:shadow-[0_15px_40px_rgba(255,0,51,0.25)] flex flex-col">
          
          {/* Poster Container with Rounded Geometry */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-dark-surface/60">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            
            {/* Elegant Soft Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

            {/* Top Floating Pill Badges (Rounded Full) */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
              {/* Rating Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-neon-yellow/30 text-neon-yellow text-xs font-bold shadow-lg">
                <Star size={12} className="fill-neon-yellow" />
                <span>{movie.rating}</span>
              </div>

              {/* Age Rating Pill */}
              <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-gray-200 text-[11px] font-mono font-medium shadow-lg">
                {movie.ageRating}
              </div>
            </div>

            {/* Quick Play Hover Indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-neon-red/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,0,51,0.8)] scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play size={20} className="fill-white ml-0.5" />
              </div>
            </div>
          </div>

          {/* Clean Info Body */}
          <div className="p-4 flex flex-col gap-2.5 flex-1 justify-between">
            {/* Genre Pills */}
            <div className="flex flex-wrap gap-1.5">
              {movie.genre.slice(0, 2).map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Movie Title */}
            <div>
              <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-base text-white tracking-wide group-hover:text-neon-red transition-colors duration-200 line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-400 font-sans line-clamp-1 mt-0.5">
                {movie.tagline}
              </p>
            </div>

            {/* Bottom Meta & Booking Pill Button */}
            <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-1">
              <span className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                <Clock size={13} className="text-neon-cyan" />
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
              </span>

              {/* Book Ticket Pill Button */}
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider font-[family-name:var(--font-orbitron)] bg-neon-red/20 border border-neon-red/50 text-white group-hover:bg-neon-red group-hover:shadow-[0_0_15px_rgba(255,0,51,0.6)] transition-all duration-200 flex items-center gap-1">
                BOOK <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}
