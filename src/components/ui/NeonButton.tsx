"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { soundFx } from "@/lib/soundFx";
import { motion, HTMLMotionProps } from "framer-motion";

interface NeonButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "gold" | "cyber";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isCyberClip?: boolean;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      disabled = false,
      isCyberClip = false,
      onClick,
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs rounded-full",
      md: "px-6 py-2.5 text-sm rounded-full",
      lg: "px-8 py-3.5 text-base tracking-wider rounded-full",
    };

    const variantClasses = {
      primary:
        "bg-neon-red text-white font-bold border-neon-red hover:bg-neon-red/90 hover:shadow-[0_0_25px_rgba(255,0,51,0.6)] active:scale-95",
      secondary:
        "bg-white/5 text-neon-cyan border-white/20 hover:border-neon-cyan hover:bg-neon-cyan/15 hover:shadow-[0_0_20px_rgba(0,247,255,0.4)] active:scale-95",
      danger:
        "bg-neon-magenta text-white font-bold border-neon-magenta hover:bg-neon-magenta/90 hover:shadow-[0_0_20px_#ff2e77] active:scale-95",
      ghost:
        "bg-dark-card/60 text-gray-300 border-white/10 hover:text-white hover:border-white/30 hover:bg-white/5 active:scale-95",
      gold:
        "bg-neon-yellow text-black font-bold border-neon-yellow hover:shadow-[0_0_20px_#f5ff00] active:scale-95",
      cyber:
        "bg-gradient-to-r from-neon-red via-neon-magenta to-neon-purple text-white font-bold border-white/20 hover:shadow-[0_0_25px_rgba(255,0,51,0.7)] active:scale-95",
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        soundFx.playClick();
        if (onClick) onClick(e);
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        soundFx.playHover();
        if (onMouseEnter) onMouseEnter(e);
      }
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center font-[family-name:var(--font-orbitron)] font-semibold transition-all duration-200 border cursor-pointer select-none",
          isCyberClip ? "cyber-clip-sm" : "rounded-full",
          sizeClasses[size],
          variantClasses[variant],
          disabled && "opacity-40 cursor-not-allowed hover:shadow-none active:scale-100",
          className
        )}
        {...props}
      >
        {/* Subtle holographic corner highlight */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);

NeonButton.displayName = "NeonButton";
