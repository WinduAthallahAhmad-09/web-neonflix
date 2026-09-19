"use client";

import { useRef } from "react";
import { NumberTicker } from "@/components/effects/NumberTicker";
import { Film, Users, MapPin, Star } from "lucide-react";

const STATS = [
  { icon: Film, label: "FILMS ON AIR", value: 5, suffix: "+", color: "text-neon-red" },
  { icon: Users, label: "ACTIVE OPERATORS", value: 82400, suffix: "+", color: "text-neon-cyan" },
  { icon: MapPin, label: "JAKARTA SECTORS", value: 3, suffix: "", color: "text-neon-magenta" },
  { icon: Star, label: "AVG RATING", value: 9, suffix: ".2/10", color: "text-neon-yellow" },
];

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="w-full border-y border-white/10 bg-black/40 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300 text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Icon size={18} className={stat.color} />
              </div>
              <div
                className={`font-[family-name:var(--font-orbitron)] font-black text-2xl sm:text-3xl ${stat.color} drop-shadow-[0_0_15px_currentColor]`}
              >
                <NumberTicker value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] font-mono text-gray-400 tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
