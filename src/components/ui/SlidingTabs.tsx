"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFx } from "@/lib/soundFx";
import { LucideIcon } from "lucide-react";

export interface SlidingTabOption {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: string | number;
}

interface SlidingTabsProps {
  tabs: SlidingTabOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  layoutIdPrefix?: string;
}

/**
 * CyberSlidingTabs - Sleek, futuristic sliding pill segmented button.
 * Inspired by modern UI patterns from 21st.dev & Hover.dev:
 * - Active pill glides smoothly between buttons using Framer Motion spring physics.
 * - Soft hover ghost pill tracks cursor interaction.
 * - Glowing specular neon border & shadow matching cyberpunk cinema aesthetic.
 */
export function SlidingTabs({
  tabs,
  activeId,
  onChange,
  className = "",
  size = "md",
  layoutIdPrefix = "sliding-tabs",
}: SlidingTabsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2 text-xs sm:text-sm gap-2",
    lg: "px-6 py-2.5 text-sm sm:text-base gap-2.5",
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <div
      onMouseLeave={() => setHoveredId(null)}
      className={`relative inline-flex items-center p-1 sm:p-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-neon-red/30 shadow-[0_0_25px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.12)] z-20 overflow-x-auto no-scrollbar max-w-full ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        const isHovered = tab.id === hoveredId;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => {
              soundFx.playClick();
              onChange(tab.id);
            }}
            onMouseEnter={() => {
              soundFx.playHover();
              setHoveredId(tab.id);
            }}
            className={`relative flex items-center justify-center rounded-full font-[family-name:var(--font-orbitron)] font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer select-none whitespace-nowrap ${
              sizeClasses[size]
            } ${
              isActive
                ? "text-white"
                : "text-gray-400 hover:text-gray-100"
            }`}
          >
            {/* 1. Ghost Hover Pill (Subtle translucent highlight that follows cursor) */}
            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.div
                  layoutId={`${layoutIdPrefix}-hover-pill`}
                  className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
            </AnimatePresence>

            {/* 2. Active Glowing Neon-Red Pill (Spring sliding physics) */}
            {isActive && (
              <motion.div
                layoutId={`${layoutIdPrefix}-active-pill`}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-neon-red to-red-600 shadow-[0_0_22px_#ff0033,inset_0_1px_2px_rgba(255,255,255,0.5)] border border-red-400/50 z-0"
                transition={{
                  type: "spring",
                  stiffness: 480,
                  damping: 34,
                }}
              />
            )}

            {/* 3. Button Label & Icon Content (Elevated above sliding pills) */}
            <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
              {Icon && (
                <Icon
                  size={iconSizes[size]}
                  className={
                    isActive
                      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      : "text-neon-red group-hover:text-white transition-colors"
                  }
                />
              )}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-normal ${
                    isActive
                      ? "bg-black/30 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
