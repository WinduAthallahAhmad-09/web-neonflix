export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "popcorn" | "drinks" | "snacks" | "combos";
  imageUrl: string;
  badge?: "BEST SELLER" | "NEW" | "POPULAR" | "LIMITED";
}

export const foodItems: FoodItem[] = [
  // Popcorn
  {
    id: "popcorn-s",
    name: "Caramel Popcorn (S)",
    description: "Classic sweet caramel popcorn, small size",
    price: 25000,
    category: "popcorn",
    imageUrl: "🍿",
  },
  {
    id: "popcorn-m",
    name: "Caramel Popcorn (M)",
    description: "Classic sweet caramel popcorn, medium size",
    price: 35000,
    category: "popcorn",
    imageUrl: "🍿",
    badge: "POPULAR",
  },
  {
    id: "popcorn-l",
    name: "Caramel Popcorn (L)",
    description: "Classic sweet caramel popcorn, large size",
    price: 45000,
    category: "popcorn",
    imageUrl: "🍿",
  },
  {
    id: "popcorn-cheese",
    name: "Cheese Popcorn (M)",
    description: "Savory cheese-flavored popcorn, medium size",
    price: 40000,
    category: "popcorn",
    imageUrl: "🧀",
    badge: "NEW",
  },
  // Drinks
  {
    id: "cola-m",
    name: "Neon Cola (M)",
    description: "Ice cold cola, medium cup",
    price: 20000,
    category: "drinks",
    imageUrl: "🥤",
  },
  {
    id: "cola-l",
    name: "Neon Cola (L)",
    description: "Ice cold cola, large cup",
    price: 28000,
    category: "drinks",
    imageUrl: "🥤",
    badge: "BEST SELLER",
  },
  {
    id: "iced-tea",
    name: "Cyber Iced Tea",
    description: "Refreshing iced tea with lemon",
    price: 18000,
    category: "drinks",
    imageUrl: "🧊",
  },
  {
    id: "milkshake",
    name: "Neon Milkshake",
    description: "Creamy vanilla milkshake with neon sprinkles",
    price: 35000,
    category: "drinks",
    imageUrl: "🥛",
    badge: "NEW",
  },
  {
    id: "mineral",
    name: "Mineral Water",
    description: "Pure mineral water 600ml",
    price: 12000,
    category: "drinks",
    imageUrl: "💧",
  },
  // Snacks
  {
    id: "nachos",
    name: "Loaded Nachos",
    description: "Crispy nachos with cheese sauce & jalapeños",
    price: 35000,
    category: "snacks",
    imageUrl: "🌮",
    badge: "POPULAR",
  },
  {
    id: "hotdog",
    name: "Cyber Dog",
    description: "Premium beef hotdog with all the fixings",
    price: 30000,
    category: "snacks",
    imageUrl: "🌭",
  },
  {
    id: "fries",
    name: "Neon Fries",
    description: "Crispy golden fries with special seasoning",
    price: 25000,
    category: "snacks",
    imageUrl: "🍟",
  },
  {
    id: "chicken-wings",
    name: "Spicy Cyber Wings",
    description: "6 pcs spicy chicken wings",
    price: 45000,
    category: "snacks",
    imageUrl: "🍗",
    badge: "BEST SELLER",
  },
  // Combos
  {
    id: "combo-1",
    name: "STARTER PACK",
    description: "Popcorn (M) + Cola (M)",
    price: 45000,
    category: "combos",
    imageUrl: "🎮",
    badge: "BEST SELLER",
  },
  {
    id: "combo-2",
    name: "POWER UP",
    description: "Popcorn (L) + Cola (L) + Nachos",
    price: 85000,
    category: "combos",
    imageUrl: "⚡",
    badge: "POPULAR",
  },
  {
    id: "combo-3",
    name: "ULTIMATE COMBO",
    description: "Popcorn (L) + 2x Cola (L) + Cyber Wings + Fries",
    price: 130000,
    category: "combos",
    imageUrl: "🏆",
    badge: "LIMITED",
  },
];

export function getFoodByCategory(category: string): FoodItem[] {
  return foodItems.filter((f) => f.category === category);
}
