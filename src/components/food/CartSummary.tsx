"use client";

import { useBookingStore } from "@/store/bookingStore";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { NeonButton } from "@/components/ui/NeonButton";
import { soundFx } from "@/lib/soundFx";
import { ShoppingBag, X, Zap, ArrowRight } from "lucide-react";

interface CartSummaryProps {
  showtimeId: string;
}

export function CartSummary({ showtimeId }: CartSummaryProps) {
  const router = useRouter();
  const {
    foodCart,
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
    <div className="bg-dark-card border border-neon-cyan/40 p-5 shadow-[0_0_25px_rgba(0,0,0,0.8)] sticky top-28">
      <div className="flex justify-between items-center pb-3 border-b border-dark-border mb-4">
        <h3 className="font-[family-name:var(--font-orbitron)] text-base font-bold text-white tracking-wider flex items-center gap-2">
          <ShoppingBag size={16} className="text-neon-cyan" />
          RATION MANIFEST
        </h3>
        <span className="text-[10px] font-mono text-neon-cyan font-bold">
          [{foodCart.length} ITEMS]
        </span>
      </div>

      {/* Item List */}
      <div className="max-h-[35vh] overflow-y-auto pr-1 mb-5 space-y-3">
        {foodCart.length > 0 ? (
          foodCart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-xs font-mono p-2 bg-dark-surface/60 border border-dark-border"
            >
              <div className="flex-grow pr-2">
                <div className="text-white font-bold">{item.name}</div>
                <div className="text-gray-400 text-[10px]">
                  QTY: {item.quantity} × {formatCurrency(item.price)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon-cyan font-bold">
                  {formatCurrency(item.price * item.quantity)}
                </span>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    removeFoodItem(item.id);
                  }}
                  className="text-gray-500 hover:text-neon-red p-1 cursor-pointer"
                  title="Remove"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-xs font-mono py-6 border border-dashed border-dark-border italic">
            // NO RATIONS SELECTED
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t border-dark-border pt-4 mb-5 space-y-2 text-xs font-mono">
        <div className="flex justify-between text-gray-400">
          <span>TICKET PODS:</span>
          <span className="text-white font-bold">{formatCurrency(totalTicketPrice)}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>RATIONS & STIMS:</span>
          <span className="text-neon-cyan font-bold">{formatCurrency(totalFoodPrice)}</span>
        </div>

        <div className="flex justify-between items-end pt-3 border-t border-dark-border/80">
          <div className="text-gray-300 font-bold">TOTAL ACQUISITION:</div>
          <div className="text-2xl font-bold text-white font-mono drop-shadow-[0_0_10px_rgba(0,247,255,0.6)]">
            {formatCurrency(totalPrice)}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <NeonButton
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleProceed}
        >
          CONFIRM ORDER <ArrowRight size={16} />
        </NeonButton>
        <button
          onClick={handleSkip}
          onMouseEnter={() => soundFx.playHover()}
          className="text-gray-400 hover:text-white text-xs font-mono py-2 tracking-wider transition-colors cursor-pointer text-center"
        >
          [ SKIP RATIONS &gt;&gt; ]
        </button>
      </div>
    </div>
  );
}
