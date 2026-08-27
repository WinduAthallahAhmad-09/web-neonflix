"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CyberCardProps extends Omit<HTMLMotionProps<"div">, 'ref'> {
  children: React.ReactNode;
  withScanline?: boolean;
  isCyberClip?: boolean;
  glowOnHover?: boolean;
}

export const CyberCard = React.forwardRef<HTMLDivElement, CyberCardProps>(
  ({ children, className, withScanline = false, isCyberClip = false, glowOnHover = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative bg-dark-card border border-dark-border overflow-hidden",
          isCyberClip ? "cyber-clip" : "rounded-md",
          glowOnHover && "transition-all duration-300 hover:border-neon-red/50 hover:shadow-[0_0_15px_rgba(255,0,51,0.15)]",
          withScanline && "scanline",
          className
        )}
        {...props}
      >
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
        
        {/* Subtle decorative corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-red/30 z-20"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-red/30 z-20"></div>
      </motion.div>
    );
  }
);

CyberCard.displayName = 'CyberCard';
