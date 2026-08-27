"use client";

import { motion } from "framer-motion";
import { Movie } from "@/data/movies";
import { GlitchText } from "@/components/ui/GlitchText";
import { NeonBadge } from "@/components/ui/NeonBadge";

interface MovieHeroProps {
  movie: Movie;
}

export function MovieHero({ movie }: MovieHeroProps) {
  return (
    <div className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-12 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
        style={{ backgroundImage: `url(${movie.posterUrl || '/placeholder.jpg'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent z-0" />
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <NeonBadge variant="red">{movie.ageRating}</NeonBadge>
            {movie.genre.map((g) => (
              <NeonBadge key={g} variant="cyan">{g}</NeonBadge>
            ))}
            <NeonBadge variant="magenta">{movie.duration} MIN</NeonBadge>
            <NeonBadge variant="yellow">⭐ {movie.rating}/10</NeonBadge>
          </div>
          
          <GlitchText text={movie.title} as="h1" className="text-5xl md:text-7xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-4" />
          
          <div className="text-gray-300 mb-6 font-[family-name:var(--font-jetbrains)] flex flex-wrap gap-x-8 gap-y-2 text-sm md:text-base">
            <p><span className="text-neon-cyan">DIR:</span> {movie.director}</p>
            <p><span className="text-neon-cyan">CAST:</span> {movie.cast.join(", ")}</p>
          </div>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
            {movie.synopsis}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
