"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  variant?: 'red' | 'cyan' | 'magenta';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showPercentage = true,
  className,
  variant = 'red'
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variants = {
    red: "bg-gradient-to-r from-neon-red/50 to-neon-magenta neon-glow-red",
    cyan: "bg-gradient-to-r from-neon-cyan/50 to-[#00aaff] neon-glow-cyan",
    magenta: "bg-gradient-to-r from-neon-magenta/50 to-neon-purple shadow-[0_0_10px_#ff2e77]"
  };

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-[family-name:var(--font-jetbrains)] text-text-secondary uppercase">
          {label && <span>{label}</span>}
          {showPercentage && <span className="text-white">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="h-2 w-full bg-dark-bg border border-dark-border rounded-sm overflow-hidden relative">
        <motion.div 
          className={cn("h-full relative", variants[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute top-0 right-0 bottom-0 w-1 bg-white opacity-80 blur-[1px]"></div>
        </motion.div>
      </div>
    </div>
  );
};
