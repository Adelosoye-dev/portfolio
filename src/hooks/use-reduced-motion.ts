"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/** True when the visitor asked the OS to reduce motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
