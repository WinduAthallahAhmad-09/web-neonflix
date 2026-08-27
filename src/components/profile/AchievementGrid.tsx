'use client';

import { useUserStore } from '@/store/userStore';
import { ACHIEVEMENTS } from '@/lib/constants';
import { Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CyberCard } from '@/components/ui/CyberCard';

export default function AchievementGrid() {
  const { achievements } = useUserStore();
  const unlockedIds = achievements.map(a => a.id);
  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS.length;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6 border-b border-dark-border pb-4">
        <h2 className="font-orbitron text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-neon-magenta">/</span>
          ACHIEVEMENTS
        </h2>
        <div className="font-mono text-sm tracking-widest text-text-secondary">
          <span className="text-neon-cyan font-bold">{unlockedCount}</span> / {totalCount} UNLOCKED
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedIds.includes(ach.id);
          
          return (
            <motion.div key={ach.id} variants={item} className="h-full">
              <div 
                className={cn(
                  "relative p-5 border rounded-lg h-full flex flex-col transition-all duration-300",
                  isUnlocked 
                    ? "bg-dark-card border-neon-magenta/40 hover:border-neon-magenta hover:shadow-[0_0_15px_rgba(255,46,119,0.2)]" 
                    : "bg-dark-bg border-dark-border/50 grayscale opacity-60"
                )}
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-dark-bg/40 z-10 flex items-center justify-center backdrop-blur-[1px] rounded-lg">
                    <Lock className="w-10 h-10 text-text-secondary/50" />
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <div className={cn("text-4xl", isUnlocked && "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]")}>
                    {ach.icon}
                  </div>
                  {isUnlocked && (
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                  )}
                  {!isUnlocked && (
                    <div className="font-mono text-xs text-text-secondary bg-dark-surface px-2 py-1 rounded">
                      LOCKED
                    </div>
                  )}
                </div>
                
                <h3 className={cn("font-orbitron font-bold mb-1 tracking-wide text-lg", isUnlocked ? "text-white" : "text-text-secondary")}>
                  {ach.name}
                </h3>
                
                <p className="font-mono text-xs text-text-secondary mb-4 flex-grow">
                  {isUnlocked ? ach.description : '???'}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-dark-border/50">
                  <div className="font-mono text-xs font-bold">
                    <span className={cn(isUnlocked ? "text-neon-cyan" : "text-text-secondary")}>
                      +{ach.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
