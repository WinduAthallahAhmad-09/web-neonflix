"use client";

import { useState } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { type Seat, type SeatLayout, getSeatsByRow } from "@/data/seats";
import { cn, formatCurrency } from "@/lib/utils";
import { soundFx } from "@/lib/soundFx";
import { Crosshair, ShieldAlert, Zap } from "lucide-react";

interface SeatMapProps {
  layout: SeatLayout;
}

export function SeatMap({ layout }: SeatMapProps) {
  const selectedSeats = useBookingStore((state) => state.selectedSeats);
  const toggleSeat = useBookingStore((state) => state.toggleSeat);
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);

  const seatsByRow = getSeatsByRow(layout);
  const rowLabels = Object.keys(seatsByRow).sort();

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "occupied" || seat.status === "vip-occupied") {
      soundFx.playGlitch();
      return;
    }
    const isNowSelected = !selectedSeats.some((s) => s.id === seat.id);
    soundFx.playSeatSelect(isNowSelected);
    toggleSeat(seat);
  };

  return (
    <div className="w-full flex flex-col items-center select-none relative">
      {/* Curved Holographic Screen Projector */}
      <div className="w-full max-w-2xl flex flex-col items-center mb-8 relative">
        {/* Hologram Light Ray from Screen */}
        <div className="w-full h-16 bg-gradient-to-b from-neon-cyan/20 to-transparent clip-path-polygon opacity-60 pointer-events-none" />
        
        {/* Curved Neon Screen Bar */}
        <div className="w-4/5 h-2.5 bg-gradient-to-r from-neon-red via-neon-cyan to-neon-red rounded-t-full shadow-[0_0_25px_rgba(0,247,255,0.8)]" />
        <div className="text-[10px] font-[family-name:var(--font-orbitron)] text-neon-cyan tracking-[0.6em] mt-2 flex items-center gap-2">
          <Zap size={10} className="text-neon-red animate-pulse" />
          HOLOGRAPHIC SCREEN PROJECTION
          <Zap size={10} className="text-neon-red animate-pulse" />
        </div>
      </div>

      {/* Interactive Seat Matrix Grid */}
      <div className="relative p-6 bg-dark-card/90 border border-neon-red/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-x-auto w-full max-w-3xl flex flex-col items-center">
        {/* Subtle Radar Sweep Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-red/5 to-transparent h-12 animate-[scanline_4s_linear_infinite] pointer-events-none"></div>

        {/* Seat Rows */}
        <div className="flex flex-col gap-2.5 min-w-[580px]">
          {rowLabels.map((rowLabel) => {
            const rowSeats = seatsByRow[rowLabel];
            return (
              <div key={rowLabel} className="flex items-center justify-center gap-3">
                {/* Left Row Identifier */}
                <div className="w-6 text-center text-neon-red font-bold font-mono text-xs">
                  {rowLabel}
                </div>

                {/* Seats Array */}
                <div className="flex gap-2">
                  {rowSeats.map((seat, seatIdx) => {
                    const isSelected = selectedSeats.some((s) => s.id === seat.id);
                    const isOccupied =
                      seat.status === "occupied" || seat.status === "vip-occupied";
                    const isVip =
                      seat.status === "vip" || seat.status === "vip-occupied";

                    // Add Aisle Gaps for Authentic Cinema Layout
                    const isAisleGap = seatIdx === 3 || seatIdx === rowSeats.length - 4;

                    return (
                      <div key={seat.id} className={cn("flex items-center", isAisleGap && "mr-3")}>
                        <button
                          disabled={isOccupied}
                          onClick={() => handleSeatClick(seat)}
                          onMouseEnter={() => {
                            if (!isOccupied) soundFx.playHover();
                            setHoveredSeat(seat);
                          }}
                          onMouseLeave={() => setHoveredSeat(null)}
                          className={cn(
                            "w-7 h-7 sm:w-8 sm:h-8 rounded-t-md rounded-b-xs flex items-center justify-center text-[10px] font-mono transition-all duration-150 relative group cursor-pointer border",
                            // Occupied
                            isOccupied &&
                              "bg-dark-surface/60 border-dark-border text-gray-700 cursor-not-allowed",
                            // Selected
                            isSelected &&
                              "bg-neon-red border-neon-red text-white shadow-[0_0_15px_#ff0033] scale-110 z-10 font-bold",
                            // Available VIP
                            !isOccupied &&
                              !isSelected &&
                              isVip &&
                              "bg-dark-card border-neon-yellow/60 text-neon-yellow hover:border-neon-yellow hover:shadow-[0_0_10px_#f5ff00] hover:scale-105",
                            // Available Regular
                            !isOccupied &&
                              !isSelected &&
                              !isVip &&
                              "bg-dark-surface/80 border-dark-border text-gray-400 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_10px_rgba(0,247,255,0.4)] hover:scale-105"
                          )}
                        >
                          {isOccupied ? "×" : isSelected ? "✓" : seat.number}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Right Row Identifier */}
                <div className="w-6 text-center text-neon-red font-bold font-mono text-xs">
                  {rowLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tactical Hover HUD Tooltip Bar */}
      <div className="h-8 mt-4 flex items-center justify-center font-mono text-xs text-gray-400">
        {hoveredSeat ? (
          <div className="flex items-center gap-3 px-4 py-1 bg-dark-card border border-neon-cyan/50 text-white shadow-[0_0_15px_rgba(0,247,255,0.2)]">
            <Crosshair size={12} className="text-neon-cyan" />
            <span>NODE: <strong className="text-neon-cyan">{hoveredSeat.id}</strong></span>
            <span>TYPE: <strong className={hoveredSeat.status.includes("vip") ? "text-neon-yellow" : "text-white"}>{hoveredSeat.status.includes("vip") ? "VIP POD" : "STANDARD POD"}</strong></span>
            <span>PRICE: <strong className="text-neon-green">{formatCurrency(hoveredSeat.price)}</strong></span>
            <span className={hoveredSeat.status.includes("occupied") ? "text-neon-red" : "text-neon-green font-bold"}>
              [{hoveredSeat.status.includes("occupied") ? "LOCKED" : "AVAILABLE"}]
            </span>
          </div>
        ) : (
          <span className="text-gray-600 text-[11px] font-mono">
            // HOVER OVER COCKPIT POD FOR TELEMETRY // CLICK TO LOCK POD (MAX 6)
          </span>
        )}
      </div>
    </div>
  );
}
