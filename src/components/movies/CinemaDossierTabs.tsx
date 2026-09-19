"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "@/data/movies";
import { soundFx } from "@/lib/soundFx";
import {
  BookOpen,
  Users,
  Tv,
  Volume2,
  Calendar,
  Clock,
  User,
  Shield,
  Sparkles,
  Award,
} from "lucide-react";

interface CinemaDossierTabsProps {
  movie: Movie;
}

type TabType = "story" | "cast" | "specs";

export function CinemaDossierTabs({ movie }: CinemaDossierTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("story");

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "story", label: "STORY & INTEL", icon: BookOpen },
    { id: "cast", label: `CAST & CREW (${movie.cast.length})`, icon: Users },
    { id: "specs", label: "CINEMA SPECS", icon: Tv },
  ];

  return (
    <div className="w-full max-w-3xl bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col gap-4">
      {/* ── Sliding Navigation Pill Bar ── */}
      <div className="flex items-center gap-2 p-1 bg-black/70 rounded-full border border-white/10 overflow-x-auto no-scrollbar max-w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab(tab.id);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`relative px-4 py-2 rounded-full text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-wider uppercase transition-colors cursor-pointer select-none flex items-center gap-2 whitespace-nowrap ${
                isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {/* Active Sliding Red Pill */}
              {isActive && (
                <motion.div
                  layoutId="dossier-active-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-neon-red to-red-600 shadow-[0_0_20px_#ff0033,inset_0_1px_2px_rgba(255,255,255,0.4)] border border-red-400/50 z-0"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-1.5">
                <Icon size={14} className={isActive ? "text-white" : "text-neon-red"} />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Dynamic Animated Content Area ── */}
      <div className="min-h-[160px] relative">
        <AnimatePresence mode="wait">
          {/* 1. STORY & INTEL TAB */}
          {activeTab === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                {movie.synopsis}
              </p>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  <User size={13} className="text-neon-cyan" />
                  <span className="text-gray-400">DIRECTOR:</span>
                  <strong className="text-white">{movie.director}</strong>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  <Calendar size={13} className="text-neon-magenta" />
                  <span className="text-gray-400">RELEASE:</span>
                  <strong className="text-white">{movie.releaseDate}</strong>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  <Clock size={13} className="text-neon-yellow" />
                  <span className="text-gray-400">DURATION:</span>
                  <strong className="text-white">
                    {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                  </strong>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. CAST & CREW TAB (Zero truncation!) */}
          {activeTab === "cast" && (
            <motion.div
              key="cast"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              <div className="text-xs font-mono text-gray-400 flex items-center justify-between">
                <span>OPERATIVE ENSEMBLE // COMPLETE ROSTER</span>
                <span className="text-neon-cyan font-bold">{movie.cast.length} ACTORS</span>
              </div>

              {/* Interactive Cast Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {movie.cast.map((actor, idx) => (
                  <div
                    key={actor}
                    onMouseEnter={() => soundFx.playHover()}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    {/* Actor Avatar Circle */}
                    <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 group-hover:border-neon-cyan flex items-center justify-center text-xs font-bold font-mono text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                      {actor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white group-hover:text-neon-cyan transition-colors truncate">
                        {actor}
                      </div>
                      <div className="text-[10px] font-mono text-gray-400">
                        {idx === 0 ? "Lead Operative" : "Featured Role"}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Director Card */}
                <div className="p-3 rounded-xl bg-neon-red/10 border border-neon-red/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/60 border border-neon-red flex items-center justify-center text-neon-red flex-shrink-0">
                    <User size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">
                      {movie.director}
                    </div>
                    <div className="text-[10px] font-mono text-neon-red font-bold uppercase">
                      Director // Architect
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. CINEMA SPECS TAB */}
          {activeTab === "specs" && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Visual Projection Specs */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-neon-cyan">
                    <Tv size={16} />
                    <span>VISUAL SPECIFICATION</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(movie.visualSpecs || ["IMAX 3D 4K", "DOLBY VISION", "120FPS"]).map((v) => (
                      <span
                        key={v}
                        className="px-3 py-1 rounded-lg bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan text-xs font-mono font-bold"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-gray-400 mt-1">
                    Dual 4K Laser Projection • 1.90:1 Expanded Cinema Ratio
                  </p>
                </div>

                {/* Audio Surround Specs */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-neon-magenta">
                    <div className="flex items-center gap-2">
                      <Volume2 size={16} />
                      <span>AUDIO IMMERSION</span>
                    </div>
                    {/* Live Equalizer Pulse */}
                    <div className="flex items-center gap-0.5 h-3">
                      {[40, 90, 60, 100, 70, 85].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="w-1 bg-neon-magenta rounded-full animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(movie.audioSpecs || ["DOLBY ATMOS 7.1.4", "DTS:X"]).map((a) => (
                      <span
                        key={a}
                        className="px-3 py-1 rounded-lg bg-neon-magenta/15 border border-neon-magenta/40 text-neon-magenta text-xs font-mono font-bold"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-gray-400 mt-1">
                    Spatial 3D Audio Array • 64-Channel Overhead Transducers
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
