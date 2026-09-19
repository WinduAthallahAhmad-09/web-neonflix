"use client";

import { useState } from "react";
import Image from "next/image";
import { getComingSoon } from "@/data/movies";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { soundFx } from "@/lib/soundFx";
import { Bell, Check, Sparkles } from "lucide-react";

export function ComingSoonSection() {
  const comingSoonMovies = getComingSoon();
  const [notified, setNotified] = useState<Record<string, boolean>>({});

  const handleNotify = (id: string) => {
    soundFx.playSuccess();
    setNotified((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
      {/* Clean Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-neon-magenta font-mono text-xs font-semibold tracking-widest uppercase mb-2">
            <Sparkles size={14} className="animate-pulse" />
            INCOMING HOLO-TRANSMISSIONS // NEXT CYCLE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight">
            COMING SOON
          </h2>
        </div>
      </div>

      {/* Grid of Clean Rounded Coming Soon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {comingSoonMovies.map((movie) => {
          const isNotified = notified[movie.id];
          return (
            <div
              key={movie.id}
              className="rounded-2xl bg-dark-card/80 border border-white/10 hover:border-neon-magenta/60 transition-all duration-300 p-5 flex flex-col justify-between relative group shadow-lg backdrop-blur-md hover:-translate-y-1.5"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex gap-1.5 mb-2">
                    {movie.genre.slice(0, 2).map((g) => (
                      <span
                        key={g}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-neon-magenta/10 border border-neon-magenta/30 text-neon-magenta"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-lg text-white group-hover:text-neon-magenta transition-colors">
                    {movie.title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-gray-300 text-[11px] font-mono">
                  {movie.ageRating}
                </span>
              </div>

              {/* Backdrop View with Rounded Corners */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 border border-white/10">
                <Image
                  src={movie.backdropUrl}
                  alt={movie.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-90" />
                <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-neon-magenta/50 text-[10px] font-mono text-neon-magenta font-semibold">
                  RELEASE: {movie.releaseDate}
                </div>
              </div>

              {/* Countdown & Action */}
              <div className="space-y-3.5 mt-auto pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>DEPLOYMENT IN:</span>
                  <CountdownTimer targetDate={movie.releaseDate} />
                </div>

                {/* Rounded Pill Notify Button */}
                <button
                  onClick={() => handleNotify(movie.id)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`w-full py-2.5 px-4 text-xs font-[family-name:var(--font-orbitron)] font-bold rounded-full flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    isNotified
                      ? "bg-neon-green/20 border-neon-green text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                      : "bg-white/5 hover:bg-neon-magenta/20 border-white/10 hover:border-neon-magenta text-gray-200 hover:text-white"
                  }`}
                >
                  {isNotified ? (
                    <>
                      <Check size={14} /> ALERT REGISTERED
                    </>
                  ) : (
                    <>
                      <Bell size={14} /> NOTIFY ON DEPLOY
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
