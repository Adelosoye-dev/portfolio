export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: number;
  role: string;
  stack: string[];
  /** Path under /public, e.g. "/images/project-a.jpg" */
  cover?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
};

/** The six outward faces of the hero cube. */
export type CubeFace = "front" | "back" | "right" | "left" | "top" | "bottom";
