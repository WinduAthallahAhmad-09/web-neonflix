"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { FoodMenu } from "@/components/food/FoodMenu";
import { CartSummary } from "@/components/food/CartSummary";
import { use } from "react";

export default function FoodPage({ params }: { params: Promise<{ showtimeId: string }> }) {
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
    <div className="min-h-screen bg-dark-bg pt-24 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Clean Header */}
        <div className="text-center mb-10 pb-6 border-b border-white/10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-tight mb-2">
            GRAB YOUR SNACKS
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-sans max-w-lg mx-auto">
            Pilih popcorn hangat dan minuman segar untuk menemani pengalaman nonton terbaikmu.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <FoodMenu />
          
          <div className="w-full lg:w-88 flex-shrink-0">
            <CartSummary showtimeId={resolvedParams.showtimeId} />
          </div>
        </div>
      </div>
    </div>
  );
}
