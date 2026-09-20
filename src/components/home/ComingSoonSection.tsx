"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { getComingSoon, Movie } from "@/data/movies";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { soundFx } from "@/lib/soundFx";
import { getYoutubeId } from "@/lib/utils";
import {
  Bell,
  Check,
  Play,
  Info,
  X,
  Sparkles,
  Film,
  Calendar,
  Clapperboard,
  Users,
  ChevronDown,
  Volume2,
} from "lucide-react";

// Per-movie distinct ambient theme colors matching foreign design standards (21st.dev / Magic UI)
const MOVIE_THEMES: Record<
  string,
  {
    spotlight: string;
    borderHover: string;
    badge: string;
    accent: string;
    glow: string;
  }
> = {
  "lotr-hunt-for-gollum": {
    spotlight: "rgba(245, 158, 11, 0.22)",
    borderHover: "hover:border-amber-500/60",
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    accent: "#f59e0b",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.2)]",
  },
  "godzilla-kong-supernova": {
    spotlight: "rgba(0, 247, 255, 0.22)",
    borderHover: "hover:border-neon-cyan/60",
    badge: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30",
    accent: "#00f7ff",
    glow: "shadow-[0_0_30px_rgba(0,247,255,0.2)]",
  },
  "spiderman-beyond-the-spider-verse": {
    spotlight: "rgba(255, 46, 119, 0.25)",
    borderHover: "hover:border-neon-magenta/60",
    badge: "text-neon-magenta bg-neon-magenta/10 border-neon-magenta/30",
    accent: "#ff2e77",
    glow: "shadow-[0_0_30px_rgba(255,46,119,0.25)]",
  },
};

const DEFAULT_THEME = {
  spotlight: "rgba(255, 0, 51, 0.2)",
  borderHover: "hover:border-neon-red/60",
  badge: "text-neon-red bg-neon-red/10 border-neon-red/30",
  accent: "#ff0033",
  glow: "shadow-[0_0_30px_rgba(255,0,51,0.2)]",
};

/**
 * 3D Spotlight Cinema Card - Inspired by 21st.dev & Aceternity UI
 */
