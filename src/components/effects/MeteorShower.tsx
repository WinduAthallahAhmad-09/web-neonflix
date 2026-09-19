"use client";

import { useEffect, useRef } from "react";

interface Meteor {
  x: number;
  duration: number;
  delay: number;
  size: number;
}

export function MeteorShower({ count = 15 }: { count?: number }) {
  const meteors: Meteor[] = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 100,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 8,
    size: 60 + Math.random() * 80,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map((m, i) => (
        <span
          key={i}
          className="absolute top-0 rotate-[215deg] rounded-full"
          style={{
            left: `${m.x}%`,
            width: `1px`,
            height: `${m.size}px`,
            background: `linear-gradient(to bottom, rgba(0,0,0,0), ${i % 2 === 0 ? "#ff0033" : "#00f7ff"})`,
            boxShadow: `0 0 4px ${i % 2 === 0 ? "#ff0033" : "#00f7ff"}`,
            animation: `meteor ${m.duration}s linear ${m.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
