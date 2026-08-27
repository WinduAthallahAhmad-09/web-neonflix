"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cinemas } from "@/data/cinemas";
import { Movie } from "@/data/movies";
import { Showtime, getShowtimesByMovieDateCinema } from "@/data/showtimes";
import { useBookingStore } from "@/store/bookingStore";
import { NeonButton } from "@/components/ui/NeonButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCurrency } from "@/lib/utils";
import { soundFx } from "@/lib/soundFx";
import { Calendar, MapPin, Monitor, Zap, ChevronRight } from "lucide-react";

interface ShowtimeSelectorProps {
  movie: Movie;
}

export function ShowtimeSelector({ movie }: ShowtimeSelectorProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCinema, setSelectedCinema] = useState<string>(cinemas[0].id);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);

  const setStoreShowtime = useBookingStore((state) => state.setShowtime);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  useEffect(() => {
    if (!selectedDate) setSelectedDate(dates[0]);
  }, [dates, selectedDate]);

  useEffect(() => {
    if (selectedDate && selectedCinema) {
      const results = getShowtimesByMovieDateCinema(
        movie.id,
        selectedDate,
        selectedCinema
      );
      setShowtimes(results);
      setSelectedShowtime(null);
    }
  }, [selectedDate, selectedCinema, movie.id]);

  const handleSelectShowtime = (st: Showtime) => {
    soundFx.playSelect(true);
    setSelectedShowtime(st);
  };

  const handleProceed = () => {
    if (selectedShowtime) {
      soundFx.playClick();
      const cinema = cinemas.find((c) => c.id === selectedCinema);
      setStoreShowtime({
        movieId: movie.id,
        movieTitle: movie.title,
        showtimeId: selectedShowtime.id,
        cinemaName: cinema?.name || "",
        studioName: selectedShowtime.studioName,
        studioType: selectedShowtime.studioType,
        date: selectedDate,
        time: selectedShowtime.time,
        ticketPrice: selectedShowtime.price,
      });
      router.push(`/booking/${selectedShowtime.id}/seats`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 relative z-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-dark-border">
        <div className="w-3 h-8 bg-neon-red shadow-[0_0_10px_#ff0033]"></div>
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
        <div className="flex overflow-x-auto gap-3 pb-3 scrollbar-hide">
          {dates.map((date) => {
            const d = new Date(date);
            const isSelected = selectedDate === date;
            return (
              <button
                key={date}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedDate(date);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`flex-shrink-0 px-5 py-2.5 border transition-all cursor-pointer text-left font-[family-name:var(--font-jetbrains)] ${
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
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCinema(cinema.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-2 border font-[family-name:var(--font-orbitron)] text-xs tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className={`p-4 bg-dark-card border cursor-pointer transition-all duration-200 relative group select-none ${
                    isSelected
                      ? "border-neon-red shadow-[0_0_20px_rgba(255,0,51,0.6)] bg-neon-red/10 scale-[1.02]"
                      : "border-dark-border hover:border-gray-500 hover:bg-dark-surface"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-3xl font-[family-name:var(--font-orbitron)] font-extrabold text-white group-hover:text-neon-red transition-colors">
                      {st.time}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-dark-surface border border-neon-cyan/60 text-neon-cyan font-bold">
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
            <div className="col-span-full p-8 text-center border border-dashed border-dark-border text-gray-500 font-mono">
              // NO TRANSMISSIONS FOR SELECTED PARAMETERS. TRY ANOTHER DATE OR SECTOR.
            </div>
          )}
        </div>
      </div>

      {/* Floating Tactical Bottom CTA */}
      {selectedShowtime && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-dark-bg/95 backdrop-blur-xl border-t-2 border-neon-red flex flex-col sm:flex-row justify-between items-center gap-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neon-red/20 border border-neon-red flex items-center justify-center text-neon-red font-mono text-lg font-bold">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-xs font-mono text-gray-400">
                SESSION: <span className="text-white font-bold">{selectedShowtime.time}</span> // {selectedShowtime.studioType} ({selectedShowtime.studioName})
              </div>
              <div className="text-lg font-mono text-neon-cyan font-bold">
                {formatCurrency(selectedShowtime.price)} / SEAT
              </div>
            </div>
          </div>

          <NeonButton variant="primary" size="lg" onClick={handleProceed} className="w-full sm:w-auto">
            PROCEED TO SEAT MAP <ChevronRight size={18} />
          </NeonButton>
        </motion.div>
      )}
    </div>
  );
}
