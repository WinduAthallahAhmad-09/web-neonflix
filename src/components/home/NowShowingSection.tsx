"use client";

import { useState } from "react";
import { getNowShowing, Movie } from "@/data/movies";
import { MovieCard } from "./MovieCard";
import { GlitchText } from "@/components/ui/GlitchText";
import { soundFx } from "@/lib/soundFx";
import { Grid, Flame, Filter } from "lucide-react";

export function NowShowingSection() {
  const allMovies = getNowShowing();
  const [selectedGenre, setSelectedGenre] = useState<string>("ALL");

  const genres = ["ALL", "Sci-Fi", "Action", "Thriller", "Adventure"];

  const filteredMovies =
    selectedGenre === "ALL"
      ? allMovies
      : allMovies.filter((m) => m.genre.includes(selectedGenre));

  const handleFilter = (g: string) => {
    soundFx.playClick();
    setSelectedGenre(g);
  };

  return (
    <section id="now-showing" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
      {/* Tactical Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-dark-border gap-4">
        <div>
          <div className="flex items-center gap-2 text-neon-red font-mono text-xs font-bold tracking-widest uppercase mb-1">
            <Flame size={14} className="animate-pulse" />
            CURRENT SIMULATION FEED // JAKARTA
          </div>
          <GlitchText
            text="NOW SHOWING"
            as="h2"
            intensity="low"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider drop-shadow-[0_0_15px_#ff0033]"
          />
        </div>

        {/* Filter Terminals */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
            <Filter size={12} /> FILTER:
          </span>
          {genres.map((g) => {
            const isSelected = selectedGenre === g;
            return (
              <button
                key={g}
                onClick={() => handleFilter(g)}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? "bg-neon-red/20 border-neon-red text-white shadow-[0_0_10px_rgba(255,0,51,0.5)] font-bold"
                    : "bg-dark-card border-dark-border text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Simulation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