function ComingSoonCard({
  movie,
  onOpenTrailer,
}: {
  movie: Movie;
  onOpenTrailer: (movie: Movie) => void;
}) {
  const [isNotified, setIsNotified] = useState(false);
  const [showIntel, setShowIntel] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const theme = MOVIE_THEMES[movie.id] || DEFAULT_THEME;

  // 3D Perspective Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 220,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 220,
    damping: 24,
  });

  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const handleToggleNotify = () => {
    soundFx.playSuccess();
    const newState = !isNotified;
    setIsNotified(newState);
    setToastMessage(
      newState
        ? `ALERT REGISTERED // PENGINGAT TIKET ${movie.title} TERCATAT!`
        : `NOTIFIKASI DIBATALKAN`
    );
    setTimeout(() => setToastMessage(null), 3200);
  };

  const formattedRelease = new Date(movie.releaseDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl bg-[#0c0c14]/90 border border-white/10 ${theme.borderHover} transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group backdrop-blur-2xl shadow-2xl overflow-hidden hover:-translate-y-1`}
    >
      {/* 21st.dev Cursor-Tracking Dynamic Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(380px circle at ${spotlightX}px ${spotlightY}px, ${theme.spotlight}, transparent 80%)`,
        }}
      />

      {/* Holographic Subtle Sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

      {/* Top Header: Screen Formats & Age Rating */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          {movie.visualSpecs?.slice(0, 2).map((fmt) => (
            <span
              key={fmt}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold bg-white/5 border border-white/10 text-gray-300"
            >
              {fmt}
            </span>
          ))}
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${theme.badge}`}
        >
          {movie.ageRating}
        </span>
      </div>

      {/* Main Visual Poster Stage (aspect-[3/4]) */}
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black mb-5 border border-white/10 group-hover:border-white/20 transition-all shadow-xl z-10">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          unoptimized
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-black/20 to-transparent" />

        {/* Floating Release Date Pill */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold tracking-wider text-white flex items-center gap-1.5 shadow-md">
          <Calendar size={12} style={{ color: theme.accent }} />
          <span>{formattedRelease}</span>
        </div>

        {/* Quick Teaser Play Trigger on Center Poster */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenTrailer(movie);
          }}
          className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all transform group-hover:scale-110 cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.8)] z-20 active:scale-95"
          title="Watch Teaser Trailer"
        >
          <Play size={20} className="fill-white translate-x-0.5" />
        </button>
      </div>

      {/* Title, Tagline & Genre */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {movie.genre.slice(0, 3).map((g) => (
            <span
              key={g}
              className="text-[10px] font-mono font-medium text-gray-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10"
            >
              {g}
            </span>
          ))}
        </div>

        <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight leading-snug mb-1.5 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-300 font-sans italic line-clamp-1">{movie.tagline}</p>
      </div>

      {/* Interactive Story & Cast Intel Drawer (Accordion to keep layout clean) */}
      <div className="relative z-10 mb-4">
        <button
          type="button"
          onClick={() => setShowIntel(!showIntel)}
          className="w-full py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Info size={13} style={{ color: theme.accent }} />
            <span>{showIntel ? "SEMBUNYIKAN INTEL" : "SINOPSIS & CAST INTEL"}</span>
          </span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${showIntel ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {showIntel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden mt-2 p-3.5 rounded-xl bg-black/80 border border-white/10 text-xs space-y-2.5 text-gray-300"
            >
              <p className="leading-relaxed text-gray-300 text-[11px]">{movie.synopsis}</p>
              <div className="pt-2 border-t border-white/10 flex flex-col gap-1 text-[10px] font-mono text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Clapperboard size={12} className="text-amber-400 shrink-0" />
                  <span>
                    Sutradara: <strong className="text-gray-200">{movie.director}</strong>
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Users size={12} className="text-neon-cyan shrink-0 mt-0.5" />
                  <span className="line-clamp-2">
                    Cast: <strong className="text-gray-200">{movie.cast.join(", ")}</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer: Precision Countdown & Action Buttons */}
      <div className="relative z-10 space-y-3.5 pt-4 border-t border-white/10 mt-auto">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
          <span className="tracking-wider text-[11px]">COUNTDOWN PREMIERE:</span>
          <div className="font-bold text-white tracking-widest">
            <CountdownTimer targetDate={movie.releaseDate} />
          </div>
        </div>

        {/* Dual Actions: Watch Teaser & Remind Me */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onOpenTrailer(movie);
            }}
            className="py-2.5 px-3 rounded-full text-xs font-[family-name:var(--font-orbitron)] font-bold flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/15 border border-white/15 text-gray-200 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <Play size={13} className="fill-white" /> TEASER
          </button>

          <button
            type="button"
            onClick={handleToggleNotify}
            className={`py-2.5 px-3 rounded-full text-xs font-[family-name:var(--font-orbitron)] font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer active:scale-95 ${
              isNotified
                ? "bg-neon-green/20 border-neon-green text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                : "bg-white/5 hover:bg-white/15 border-white/15 text-white"
            }`}
          >
            {isNotified ? (
              <>
                <Check size={14} /> TERDAFTAR
              </>
            ) : (
              <>
                <Bell size={14} /> INGATKAN
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating HUD Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 left-4 right-4 z-50 p-2.5 rounded-xl bg-black/95 border border-neon-green/60 text-neon-green text-[11px] font-mono text-center shadow-2xl backdrop-blur-md pointer-events-none"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Modern Coming Soon Master Section
 */
export function ComingSoonSection() {
  const comingSoonMovies = getComingSoon();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
      {/* Clean & Sleek Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-neon-magenta font-mono text-xs font-semibold tracking-widest uppercase mb-2">
            <Sparkles size={14} className="animate-pulse" />
            CINEMATIC PREVIEW MATRIX // NEXT CYCLE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight">
            COMING SOON
          </h2>
        </div>

        <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-md md:text-right">
          3 KARYA BLOCKBUSTER TERBESAR YANG PALING DINANTIKAN DI BIOSKOP
        </p>
      </div>

      {/* Modern 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {comingSoonMovies.map((movie) => (
          <ComingSoonCard
            key={movie.id}
            movie={movie}
            onOpenTrailer={(m) => setSelectedMovie(m)}
          />
        ))}
      </div>

      {/* Interactive 16:9 Teaser Video Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMovie(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl bg-[#0c0c14] border border-white/20 p-4 sm:p-6 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-mono text-xs sm:text-sm font-bold">
                  <Film size={16} className="text-neon-cyan" />
                  <span className="line-clamp-1">{selectedMovie.title} // OFFICIAL TEASER</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMovie(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Close Teaser"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Responsive 16:9 Video Embed */}
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(
                    selectedMovie.trailerUrl
                  )}?autoplay=1&rel=0`}
                  title={`${selectedMovie.title} Teaser`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
