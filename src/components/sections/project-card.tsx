import Link from "next/link";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-white/8 p-6 transition-colors hover:border-white/25"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
        <span className="text-muted text-xs">{project.year}</span>
      </div>
      <p className="text-muted text-sm">{project.summary}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="text-muted rounded-full border border-white/10 px-2.5 py-1 text-xs"
          >
            {tech}
          </li>
        ))}
      </ul>
    </Link>
  );
}
