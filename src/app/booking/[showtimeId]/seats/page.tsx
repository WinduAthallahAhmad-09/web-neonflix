"use client";

import { useEffect, useState } from "react";
import { generateSeatLayout, SeatLayout } from "@/data/seats";
import { SeatMap } from "@/components/booking/SeatMap";
import { SeatLegend } from "@/components/booking/SeatLegend";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { getShowtimeById } from "@/data/showtimes";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { use } from "react";

export default function SeatsPage({ params }: { params: Promise<{ showtimeId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [layout, setLayout] = useState<SeatLayout | null>(null);
  const { movieTitle } = useBookingStore();

  useEffect(() => {
    if (!movieTitle) {
      router.push("/");
      return;
    }

    const showtime = getShowtimeById(resolvedParams.showtimeId);
    if (showtime) {
      const generatedLayout = generateSeatLayout(10, 14, showtime.price);
      setLayout(generatedLayout);
    }
  }, [resolvedParams.showtimeId, movieTitle, router]);

  if (!layout) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-[family-name:var(--font-orbitron)] text-white text-center mb-2 neon-text-red">SELECT YOUR SEATS</h1>
        <p className="text-center text-gray-400 mb-12 font-[family-name:var(--font-jetbrains)]">Max 6 seats per transaction</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <SeatMap layout={layout} />
            <SeatLegend />
          </div>
          
          <div className="w-full lg:w-80 flex-shrink-0">
            <BookingSummary showtimeId={resolvedParams.showtimeId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() { const { showtimes } = await import('@/data/showtimes'); return showtimes.map((s: any) => ({ showtimeId: s.id })); }
