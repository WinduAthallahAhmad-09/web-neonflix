import React from 'react';
import { GlitchText } from '../ui/GlitchText';
import { Terminal, Globe, MessageCircle, Code2 } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-neon-red/20 pt-16 pb-8 relative overflow-hidden">
      {/* Neon line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-red to-transparent opacity-50"></div>
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-neon-red shadow-[0_0_10px_#ff0033]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="text-neon-red" size={24} />
              <GlitchText text="NEONFLIX" as="h3" intensity="low" className="text-xl text-white tracking-wider" />
            </div>
            <p className="text-text-secondary text-sm font-[family-name:var(--font-jetbrains)]">
              // IMMERSIVE CYBERPUNK CINEMA EXPERIENCE.
              <br />
              // JAKARTA BRANCHES ONLY.
              <br />
              // ESCAPE REALITY.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-[family-name:var(--font-orbitron)] tracking-widest mb-4">SYSTEM_LINKS</h4>
            <ul className="space-y-2 text-sm font-[family-name:var(--font-jetbrains)] text-text-secondary">
              <li><Link href="/" className="hover:text-neon-cyan transition-colors">{`>>`} MOVIES</Link></li>
              <li><Link href="/schedule" className="hover:text-neon-cyan transition-colors">{`>>`} SCHEDULE</Link></li>
              <li><Link href="/locations" className="hover:text-neon-cyan transition-colors">{`>>`} LOCATIONS</Link></li>
              <li><Link href="/vip" className="hover:text-neon-gold transition-colors">{`>>`} VIP ACCESS</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-[family-name:var(--font-orbitron)] tracking-widest mb-4">NETWORK_NODES</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded bg-dark-surface border border-dark-border flex items-center justify-center text-text-secondary hover:text-neon-red hover:border-neon-red hover:bg-neon-red/10 transition-all duration-300">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded bg-dark-surface border border-dark-border flex items-center justify-center text-text-secondary hover:text-neon-magenta hover:border-neon-magenta hover:bg-neon-magenta/10 transition-all duration-300">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded bg-dark-surface border border-dark-border flex items-center justify-center text-text-secondary hover:text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300">
                <Code2 size={18} />
              </a>
            </div>
            <div className="mt-4 p-3 bg-black/50 border border-dark-border text-xs font-[family-name:var(--font-jetbrains)] text-text-secondary">
              SYSTEM STATUS: <span className="text-neon-green animate-pulse">ONLINE</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border/50 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-xs font-[family-name:var(--font-jetbrains)]">
            © {new Date().getFullYear()} NEONFLIX CORP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4 text-xs font-[family-name:var(--font-jetbrains)] text-text-secondary/50">
            <span className="hover:text-white cursor-pointer transition-colors">TERMS</span>
            <span className="hover:text-white cursor-pointer transition-colors">PRIVACY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
