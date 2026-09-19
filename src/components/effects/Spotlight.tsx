"use client";

import { useEffect, useRef } from "react";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

// Inspired by Aceternity UI's Spotlight - interactive radial spotlight that follows mouse
export function Spotlight({ className = "", fill = "rgba(255,0,51,0.15)" }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      divRef.current.style.background = `radial-gradient(
        600px circle at ${mousePos.current.x}px ${mousePos.current.y}px,
        ${fill},
        transparent 40%
      )`;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [fill]);

  return (
    <div
      ref={divRef}
      className={`pointer-events-none absolute inset-0 transition-opacity duration-300 z-10 ${className}`}
    />
  );
}
