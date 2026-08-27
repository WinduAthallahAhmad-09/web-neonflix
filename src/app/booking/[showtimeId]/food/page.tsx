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
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-[family-name:var(--font-orbitron)] text-white text-center mb-12 neon-text-cyan">GRAB YOUR SNACKS</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <FoodMenu />
          
          <div className="w-full lg:w-80 flex-shrink-0">
            <CartSummary showtimeId={resolvedParams.showtimeId} />
          </div>
        </div>
      </div>
    </div>
  );
}
