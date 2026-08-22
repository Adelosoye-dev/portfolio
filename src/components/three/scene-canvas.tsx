"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

type SceneCanvasProps = CanvasProps & {
  className?: string;
};

/**
 * The one place a <Canvas> is created. Every scene mounts inside this so
 * DPR clamping, color management and Suspense behaviour stay consistent.
 */
export function SceneCanvas({
  children,
  className,
  ...props
}: SceneCanvasProps) {
  return (
    <Canvas
      className={cn("h-full w-full", className)}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      {...props}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
