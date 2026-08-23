export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** Display string, so ranges like "2025 — 2026" work. Omit if unknown. */
  period?: string;
  role?: string;
  stack: string[];
  /** Path under /public, e.g. "/images/trx-platform.png" */
  cover?: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Shown on the home page. Keep this to three. */
  featured?: boolean;
};

/** One row of the experience timeline. */
export type Role = {
  title: string;
  company: string;
  period: string;
};

export type NavItem = {
  label: string;
  href: string;
};

/** The six outward faces of the hero cube. */
export type CubeFace = "front" | "back" | "right" | "left" | "top" | "bottom";
