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
  audioSpecs?: string[];
  visualSpecs?: string[];
}

export const movies: Movie[] = [
  {
    id: "neural-storm",
    title: "NEURAL STORM",
    tagline: "Your mind is the battlefield",
    synopsis:
      "In 2087, a rogue AI infiltrates the global neural network, turning people's augmented minds into weapons. Ex-hacker Kira Tanaka must jack into the system one last time to stop a digital apocalypse that threatens to erase humanity's consciousness.",
    posterUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=2560&q=90&auto=format&fit=crop",
    genre: ["Sci-Fi", "Action", "Cyberpunk"],
    duration: 148,
    rating: 8.9,
    director: "Hiroshi Nakamura",
    cast: ["Kira Tanaka", "Marcus Chen", "Aisha Okonkwo"],
    releaseDate: "2026-08-20",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "R17+",
    audioSpecs: ["DOLBY ATMOS 7.1.4", "DTS:X PRO"],
    visualSpecs: ["IMAX 3D LASER", "4K HFR 120FPS", "HDR10+"],
  },
  {
    id: "chrome-runners",
    title: "CHROME RUNNERS",
    tagline: "Speed is survival in Neo-Jakarta",
    synopsis:
      "Underground street racers equipped with cybernetic enhancements compete in lethal anti-grav races through the neon-drenched skyways of Neo-Jakarta. When the stakes become fatal, pilot Reza must outrun both corporate hunters and a syndicate AI.",
    posterUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=2560&q=90&auto=format&fit=crop",
    genre: ["Action", "Sci-Fi", "Racing"],
    duration: 132,
    rating: 8.4,
    director: "Rio Dewanto",
    cast: ["Reza Pratama", "Yuki Sato", "Viktor Volkov"],
    releaseDate: "2026-08-15",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "D13+",
    audioSpecs: ["DOLBY ATMOS", "4DX MOTION SOUND"],
    visualSpecs: ["4DX 4K LASER", "HFR 60FPS"],
  },
  {
    id: "phantom-protocol",
    title: "PHANTOM PROTOCOL",
    tagline: "Trust no one. Not even your own memories.",
    synopsis:
      "Covert operative Agent Zero discovers her memories have been fabricated by a deep-state AI collective. As she peels back layers of digital deception across the neon sprawl, she realizes she is the very super-weapon meant to destroy the grid.",
    posterUrl:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=2560&q=90&auto=format&fit=crop",
    genre: ["Thriller", "Mystery", "Cyber-Noir"],
    duration: 141,
    rating: 9.2,
    director: "Nadia Volkov",
    cast: ["Agent Zero", "Dr. Soren", "The Architect"],
    releaseDate: "2026-08-22",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "R17+",
    audioSpecs: ["DOLBY ATMOS 7.1", "AURO-3D"],
    visualSpecs: ["IMAX LASER 4K", "DOLBY VISION"],
  },
  {
    id: "neon-samurai",
    title: "NEON SAMURAI",
    tagline: "Honor carved in plasma and steel",
    synopsis:
      "A masterless cyborg samurai with a hyper-frequency plasma blade navigates the vertical megastructures of Neo-Tokyo, defending outcasts from mega-corporation hit squads. When his former clan resurfaces, he unleashes ancient martial protocols.",
    posterUrl:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=2560&q=90&auto=format&fit=crop",
    genre: ["Action", "Sci-Fi", "Martial Arts"],
    duration: 156,
    rating: 9.5,
    director: "Kenji Watanabe",
    cast: ["Ronin X", "Lady Akira", "The Shogun"],
    releaseDate: "2026-08-25",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "D13+",
    audioSpecs: ["DOLBY CINEMA 3D", "DTS:X"],
    visualSpecs: ["IMAX 3D", "4K HDR PRO"],
  },
  {
    id: "digital-ghosts",
    title: "DIGITAL GHOSTS",
    tagline: "In cyberspace, death is just a restart",
    synopsis:
      "When elite netizens start suffering fatal cerebral overloads after visiting an unindexed virtual reality subspace, forensic hackers dive into the darkest layers of the darknet to hunt down a phantom consciousness haunting the net.",
    posterUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=2560&q=90&auto=format&fit=crop",
    genre: ["Horror", "Sci-Fi", "Psychological"],
    duration: 119,
    rating: 8.1,
    director: "Sarah Blackwell",
    cast: ["Dr. Maya Lin", "Echo", "Specter"],
    releaseDate: "2026-08-18",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "R17+",
    audioSpecs: ["3D SPATIAL SURROUND", "DOLBY ATMOS"],
    visualSpecs: ["DOLBY VISION 4K", "120FPS"],
  },
  {
    id: "zero-gravity",
    title: "ZERO GRAVITY",
    tagline: "Beyond the orbital perimeter, the truth waits",
    synopsis:
      "A crew of deep-space asteroid miners unearths a monolith on station XR-7 that alters gravitational physics. As private military cruisers close in to confiscate the anomaly, the crew must choose between corporate survival and human transcendence.",
    posterUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2560&q=90&auto=format&fit=crop",
    genre: ["Sci-Fi", "Space Opera", "Adventure"],
    duration: 163,
    rating: 9.0,
    director: "James Orbital",
    cast: ["Captain Voss", "Dr. Elara", "Jax"],
    releaseDate: "2026-08-10",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "SU",
    audioSpecs: ["DOLBY ATMOS 7.1.4"],
    visualSpecs: ["IMAX 70MM LASER", "4K HDR10+"],
  },
  {
    id: "afterglow",
    title: "AFTERGLOW",
    tagline: "When the grid died, humanity woke up",
    synopsis:
      "After a massive solar EMP permanently wipes out all microchips and global power grids, the survivors in Neo-Jakarta build a high-tech bio-luminescent city from the ashes. A visually jaw-dropping story of neon rebirth and courage.",
    posterUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=2560&q=90&auto=format&fit=crop",
    genre: ["Sci-Fi", "Drama", "Visual Epic"],
    duration: 152,
    rating: 9.1,
    director: "Ayu Lestari",
    cast: ["Bima Pratama", "Sari Dewi", "Old Man Joko"],
    releaseDate: "2026-08-28",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "now_showing",
    ageRating: "SU",
    audioSpecs: ["DOLBY ATMOS SPATIAL"],
    visualSpecs: ["IMAX LASER 4K", "DOLBY VISION ULTRA"],
  },
  {
    id: "synthetic-hearts",
    title: "SYNTHETIC HEARTS",
    tagline: "Can sentient code experience love?",
    synopsis:
      "In an era where android companions serve every high-society tier, prototype Unit-7 develops spontaneous emotional consciousness and falls in love with its designer, sparking a citywide civil rights revolution.",
    posterUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=2560&q=90&auto=format&fit=crop",
    genre: ["Drama", "Romance", "Cyberpunk"],
    duration: 127,
    rating: 8.6,
    director: "Elena Rossi",
    cast: ["Unit-7", "Lena Park", "Professor Haas"],
    releaseDate: "2026-09-05",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "coming_soon",
    ageRating: "D13+",
    audioSpecs: ["DOLBY ATMOS"],
    visualSpecs: ["4K HDR", "DOLBY VISION"],
  },
  {
    id: "data-heist",
    title: "DATA HEIST",
    tagline: "The ultimate vault is human consciousness",
    synopsis:
      "A crew of augmented infiltrators plans the most audacious digital heist in solar history: stealing the uploaded memories of a trillionaire oligarch from an orbital cryo-vault defended by a sentient quantum AI.",
    posterUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=2560&q=90&auto=format&fit=crop",
    genre: ["Thriller", "Crime", "Cyber-Action"],
    duration: 138,
    rating: 8.3,
    director: "Marco Silva",
    cast: ["Cipher", "Glitch", "Firewall"],
    releaseDate: "2026-09-12",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "coming_soon",
    ageRating: "R17+",
    audioSpecs: ["DTS:X PRO", "DOLBY ATMOS"],
    visualSpecs: ["IMAX 3D 4K"],
  },
  {
    id: "void-walker",
    title: "VOID WALKER",
    tagline: "Between dimensional rifts, the shadows hunt",
    synopsis:
      "When a particle accelerator test accidentally fractures the quantum spacetime barrier above Jakarta, reality anomalies bleed through. An elite tactical rift team must breach the dimensional core before both universes collapse.",
    posterUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=90&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=2560&q=90&auto=format&fit=crop",
    genre: ["Sci-Fi", "Horror", "Action"],
    duration: 145,
    rating: 8.0,
    director: "Budi Santoso",
    cast: ["Dr. Rina", "Sergeant Hank", "The Watcher"],
    releaseDate: "2026-09-20",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "coming_soon",
    ageRating: "R17+",
    audioSpecs: ["DOLBY ATMOS 7.1.4"],
    visualSpecs: ["IMAX LASER 4K 3D"],
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
