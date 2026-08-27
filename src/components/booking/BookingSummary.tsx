"use client";

import { useBookingStore } from "@/store/bookingStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { NeonButton } from "@/components/ui/NeonButton";
import { soundFx } from "@/lib/soundFx";
import { Zap, ShieldCheck, Ticket, ChevronRight } from "lucide-react";

interface BookingSummaryProps {
  showtimeId: string;
}

export function BookingSummary({ showtimeId }: BookingSummaryProps) {
  const router = useRouter();
  const {
    movieTitle,
    cinemaName,
    date,
    time,
    studioName,
    studioType,
    selectedSeats,
    totalTicketPrice,
  } = useBookingStore();

  const handleProceed = () => {
    soundFx.playClick();
    router.push(`/booking/${showtimeId}/food`);
  };

  return (
    <div className="bg-dark-card border border-neon-red/40 p-5 shadow-[0_0_25px_rgba(0,0,0,0.8)] relative">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-3 border-b border-dark-border mb-4">
        <h3 className="font-[family-name:var(--font-orbitron)] text-base font-bold text-white tracking-wider flex items-center gap-2">
          <Ticket size={16} className="text-neon-red" />
          SESSION MANIFEST
        </h3>
        <span className="text-[9px] font-mono text-neon-green font-bold">
          [READY]
        </span>
      </div>

      <div className="space-y-3.5 mb-5 text-xs font-mono">
        <div>
          <div className="text-gray-500 text-[10px] uppercase">SIMULATION // MOVIE</div>
          <div className="text-white font-bold font-[family-name:var(--font-orbitron)] text-sm line-clamp-1">
            {movieTitle || "-"}
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-[10px] uppercase">JAKARTA SECTOR</div>
          <div className="text-gray-300">{cinemaName || "-"}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dark-border/40">
          <div>
            <div className="text-gray-500 text-[10px] uppercase">SESSION TIME</div>
            <div className="text-neon-cyan font-bold">{time || "-"}</div>
            <div className="text-gray-400 text-[10px]">{date ? formatDate(date) : "-"}</div>
          </div>
          <div>
            <div className="text-gray-500 text-[10px] uppercase">STUDIO SPEC</div>
            <div className="text-neon-magenta font-bold">{studioType || studioName || "-"}</div>
          </div>
        </div>
      </div>

      {/* Selected Pods List */}
      <div className="border-t border-dark-border pt-4 mb-5">
        <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-2">
          <span>COCKPIT PODS ({selectedSeats.length}/6):</span>
          {selectedSeats.length > 0 && (
            <span className="text-neon-green">LOCKED</span>
          )}
        </div>

        {selectedSeats.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selectedSeats.map((seat) => (
              <span
                key={seat.id}
                className="px-2 py-1 bg-neon-red/15 border border-neon-red text-white text-xs font-mono font-bold shadow-[0_0_8px_rgba(255,0,51,0.4)]"
              >
                {seat.id}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-xs font-mono py-2 italic border border-dashed border-dark-border text-center mb-4">
            // NO PODS LOCKED. CLICK SEAT MATRIX.
          </div>
        )}

        {/* XP Bonus Indicator */}
        <div className="flex items-center gap-2 p-2 bg-neon-yellow/10 border border-neon-yellow/30 text-neon-yellow text-[11px] font-mono mb-4">
          <Zap size={14} className="animate-pulse" />
          <span>REWARD: +100 OPERATOR XP</span>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-end pt-2 border-t border-dark-border/60">
          <div className="text-xs font-mono text-gray-400">TOTAL COST</div>
          <div className="text-2xl font-bold font-mono text-white">
            {formatCurrency(totalTicketPrice)}
          </div>
        </div>
      </div>

      <NeonButton
        variant="primary"
        size="lg"
        className="w-full"
        disabled={selectedSeats.length === 0}
        onClick={handleProceed}
      >
        REQUISITION RATIONS <ChevronRight size={16} />
      </NeonButton>
    </div>
  );
}
