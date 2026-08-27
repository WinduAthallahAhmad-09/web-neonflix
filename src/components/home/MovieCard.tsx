"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/data/movies";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { soundFx } from "@/lib/soundFx";
import { motion } from "framer-motion";
import { Star, Clock, ChevronRight, Zap } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="relative group"
    >
      <Link
        href={`/movies/${movie.id}`}
        onClick={() => soundFx.playClick()}
        onMouseEnter={() => soundFx.playHover()}
        className="block"
      >
        <div className="relative bg-dark-card border border-dark-border group-hover:border-neon-red/80 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_25px_rgba(255,0,51,0.3)]">
          {/* Top Cartridge Header Strip */}
          <div className="px-3 py-1.5 bg-dark-surface/90 border-b border-dark-border flex justify-between items-center text-[9px] font-mono text-gray-400 group-hover:text-neon-cyan transition-colors">
            <span className="flex items-center gap-1 font-bold">
              <Zap size={10} className="text-neon-red" />
              SIM_CHIP #{movie.id.slice(0, 4).toUpperCase()}
            </span>
            <span className="text-neon-yellow font-bold">★ {movie.rating}</span>
          </div>

          {/* Poster Image with Tactical HUD Elements */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-95 group-hover:brightness-105"
            />
            {/* Holographic Gradient on Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-90" />

            {/* Age Rating Badge Top Right */}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 border border-white/20 text-[9px] font-mono text-white">
              {movie.ageRating}
            </div>

            {/* Tactical Status Overlay on Hover */}
            <div className="absolute inset-0 bg-neon-red/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="px-3 py-1.5 bg-dark-bg/90 border border-neon-red text-neon-red text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-widest flex items-center gap-1">
                ACCESS <ChevronRight size={14} />
              </div>
            </div>
          </div>

          {/* Card Info Section */}
          <div className="p-4 space-y-2.5">
            <div className="flex flex-wrap gap-1">
              {movie.genre.slice(0, 2).map((g, idx) => (
                <NeonBadge
                  key={g}
                  variant={idx === 0 ? "red" : "cyan"}
                  className="text-[9px] px-1.5 py-0.2"
                >
                  {g}
                </NeonBadge>
              ))}
            </div>

            <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-base text-white tracking-wide group-hover:text-neon-red transition-colors line-clamp-1">
              {movie.title}
            </h3>

            <div className="flex justify-between items-center text-xs text-gray-400 font-mono pt-1 border-t border-dark-border/50">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-neon-magenta" />
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
              </span>
              <span className="text-neon-cyan font-bold text-[11px]">
                BOOK SHOW &gt;
              </span>
            </div>
          </div>

          {/* Corner Sci-Fi Bracket Highlights */}
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </Link>
    </motion.div>
  );
}
