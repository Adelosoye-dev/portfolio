/**
 * Single source of truth for site-wide metadata and navigation.
 * Update this instead of hard-coding strings across components.
 */
export const siteConfig = {
  name: "Olajumoke Adelosoye",
  /** Shown where the full name will not fit, e.g. the mobile header. */
  monogram: "OA",
  role: "Frontend Engineer",
  description:
    "Frontend engineer with 3+ years building production web applications in React, Next.js and TypeScript — AI platforms, admin systems and financial workflows.",
  // TODO: point this at the real domain before deploying; it is only used to
  // build canonical and Open Graph URLs.
  url: "https://yourdomain.com",
  email: "Adelosoyeolajumoke9@gmail.com",
  location: "Nigeria (GMT+1)",
  /** Served from /public. */
  resume: "/olajumoke-adelosoye-resume.pdf",
  /** Add LinkedIn or X here and they appear in the footer automatically. */
  social: [{ label: "GitHub", href: "https://github.com/Adelosoye-dev" }],
  nav: [
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
