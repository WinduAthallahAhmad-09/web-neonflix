"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlitchText } from "../ui/GlitchText";
import { useUserStore } from "@/store/userStore";
import { soundFx } from "@/lib/soundFx";
import { Menu, X, Shield, Film, Flame, Clapperboard, Sparkles, Award } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("EXPLORE");
  const pathname = usePathname();
  const { level, xp } = useUserStore();

  // Prevents scroll listener from fighting/jittering with button clicks during smooth scroll
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { name: "EXPLORE", href: "/", icon: Film },
    { name: "NOW SHOWING", href: "/#now-showing", icon: Clapperboard },
    { name: "COMING SOON", href: "/#coming-soon", icon: Sparkles },
    { name: "REWARD", href: "/profile", icon: Award },
  ];

  // Keep activeTab in sync with pathname & scroll position on homepage
  useEffect(() => {
    if (pathname === "/profile") {
      setActiveTab("REWARD");
      return;
    }

    if (pathname === "/") {
      const handleScroll = () => {
        // If user recently clicked a tab, let the smooth scroll finish without jitter
        if (isClickScrollingRef.current) return;

        const comingSoonElem = document.getElementById("coming-soon");
        const nowShowingElem = document.getElementById("now-showing");

        if (comingSoonElem) {
          const csRect = comingSoonElem.getBoundingClientRect();
          if (csRect.top <= 350) {
            setActiveTab("COMING SOON");
            return;
          }
        }

        if (nowShowingElem) {
          const nsRect = nowShowingElem.getBoundingClientRect();
          if (nsRect.top <= 350) {
            setActiveTab("NOW SHOWING");
            return;
          }
        }

        setActiveTab("EXPLORE");
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    } else {
      setActiveTab("EXPLORE");
    }
  }, [pathname]);

  const handleNavClick = (link: (typeof navLinks)[0], e: React.MouseEvent) => {
    soundFx.playClick();

    // Lock scroll listener immediately so the red pill glides smoothly without vibrating
    isClickScrollingRef.current = true;
    setActiveTab(link.name);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    // Release lock after smooth scroll animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1000);

    if (link.name === "EXPLORE" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (link.name === "NOW SHOWING" && pathname === "/") {
      e.preventDefault();
      const elem = document.getElementById("now-showing");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (link.name === "COMING SOON" && pathname === "/") {
      e.preventDefault();
      const elem = document.getElementById("coming-soon");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-8 pb-3 px-4 sm:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left: Brand / Logo */}
        <Link
          href="/"
          onClick={() => soundFx.playClick()}
          onMouseEnter={() => soundFx.playHover()}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-dark-card border border-neon-red/70 flex items-center justify-center text-neon-red font-mono text-sm font-bold shadow-[0_0_12px_rgba(255,0,51,0.5)] group-hover:bg-neon-red group-hover:text-black transition-all">
            NX
          </div>
          <div className="flex flex-col">
            <GlitchText
              text="NEONFLIX"
              as="span"
              intensity="low"
              className="text-lg sm:text-xl font-bold tracking-widest text-white drop-shadow-[0_0_10px_#ff0033]"
            />
            <span className="text-[9px] text-gray-500 font-mono tracking-tighter -mt-1 hidden sm:block">
              HOLO-THEATER MATRIX
            </span>
          </div>
        </Link>

        {/* Center: Cyberpunk Sliding Pill Navigation (Matches User Reference Image) */}
        <nav
          onMouseLeave={() => setHoveredPath(null)}
          className="hidden md:flex items-center p-1.5 bg-black/80 backdrop-blur-2xl border border-neon-red/30 rounded-full shadow-[0_0_25px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.12)] relative"
          role="tablist"
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            const isHovered = hoveredPath === link.name;
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                onMouseEnter={() => {
                  soundFx.playHover();
                  setHoveredPath(link.name);
                }}
                className={`relative px-5 py-2 rounded-full text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-wider transition-colors duration-200 flex items-center gap-2 cursor-pointer select-none ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {/* Ghost Hover Pill */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="nav-ghost-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10 z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    />
                  )}
                </AnimatePresence>

                {/* Active Neon-Red Sliding Pill - Silky Smooth Fluid Spring */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 shadow-[0_0_20px_rgba(229,9,20,0.55),inset_0_1px_2px_rgba(255,255,255,0.45)] border border-red-400/50 z-0"
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 28,
                      mass: 0.6,
                    }}
                  />
                )}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                  <Icon
                    size={13}
                    className={
                      isActive
                        ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        : "text-neon-red group-hover:text-white transition-colors"
                    }
                  />
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Gamification XP / Level HUD Widget */}
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
            className="hidden sm:flex items-center gap-2 px-3 py-1 bg-dark-card/90 border border-neon-magenta/40 hover:border-neon-magenta text-white text-xs rounded transition-all hover:shadow-[0_0_15px_rgba(255,46,119,0.3)]"
          >
            <div className="flex flex-col text-right">
              <span className="text-[9px] text-neon-magenta font-mono font-bold leading-none">
                LVL.{level} OPERATOR
              </span>
              <span className="text-[11px] font-mono text-neon-cyan font-bold leading-tight">
                {xp} § XP
              </span>
            </div>
            <div className="w-6 h-6 rounded bg-neon-magenta/20 border border-neon-magenta flex items-center justify-center text-[10px] font-bold text-white">
              {level}
            </div>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsOpen(!isOpen);
            }}
            className="md:hidden w-8 h-8 rounded bg-dark-card border border-neon-red/50 text-white flex items-center justify-center hover:bg-neon-red hover:text-black transition-all"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-3 p-4 bg-dark-bg/95 border border-neon-red/40 backdrop-blur-xl pointer-events-auto flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => {
                handleNavClick(link, e);
                setIsOpen(false);
              }}
              className="px-4 py-2.5 text-sm font-[family-name:var(--font-orbitron)] text-gray-300 hover:text-neon-red hover:bg-neon-red/10 border border-transparent hover:border-neon-red/30 transition-all flex items-center gap-2"
            >
              <link.icon size={14} className="text-neon-red" />
              {link.name}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-dark-border flex justify-between items-center text-xs font-mono">
            <span className="text-gray-400">OPERATOR STATUS:</span>
            <span className="text-neon-cyan font-bold">LVL {level} // {xp} XP</span>
          </div>
        </div>
      )}
    </header>
  );
};
