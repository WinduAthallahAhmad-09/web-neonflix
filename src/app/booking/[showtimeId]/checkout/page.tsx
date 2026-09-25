"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { CheckoutForm } from "@/components/booking/CheckoutForm";
import { use } from "react";

export default function CheckoutPage({ params }: { params: Promise<{ showtimeId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { selectedSeats } = useBookingStore();

  useEffect(() => {
    if (selectedSeats.length === 0) {
      router.push("/");
    }
  }, [selectedSeats, router]);

  if (selectedSeats.length === 0) return null;

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-[family-name:var(--font-orbitron)] text-white text-center mb-12">CHECKOUT</h1>
        <CheckoutForm showtimeId={resolvedParams.showtimeId} />
      </div>
    </div>
  );
}

 = await import('@/data/showtimes'); return showtimes.map((s: any) => ({ showtimeId: s.id })); }


export async function generateStaticParams() { const { showtimes } = await import('@/data/showtimes'); return showtimes.map((s: any) => ({ showtimeId: s.id })); }
