"use client";

import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { User, Trophy, Ticket, Star, Shield, Zap, Terminal } from "lucide-react";
import { GlitchText } from "@/components/ui/GlitchText";
import XPProgressBar from "@/components/profile/XPProgressBar";
import AchievementGrid from "@/components/profile/AchievementGrid";
import BookingHistory from "@/components/profile/BookingHistory";
import { soundFx } from "@/lib/soundFx";

export default function ProfilePage() {
  const { name, username, level, totalBookings, xp } = useUserStore();
  const [activeTab, setActiveTab] = useState<"achievements" | "history">("achievements");

  const handleTab = (tab: "achievements" | "history") => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
      {/* Operator Header Dossier */}
      <div className="bg-dark-card border border-neon-magenta/50 p-6 sm:p-8 mb-8 shadow-[0_0_30px_rgba(0,0,0,0.9)] relative overflow-hidden">
        <div className="absolute top-0 right-0 px-4 py-1 bg-neon-magenta text-black font-mono text-[10px] font-bold tracking-widest">
          SECURITY_CLEARANCE: CLASS_5
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Pod */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-dark-surface border-2 border-neon-magenta flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,46,119,0.4)]">
              <User size={52} className="text-neon-magenta" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-neon-red text-white text-[10px] font-mono font-bold">
              LVL {level}
            </div>
          </div>

          {/* Operator Intel */}
          <div className="flex-grow text-center md:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <GlitchText
                text={name}
                as="h1"
                intensity="low"
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider"
              />
              <span className="text-xs font-mono text-neon-cyan bg-dark-surface px-2.5 py-0.5 border border-neon-cyan/40">
                {username}
              </span>
            </div>

            <p className="text-xs font-mono text-gray-400">
              OPERATOR ENLISTED: 2025-03-15 // CYBER-THEATER DIVISION // JAKARTA
            </p>

            {/* Quick Stat Blocks */}
            <div className="grid grid-cols-3 gap-3 pt-3 max-w-lg">
              <div className="p-2.5 bg-dark-surface border border-dark-border text-center">
                <div className="text-[10px] font-mono text-gray-400">SIMULATIONS</div>
                <div className="text-lg font-bold font-mono text-white">{totalBookings}</div>
              </div>
              <div className="p-2.5 bg-dark-surface border border-dark-border text-center">
                <div className="text-[10px] font-mono text-gray-400">CREDITS XP</div>
                <div className="text-lg font-bold font-mono text-neon-cyan">{xp} §</div>
              </div>
              <div className="p-2.5 bg-dark-surface border border-dark-border text-center">
                <div className="text-[10px] font-mono text-gray-400">TIER RANK</div>
                <div className="text-lg font-bold font-mono text-neon-yellow">LVL {level}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent XP Progression Bar */}
      <div className="mb-8">
        <XPProgressBar />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 border-b border-dark-border pb-2">
        <button
          onClick={() => handleTab("achievements")}
          onMouseEnter={() => soundFx.playHover()}
          className={`px-6 py-2.5 text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-wider transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
            activeTab === "achievements"
              ? "bg-neon-magenta/20 border-neon-magenta text-white shadow-[0_0_15px_rgba(255,46,119,0.4)]"
              : "bg-dark-card border-dark-border text-gray-400 hover:text-white"
          }`}
        >
          <Trophy size={14} className={activeTab === "achievements" ? "text-neon-magenta" : ""} />
          TACTICAL ACHIEVEMENTS
        </button>

        <button
          onClick={() => handleTab("history")}
          onMouseEnter={() => soundFx.playHover()}
          className={`px-6 py-2.5 text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-wider transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
            activeTab === "history"
              ? "bg-neon-cyan/20 border-neon-cyan text-white shadow-[0_0_15px_rgba(0,247,255,0.4)]"
              : "bg-dark-card border-dark-border text-gray-400 hover:text-white"
          }`}
        >
          <Ticket size={14} className={activeTab === "history" ? "text-neon-cyan" : ""} />
          MISSION BOOKING LOGS
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "achievements" ? <AchievementGrid /> : <BookingHistory />}
    </div>
  );
}
