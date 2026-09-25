"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cinemas } from "@/data/cinemas";
import { Movie } from "@/data/movies";
import { Showtime, getShowtimesByMovieDateCinema } from "@/data/showtimes";
import { useBookingStore } from "@/store/bookingStore";
import { generateSeatLayout, SeatLayout } from "@/data/seats";
import { SeatMap } from "@/components/booking/SeatMap";
import { SeatLegend } from "@/components/booking/SeatLegend";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCurrency } from "@/lib/utils";
import { soundFx } from "@/lib/soundFx";
import { SpotlightShowtimeCard } from "./SpotlightShowtimeCard";
import {
  Calendar,
  MapPin,
  Monitor,
  Zap,
  ChevronDown,
  Armchair,
  Sparkles,
  CheckCircle,
} from "lucide-react";

interface ShowtimeSelectorProps {
  movie: Movie;
}

export function ShowtimeSelector({ movie }: ShowtimeSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const seatSectionRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCinema, setSelectedCinema] = useState<string>(cinemas[0].id);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [seatLayout, setSeatLayout] = useState<SeatLayout | null>(null);

  const setStoreShowtime = useBookingStore((state) => state.setShowtime);

  // 21st.dev inspired scroll-driven ambient glow animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const ambientGlowY = useTransform(scrollYProgress, [0, 1], ["5%", "75%"]);
  const ambientGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [0.35, 0.75, 0.85, 0.55]
  );

  // Generate fixed 7 days matching the static build (Sci-Fi Mission Date)
  const dates = [
    "2026-10-10",
    "2026-10-11",
    "2026-10-12",
    "2026-10-13",
    "2026-10-14",
    "2026-10-15",
    "2026-10-16",
  ];

  useEffect(() => {
    if (!selectedDate) setSelectedDate(dates[0]);
  }, [dates, selectedDate]);

  // Load available showtimes based on date and cinema
  useEffect(() => {
    if (selectedDate && selectedCinema) {
      const results = getShowtimesByMovieDateCinema(
        movie.id,
        selectedDate,
        selectedCinema
      );
      setShowtimes(results);

      // If already has a selected showtime, re-check if it exists in the new results
      if (selectedShowtime) {
        const match = results.find((st) => st.time === selectedShowtime.time);
        if (match) {
          setSelectedShowtime(match);
          setSeatLayout(generateSeatLayout(10, 14, match.price));
        } else {
          setSelectedShowtime(null);
          setSeatLayout(null);
        }
      }
    }
  }, [selectedDate, selectedCinema, movie.id]);

  // Handle selecting a showtime: activate session, sync store, generate seats, smooth-scroll!
  const handleSelectShowtime = (st: Showtime) => {
    soundFx.playSelect(true);
    setSelectedShowtime(st);

    const cinema = cinemas.find((c) => c.id === selectedCinema);
    setStoreShowtime({
      movieId: movie.id,
      movieTitle: movie.title,
      showtimeId: st.id,
      cinemaName: cinema?.name || "",
      studioName: st.studioName,
      studioType: st.studioType,
      date: selectedDate,
      time: st.time,
      ticketPrice: st.price,
    });

    const newLayout = generateSeatLayout(10, 14, st.price);
    setSeatLayout(newLayout);

    // Smooth scroll down to the seat matrix section seamlessly
    setTimeout(() => {
      seatSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const scrollToSeats = () => {
    soundFx.playClick();
    seatSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      id="showtime-matrix-section"
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 sm:px-8 py-12 relative z-10"
    >
      {/* 21st.dev Style Scroll-Driven Ambient Glow Light Field */}
      <motion.div
        style={{
          top: ambientGlowY,
          opacity: ambientGlowOpacity,
        }}
        className="absolute left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[500px] bg-gradient-to-br from-neon-red/25 via-neon-cyan/15 to-neon-magenta/20 blur-[150px] pointer-events-none -z-10 rounded-full transition-all"
      />

      {/* ── PHASE 01: SELECT TIME & THEATER MATRIX ── */}
      <section id="showtime-matrix-section">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-white/10">
          <div className="w-2.5 h-9 rounded-sm bg-neon-red shadow-[0_0_15px_#ff0033]" />
          <div>
            <div className="text-[10px] font-[family-name:var(--font-space-grotesk)] font-bold text-neon-red uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={12} /> PHASE 01 // DEPLOYMENT SCHEDULER
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-extrabold text-white tracking-wide">
              SELECT TIME & THEATER MATRIX
            </h2>
          </div>
        </div>

        {/* 1. Date Selector (Horizontal Capsule Slider with Framer Motion layoutId) */}
        <div className="mb-9">
          <div className="flex items-center justify-between text-xs font-[family-name:var(--font-space-grotesk)] text-gray-400 mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-neon-cyan" />
              <span className="tracking-wider uppercase font-semibold text-gray-300">
                MISSION DATE [CYCLE]
              </span>
            </div>
            <span className="text-[11px] font-[family-name:var(--font-geist-mono)] text-neon-cyan">
              7-DAY CYCLE WINDOW
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 px-1 no-scrollbar">
            {dates.map((date, idx) => {
              const d = new Date(date);
              const isSelected = selectedDate === date;
              const isToday = idx === 0;

              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedDate(date);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className="relative flex-shrink-0 px-4 py-3 rounded-xl cursor-pointer text-center outline-none group select-none transition-transform active:scale-95 min-w-[72px]"
                >
                  {/* Sliding Pill Active Background via Framer Motion layoutId */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeDatePill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-b from-neon-red/30 via-neon-red/15 to-neon-red/5 border border-neon-red shadow-[0_0_22px_rgba(255,0,51,0.45)] z-0"
                      transition={{ type: "spring", stiffness: 440, damping: 32 }}
                    />
                  )}

                  {/* Hover Glow on Inactive Cards */}
                  {!isSelected && (
                    <div className="absolute inset-0 rounded-xl bg-white/[0.03] border border-white/[0.08] group-hover:border-white/20 group-hover:bg-white/[0.06] transition-colors z-0" />
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center gap-0.5">
                    <div
                      className={`text-[10px] font-[family-name:var(--font-space-grotesk)] font-bold tracking-wider uppercase flex items-center gap-1 ${
                        isSelected ? "text-neon-red" : "text-gray-400 group-hover:text-gray-200"
                      }`}
                    >
                      {isToday ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                          TODAY
                        </>
                      ) : (
                        d.toLocaleDateString("en-US", { weekday: "short" })
                      )}
                    </div>

                    <div className="text-2xl font-[family-name:var(--font-rajdhani)] font-bold text-white leading-tight">
                      {d.getDate()}
                    </div>

                    <div className="text-[10px] font-[family-name:var(--font-plus-jakarta)] font-medium text-gray-400">
                      {d.toLocaleDateString("en-US", { month: "short" })}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Cinema Hub Selector (Glassmorphic Cards + Live Pulse + Studio Badges) */}
        <div className="mb-9">
          <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-space-grotesk)] text-gray-400 mb-3">
            <MapPin size={14} className="text-neon-magenta" />
            <span className="tracking-wider uppercase font-semibold text-gray-300">
              TARGET JAKARTA SECTOR [THEATER]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cinemas.map((cinema) => {
              const isSelected = selectedCinema === cinema.id;

              return (
                <div
                  key={cinema.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedCinema(cinema.id);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                    isSelected
                      ? "bg-neon-cyan/10 border-neon-cyan shadow-[0_0_20px_rgba(0,247,255,0.25)]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        {isSelected && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2 ${
                            isSelected ? "bg-neon-cyan" : "bg-gray-600"
                          }`}
                        />
                      </span>
                      <h4 className="text-sm font-[family-name:var(--font-space-grotesk)] font-bold text-white group-hover:text-neon-cyan transition-colors">
                        {cinema.name}
                      </h4>
                    </div>

                    <MapPin
                      size={14}
                      className={isSelected ? "text-neon-cyan" : "text-gray-500"}
                    />
                  </div>

                  <p className="text-[11px] font-[family-name:var(--font-plus-jakarta)] text-gray-400 mb-2.5 line-clamp-1">
                    {cinema.location} • {cinema.studios.length} Studios Active
                  </p>

                  {/* Studio Technology Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cinema.facilities
                      .filter((f) =>
                        ["IMAX", "Dolby Atmos", "4DX", "VIP Lounge"].includes(f)
                      )
                      .map((facility) => (
                        <span
                          key={facility}
                          className="px-2 py-0.5 rounded text-[9px] font-[family-name:var(--font-geist-mono)] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300"
                        >
                          {facility}
                        </span>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Showtime Slots Matrix with Cursor Spotlight Cards */}
        <div>
          <div className="flex items-center justify-between text-xs font-[family-name:var(--font-space-grotesk)] text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <Monitor size={14} className="text-neon-yellow" />
              <span className="tracking-wider uppercase font-semibold text-gray-300">
                AVAILABLE SESSIONS
              </span>
            </div>
            <span className="text-[11px] font-[family-name:var(--font-geist-mono)] text-neon-green font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              {showtimes.length} SESSIONS ONLINE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {showtimes.length > 0 ? (
              showtimes.map((st) => (
                <SpotlightShowtimeCard
                  key={st.id}
                  showtime={st}
                  isSelected={selectedShowtime?.id === st.id}
                  onSelect={() => handleSelectShowtime(st)}
                />
              ))
            ) : (
              <div className="col-span-full p-8 text-center border border-dashed border-white/10 text-gray-500 font-mono rounded-xl bg-white/[0.01]">
                // NO TRANSMISSIONS FOR SELECTED PARAMETERS. TRY ANOTHER DATE OR SECTOR.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PHASE 02: SEAT MATRIX ALLOCATION (Seamlessly Connected Below) ── */}
      <div ref={seatSectionRef} className="scroll-mt-24">
        <AnimatePresence mode="wait">
          {selectedShowtime && seatLayout ? (
            <motion.section
              key={selectedShowtime.id}
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="mt-20 pt-12 border-t border-white/10 relative"
            >
              {/* Glowing Divider Beam */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-neon-red to-transparent shadow-[0_0_15px_#ff0033]" />

              {/* Phase 02 Header matching Image 2 */}
              <div className="text-center mb-10 relative">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-red/15 border border-neon-red/40 text-neon-red text-[11px] font-[family-name:var(--font-space-grotesk)] font-bold tracking-widest uppercase mb-3 shadow-[0_0_20px_rgba(255,0,51,0.35)]">
                  <Armchair size={14} className="animate-pulse" />
                  PHASE 02 // SEAT MATRIX ALLOCATION
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-space-grotesk)] font-extrabold text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,0,51,0.6)]">
                  SELECT YOUR SEATS
                </h2>
                <p className="text-xs sm:text-sm font-[family-name:var(--font-plus-jakarta)] text-gray-400 mt-2 flex items-center justify-center gap-2">
                  <span>Max 6 seats per transaction</span>
                  <span className="text-neon-cyan">•</span>
                  <span className="text-neon-cyan font-bold font-[family-name:var(--font-rajdhani)] text-base">{selectedShowtime.time}</span>
                  <span className="text-gray-500 font-mono">[{selectedShowtime.studioType}]</span>
                </p>
              </div>

              {/* Integrated Single-Page Layout: Left = Seat Map + Legend, Right = Sticky Session Manifest */}
              <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
                {/* Left Side: Seat Map & Legend */}
                <div className="flex-1 w-full bg-black/60 backdrop-blur-2xl border border-white/10 p-4 sm:p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
                  <SeatMap layout={seatLayout} />
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <SeatLegend />
                  </div>
                </div>

                {/* Right Side: Sticky Session Manifest (Cyberpunk HUD matching user screenshot) */}
                <div className="w-full lg:w-84 lg:sticky lg:top-24 flex-shrink-0">
                  <BookingSummary showtimeId={selectedShowtime.id} />
                </div>
              </div>
            </motion.section>
          ) : (
            /* Standby Guide Box when no session clicked yet */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 p-8 rounded-2xl border border-dashed border-white/15 text-center flex flex-col items-center justify-center gap-3 bg-white/[0.02]"
            >
              <div className="w-12 h-12 rounded-full bg-neon-cyan/10 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan shadow-[0_0_20px_rgba(0,247,255,0.3)]">
                <Armchair size={22} className="animate-pulse" />
              </div>
              <div className="text-white font-[family-name:var(--font-orbitron)] text-base font-bold tracking-wider">
                COCKPIT POD SEAT MATRIX STANDBY
              </div>
              <p className="text-xs font-mono text-gray-400 max-w-md">
                Klik salah satu jam tayang (Available Sessions) di atas untuk membuka denah pemilihan kursi secara langsung.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Quick Navigation Pill when a showtime is locked */}
      {selectedShowtime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/85 backdrop-blur-xl border border-neon-red/50 shadow-[0_0_25px_rgba(255,0,51,0.5)] cursor-pointer hover:scale-105 transition-all"
          onClick={scrollToSeats}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-neon-red animate-ping" />
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            SESSION {selectedShowtime.time} ACTIVE
          </span>
          <ChevronDown size={16} className="text-neon-red animate-bounce" />
        </motion.div>
      )}
    </div>
  );
}
