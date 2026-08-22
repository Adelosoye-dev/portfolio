import type { Project } from "@/types";

/**
 * Static project content. Swap for a CMS or MDX loader later —
 * consumers only touch the helpers in `@/lib/projects`.
 */
export const projects: Project[] = [
  {
    slug: "orbit",
    title: "Orbit",
    summary: "A real-time 3D product configurator.",
    description:
      "Built a WebGL configurator that streams GLTF variants on demand, keeping the first paint under a second on mobile.",
    year: 2025,
    role: "Design & Engineering",
    stack: ["Next.js", "TypeScript", "Three.js", "GLSL"],
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    slug: "atlas",
    title: "Atlas",
    summary: "Data-dense dashboard for logistics teams.",
    description:
      "Designed and shipped a dashboard handling 50k live rows with virtualized tables and streaming server components.",
    year: 2024,
    role: "Frontend Lead",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    summary: "A writing app with offline-first sync.",
    description:
      "Local-first note editor with conflict-free replication and a hand-rolled editor built on the selection API.",
    year: 2024,
    role: "Solo Build",
    stack: ["React", "IndexedDB", "CRDTs"],
  },
];
