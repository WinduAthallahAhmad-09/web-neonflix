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

  // Generate next 7 days
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

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
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-dark-border">
          <div className="w-3 h-8 bg-neon-red shadow-[0_0_12px_#ff0033]" />
          <div>
            <div className="text-[10px] font-mono text-neon-red uppercase tracking-widest">
              PHASE 01 // DEPLOYMENT SCHEDULER
            </div>
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-orbitron)] font-extrabold text-white tracking-wider">
              SELECT TIME & THEATER MATRIX
            </h2>
          </div>
        </div>

        {/* 1. Date Selector (Tactical Cartridge Cards) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-3">
            <Calendar size={14} className="text-neon-cyan" />
            <span>MISSION DATE [CYCLE]:</span>
          </div>
          <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar">
            {dates.map((date) => {
              const d = new Date(date);
              const isSelected = selectedDate === date;
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedDate(date);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-lg border transition-all cursor-pointer text-left font-[family-name:var(--font-jetbrains)] ${
                    isSelected
                      ? "bg-neon-red/20 border-neon-red text-white shadow-[0_0_15px_rgba(255,0,51,0.6)]"
                      : "bg-dark-card border-dark-border text-gray-400 hover:border-gray-500 hover:text-white"
                  }`}
                >
                  <div className="text-[10px] uppercase text-neon-red font-bold">
                    {d.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className="text-base font-bold text-white">
                    {d.getDate()}{" "}
                    {d.toLocaleDateString("en-US", { month: "short" })}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Cinema Hub Selector */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-3">
            <MapPin size={14} className="text-neon-magenta" />
            <span>TARGET JAKARTA SECTOR:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {cinemas.map((cinema) => {
              const isSelected = selectedCinema === cinema.id;
              return (
                <button
                  key={cinema.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedCinema(cinema.id);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`px-4 py-2 rounded-lg border font-[family-name:var(--font-orbitron)] text-xs tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "border-neon-cyan text-neon-cyan bg-neon-cyan/15 shadow-[0_0_15px_rgba(0,247,255,0.4)] font-bold"
                      : "border-dark-border text-gray-400 bg-dark-card hover:text-white hover:border-gray-600"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-neon-cyan animate-ping" : "bg-gray-600"
                    }`}
                  />
                  {cinema.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Showtime Slots Matrix */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <Monitor size={14} className="text-neon-yellow" />
              <span>AVAILABLE SESSIONS:</span>
            </div>
            <span className="text-neon-green font-bold">
              {showtimes.length} SESSIONS ONLINE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {showtimes.length > 0 ? (
              showtimes.map((st) => {
                const isSelected = selectedShowtime?.id === st.id;
                const availableSeats = st.availableSeats;
                const occupancyPct = Math.round(
                  ((st.totalSeats - availableSeats) / st.totalSeats) * 100
                );

                return (
                  <div
                    key={st.id}
                    onClick={() => handleSelectShowtime(st)}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`p-4 rounded-xl bg-dark-card border cursor-pointer transition-all duration-300 relative group select-none ${
                      isSelected
                        ? "border-neon-red shadow-[0_0_25px_rgba(255,0,51,0.7)] bg-neon-red/15 scale-[1.03] ring-1 ring-neon-red"
                        : "border-dark-border hover:border-white/30 hover:bg-white/5 hover:scale-[1.01]"
                    }`}
                  >
                    {/* Active Selected Indicator Badge */}
                    {isSelected && (
                      <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-neon-red text-white text-[9px] font-mono font-bold uppercase shadow-[0_0_10px_#ff0033] flex items-center gap-1">
                        <CheckCircle size={10} />
                        ACTIVE
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-3">
                      <div className="text-3xl font-[family-name:var(--font-orbitron)] font-extrabold text-white group-hover:text-neon-red transition-colors">
                        {st.time}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-surface border border-neon-cyan/60 text-neon-cyan font-bold">
                        {st.studioType}
                      </span>
                    </div>

                    <div className="text-sm font-mono text-neon-cyan font-bold mb-3">
                      {formatCurrency(st.price)}
                    </div>

                    {/* Seat Occupancy Meter */}
                    <div className="space-y-1 pt-2 border-t border-dark-border/50">
                      <div className="flex justify-between text-[10px] font-mono text-gray-400">
                        <span>OCCUPANCY</span>
                        <span className="text-white font-bold">{occupancyPct}%</span>
                      </div>
                      <ProgressBar
                        value={st.totalSeats - availableSeats}
                        max={st.totalSeats}
                        showPercentage={false}
                      />
                      <div className="text-[9px] font-mono text-neon-green text-right">
                        {availableSeats} SEATS OPEN
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full p-8 text-center border border-dashed border-dark-border text-gray-500 font-mono rounded-xl">
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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-red/15 border border-neon-red/40 text-neon-red text-[11px] font-mono font-bold tracking-widest uppercase mb-3 shadow-[0_0_20px_rgba(255,0,51,0.35)]">
                  <Armchair size={14} className="animate-pulse" />
                  PHASE 02 // SEAT MATRIX ALLOCATION
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,0,51,0.6)]">
                  SELECT YOUR SEATS
                </h2>
                <p className="text-xs sm:text-sm font-mono text-gray-400 mt-2 flex items-center justify-center gap-2">
                  <span>Max 6 seats per transaction</span>
                  <span className="text-neon-cyan">•</span>
                  <span className="text-neon-cyan font-bold">{selectedShowtime.time}</span>
                  <span className="text-gray-500">[{selectedShowtime.studioType}]</span>
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
