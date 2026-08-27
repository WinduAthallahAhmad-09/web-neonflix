import { type StudioType } from "@/lib/constants";

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  studioId: string;
  studioName: string;
  studioType: StudioType;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

function generateShowtimes(): Showtime[] {
  const showtimes: Showtime[] = [];
  const today = new Date();

  const movieSchedules: Record<string, string[]> = {
    "spiderman-brand-new-day": ["neonflix-central", "neonflix-pik", "neonflix-kemang"],
    "batman-dark-knight": ["neonflix-central", "neonflix-pik", "neonflix-kemang"],
    "cyberpunk-edgerunners": ["neonflix-central", "neonflix-pik", "neonflix-kemang"],
    "avengers-assemble": ["neonflix-central", "neonflix-pik", "neonflix-kemang"],
    "the-odyssey": ["neonflix-central", "neonflix-pik", "neonflix-kemang"],
  };

  const studioConfigs: Record<
    string,
    { id: string; name: string; type: StudioType; seats: number }[]
  > = {
    "neonflix-central": [
      { id: "cp-s1", name: "Studio 1", type: "Regular", seats: 180 },
      { id: "cp-s3", name: "Studio 3", type: "IMAX", seats: 250 },
      { id: "cp-s4", name: "Studio 4", type: "4DX", seats: 120 },
      { id: "cp-s5", name: "Studio 5", type: "Premiere", seats: 60 },
    ],
    "neonflix-pik": [
      { id: "pik-s1", name: "Studio 1", type: "Regular", seats: 160 },
      { id: "pik-s3", name: "Studio 3", type: "IMAX", seats: 220 },
      { id: "pik-s4", name: "Studio 4", type: "Premiere", seats: 50 },
    ],
    "neonflix-kemang": [
      { id: "km-s1", name: "Studio 1", type: "Regular", seats: 150 },
      { id: "km-s3", name: "Studio 3", type: "4DX", seats: 100 },
      { id: "km-s4", name: "Studio 4", type: "Premiere", seats: 55 },
    ],
  };

  const times = ["10:30", "13:00", "15:30", "18:00", "20:30", "23:00"];

  const pricesByType: Record<StudioType, number> = {
    Regular: 50000,
    IMAX: 90000,
    "4DX": 100000,
    Premiere: 125000,
  };

  Object.entries(movieSchedules).forEach(([movieId, cinemaIds]) => {
    cinemaIds.forEach((cinemaId) => {
      const studios = studioConfigs[cinemaId];
      if (!studios) return;

      const studio = studios[Math.floor(Math.random() * studios.length)];

      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        const date = new Date(today);
        date.setDate(today.getDate() + dayOffset);
        const dateStr = date.toISOString().split("T")[0];

        const dayTimes = times.filter(() => Math.random() > 0.2);

        dayTimes.forEach((time) => {
          const availableSeats =
            Math.floor(Math.random() * (studio.seats * 0.6)) +
            Math.floor(studio.seats * 0.2);
          showtimes.push({
            id: `${movieId}-${cinemaId}-${dateStr}-${time.replace(":", "")}`,
            movieId,
            cinemaId,
            studioId: studio.id,
            studioName: studio.name,
            studioType: studio.type,
            date: dateStr,
            time,
            price: pricesByType[studio.type],
            availableSeats,
            totalSeats: studio.seats,
          });
        });
      }
    });
  });

  return showtimes;
}

export const showtimes = generateShowtimes();

export function getShowtimesByMovie(movieId: string): Showtime[] {
  return showtimes.filter((s) => s.movieId === movieId);
}

export function getShowtimesByMovieAndDate(
  movieId: string,
  date: string
): Showtime[] {
  return showtimes.filter((s) => s.movieId === movieId && s.date === date);
}

export function getShowtimeById(id: string): Showtime | undefined {
  return showtimes.find((s) => s.id === id);
}

export function getShowtimesByMovieDateCinema(
  movieId: string,
  date: string,
  cinemaId: string
): Showtime[] {
  return showtimes.filter(
    (s) =>
      s.movieId === movieId && s.date === date && s.cinemaId === cinemaId
  );
}
