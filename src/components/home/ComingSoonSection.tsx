"use client";

import { useState } from "react";
import Image from "next/image";
import { getComingSoon } from "@/data/movies";
import { GlitchText } from "@/components/ui/GlitchText";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { soundFx } from "@/lib/soundFx";
import { Bell, Check, Lock, Sparkles } from "lucide-react";

export function ComingSoonSection() {
  const comingSoonMovies = getComingSoon();
  const [notified, setNotified] = useState<Record<string, boolean>>({});

  const handleNotify = (id: string) => {
    soundFx.playSuccess();
    setNotified((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-dark-border">
        <div>
          <div className="flex items-center gap-2 text-neon-magenta font-mono text-xs font-bold tracking-widest uppercase mb-1">
            <Sparkles size={14} className="animate-pulse" />
            INCOMING HOLO-TRANSMISSIONS // NEXT CYCLE
          </div>
          <GlitchText
            text="COMING SOON"
            as="h2"
            intensity="low"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider drop-shadow-[0_0_15px_#ff2e77]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comingSoonMovies.map((movie) => {
          const isNotified = notified[movie.id];
          return (
            <div
              key={movie.id}
              className="bg-dark-card border border-dark-border hover:border-neon-magenta/60 transition-all p-4 flex flex-col justify-between relative group shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex gap-1 mb-1">
                    {movie.genre.slice(0, 2).map((g) => (
                      <NeonBadge key={g} variant="magenta" className="text-[9px]">
                        {g}
                      </NeonBadge>
                    ))}
                  </div>
                  <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-lg text-white group-hover:text-neon-magenta transition-colors">
                    {movie.title}
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-dark-surface border border-white/20 text-white text-[10px] font-mono">
                  {movie.ageRating}
                </span>
              </div>

              {/* Backdrop View */}
              <div className="relative aspect-video w-full overflow-hidden bg-black mb-4 border border-dark-border">
                <Image
                  src={movie.backdropUrl}
                  alt={movie.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-neon-magenta text-[9px] font-mono text-neon-magenta">
                  RELEASE: {movie.releaseDate}
                </div>
              </div>

              {/* Countdown & Action */}
              <div className="space-y-3 mt-auto pt-2 border-t border-dark-border/50">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>DEPLOYMENT IN:</span>
                  <CountdownTimer targetDate={movie.releaseDate} />
                </div>

                <button
                  onClick={() => handleNotify(movie.id)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`w-full py-2 px-3 text-xs font-[family-name:var(--font-orbitron)] font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    isNotified
                      ? "bg-neon-green/20 border-neon-green text-neon-green shadow-[0_0_12px_rgba(57,255,20,0.4)]"
                      : "bg-dark-surface hover:bg-neon-magenta/20 border-dark-border hover:border-neon-magenta text-gray-300 hover:text-white"
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
