import { HeroSection } from "@/components/home/HeroSection";
import { NowShowingSection } from "@/components/home/NowShowingSection";
import { ComingSoonSection } from "@/components/home/ComingSoonSection";
import { getNowShowing } from "@/data/movies";

export default function Home() {
  const nowShowing = getNowShowing();
  // Feature the first movie in the hero section
  const featuredMovie = nowShowing[0];

  return (
    <main className="min-h-screen bg-dark-bg text-white">
      {featuredMovie && <HeroSection movie={featuredMovie} />}
      
      <div className="relative">
        <NowShowingSection />
        
        {/* Decorative divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-border to-transparent my-4" />
        
        <ComingSoonSection />
      </div>
    </main>
  );
}
