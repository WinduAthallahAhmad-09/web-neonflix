"use client";

import { FoodItem } from "@/data/foods";
import { useBookingStore } from "@/store/bookingStore";
import { formatCurrency } from "@/lib/utils";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { soundFx } from "@/lib/soundFx";
import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";

interface FoodCardProps {
  food: FoodItem;
}

export function FoodCard({ food }: FoodCardProps) {
  const { foodCart, addFoodItem, removeFoodItem, updateFoodQuantity } =
    useBookingStore();
  const cartItem = foodCart.find((item) => item.id === food.id);
  const quantity = cartItem?.quantity || 0;

  const badgeVariant =
    food.badge === "BEST SELLER"
      ? "yellow"
      : food.badge === "NEW"
      ? "magenta"
      : food.badge === "LIMITED"
      ? "red"
      : "cyan";

  const handleAdd = () => {
    soundFx.playSeatSelect(true);
    addFoodItem(food);
  };

  const handleIncrement = () => {
    soundFx.playClick();
    updateFoodQuantity(food.id, quantity + 1);
  };

  const handleDecrement = () => {
    soundFx.playClick();
    if (quantity === 1) {
      removeFoodItem(food.id);
    } else {
      updateFoodQuantity(food.id, quantity - 1);
    }
  };

  return (
    <div className="bg-dark-card border border-dark-border hover:border-neon-cyan/80 transition-all duration-300 p-4 flex flex-col justify-between relative group shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(0,247,255,0.25)]">
      {/* Badge */}
      {food.badge && (
        <div className="absolute top-2 right-2 z-10">
          <NeonBadge variant={badgeVariant} className="text-[9px]">
            {food.badge}
          </NeonBadge>
        </div>
      )}

      {/* Product Hologram Visual */}
      <div className="flex-grow flex flex-col items-center justify-center py-4">
        <div className="text-5xl mb-3 group-hover:scale-110 transition-transform filter drop-shadow-[0_0_12px_rgba(0,247,255,0.4)]">
          {food.imageUrl}
        </div>
        <h3 className="text-base font-[family-name:var(--font-orbitron)] font-bold text-white text-center mb-1 group-hover:text-neon-cyan transition-colors">
          {food.name}
        </h3>
        <p className="text-xs text-gray-400 text-center mb-3 font-sans">
          {food.description}
        </p>

        {/* Tactical Stat Buff Spec */}
        <div className="px-2 py-0.5 bg-dark-surface border border-dark-border/80 text-[10px] font-mono text-neon-green flex items-center gap-1">
          <Zap size={10} /> +25 XP // BIO-ENERGY STIM
        </div>
      </div>

      {/* Pricing & Control */}
      <div className="mt-auto border-t border-dark-border/60 pt-3">
        <div className="text-base font-bold font-mono text-neon-cyan mb-3 text-center">
          {formatCurrency(food.price)}
        </div>

        {quantity > 0 ? (
          <div className="flex items-center justify-between bg-dark-surface border border-neon-cyan/50 p-1">
            <button
              onClick={handleDecrement}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="font-bold text-white font-mono text-sm px-2">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-1.5 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            onMouseEnter={() => soundFx.playHover()}
            className="w-full py-2 flex items-center justify-center gap-2 bg-dark-surface border border-dark-border text-gray-300 hover:text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all font-[family-name:var(--font-orbitron)] text-xs font-bold cursor-pointer"
          >
            <ShoppingBag size={14} />
            REQUISITION
          </button>
        )}
      </div>
    </div>
  );
}
