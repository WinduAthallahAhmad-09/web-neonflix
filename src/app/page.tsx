import { TrailerHeroCarousel } from "@/components/home/TrailerHeroCarousel";
import { NowShowingSection } from "@/components/home/NowShowingSection";
import { ComingSoonSection } from "@/components/home/ComingSoonSection";
import { getNowShowing } from "@/data/movies";
import "@/app/homepage-effects.css";

export default function Home() {
  const nowShowing = getNowShowing();

  return (
    <main className="min-h-screen relative overflow-hidden bg-dark-bg text-white pb-16">
      {/* ── Top Widescreen Real Movie Trailer Carousel (Cinema 21 Style) ── */}
      <TrailerHeroCarousel movies={nowShowing} />

      {/* ── Now Showing (Option A: Expanding Flex Cinema Shelf) ── */}
      <div className="relative">
        <NowShowingSection />

        {/* ── Gradient Separator ── */}
        <div className="neon-divider mx-auto my-4 max-w-5xl" />

        {/* ── Coming Soon Section ── */}
        <ComingSoonSection />
      </div>
    </main>
  );
}
