import { TrailerHeroCarousel } from "@/components/home/TrailerHeroCarousel";
import { LuminaInteractiveList } from "@/components/ui/lumina-interactive-list";
import { ComingSoonSection } from "@/components/home/ComingSoonSection";
import { getNowShowing } from "@/data/movies";
import "@/app/homepage-effects.css";

export default function Home() {
  const nowShowing = getNowShowing();

  return (
    <main className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {/* ── Top Widescreen Real Movie Trailer Carousel (Cinema 21 Style) ── */}
      <TrailerHeroCarousel movies={nowShowing} />

      {/* ── Official NOW SHOWING: Lumina WebGL Liquid/Glass Cinematic Slider ── */}
      <LuminaInteractiveList movies={nowShowing} />

      {/* ── Gradient Separator ── */}
      <div className="neon-divider mx-auto my-6 max-w-5xl" />

      {/* ── Coming Soon Section ── */}
      <ComingSoonSection />
    </main>
  );
}
