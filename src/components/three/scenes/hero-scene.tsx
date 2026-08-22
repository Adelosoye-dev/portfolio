"use client";

import { RubiksCube } from "@/components/three/objects/rubiks-cube";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Decorative hero scene. Freezes its animation when motion is reduced. */
export function HeroScene() {
  const reducedMotion = useReducedMotion();

  return (
    <SceneCanvas>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 4]} intensity={1.8} />
      <directionalLight
        position={[-6, -2, -4]}
        intensity={0.7}
        color="#7c9dff"
      />
      <RubiksCube idleMotion={reducedMotion ? 0 : 1} />
    </SceneCanvas>
  );
}
