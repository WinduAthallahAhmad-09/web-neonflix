export const XP_PER_BOOKING = 100;
export const XP_PER_FOOD_ORDER = 25;
export const XP_PER_LEVEL = 500;

export const LEVEL_NAMES: Record<number, string> = {
  1: "ROOKIE",
  2: "CINEMA SCOUT",
  3: "MOVIE HUNTER",
  4: "SCREEN WARRIOR",
  5: "CYBER CINEPHILE",
  6: "NEON VETERAN",
  7: "HOLO MASTER",
  8: "DIGITAL LEGEND",
  9: "QUANTUM VIEWER",
  10: "NEON GOD",
};

export const SEAT_PRICES: Record<string, number> = {
  regular: 50000,
  vip: 100000,
  premium: 75000,
};

export const STUDIO_TYPES = ["Regular", "IMAX", "4DX", "Premiere"] as const;

export type StudioType = (typeof STUDIO_TYPES)[number];

export const STUDIO_PRICE_MULTIPLIER: Record<StudioType, number> = {
  Regular: 1,
  IMAX: 1.8,
  "4DX": 2,
  Premiere: 2.5,
};

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-blood",
    name: "FIRST BLOOD",
    description: "Book your first movie ticket",
    icon: "🎬",
    xpReward: 50,
    unlocked: false,
  },
  {
    id: "night-owl",
    name: "NIGHT OWL",
    description: "Book a show after 10 PM",
    icon: "🌙",
    xpReward: 75,
    unlocked: false,
  },
  {
    id: "snack-lord",
    name: "SNACK LORD",
    description: "Order food & drinks 5 times",
    icon: "🍿",
    xpReward: 100,
    unlocked: false,
  },
  {
    id: "front-row-warrior",
    name: "FRONT ROW WARRIOR",
    description: "Book a front row seat",
    icon: "🎯",
    xpReward: 50,
    unlocked: false,
  },
  {
    id: "vip-access",
    name: "VIP ACCESS",
    description: "Book a VIP seat",
    icon: "👑",
    xpReward: 100,
    unlocked: false,
  },
  {
    id: "streak-master",
    name: "STREAK MASTER",
    description: "Book 3 movies in one week",
    icon: "🔥",
    xpReward: 150,
    unlocked: false,
  },
  {
    id: "imax-explorer",
    name: "IMAX EXPLORER",
    description: "Watch a movie in IMAX",
    icon: "🖥️",
    xpReward: 75,
    unlocked: false,
  },
  {
    id: "social-butterfly",
    name: "SOCIAL BUTTERFLY",
    description: "Book 4+ seats in one transaction",
    icon: "🦋",
    xpReward: 100,
    unlocked: false,
  },
];
