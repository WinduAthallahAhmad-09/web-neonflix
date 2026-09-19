"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/data/movies";
import { soundFx } from "@/lib/soundFx";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Ticket,
  Sparkles,
  Star,
  Clock,
} from "lucide-react";

import { getYoutubeId } from "@/lib/utils";

interface TrailerHeroCarouselProps {
  movies: Movie[];
}

// Map movie IDs to user-provided trailer YouTube IDs
const TRAILER_IDS: Record<string, string> = {
  "spiderman-brand-new-day": "daXaTug8rL4", // Spider-Man: Brand New Day (User Link)
  "batman-dark-knight": "EXeTwQWrcwY",      // The Dark Knight (User Link)
  "cyberpunk-edgerunners": "x4ztgjvfU60",   // Cyberpunk: Edgerunners (User Link)
  "avengers-assemble": "NPoHPNeU9fc",       // Avengers (User Link)
  "the-odyssey": "LgOMT7ka6do",             // The Odyssey (User Link)
};

export function TrailerHeroCarousel({ movies }: TrailerHeroCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const movie = movies[activeIdx] || movies[0];
  const youtubeId = getYoutubeId(movie.trailerUrl) || TRAILER_IDS[movie.id] || "daXaTug8rL4";

  // Slide navigation
  const nextSlide = () => {
    soundFx.playClick();
    setActiveIdx((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    soundFx.playClick();
    setActiveIdx((prev) => (prev - 1 + movies.length) % movies.length);
  };

  // Toggle Sound (send postMessage to YouTube IFrame API)
  const toggleMute = () => {
    soundFx.playSelect();
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = newMuted
        ? '{"event":"command","func":"mute","args":""}'
        : '{"event":"command","func":"unMute","args":""}';
      iframeRef.current.contentWindow.postMessage(command, "*");
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    soundFx.playClick();
    const newPlay = !isPlaying;
    setIsPlaying(newPlay);

    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = newPlay
        ? '{"event":"command","func":"playVideo","args":""}'
        : '{"event":"command","func":"pauseVideo","args":""}';
      iframeRef.current.contentWindow.postMessage(command, "*");
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    soundFx.playClick();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Handle Fullscreen change listener
  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFSChange);
    return () => document.removeEventListener("fullscreenchange", handleFSChange);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[480px] max-h-[82vh] bg-black overflow-hidden select-none group"
    >
      {/* ── Background Fallback Poster (Instant Load) ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          unoptimized
          className="object-cover object-center filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-black/30 to-black/60" />
      </div>

      {/* ── Real YouTube Video Trailer Stream ── */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden flex items-center justify-center">
        <iframe
          key={`${movie.id}-${isMuted ? "muted" : "unmuted"}`}
          ref={iframeRef}
          className="w-[125vw] h-[125vh] min-w-[100%] min-h-[100%] pointer-events-none scale-105"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${
            isMuted ? 1 : 0
          }&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&origin=${
            typeof window !== "undefined" ? window.location.origin : ""
          }`}
          title={`${movie.title} Official Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* ── Subtle Vignette & Gradient Overlays (Cinema 21 Aesthetic) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-dark-bg via-transparent to-black/50" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-black/40" />

      {/* ── Top Bar Controls (Mute & Fullscreen) ── */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-30 flex items-center gap-3">
        {/* Sound Toggle Button */}
        <button
          onClick={toggleMute}
          onMouseEnter={() => soundFx.playHover()}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 hover:border-neon-red text-white backdrop-blur-md transition-all shadow-lg cursor-pointer"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? (
            <>
              <VolumeX size={16} className="text-gray-400" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-gray-300 hidden sm:inline">
                MUTED
              </span>
            </>
          ) : (
            <>
              <Volume2 size={16} className="text-neon-cyan animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-neon-cyan hidden sm:inline">
                AUDIO ON
              </span>
            </>
          )}
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          onMouseEnter={() => soundFx.playHover()}
          className="p-2.5 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 hover:border-neon-cyan text-white backdrop-blur-md transition-all shadow-lg cursor-pointer"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* ── Center Play / Pause Indicator (Cinema 21 Style) ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <button
          onClick={togglePlay}
          className="pointer-events-auto p-4 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-neon-red text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1 fill-white" />}
        </button>
      </div>

      {/* ── Navigation Arrows (Left & Right) ── */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => soundFx.playHover()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-neon-red/80 border border-white/20 hover:border-neon-red text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg group-hover:scale-105"
        title="Previous Trailer"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => soundFx.playHover()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-neon-red/80 border border-white/20 hover:border-neon-red text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg group-hover:scale-105"
        title="Next Trailer"
      >
        <ChevronRight size={24} />
      </button>

      {/* ── Bottom-Left Information Overlay (Matches User Reference Image) ── */}
      <div className="absolute bottom-10 sm:bottom-12 left-6 sm:left-12 z-30 max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-start gap-2.5"
          >
            {/* Tag / Category Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-neon-red text-white text-[10px] font-[family-name:var(--font-orbitron)] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(255,0,51,0.6)]">
                NOW SHOWING // PRIMETIME
              </span>
              <span className="text-xs font-mono text-neon-yellow flex items-center gap-1 font-bold bg-black/50 px-2.5 py-0.5 rounded-full border border-neon-yellow/30">
                <Star size={11} className="fill-neon-yellow" />
                {movie.rating} / 10
              </span>
            </div>

            {/* Movie Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
              {movie.title}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-xs sm:text-sm font-sans text-gray-300 line-clamp-1 max-w-md drop-shadow">
              {movie.tagline} • Opens Today in Jakarta
            </p>

            {/* CTA Button (Cinema 21 Style: TIMES & TICKETS) */}
            <div className="flex items-center gap-3 pt-2">
              <Link href={`/movies/${movie.id}`}>
                <button
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-6 py-2.5 rounded-full bg-white hover:bg-neon-red text-black hover:text-white font-[family-name:var(--font-orbitron)] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,51,0.8)] flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Ticket size={16} />
                  TIMES & TICKETS
                </button>
              </Link>

              <span className="text-xs font-mono text-gray-400 flex items-center gap-1 bg-black/50 px-3 py-1.5 rounded-full border border-white/10 hidden sm:flex">
                <Clock size={12} className="text-neon-cyan" />
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom Carousel Pagination Dots ── */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {movies.map((m, i) => (
          <button
            key={m.id}
            onClick={() => {
              soundFx.playClick();
              setActiveIdx(i);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === activeIdx
                ? "w-8 h-2 bg-neon-red shadow-[0_0_10px_#ff0033]"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
            title={m.title}
          />
        ))}
      </div>

      {/* ── Bottom Active Slide Progress Line ── */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <motion.div
          key={activeIdx}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 15, ease: "linear" }}
          className="h-full bg-gradient-to-r from-neon-red to-neon-cyan"
        />
      </div>
    </section>
  );
}
