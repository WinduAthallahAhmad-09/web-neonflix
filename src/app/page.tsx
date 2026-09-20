import { TrailerHeroCarousel } from "@/components/home/TrailerHeroCarousel";
import { LuminaCinemaList } from "@/components/home/LuminaCinemaList";
import { NowShowingSection } from "@/components/home/NowShowingSection";
import { ComingSoonSection } from "@/components/home/ComingSoonSection";
import { getNowShowing } from "@/data/movies";
import "@/app/homepage-effects.css";

export default function Home() {
  const nowShowing = getNowShowing();

  return (
    <main className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {/* ── Top Widescreen Real Movie Trailer Carousel (Cinema 21 Style) ── */}
      <TrailerHeroCarousel movies={nowShowing} />

      {/* ── Lumina Interactive Showcase: Curated Box Office Top 5 ── */}
      <LuminaCinemaList movies={nowShowing} />

      {/* ── Gradient Separator ── */}
      <div className="neon-divider mx-auto my-4 max-w-5xl" />

      {/* ── Now Showing (Times & Tickets) Section ── */}
      <div className="relative">
        <NowShowingSection />

        {/* ── Gradient Separator ── */}
        <div className="neon-divider mx-auto my-2 max-w-5xl" />

        {/* ── Coming Soon Section ── */}
        <ComingSoonSection />
      </div>
    </main>
  );
}
