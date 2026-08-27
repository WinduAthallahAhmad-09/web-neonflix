export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  return time;
}

export function generateBookingId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "NF-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getXPForLevel(level: number): number {
  return level * 500;
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

export function getLevelName(level: number): string {
  const names: Record<number, string> = {
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
  return names[Math.min(level, 10)] || "NEON GOD";
}

export function getNextShowDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
}
