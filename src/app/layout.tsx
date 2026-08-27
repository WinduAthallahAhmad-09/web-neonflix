import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CyberCityCanvas } from "@/components/cyber/CyberCityCanvas";
import { GameHUDOverlay } from "@/components/cyber/GameHUDOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NEONFLIX // Cyberpunk Game Cinema Matrix",
  description:
    "Next-gen cybernetic cinema booking interface. Enter the simulation, pick tactical seats, requisition rations, and gain XP.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark-bg text-white font-[family-name:var(--font-inter)] selection:bg-neon-red/30 selection:text-white relative overflow-x-hidden">
        {/* 3D WebGL Three.js Perspective Horizon Grid & City Background */}
        <CyberCityCanvas />

        {/* Global Video Game HUD Layer (FPS, Telemetry, Keybindings, SFX) */}
        <GameHUDOverlay />

        {/* Top Game Menu Navigation Bar */}
        <Navbar />

        {/* Main Interactive Stage */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Tactical Footer */}
        <Footer />
      </body>
    </html>
  );
}
