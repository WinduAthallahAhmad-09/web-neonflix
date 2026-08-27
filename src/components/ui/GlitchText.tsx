import React from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  intensity?: 'low' | 'medium' | 'high';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className, 
  as: Component = 'span',
  intensity = 'medium' 
}) => {
  const intensityClasses = {
    low: 'animate-pulse',
    medium: 'glitch',
    high: 'glitch animate-flicker'
  };

  return (
    <Component 
      className={cn(
        "font-[family-name:var(--font-orbitron)] font-bold relative inline-block",
        intensityClasses[intensity],
        className
      )}
      data-text={text}
    >
      {text}
    </Component>
  );
};
