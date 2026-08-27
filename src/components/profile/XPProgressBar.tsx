'use client';

import { useUserStore } from '@/store/userStore';
import { getLevelName } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function XPProgressBar() {
  const { level, xp, xpToNextLevel } = useUserStore();
  
  const currentLevelName = getLevelName(level);
  const nextLevelName = getLevelName(level + 1);
  const progressPercentage = Math.min(100, Math.max(0, (xp / xpToNextLevel) * 100));

  return (
    <div className="w-full bg-dark-card border border-dark-border p-6 rounded-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-neon-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 relative z-10">
        <div>
          <div className="text-text-secondary font-mono text-sm mb-1 uppercase tracking-wider">Current Status</div>
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-3xl font-bold text-white tracking-wider neon-text-red">
              LVL {level}
            </span>
            <span className="px-3 py-1 bg-neon-red/20 text-neon-red border border-neon-red/50 rounded-sm font-mono text-xs uppercase font-bold tracking-widest animate-pulse shadow-[0_0_10px_rgba(255,0,51,0.5)]">
              {currentLevelName}
            </span>
          </div>
        </div>
        
        <div className="text-right mt-4 md:mt-0">
          <div className="font-mono text-xs text-text-secondary uppercase mb-1">XP Progress</div>
          <div className="font-mono font-bold text-white tracking-widest">
            <span className="text-neon-cyan">{xp}</span> 
            <span className="text-text-secondary mx-2">/</span> 
            <span>{xpToNextLevel}</span> <span className="text-neon-magenta text-sm">XP</span>
          </div>
        </div>
      </div>
      
      {/* Custom Progress Bar */}
      <div className="relative h-6 bg-dark-surface border border-dark-border rounded-sm overflow-hidden mb-3">
        {/* Animated fill */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-neon-red to-neon-magenta relative scanline"
        >
          {/* Glowing edge */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_15px_#fff,0_0_20px_#ff0033]"></div>
        </motion.div>
      </div>
      
      <div className="flex justify-between items-center text-xs font-mono font-semibold uppercase tracking-wider">
        <span className="text-text-secondary">Next Rank:</span>
        <span className="text-neon-cyan neon-text-cyan">{nextLevelName}</span>
      </div>
    </div>
  );
}
