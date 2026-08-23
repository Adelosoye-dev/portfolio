"use client";

import { useEffect, useRef } from "react";

export type PointerSnapshot = {
  /** Viewport coordinates, as the pointer events report them. */
  clientX: number;
  clientY: number;
  /** False until the pointer has moved, so consumers can stay neutral. */
  moved: boolean;
};

/**
 * Latest pointer position, stored in a ref so 3D render loops can read it
 * without re-rendering React. Kept in viewport coordinates: normalize it
 * against whatever element you are hit-testing, since the window is rarely
 * the frame you actually care about.
 */
export function useMousePosition() {
  const position = useRef<PointerSnapshot>({
    clientX: 0,
    clientY: 0,
    moved: false,
  });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      position.current.clientX = event.clientX;
      position.current.clientY = event.clientY;
      position.current.moved = true;
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return position;
}
