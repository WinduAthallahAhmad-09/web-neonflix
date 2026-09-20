"use client";

import { FoodItem } from "@/data/foods";
import { useBookingStore } from "@/store/bookingStore";
import { formatCurrency } from "@/lib/utils";
import { soundFx } from "@/lib/soundFx";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FoodCardProps {
  food: FoodItem;
}

export function FoodCard({ food }: FoodCardProps) {
  const { foodCart, addFoodItem, removeFoodItem, updateFoodQuantity } =
    useBookingStore();
  const cartItem = foodCart.find((item) => item.id === food.id);
  const quantity = cartItem?.quantity || 0;

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
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#111118]/80 border border-white/10 hover:border-white/25 hover:bg-[#151520] transition-all duration-300 p-5 shadow-lg backdrop-blur-md">
      {/* Minimalist Badge */}
      {food.badge && (
        <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase bg-white/10 text-white border border-white/15 backdrop-blur-sm">
          {food.badge}
        </span>
      )}

      {/* Visual & Content */}
      <div className="flex flex-col items-center text-center pt-2">
        <div className="w-20 h-20 flex items-center justify-center text-5xl mb-3 group-hover:scale-108 transition-transform duration-300 select-none filter drop-shadow-md">
          {food.imageUrl}
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5 line-clamp-1">
          {food.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed max-w-[220px]">
          {food.description}
        </p>
      </div>

      {/* Footer: Clean Price & Morphing Stepper */}
      <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
        <span className="text-sm sm:text-base font-bold text-white tabular-nums font-mono">
          {formatCurrency(food.price)}
        </span>

        {/* Morphing Stepper / Add Button */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {quantity > 0 ? (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-2 py-1 shadow-inner"
              >
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                  aria-label="Kurangi jumlah"
                >
                  <Minus size={12} />
                </button>
                <span className="text-xs font-bold text-white min-w-[18px] text-center tabular-nums font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-neon-cyan hover:text-white hover:bg-neon-cyan/20 transition-colors cursor-pointer"
                  aria-label="Tambah jumlah"
                >
                  <Plus size={12} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="add-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-200 hover:text-white border border-white/15 hover:border-white/30 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Plus size={13} className="text-neon-cyan" />
                <span>Add</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
