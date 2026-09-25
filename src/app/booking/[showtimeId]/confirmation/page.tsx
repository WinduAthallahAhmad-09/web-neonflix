"use client";

import { ETicket } from "@/components/booking/ETicket";
import { motion } from "framer-motion";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-neon-cyan/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-[family-name:var(--font-orbitron)] text-white text-center mb-12 neon-text-cyan"
        >
          BOOKING CONFIRMED
        </motion.h1>
        
        <ETicket />
      </div>
    </div>
  );
}

 = await import('@/data/showtimes'); return showtimes.map((s: any) => ({ showtimeId: s.id })); }


export async function generateStaticParams() { const { showtimes } = await import('@/data/showtimes'); return showtimes.map((s: any) => ({ showtimeId: s.id })); }
