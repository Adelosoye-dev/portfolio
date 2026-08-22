"use client";

import dynamic from "next/dynamic";

/**
 * Keeps three.js out of the initial server render and the first JS chunk.
 * Import this from server components instead of HeroScene directly.
 */
export const LazyHeroScene = dynamic(
  () => import("@/components/three/scenes/hero-scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);
