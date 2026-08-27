import { ACHIEVEMENTS, type Achievement } from "@/lib/constants";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalBookings: number;
  memberSince: string;
  achievements: Achievement[];
  bookingHistory: BookingRecord[];
}

export interface BookingRecord {
  id: string;
  movieTitle: string;
  cinemaName: string;
  date: string;
  time: string;
  seats: string[];
  totalAmount: number;
  status: "completed" | "upcoming" | "cancelled";
  xpEarned: number;
}

export const mockUser: UserProfile = {
  id: "user-001",
  name: "Neo Runner",
  username: "@neorunner",
  avatarUrl: "",
  level: 5,
  xp: 2350,
  xpToNextLevel: 2500,
  totalBookings: 23,
  memberSince: "2025-03-15",
  achievements: ACHIEVEMENTS.map((a, i) => ({
    ...a,
    unlocked: i < 4, // First 4 unlocked
  })),
  bookingHistory: [
    {
      id: "NF-X7K2M9P1",
      movieTitle: "NEURAL STORM",
      cinemaName: "NEONFLIX Central Park",
      date: "2026-08-25",
      time: "18:00",
      seats: ["H7", "H8"],
      totalAmount: 180000,
      status: "completed",
      xpEarned: 125,
    },
    {
      id: "NF-Q3R8W5T2",
      movieTitle: "NEON SAMURAI",
      cinemaName: "NEONFLIX PIK Avenue",
      date: "2026-08-22",
      time: "20:30",
      seats: ["J5"],
      totalAmount: 90000,
      status: "completed",
      xpEarned: 100,
    },
    {
      id: "NF-M1N6B4V8",
      movieTitle: "CHROME RUNNERS",
      cinemaName: "NEONFLIX Kemang Village",
      date: "2026-08-30",
      time: "15:30",
      seats: ["F10", "F11", "F12"],
      totalAmount: 300000,
      status: "upcoming",
      xpEarned: 0,
    },
  ],
};
