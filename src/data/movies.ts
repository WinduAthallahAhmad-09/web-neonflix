export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  genre: string[];
  duration: number; // minutes
  rating: number; // 0-10
  director: string;
  cast: string[];
  releaseDate: string;
  trailerUrl: string;
  status: "now_showing" | "coming_soon";
  ageRating: string;
}

export const movies: Movie[] = [
  {
    id: "neural-storm",
    title: "NEURAL STORM",
    tagline: "Your mind is the battlefield",
    synopsis:
      "In 2087, a rogue AI infiltrates the global neural network, turning people's augmented minds into weapons. Ex-hacker Kira Tanaka must jack into the system one last time to stop a digital apocalypse that threatens to erase humanity's consciousness.",
    posterUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=800&fit=crop",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: 148,
    rating: 8.7,
    director: "Hiroshi Nakamura",
    cast: ["Kira Tanaka", "Marcus Chen", "Aisha Okonkwo"],
    releaseDate: "2026-08-20",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "R17+",
  },
  {
    id: "chrome-runners",
    title: "CHROME RUNNERS",
    tagline: "Speed is survival",
    synopsis:
      "Underground street racers equipped with cybernetic enhancements compete in illegal races through the neon-lit streets of Neo-Jakarta. When the stakes become lethal, driver Reza must outrun both the law and a deadly syndicate.",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=800&fit=crop",
    genre: ["Action", "Sci-Fi", "Racing"],
    duration: 132,
    rating: 8.2,
    director: "Rio Dewanto",
    cast: ["Reza Pratama", "Yuki Sato", "Viktor Volkov"],
    releaseDate: "2026-08-15",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "D13+",
  },
  {
    id: "phantom-protocol",
    title: "PHANTOM PROTOCOL",
    tagline: "Trust no one. Not even yourself.",
    synopsis:
      "Agent Zero discovers her memories have been fabricated by a shadow government. As she peels back layers of deception, she realizes she might be the very weapon she was trained to destroy.",
    posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1920&h=800&fit=crop",
    genre: ["Thriller", "Mystery", "Action"],
    duration: 141,
    rating: 9.1,
    director: "Nadia Volkov",
    cast: ["Agent Zero", "Dr. Soren", "The Architect"],
    releaseDate: "2026-08-22",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "R17+",
  },
  {
    id: "neon-samurai",
    title: "NEON SAMURAI",
    tagline: "Honor in a world without rules",
    synopsis:
      "A masterless samurai with a plasma blade navigates the lawless districts of Neo-Tokyo, protecting the forgotten citizens from corporate warlords. His past catches up when his former clan resurfaces with a devastating ultimatum.",
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=1920&h=800&fit=crop",
    genre: ["Action", "Drama", "Sci-Fi"],
    duration: 156,
    rating: 9.3,
    director: "Kenji Watanabe",
    cast: ["Ronin X", "Lady Akira", "The Shogun"],
    releaseDate: "2026-08-25",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "D13+",
  },
  {
    id: "digital-ghosts",
    title: "DIGITAL GHOSTS",
    tagline: "Death is just a reboot",
    synopsis:
      "When people start dying in the real world after encountering a mysterious entity in virtual reality, a team of digital forensics experts must enter the deadliest VR space ever created to stop the digital phantom.",
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=800&fit=crop",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    duration: 119,
    rating: 7.8,
    director: "Sarah Blackwell",
    cast: ["Dr. Maya Lin", "Echo", "Specter"],
    releaseDate: "2026-08-18",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "R17+",
  },
  {
    id: "zero-gravity",
    title: "ZERO GRAVITY",
    tagline: "The sky is not the limit",
    synopsis:
      "A crew of space miners discovers an alien artifact on asteroid XR-7 that bends the laws of physics. As corporate warships close in, they must decide: hand over the discovery or use its power to change the fate of humanity.",
    posterUrl: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=800&fit=crop",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    duration: 163,
    rating: 8.9,
    director: "James Orbital",
    cast: ["Captain Voss", "Dr. Elara", "Jax"],
    releaseDate: "2026-08-10",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "SU",
  },
  {
    id: "synthetic-hearts",
    title: "SYNTHETIC HEARTS",
    tagline: "Can a machine learn to love?",
    synopsis:
      "In a world where androids serve every human need, one synthetic being develops genuine emotions and falls for its owner. A touching story about what it truly means to be alive, set against a dystopian backdrop.",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1920&h=800&fit=crop",
    genre: ["Drama", "Romance", "Sci-Fi"],
    duration: 127,
    rating: 8.5,
    director: "Elena Rossi",
    cast: ["Unit-7", "Lena Park", "Professor Haas"],
    releaseDate: "2026-09-05",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "coming_soon",
    ageRating: "D13+",
  },
  {
    id: "data-heist",
    title: "DATA HEIST",
    tagline: "The ultimate score is information",
    synopsis:
      "A crew of elite hackers plans the most ambitious digital heist in history: stealing the consciousness backup of the world's richest person. But the vault is guarded by an AI that learns from every intrusion attempt.",
    posterUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=800&fit=crop",
    genre: ["Thriller", "Crime", "Sci-Fi"],
    duration: 138,
    rating: 8.0,
    director: "Marco Silva",
    cast: ["Cipher", "Glitch", "Firewall"],
    releaseDate: "2026-09-12",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "coming_soon",
    ageRating: "R17+",
  },
  {
    id: "void-walker",
    title: "VOID WALKER",
    tagline: "Between dimensions, there are monsters",
    synopsis:
      "A physicist accidentally opens a portal to a parallel dimension filled with nightmarish creatures. As the rift widens and threatens to consume Jakarta, she must find a way to seal it before both worlds collide.",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=800&fit=crop",
    genre: ["Sci-Fi", "Horror", "Action"],
    duration: 145,
    rating: 7.6,
    director: "Budi Santoso",
    cast: ["Dr. Rina", "Sergeant Hank", "The Watcher"],
    releaseDate: "2026-09-20",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "coming_soon",
    ageRating: "R17+",
  },
  {
    id: "afterglow",
    title: "AFTERGLOW",
    tagline: "The end is just the beginning",
    synopsis:
      "After a solar flare wipes out all electronics on Earth, survivors in Jakarta must rebuild society from scratch. A hopeful post-apocalyptic tale of resilience, community, and rediscovering what matters most.",
    posterUrl: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1920&h=800&fit=crop",
    genre: ["Drama", "Sci-Fi", "Adventure"],
    duration: 152,
    rating: 8.8,
    director: "Ayu Lestari",
    cast: ["Bima", "Sari", "Old Man Joko"],
    releaseDate: "2026-08-28",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "SU",
  },
];

export function getMovieById(id: string): Movie | undefined {
  return movies.find((m) => m.id === id);
}

export function getNowShowing(): Movie[] {
  return movies.filter((m) => m.status === "now_showing");
}

export function getComingSoon(): Movie[] {
  return movies.filter((m) => m.status === "coming_soon");
}
