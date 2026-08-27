"use client";

import { useEffect, useState } from "react";
import { soundFx } from "@/lib/soundFx";
import { Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";

export function GameHUDOverlay() {
  const router = useRouter();
  const [fps, setFps] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setIsMuted(soundFx.getMuted());

    // Live FPS calculator
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(120, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);

    // Live Cyberpunk Clock
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentTime(
        d.toTimeString().split(" ")[0] + ":" + String(d.getMilliseconds()).padStart(3, "0")
      );
    }, 45);

    // Keyboard Shortcuts like a Game
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "m" || e.key === "M") {
        const muted = soundFx.toggleMute();
        setIsMuted(muted);
      } else if (e.key === "h" || e.key === "H") {
        soundFx.playClick();
        router.push("/");
      } else if (e.key === "p" || e.key === "P") {
        soundFx.playClick();
        router.push("/profile");
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [router]);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      {/* --- Fullscreen Tactical HUD Frame --- */}
      <div className="fixed inset-0 pointer-events-none z-40 select-none">
        {/* Top-Left Telemetry (Matching User's Reference) */}
        <div className="absolute top-2 left-4 md:left-6 flex flex-col gap-0.5 text-neon-red font-[family-name:var(--font-jetbrains)] text-[10px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest text-xs sm:text-sm drop-shadow-[0_0_8px_#ff0033]">
              NEONFLIX © 26′
            </span>
            <span className="text-[9px] px-1 bg-neon-red/10 border border-neon-red/40 text-neon-red rounded-none">
              LIVE
            </span>
          </div>
          <div className="text-[9px] text-neon-magenta/80 tracking-tight">
            クリエイティブテクノロジスト // JAKARTA_SECTOR_01
          </div>
          
          {/* Controller HUD Graphic */}
          <div className="hidden lg:flex items-center gap-3 mt-1.5 opacity-75">
            <div className="flex flex-col items-center">
              <div className="w-3.5 h-3.5 border border-neon-red/60 text-[8px] flex items-center justify-center bg-neon-red/10 mb-0.5 font-mono">
                W
              </div>
              <div className="flex gap-0.5">
                <div className="w-3.5 h-3.5 border border-neon-red/60 text-[8px] flex items-center justify-center bg-neon-red/10 font-mono">A</div>
                <div className="w-3.5 h-3.5 border border-neon-red/60 text-[8px] flex items-center justify-center bg-neon-red/10 font-mono">S</div>
                <div className="w-3.5 h-3.5 border border-neon-red/60 text-[8px] flex items-center justify-center bg-neon-red/10 font-mono">D</div>
              </div>
            </div>
            <div className="text-[8px] tracking-widest text-gray-400">
              [H] HOME &nbsp; [P] PROFILE &nbsp; [M] AUDIO
            </div>
          </div>
        </div>

        {/* Top-Right Telemetry & Sound Controller */}
        <div className="absolute top-2 right-4 md:right-6 flex items-center gap-3 font-[family-name:var(--font-jetbrains)] text-[10px] text-gray-400">
          <div className="hidden sm:flex flex-col items-end text-right text-[9px] text-gray-500 leading-tight">
            <div>CONNECTED: <span className="text-neon-green">JKT-GRID #1</span></div>
            <div>ENGINE: <span className="text-neon-cyan">WEBGL 3D</span> // {fps} FPS</div>
            <div className="text-neon-red/80">{currentTime || "00:00:00:000"}</div>
          </div>

          {/* Interactive Sound Switcher */}
          <button
            onClick={handleToggleSound}
            className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 bg-dark-card/90 border border-neon-red/40 hover:border-neon-red text-white text-[10px] transition-all hover:shadow-[0_0_12px_rgba(255,0,51,0.5)] cursor-pointer"
            title="Toggle Synthesized Game Audio (HotKey: M)"
          >
            {isMuted ? (
              <>
                <VolumeX size={12} className="text-gray-500" />
                <span className="text-gray-500 font-mono">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 size={12} className="text-neon-red animate-pulse" />
                <span className="text-neon-red font-mono">SFX ON</span>
                {/* Audio Waveform Bars */}
                <div className="flex items-end gap-0.5 h-2.5 ml-1">
                  <span className="w-0.5 bg-neon-red h-full animate-[bounce_0.8s_infinite]"></span>
                  <span className="w-0.5 bg-neon-magenta h-2/3 animate-[bounce_0.6s_infinite_0.2s]"></span>
                  <span className="w-0.5 bg-neon-cyan h-4/5 animate-[bounce_0.7s_infinite_0.4s]"></span>
                </div>
              </>
            )}
          </button>
        </div>

        {/* Tactical Screen Corner Brackets [ + ] */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-neon-red/50"></div>
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-neon-red/50"></div>
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-neon-red/50"></div>
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-neon-red/50"></div>

        {/* Tactical Crosshair Watermark in center background */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden md:block text-[9px] text-gray-700 font-mono tracking-widest -rotate-90 origin-left">
          COORD: 106.8456° E // 6.2088° S [JAKARTA]
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden md:block text-[9px] text-gray-700 font-mono tracking-widest rotate-90 origin-right">
          SYS.VER 2.6.4 // HOLO-MATRIX READY
        </div>

        {/* Bottom Status Ticker Bar */}
        <div className="absolute bottom-1 left-0 right-0 px-6 py-0.5 flex justify-between items-center text-[9px] font-mono text-gray-600 bg-gradient-to-r from-dark-bg/90 via-dark-card/90 to-dark-bg/90 border-t border-dark-border/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping inline-block"></span>
            <span>SYSTEM: ALL THEATER PROTOCOLS OPTIMAL</span>
          </div>
          <div className="hidden sm:block">
            <span>NEONFLIX CYBERDECK INTERFACE // BUILD: PROD_2026</span>
          </div>
        </div>
      </div>
    </>
  );
}
