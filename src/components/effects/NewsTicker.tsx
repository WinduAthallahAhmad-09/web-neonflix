"use client";

// Animated ticker / scrolling news bar - clean & refined
const TICKER_ITEMS = [
  "🎬 NOW SHOWING: SPIDER-MAN: BRAND NEW DAY",
  "⚡ AVENGERS: ASSEMBLE — IMAX DOLBY VISION",
  "🦇 BATMAN: THE DARK KNIGHT — RATING 9.8/10",
  "🤖 CYBERPUNK: EDGERUNNERS — R17+ EXCLUSIVE",
  "⚔️ THE ODYSSEY — MYTHIC EPIC IN 70MM LASER",
  "🎟️ BOOK NOW & EARN +100 XP OPERATOR POINTS",
  "🏆 PREMIERE SEATS AVAILABLE — KEMANG & PIK",
  "🍿 COMBO RATIONS STARTING IDR 75.000",
  "🌆 JAKARTA SECTOR // 3 THEATER LOCATIONS ONLINE",
];

export function NewsTicker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full bg-dark-card/60 border-y border-white/10 py-2.5 overflow-hidden relative backdrop-blur-md">
      {/* Left Gradient Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
      {/* Right Gradient Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

      {/* Clean Ticker Pill Label */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neon-red/20 border border-neon-red/50 text-[10px] font-[family-name:var(--font-orbitron)] font-bold text-white tracking-widest whitespace-nowrap shadow-[0_0_10px_rgba(255,0,51,0.4)]">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-ping" />
          LIVE
        </span>
      </div>

      <div className="ticker-wrap pl-28">
        <div className="ticker-inner">
          {repeated.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center text-xs font-mono text-gray-300 mr-12"
            >
              {item}
              <span className="mx-6 text-neon-red/60 text-[8px]">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
