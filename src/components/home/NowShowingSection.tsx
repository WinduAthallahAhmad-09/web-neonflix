"use client";

import { useState, useMemo } from "react";
import { getNowShowing, Movie } from "@/data/movies";
import { NowShowingPairRow } from "./NowShowingPairRow";
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

  // Chunk movies into pairs of 2 (initially 50% / 50% half-width each, expands sideways on hover)
  const moviePairs = useMemo(() => {
    const pairs: Movie[][] = [];
    for (let i = 0; i < filteredMovies.length; i += 2) {
      pairs.push(filteredMovies.slice(i, i + 2));
    }
    return pairs;
  }, [filteredMovies]);

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

        {/* Cyberpunk Sliding Pill Tabs */}
        <SlidingTabs
          tabs={GENRE_TABS}
          activeId={selectedGenre}
          onChange={setSelectedGenre}
          size="sm"
        />
      </div>

      {/* Paired Half-Width Cards (Smoothly Expands Sideways on Hover) */}
      <div className="space-y-6 sm:space-y-8">
        {moviePairs.map((pair) => (
          <NowShowingPairRow
            key={pair.map((m) => m.id).join("-")}
            movies={pair}
          />
        ))}
      </div>
    </section>
  );
}
