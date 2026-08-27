"use client";

import { create } from "zustand";
import { type Achievement, ACHIEVEMENTS } from "@/lib/constants";
import { getLevelFromXP, getXPForLevel } from "@/lib/utils";

interface UserState {
  name: string;
  username: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalBookings: number;
  achievements: Achievement[];

  addXP: (amount: number) => void;
  unlockAchievement: (achievementId: string) => void;
  incrementBookings: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "Neo Runner",
  username: "@neorunner",
  level: 5,
  xp: 2350,
  xpToNextLevel: 2500,
  totalBookings: 23,
  achievements: ACHIEVEMENTS.map((a, i) => ({
    ...a,
    unlocked: i < 4,
  })),

  addXP: (amount) =>
    set((state) => {
      const newXP = state.xp + amount;
      const newLevel = getLevelFromXP(newXP);
      return {
        xp: newXP,
        level: newLevel,
        xpToNextLevel: getXPForLevel(newLevel),
      };
    }),

  unlockAchievement: (achievementId) =>
    set((state) => ({
      achievements: state.achievements.map((a) =>
        a.id === achievementId ? { ...a, unlocked: true } : a
      ),
    })),

  incrementBookings: () =>
    set((state) => ({
      totalBookings: state.totalBookings + 1,
    })),
}));
