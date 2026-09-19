import { HeroSection } from "@/components/home/HeroSection";
import { NowShowingSection } from "@/components/home/NowShowingSection";
import { ComingSoonSection } from "@/components/home/ComingSoonSection";
import { StatsBar } from "@/components/home/StatsBar";
import { NewsTicker } from "@/components/effects/NewsTicker";
import { getNowShowing } from "@/data/movies";
import "@/app/homepage-effects.css";

export default function Home() {
  const nowShowing = getNowShowing();
  const featuredMovie = nowShowing[0];

  return (
    <main className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {/* Cinematic Full-Screen Hero Carousel */}
      {featuredMovie && <HeroSection movie={featuredMovie} />}

      {/* Live ticker */}
      <NewsTicker />

      {/* Animated stats counter */}
      <StatsBar />

      {/* Neon glowing divider */}
      <div className="neon-divider mx-0 my-2" />

      {/* Now Showing — scroll reveal cards */}
      <div className="relative">
        <NowShowingSection />

        {/* Gradient separator */}
        <div className="neon-divider mx-auto my-2 max-w-5xl" />

        <ComingSoonSection />
      </div>
    </main>
  );
}
