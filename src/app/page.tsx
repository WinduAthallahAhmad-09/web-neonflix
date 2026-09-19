import { TrailerHeroCarousel } from "@/components/home/TrailerHeroCarousel";
import { NowShowingSection } from "@/components/home/NowShowingSection";
import { ComingSoonSection } from "@/components/home/ComingSoonSection";
import { StatsBar } from "@/components/home/StatsBar";
import { NewsTicker } from "@/components/effects/NewsTicker";
import { getNowShowing } from "@/data/movies";
import "@/app/homepage-effects.css";

export default function Home() {
  const nowShowing = getNowShowing();

  return (
    <main className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {/* ── Top Widescreen Real Movie Trailer Carousel (Cinema 21 Style) ── */}
      <TrailerHeroCarousel movies={nowShowing} />

      {/* ── Live Cinema Broadcast Ticker ── */}
      <NewsTicker />

      {/* ── Operator Stats Counter Pods ── */}
      <StatsBar />

      {/* ── Clean Neon Divider ── */}
      <div className="neon-divider mx-0 my-2" />

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
