"use client";

import { useState } from "react";
import { foodItems, FoodItem } from "@/data/foods";
import { FoodCard } from "./FoodCard";
import { soundFx } from "@/lib/soundFx";
import { Utensils, Coffee, Popcorn, Zap, Sparkles } from "lucide-react";

export function FoodMenu() {
  const [category, setCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "ALL RATIONS", icon: Sparkles },
    { id: "combos", label: "COMBOS", icon: Zap },
    { id: "popcorn", label: "POPCORN", icon: Popcorn },
    { id: "drinks", label: "BEVERAGES", icon: Coffee },
    { id: "snacks", label: "SNACKS", icon: Utensils },
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
      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-6 border-b border-dark-border scrollbar-hide">
        {categories.map((cat) => {
          const isSelected = category === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              onMouseEnter={() => soundFx.playHover()}
              className={`flex-shrink-0 px-4 py-2 text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-wider transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,247,255,0.4)]"
                  : "bg-dark-card border-dark-border text-gray-400 hover:border-gray-500 hover:text-white"
              }`}
            >
              <Icon size={14} className={isSelected ? "text-neon-cyan" : "text-gray-500"} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFoods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}
