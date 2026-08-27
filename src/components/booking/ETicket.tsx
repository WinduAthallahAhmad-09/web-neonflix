"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useBookingStore } from "@/store/bookingStore";
import { useUserStore } from "@/store/userStore";
import { generateBookingId, formatCurrency, formatDate } from "@/lib/utils";
import { XP_PER_BOOKING, XP_PER_FOOD_ORDER } from "@/lib/constants";
import { GlitchText } from "@/components/ui/GlitchText";
import { NeonButton } from "@/components/ui/NeonButton";
import { soundFx } from "@/lib/soundFx";
import { Zap, ShieldCheck, QrCode, Sparkles, Home, User } from "lucide-react";

export function ETicket() {
  const router = useRouter();
  const bookingStore = useBookingStore();
  const userStore = useUserStore();
  const [bookingId, setBookingId] = useState("");
  const [earnedXP, setEarnedXP] = useState(0);

  useEffect(() => {
    if (!bookingStore.movieTitle) {
      router.push("/");
      return;
    }

    const id = generateBookingId();
    setBookingId(id);

    let xp = XP_PER_BOOKING;
    if (bookingStore.foodCart.length > 0) {
      xp += XP_PER_FOOD_ORDER * bookingStore.foodCart.length;
    }
    setEarnedXP(xp);

    // Audio Fanfare
    soundFx.playSuccess();

    // Cyber Confetti Cannon
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff0033", "#ff2e77", "#00f7ff", "#f5ff00"],
      });
    } catch {
      // Ignore
    }
  }, [bookingStore.movieTitle, bookingStore.foodCart.length, router]);

  if (!bookingStore.movieTitle) return null;

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto px-4">
      {/* Gamification Level-up Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-8 p-4 bg-dark-card border-2 border-neon-yellow shadow-[0_0_25px_rgba(245,255,0,0.4)] text-center w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neon-yellow/20 border border-neon-yellow flex items-center justify-center text-neon-yellow">
            <Zap size={22} className="animate-pulse" />
          </div>
          <div className="text-left">
            <div className="font-[family-name:var(--font-orbitron)] font-bold text-white text-base">
              MISSION ACCOMPLISHED!
            </div>
            <div className="font-mono text-xs text-neon-yellow font-bold">
              +{earnedXP} OPERATOR XP CREDITED
            </div>
          </div>
        </div>
        <div className="text-right font-mono">
          <div className="text-[10px] text-gray-400">CURRENT RANK</div>
          <div className="text-neon-cyan font-bold text-sm">LVL.{userStore.level}</div>
        </div>
      </motion.div>

      {/* Cyberdeck Encrypted Access Pass */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-dark-card border-2 border-neon-cyan shadow-[0_0_40px_rgba(0,247,255,0.25)] relative overflow-hidden"
      >
        {/* Animated Laser Scanning Beam */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/15 to-transparent h-16 animate-[scanline_3s_linear_infinite] pointer-events-none z-20"></div>

        {/* Top Header Strip */}
        <div className="bg-neon-cyan text-black p-3.5 flex justify-between items-center font-[family-name:var(--font-orbitron)] font-bold text-sm tracking-widest">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} />
            <span>HOLO-PASS // ACCESS CARTRIDGE</span>
          </div>
          <span className="font-mono text-xs bg-black text-neon-cyan px-2 py-0.5">
            AUTHENTICATED
          </span>
        </div>

        {/* Main Pass Body */}
        <div className="p-6 relative z-10 space-y-6">
          <div className="border-b border-dark-border pb-4">
            <div className="text-[10px] font-mono text-neon-red tracking-widest uppercase">
              SIMULATION DIRECTORY
            </div>
            <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-orbitron)] font-extrabold text-white tracking-wide">
              {bookingStore.movieTitle}
            </h3>
            <div className="text-sm font-mono text-neon-cyan mt-1">
              {bookingStore.cinemaName} • {bookingStore.studioType || bookingStore.studioName}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div>
              <div className="text-gray-500 text-[10px]">DATE</div>
              <div className="text-white font-bold">
                {bookingStore.date ? formatDate(bookingStore.date) : "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px]">TIME</div>
              <div className="text-neon-cyan font-bold">{bookingStore.time}</div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px]">COCKPIT PODS</div>
              <div className="text-neon-red font-bold">
                {bookingStore.selectedSeats.map((s) => s.id).join(", ")}
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px]">TOTAL PAID</div>
              <div className="text-neon-green font-bold">
                {formatCurrency(bookingStore.totalPrice + 5000)}
              </div>
            </div>
          </div>

          {/* Rations included */}
          {bookingStore.foodCart.length > 0 && (
            <div className="p-3 bg-dark-surface border border-dark-border text-xs font-mono">
              <div className="text-gray-400 text-[10px] uppercase mb-1">
                RATIONS TO PICKUP AT CONCESSION BAR:
              </div>
              <div className="text-white">
                {bookingStore.foodCart.map((f) => `${f.quantity}x ${f.name}`).join(" • ")}
              </div>
            </div>
          )}

          {/* Barcode & Security Watermark */}
          <div className="pt-4 border-t border-dashed border-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[10px] font-mono text-gray-500">
                SECURITY HASH KEY // GATE SCAN
              </div>
              <div className="text-lg font-mono font-bold text-white tracking-widest text-neon-magenta">
                {bookingId}
              </div>
              <div className="text-[9px] font-mono text-gray-600">
                NX-SEC-2026-AUTHLOCKED-106.8E
              </div>
            </div>

            {/* Generated Vector QR Code */}
            <div className="w-24 h-24 bg-white p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <div className="w-full h-full bg-black flex flex-col items-center justify-center p-1 text-[8px] font-mono text-white text-center">
                <QrCode size={48} className="text-white mb-0.5" />
                <span>GATEPASS</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8 w-full justify-center">
        <NeonButton
          variant="secondary"
          size="lg"
          onClick={() => {
            bookingStore.reset();
            router.push("/");
          }}
        >
          <Home size={16} /> RETURN TO MATRIX
        </NeonButton>

        <NeonButton
          variant="primary"
          size="lg"
          onClick={() => {
            bookingStore.reset();
            router.push("/profile");
          }}
        >
          <User size={16} /> OPERATOR DOSSIER
        </NeonButton>
      </div>
    </div>
  );
}
