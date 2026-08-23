import { projects } from "@/data/projects";
import type { Project } from "@/types";

/** Curated order, exactly as `@/data/projects` lists them. */
export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
