export interface Cinema {
  id: string;
  name: string;
  location: string;
  address: string;
  facilities: string[];
  studios: Studio[];
}

export interface Studio {
  id: string;
  name: string;
  type: "Regular" | "IMAX" | "4DX" | "Premiere";
  capacity: number;
  rows: number;
  seatsPerRow: number;
}

export const cinemas: Cinema[] = [
  {
    id: "neonflix-central",
    name: "NEONFLIX Central Park",
    location: "Central Jakarta",
    address: "Central Park Mall, Lt. 3, Jl. Letjen S. Parman Kav. 28, Jakarta Barat",
    facilities: ["Dolby Atmos", "4DX", "IMAX", "VIP Lounge", "Food Court", "Parking"],
    studios: [
      { id: "cp-s1", name: "Studio 1", type: "Regular", capacity: 180, rows: 12, seatsPerRow: 15 },
      { id: "cp-s2", name: "Studio 2", type: "Regular", capacity: 180, rows: 12, seatsPerRow: 15 },
      { id: "cp-s3", name: "Studio 3", type: "IMAX", capacity: 250, rows: 14, seatsPerRow: 18 },
      { id: "cp-s4", name: "Studio 4", type: "4DX", capacity: 120, rows: 8, seatsPerRow: 15 },
      { id: "cp-s5", name: "Studio 5", type: "Premiere", capacity: 60, rows: 6, seatsPerRow: 10 },
    ],
  },
  {
    id: "neonflix-pik",
    name: "NEONFLIX PIK Avenue",
    location: "North Jakarta",
    address: "PIK Avenue Mall, Lt. 4, Jl. Pantai Indah Kapuk, Jakarta Utara",
    facilities: ["Dolby Atmos", "IMAX", "VIP Lounge", "Cafe", "Parking"],
    studios: [
      { id: "pik-s1", name: "Studio 1", type: "Regular", capacity: 160, rows: 10, seatsPerRow: 16 },
      { id: "pik-s2", name: "Studio 2", type: "Regular", capacity: 160, rows: 10, seatsPerRow: 16 },
      { id: "pik-s3", name: "Studio 3", type: "IMAX", capacity: 220, rows: 12, seatsPerRow: 18 },
      { id: "pik-s4", name: "Studio 4", type: "Premiere", capacity: 50, rows: 5, seatsPerRow: 10 },
    ],
  },
  {
    id: "neonflix-kemang",
    name: "NEONFLIX Kemang Village",
    location: "South Jakarta",
    address: "Lippo Mall Kemang, Lt. 3, Jl. Pangeran Antasari 36, Jakarta Selatan",
    facilities: ["Dolby Atmos", "4DX", "Premiere", "Cafe", "Parking"],
    studios: [
      { id: "km-s1", name: "Studio 1", type: "Regular", capacity: 150, rows: 10, seatsPerRow: 15 },
      { id: "km-s2", name: "Studio 2", type: "Regular", capacity: 150, rows: 10, seatsPerRow: 15 },
      { id: "km-s3", name: "Studio 3", type: "4DX", capacity: 100, rows: 8, seatsPerRow: 12 },
      { id: "km-s4", name: "Studio 4", type: "Premiere", capacity: 55, rows: 5, seatsPerRow: 11 },
    ],
  },
];

export function getCinemaById(id: string): Cinema | undefined {
  return cinemas.find((c) => c.id === id);
}
