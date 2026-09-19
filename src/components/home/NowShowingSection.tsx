"use client";

import { useState } from "react";
import { getNowShowing, Movie } from "@/data/movies";
import { MovieCard } from "./MovieCard";
import { SlidingTabs, SlidingTabOption } from "@/components/ui/SlidingTabs";
import { Flame, Film, Sparkles, Zap, Compass } from "lucide-react";

const GENRE_TABS: SlidingTabOption[] = [
  { id: "ALL", label: "ALL", icon: Film },
  { id: "Sci-Fi", label: "SCI-FI", icon: Sparkles },
  { id: "Action", label: "ACTION", icon: Flame },
  { id: "Thriller", label: "THRILLER", icon: Zap },
  { id: "Adventure", label: "ADVENTURE", icon: Compass },
];

export function NowShowingSection() {
  const allMovies = getNowShowing();
  const [selectedGenre, setSelectedGenre] = useState<string>("ALL");

  const filteredMovies =
    selectedGenre === "ALL"
      ? allMovies
      : allMovies.filter((m) => m.genre.includes(selectedGenre));

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

        {/* Cyberpunk Sliding Pill Tabs (Matches User Reference Image) */}
        <SlidingTabs
          tabs={GENRE_TABS}
          activeId={selectedGenre}
          onChange={setSelectedGenre}
          size="sm"
        />
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
