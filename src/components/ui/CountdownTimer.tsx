"use client";
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: string; // ISO string
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) return null; // Avoid hydration mismatch

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={cn("flex gap-2 text-neon-red neon-text-red font-[family-name:var(--font-jetbrains)] text-xl font-bold tracking-widest", className)}>
      <span>{formatNumber(timeLeft.days)}</span>
      <span className="text-white/50 animate-pulse">:</span>
      <span>{formatNumber(timeLeft.hours)}</span>
      <span className="text-white/50 animate-pulse">:</span>
      <span>{formatNumber(timeLeft.minutes)}</span>
      <span className="text-white/50 animate-pulse">:</span>
      <span>{formatNumber(timeLeft.seconds)}</span>
    </div>
  );
};
