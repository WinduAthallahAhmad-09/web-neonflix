"use client";

import { useState } from "react";
import { getNowShowing, Movie } from "@/data/movies";
import { MovieCard } from "./MovieCard";
import { soundFx } from "@/lib/soundFx";
import { Flame, Sparkles } from "lucide-react";

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
    <section id="now-showing" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
      {/* Clean & Sleek Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-white/10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-neon-red font-mono text-xs font-semibold tracking-widest uppercase mb-2">
            <Flame size={14} className="animate-pulse text-neon-red" />
            JAKARTA THEATERS // LIVE SELECTION
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight">
            NOW SHOWING
          </h2>
        </div>

        {/* Clean Pill Filter Tabs (Rounded Full) */}
        <div className="flex items-center gap-2 flex-wrap">
          {genres.map((g) => {
            const isSelected = selectedGenre === g;
            return (
              <button
                key={g}
                onClick={() => handleFilter(g)}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 rounded-full cursor-pointer border ${
                  isSelected
                    ? "bg-neon-red border-neon-red text-white shadow-[0_0_15px_rgba(255,0,51,0.5)]"
                    : "bg-dark-card/80 border-white/10 text-gray-300 hover:border-white/30 hover:text-white hover:bg-white/5"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacious Grid of Clean Rounded Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 sm:gap-8">
        {filteredMovies.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} index={i} />
        ))}
      </div>
    </section>
  );
}
