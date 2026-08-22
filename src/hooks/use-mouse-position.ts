"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer position normalized to [-1, 1] on both axes.
 * Stored in a ref so 3D render loops can read it without re-rendering React.
 */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      position.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      position.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return position;
}
