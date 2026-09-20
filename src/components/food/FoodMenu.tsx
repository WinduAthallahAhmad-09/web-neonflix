"use client";

import { useState } from "react";
import { foodItems } from "@/data/foods";
import { FoodCard } from "./FoodCard";
import { soundFx } from "@/lib/soundFx";
import { motion } from "framer-motion";
import { Utensils, Coffee, Popcorn, Zap, Sparkles } from "lucide-react";

export function FoodMenu() {
  const [category, setCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Items", icon: Sparkles },
    { id: "combos", label: "Combos", icon: Zap },
    { id: "popcorn", label: "Popcorn", icon: Popcorn },
    { id: "drinks", label: "Drinks", icon: Coffee },
    { id: "snacks", label: "Snacks", icon: Utensils },
  ];

  const filteredFoods =
    category === "all"
      ? foodItems
      : foodItems.filter((f) => f.category === category);

  const handleCategory = (id: string) => {
    soundFx.playClick();
    setCategory(id);
  };

  return (
    <div className="flex-grow">
      {/* Minimalist Floating Category Pills */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-white/10 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = category === cat.id;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`relative flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer select-none flex items-center gap-2 ${
                isSelected
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="snackActiveCategoryPill"
                  className="absolute inset-0 rounded-full bg-white/15 border border-white/20 shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Icon
                size={14}
                className={`relative z-10 ${
                  isSelected ? "text-neon-cyan" : "text-gray-400"
                }`}
              />
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Clean Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFoods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}
