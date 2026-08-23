import type { Project } from "@/types";

/**
 * Static project content in display order. Swap for a CMS or MDX loader
 * later — consumers only touch the helpers in `@/lib/projects`.
 *
 * `featured` picks the three the home page shows; everything else lives on
 * /work behind the "View all work" link. Covers are screenshots of the live
 * sites, captured at 1440×900 and stored under /public/images.
 */
export const projects: Project[] = [
  {
    slug: "trx-platform",
    title: "TRX Platform",
    summary:
      "A supply chain finance platform that lets businesses unlock liquidity from their invoices.",
    description:
      "Built the role-based interfaces and admin workflows for sellers, buyers and financiers: a transaction console covering users, invoices, factoring, disbursement and approvals, KYC/KYB onboarding with document handling, and analytics for monitoring financial and operational activity. Also implemented resilient multipart uploads forwarded through the backend layer.",
    period: "2026",
    role: "Frontend Engineer",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
    ],
    cover: "/images/trx-platform.png",
    liveUrl: "https://trx.vercel.app/login",
    featured: true,
  },
  {
    slug: "ellum-ai",
    title: "Ellum AI",
    summary:
      "Marketing run by a team of AI specialists that share a memory and answer to one orchestrator.",
    description:
      "Built product workflows for AI tools, agents, notifications and content management, plus responsive dashboards and reusable components for heavy application state. Developed the administrative pages tracking users, organizations, agent activity, token consumption and subscriptions, and integrated an AI agent that lets a super admin run platform operations — newsletters, blogs, image generation, lookups — through natural language.",
    period: "2025 — 2026",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query"],
    cover: "/images/ellum-ai.png",
    liveUrl: "https://www.ellum.ai/",
    featured: true,
  },
  {
    slug: "deepellum",
    title: "DeepEllum",
    summary:
      "A marketplace for finding, deploying and integrating MCP-compatible AI agents.",
    description:
      "The agent marketplace behind Ellum AI: discovery and filtering across agents built for marketing, operations and sales, with integration and pricing flows for using them anywhere or directly inside Ellum.",
    period: "2025 — 2026",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MCP"],
    cover: "/images/deepellum.png",
    liveUrl: "https://deepellum.ai/",
    featured: true,
  },
  {
    slug: "owna",
    title: "Owna",
    summary:
      "A quiet gallery for discovering and collecting original work directly from the artists who made it.",
    description:
      "Gallery, artist and commission browsing built around large imagery — verified artists, protected payments and per-piece provenance, with a collection view and light and dark presentation.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    cover: "/images/owna.png",
    liveUrl: "https://owna-eta.vercel.app/",
  },
  {
    slug: "fetchit",
    title: "Fetchit",
    summary:
      "Personal shopping and home services in one app — order essentials or book a trusted handyman.",
    description:
      "A web application connecting people to personal shoppers and handymen for errands, repairs and home services, covering the booking flow end to end.",
    period: "2025 — Present",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    cover: "/images/fetchit.png",
    liveUrl: "https://fetchit.com.ng/",
  },
  {
    slug: "milan-imperial",
    title: "Milan Imperial",
    summary:
      "The marketing site for a West African group spanning agro-business, consulting, contracting and private charter.",
    description:
      "A brand site for Milan Imperial Limited: an image-led hero rotation, a section per business line, and enquiry routes into each of them.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    cover: "/images/milan-imperial.png",
    liveUrl: "https://www.milanimperial.com/",
  },
];
