"use client";

import { useBookingStore } from "@/store/bookingStore";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { soundFx } from "@/lib/soundFx";
import { ShoppingBag, X, ArrowRight, Film } from "lucide-react";

interface CartSummaryProps {
  showtimeId: string;
}

export function CartSummary({ showtimeId }: CartSummaryProps) {
  const router = useRouter();
  const {
    foodCart,
    selectedSeats,
    totalTicketPrice,
    totalFoodPrice,
    totalPrice,
    removeFoodItem,
  } = useBookingStore();

  const handleProceed = () => {
    soundFx.playClick();
    router.push(`/booking/${showtimeId}/checkout`);
  };

  const handleSkip = () => {
    soundFx.playClick();
    router.push(`/booking/${showtimeId}/checkout`);
  };

  return (
    <div className="rounded-2xl bg-[#111118]/80 border border-white/10 p-6 shadow-xl sticky top-28 backdrop-blur-md">
      {/* Header Summary */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <ShoppingBag size={16} className="text-neon-cyan" />
          <span>Order Summary</span>
        </div>
        <span className="text-xs text-gray-400 font-mono">
          {foodCart.length} {foodCart.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Selected Items List */}
      <div className="max-h-[32vh] overflow-y-auto pr-1 mb-5 space-y-2.5 no-scrollbar">
        {foodCart.length > 0 ? (
          foodCart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs"
            >
              <div className="pr-2">
                <div className="text-white font-semibold">{item.name}</div>
                <div className="text-gray-400 text-[11px] font-mono mt-0.5">
                  {item.quantity} × {formatCurrency(item.price)}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-white font-mono">
                  {formatCurrency(item.price * item.quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    removeFoodItem(item.id);
                  }}
                  className="text-gray-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-xs text-gray-500 border border-dashed border-white/10 rounded-xl">
            Belum ada snack atau minuman yang dipilih
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs">
        <div className="flex justify-between text-gray-400">
          <span className="flex items-center gap-1.5">
            <Film size={13} className="text-gray-400" />
            Tiket Bioskop ({selectedSeats.length} kursi)
          </span>
          <span className="text-white font-semibold font-mono">
            {formatCurrency(totalTicketPrice)}
          </span>
        </div>

        <div className="flex justify-between text-gray-400">
          <span>Snacks & Drinks</span>
          <span className="text-neon-cyan font-semibold font-mono">
            {formatCurrency(totalFoodPrice)}
          </span>
        </div>

        <div className="flex justify-between items-baseline pt-3 border-t border-white/10">
          <span className="text-sm font-semibold text-gray-200">Total Pembayaran</span>
          <span className="text-xl sm:text-2xl font-bold text-white font-mono drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleProceed}
          className="w-full py-3 px-5 rounded-full bg-neon-red hover:bg-red-600 text-white font-[family-name:var(--font-orbitron)] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,51,0.5)] hover:shadow-[0_0_30px_rgba(255,0,51,0.8)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <span>Lanjut ke Pembayaran</span>
          <ArrowRight size={15} />
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="w-full py-2 text-gray-400 hover:text-white text-xs font-medium transition-colors cursor-pointer text-center"
        >
          Lewati cemilan & lanjutkan &rarr;
        </button>
      </div>
    </div>
  );
}
