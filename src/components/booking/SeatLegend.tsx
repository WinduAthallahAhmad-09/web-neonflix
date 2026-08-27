"use client";

import { Zap, Shield, Check, Lock } from "lucide-react";

export function SeatLegend() {
  const items = [
    { label: "AVAILABLE POD", color: "bg-dark-surface border-dark-border text-gray-400" },
    { label: "SELECTED POD", color: "bg-neon-red border-neon-red text-white shadow-[0_0_10px_#ff0033]" },
    { label: "VIP COCKPIT", color: "bg-dark-card border-neon-yellow text-neon-yellow shadow-[0_0_10px_#f5ff00]" },
    { label: "OCCUPIED / OFFLINE", color: "bg-dark-surface/40 border-dark-border text-gray-700" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-6 p-3 bg-dark-card/60 border border-dark-border/60 max-w-2xl mx-auto">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-t-sm flex items-center justify-center text-[9px] font-mono border ${item.color}`} />
          <span className="text-[10px] font-mono text-gray-400 tracking-wider">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
