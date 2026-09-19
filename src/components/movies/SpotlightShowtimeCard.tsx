"use client";

import { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Showtime } from "@/data/showtimes";
import { formatCurrency } from "@/lib/utils";
import { soundFx } from "@/lib/soundFx";
import { CheckCircle2, Sparkles, Zap } from "lucide-react";

interface SpotlightShowtimeCardProps {
  showtime: Showtime;
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * SpotlightShowtimeCard - 21st.dev & Magic UI inspired spotlight card.
 * Features mouse-tracking radial spotlight border, Rajdhani typography,
 * 3-tier dynamic occupancy indicator, and smooth spring physics.
 */
export function SpotlightShowtimeCard({
  showtime,
  isSelected,
  onSelect,
}: SpotlightShowtimeCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const occupancyRatio =
    (showtime.totalSeats - showtime.availableSeats) / showtime.totalSeats;
  const occupancyPct = Math.round(occupancyRatio * 100);

  // 3-tier dynamic seat status indicator
  let statusBadge = {
    label: "Plenty of Seats",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    dotColor: "bg-emerald-400",
    barColor: "bg-gradient-to-r from-emerald-500 to-teal-400",
  };

  if (showtime.availableSeats <= 15) {
    statusBadge = {
      label: "Few Seats Left",
      color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
      dotColor: "bg-rose-500 animate-pulse",
      barColor: "bg-gradient-to-r from-rose-500 to-red-600",
    };
  } else if (occupancyPct >= 60) {
    statusBadge = {
      label: "Filling Fast",
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      dotColor: "bg-amber-400",
      barColor: "bg-gradient-to-r from-amber-500 to-orange-400",
    };
  }

  // Color code studio types
  const studioBadgeStyle =
    showtime.studioType === "IMAX"
      ? "border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10"
      : showtime.studioType === "Premiere"
      ? "border-neon-magenta/50 text-neon-magenta bg-neon-magenta/10"
      : showtime.studioType === "4DX"
      ? "border-neon-yellow/50 text-neon-yellow bg-neon-yellow/10"
      : "border-white/20 text-gray-300 bg-white/5";

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onClick={() => {
        soundFx.playSelect(true);
        onSelect();
      }}
      onMouseEnter={() => soundFx.playHover()}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={`group relative rounded-2xl p-[1px] cursor-pointer transition-all duration-300 select-none ${
        isSelected
          ? "shadow-[0_0_35px_rgba(255,0,51,0.5)] ring-1 ring-neon-red"
          : "hover:shadow-[0_12px_35px_rgba(0,0,0,0.7)]"
      }`}
    >
      {/* 21st.dev Mouse-Tracking Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              280px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 0, 51, 0.35),
              transparent 75%
            )
          `,
        }}
      />

      {/* Main Glassmorphic Card Container */}
      <div
        className={`relative h-full rounded-2xl p-5 backdrop-blur-xl border transition-colors duration-200 flex flex-col justify-between ${
          isSelected
            ? "bg-dark-card/95 border-neon-red/70 bg-gradient-to-b from-neon-red/15 to-transparent"
            : "bg-dark-card/80 border-white/10 group-hover:border-white/25"
        }`}
      >
        {/* Header: Showtime Hour & Studio Pill */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl sm:text-4xl font-[family-name:var(--font-rajdhani)] font-bold tracking-tight text-white group-hover:text-neon-red transition-colors">
              {showtime.time}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-[family-name:var(--font-space-grotesk)] font-bold uppercase tracking-wider border ${studioBadgeStyle}`}
            >
              {showtime.studioType}
            </span>
          </div>

          <div className="text-xs font-[family-name:var(--font-geist-mono)] text-neon-cyan font-bold tracking-wide mb-4">
            {formatCurrency(showtime.price)}
          </div>
        </div>

        {/* Seat Availability & Micro Progress Bar */}
        <div className="space-y-2 pt-3 border-t border-white/[0.08]">
          <div className="flex items-center justify-between text-[11px] font-[family-name:var(--font-plus-jakarta)]">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${statusBadge.color}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${statusBadge.dotColor}`}
              />
              {statusBadge.label}
            </span>
            <span className="text-xs font-[family-name:var(--font-geist-mono)] text-gray-400">
              <strong className="text-white">{showtime.availableSeats}</strong> left
            </span>
          </div>

          {/* Micro Progress Bar (3px) */}
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${occupancyPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full ${statusBadge.barColor}`}
            />
          </div>
        </div>

        {/* Active Selection Pill Badge */}
        {isSelected && (
          <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-neon-red text-white text-[9px] font-[family-name:var(--font-space-grotesk)] font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_12px_#ff0033] animate-fade-in">
            <CheckCircle2 size={11} />
            ACTIVE SESSION
          </div>
        )}
      </div>
    </motion.div>
  );
}
