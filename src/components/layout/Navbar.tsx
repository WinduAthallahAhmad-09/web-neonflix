"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlitchText } from "../ui/GlitchText";
import { useUserStore } from "@/store/userStore";
import { soundFx } from "@/lib/soundFx";
import { Menu, X, Shield, Film, Flame } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { level, xp } = useUserStore();

  const navLinks = [
    { name: "EXPLORE", href: "/", icon: Film },
    { name: "SIMULATIONS", href: "/#now-showing", icon: Flame },
    { name: "OPERATOR", href: "/profile", icon: Shield },
  ];

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

        {/* Center: Game Menu Navigation Pills (Like Reference 'EXPLORE' / 'WORKS') */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-dark-bg/85 backdrop-blur-md border border-neon-red/30 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-5 py-1.5 rounded-full text-xs font-[family-name:var(--font-orbitron)] font-semibold tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-neon-red text-white shadow-[0_0_15px_#ff0033] font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <link.icon size={12} className={isActive ? "text-white" : "text-neon-red"} />
                {link.name}
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
              onClick={() => {
                soundFx.playClick();
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
