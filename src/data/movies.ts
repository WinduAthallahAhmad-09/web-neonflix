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
    id: "spiderman-brand-new-day",
    title: "SPIDER-MAN: BRAND NEW DAY",
    tagline: "A fresh dawn over a forgotten identity",
    synopsis:
      "Setelah seluruh dunia melupakan identitas Peter Parker, ia memulai hidup baru di jalanan kota New York sebagai pahlawan tanpa nama. Namun ketika gelombang sindikat kejahatan berteknologi tinggi mulai mengancam ketertiban kota, Spider-Man harus berjuang kembali membela yang lemah dan membuktikan bahwa kepahlawanan sejati lahir dari ketulusan hati dan pengorbanan tanpa pamrih.",
    posterUrl: "/images/posters/spiderman-poster.png",
    backdropUrl: "/images/backdrops/spiderman-backdrop.webp",
    genre: ["Action", "Adventure", "Superhero", "Sci-Fi"],
    duration: 154,
    rating: 9.4,
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Jacob Batalon", "Charlie Cox"],
    releaseDate: "2026-08-28",
    trailerUrl: "https://youtu.be/daXaTug8rL4",
    status: "now_showing",
    ageRating: "SU",
    audioSpecs: ["DOLBY ATMOS 7.1.4", "DTS:X PRO"],
    visualSpecs: ["IMAX 3D LASER 4K", "DOLBY VISION", "HFR 120FPS"],
  },
  {
    id: "batman-dark-knight",
    title: "BATMAN: THE DARK KNIGHT",
    tagline: "Why So Serious? Order versus total Chaos",
    synopsis:
      "Dengan bantuan Letnan Jim Gordon dan Jaksa Wilayah Harvey Dent, Batman berhasil menekan kejahatan terorganisir di Gotham. Namun ketertiban itu hancur saat dalang kriminal psikopat bernama Joker muncul, melepaskan gelombang teror anarkis yang memaksa sang Ksatria Kegelapan menghadapi garis tipis antara pahlawan sejati dan penjahat.",
    posterUrl: "/images/posters/batman-poster.png",
    backdropUrl: "/images/backdrops/batman-backdrop.png",
    genre: ["Action", "Crime", "Thriller", "Dark Drama"],
    duration: 152,
    rating: 9.8,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Gary Oldman", "Michael Caine"],
    releaseDate: "2026-08-25",
    trailerUrl: "https://youtu.be/EXeTwQWrcwY",
    status: "now_showing",
    ageRating: "D13+",
    audioSpecs: ["DOLBY CINEMA 3D", "DTS:X MASTER AUDIO"],
    visualSpecs: ["IMAX 70MM 4K", "HDR10+", "DOLBY VISION"],
  },
  {
    id: "cyberpunk-edgerunners",
    title: "CYBERPUNK: EDGERUNNERS",
    tagline: "City of dreams, city of chrome and burning souls",
    synopsis:
      "Di kota metropolitan distopia Night City yang terobsesi dengan modifikasi tubuh cybernetic dan kekuasaan korporat, David Martinez—seorang anak jalanan berbakat—kehilangan segalanya dalam tragedi berdarah. Demi bertahan hidup dan mewujudkan impian wanita yang dicintainya (Lucy), ia memasang implan militer terlarang Sandevistan dan menjadi tentara bayaran legendaris: seorang Edgerunner.",
    posterUrl: "/images/posters/edgerunners-poster.png",
    backdropUrl: "/images/backdrops/edgerunners-backdrop.jpg",
    genre: ["Anime", "Cyberpunk", "Action", "Sci-Fi", "Drama"],
    duration: 140,
    rating: 9.6,
    director: "Hiroyuki Imaishi",
    cast: ["David Martinez", "Lucy Kushinada", "Rebecca", "Maine", "Faraday"],
    releaseDate: "2026-08-26",
    trailerUrl: "https://youtu.be/x4ztgjvfU60",
    status: "now_showing",
    ageRating: "R17+",
    audioSpecs: ["SPATIAL 3D SOUND", "DOLBY ATMOS"],
    visualSpecs: ["IMAX LASER 4K", "120FPS HDR ULTRA"],
  },
  {
    id: "avengers-assemble",
    title: "AVENGERS: ASSEMBLE",
    tagline: "Earth's mightiest heroes stand united",
    synopsis:
      "Ketika dewa Asgard yang licik, Loki, memperoleh kubus kosmik Tesseract dan memimpin pasukan alien Chitauri untuk menaklukkan planet Bumi, Nick Fury mengaktifkan 'Inisiatif Avengers'. Iron Man, Captain America, Thor, The Hulk, Black Widow, dan Hawkeye harus mengesampingkan ego pribadi untuk bersatu menjadi garis pertahanan terakhir seluruh umat manusia.",
    posterUrl: "/images/posters/avengers-poster.png",
    backdropUrl: "/images/backdrops/avengers-backdrop.webp",
    genre: ["Action", "Sci-Fi", "Adventure", "Superhero"],
    duration: 143,
    rating: 9.3,
    director: "Joss Whedon",
    cast: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Scarlett Johansson", "Mark Ruffalo"],
    releaseDate: "2026-08-20",
    trailerUrl: "https://youtu.be/NPoHPNeU9fc",
    status: "now_showing",
    ageRating: "SU",
    audioSpecs: ["DOLBY ATMOS 7.1", "AURO-3D"],
    visualSpecs: ["IMAX 3D 4K", "DOLBY VISION ULTRA"],
  },
  {
    id: "the-odyssey",
    title: "THE ODYSSEY",
    tagline: "The epic mythical journey across wrath and darkness",
    synopsis:
      "Setelah kemenangan legendaris dalam Perang Troya, Raja Ithaca yang cerdik, Odysseus, memimpin pasukannya menempuh pelayaran pulang ke tanah air. Namun murka Dewa Laut Poseidon mengutuk perjalanan mereka, melemparkan armada mereka ke pulau-pulau terkutuk yang dihuni Cyclops, penyihir Circe, godaan maut Siren, dan monster raksasa Scylla.",
    posterUrl: "/images/posters/odyssey-poster.png",
    backdropUrl: "/images/backdrops/odyssey-backdrop.webp",
    genre: ["Action", "Adventure", "Epic Drama", "Mythology"],
    duration: 168,
    rating: 9.0,
    director: "Denis Villeneuve",
    cast: ["Armand Assante", "Greta Scacchi", "Isabella Rossellini", "Christopher Lee"],
    releaseDate: "2026-08-22",
    trailerUrl: "https://youtu.be/LgOMT7ka6do",
    status: "now_showing",
    ageRating: "D13+",
    audioSpecs: ["DOLBY ATMOS 7.1.4", "DTS:X"],
    visualSpecs: ["IMAX 70MM LASER", "4K HDR10+"],
  },
  {
    id: "spiderman-beyond",
    title: "SPIDER-MAN: BEYOND MULTIVERSE",
    tagline: "Breaking the canon across infinite realities",
    synopsis:
      "Miles Morales melintasi dimensi alternatif untuk menyelamatkan orang-orang yang dicintainya dari kehancuran multiverse. Pertarungan tak terelakkan terjadi ketika ia harus menentang seluruh Spider-Society demi menulis takdirnya sendiri.",
    posterUrl: "/images/posters/spiderman-poster.png",
    backdropUrl: "/images/backdrops/spiderman-backdrop.webp",
    genre: ["Animation", "Action", "Multiverse Sci-Fi"],
    duration: 145,
    rating: 9.5,
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    releaseDate: "2026-09-10",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "coming_soon",
    ageRating: "SU",
    audioSpecs: ["DOLBY ATMOS"],
    visualSpecs: ["IMAX 3D 4K", "DOLBY VISION"],
  },
  {
    id: "lotr-hunt-for-gollum",
    title: "THE LORD OF THE RINGS: THE HUNT FOR GOLLUM",
    tagline: "The shadow lengthens across the wild lands of Middle-earth",
    synopsis:
      "Berlatar antara perayaan ulang tahun Bilbo dan awal pengembaraan Fellowship. Gandalf dan Aragorn menembus belantara kelam Middle-earth untuk memburu dan menangkap Gollum demi mengamankan rahasia Cincin Utama sebelum jatuh ke tangan utusan Sauron dari kegelapan Mordor.",
    posterUrl: "/images/posters/lotr-gollum-poster.png",
    backdropUrl: "/images/posters/lotr-gollum-poster.png",
    genre: ["Epic Fantasy", "Adventure", "Mythology"],
    duration: 165,
    rating: 9.8,
    director: "Andy Serkis",
    cast: [
      "Andy Serkis",
      "Ian McKellen",
      "Kate Winslet",
      "Jamie Dornan",
      "Leo Woodall",
      "Lee Pace",
      "Elijah Wood",
    ],
    releaseDate: "2027-12-17",
    trailerUrl: "https://youtu.be/daXaTug8rL4",
    status: "coming_soon",
    ageRating: "D13+",
    audioSpecs: ["DOLBY ATMOS 7.1.4", "DTS:X PRO"],
    visualSpecs: ["IMAX 70MM", "DOLBY VISION", "LASER ULTRA"],
  },
  {
    id: "godzilla-kong-supernova",
    title: "GODZILLA X KONG: SUPERNOVA",
    tagline: "Cosmic titans collide as ancient skies rupture",
    synopsis:
      "Ketika gelombang energi radiasi kosmik tak dikenal mengoyak atmosfer bumi dan memicu anomali gravitasi kemunculan SpaceGodzilla, kedamaian di Hollow Earth berakhir. Kong dan Godzilla terpaksa melepaskan resonansi purba terbesar demi mencegah kehancuran total biosfer dunia.",
    posterUrl: "/images/posters/godzilla-supernova-poster.png",
    backdropUrl: "/images/posters/godzilla-supernova-poster.png",
    genre: ["Monsterverse", "Sci-Fi", "Action"],
    duration: 145,
    rating: 9.5,
    director: "Grant Sputore",
    cast: ["Dan Stevens", "Kaitlyn Dever", "Jack O'Connell", "Delroy Lindo", "Sam Neill"],
    releaseDate: "2027-03-26",
    trailerUrl: "https://youtu.be/qqrpMRDuPfc",
    status: "coming_soon",
    ageRating: "D13+",
    audioSpecs: ["DOLBY CINEMA 3D", "DTS:X"],
    visualSpecs: ["IMAX LASER 3D", "DOLBY ATMOS", "D-BOX 4DX"],
  },
  {
    id: "spiderman-beyond-the-spider-verse",
    title: "SPIDER-MAN: BEYOND THE SPIDER-VERSE",
    tagline: "Break the canon. Defy the destiny.",
    synopsis:
      "Miles Morales terjebak sendirian di Earth-42 bersama varian Prowler dirinya, sementara The Spot mulai meruntuhkan fondasi seluruh multiverse. Miles harus menyatukan sekutu lamanya untuk mendobrak takdir kanon yang diyakini Spider-Society dan menyelamatkan keluarganya.",
    posterUrl: "/images/posters/spiderman-beyond-poster.png",
    backdropUrl: "/images/posters/spiderman-beyond-poster.png",
    genre: ["Animation", "Multiverse Sci-Fi", "Action"],
    duration: 150,
    rating: 9.9,
    director: "Bob Persichetti & Justin K. Thompson",
    cast: [
      "Shameik Moore",
      "Hailee Steinfeld",
      "Oscar Isaac",
      "Daniel Kaluuya",
      "Jason Schwartzman",
    ],
    releaseDate: "2027-06-18",
    trailerUrl: "https://youtu.be/cqGjhVJWtEg",
    status: "coming_soon",
    ageRating: "SU",
    audioSpecs: ["DOLBY ATMOS", "SPATIAL 3D SOUND"],
    visualSpecs: ["IMAX 3D 4K", "DOLBY VISION", "HFR 120FPS"],
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
