import React from 'react';
import { cn } from '@/lib/utils';

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'cyan' | 'magenta' | 'green' | 'yellow' | 'purple';
  className?: string;
}

export const NeonBadge: React.FC<NeonBadgeProps> = ({ 
  children, 
  variant = 'red',
  className
}) => {
  const variants = {
    red: "text-neon-red border-neon-red/50 bg-neon-red/10 shadow-[0_0_5px_rgba(255,0,51,0.5)]",
    cyan: "text-neon-cyan border-neon-cyan/50 bg-neon-cyan/10 shadow-[0_0_5px_rgba(0,247,255,0.5)]",
    magenta: "text-neon-magenta border-neon-magenta/50 bg-neon-magenta/10 shadow-[0_0_5px_rgba(255,46,119,0.5)]",
    green: "text-neon-green border-neon-green/50 bg-neon-green/10 shadow-[0_0_5px_rgba(57,255,20,0.5)]",
    yellow: "text-neon-yellow border-neon-yellow/50 bg-neon-yellow/10 shadow-[0_0_5px_rgba(245,255,0,0.5)]",
    purple: "text-neon-purple border-neon-purple/50 bg-neon-purple/10 shadow-[0_0_5px_rgba(176,38,255,0.5)]"
  };

  return (
    <span 
      className={cn(
        "px-2.5 py-0.5 rounded-full border text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap",
        "font-[family-name:var(--font-jetbrains)]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
