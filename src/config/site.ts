/**
 * Single source of truth for site-wide metadata and navigation.
 * Update this instead of hard-coding strings across components.
 */
export const siteConfig = {
  name: "Your Name",
  role: "Creative Developer",
  description:
    "Portfolio of Your Name — a creative developer building interactive experiences for the web.",
  url: "https://yourdomain.com",
  email: "hello@yourdomain.com",
  links: {
    github: "https://github.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    x: "https://x.com/yourhandle",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
