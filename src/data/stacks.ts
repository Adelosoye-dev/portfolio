import {
  siFramer,
  siGit,
  siGsap,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siRedux,
  type SimpleIcon,
  siTailwindcss,
  siTanstack,
  siThreedotjs,
  siTypescript,
} from "simple-icons";

export type Stack = {
  label: string;
  /** Path data for a 24×24 viewBox. Absent when there is no brand mark. */
  path?: string;
  color: string;
};

/**
 * Brand colours are authored for light backgrounds, and the near-black ones
 * (Next.js, Three.js) would read as holes here — those fall back to the
 * foreground colour.
 */
function onDark(hex: string): string {
  const value = Number.parseInt(hex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.25 ? "#f4f4f5" : `#${hex}`;
}

function brand(icon: SimpleIcon, label: string = icon.title): Stack {
  return { label, path: icon.path, color: onDark(icon.hex) };
}

/**
 * The tools worth naming, in the order they appear in the strip under the
 * hero. Marks come from `simple-icons`, which is imported in this server
 * module only — the client receives the path strings, not the package.
 */
export const stacks: Stack[] = [
  brand(siReact),
  brand(siNextdotjs),
  brand(siTypescript),
  brand(siJavascript),
  brand(siTailwindcss),
  brand(siTanstack, "TanStack Query"),
  // No mark in simple-icons; falls back to a lettered badge.
  { label: "Zustand", color: "#f4f4f5" },
  brand(siRedux, "Redux Toolkit"),
  brand(siGsap),
  brand(siFramer, "Framer Motion"),
  brand(siThreedotjs),
  brand(siNodedotjs),
  brand(siGit),
];
