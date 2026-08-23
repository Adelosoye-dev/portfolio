import Link from "next/link";
import { MediaFrame } from "@/components/ui/media-frame";
import type { Project } from "@/types";

/** One project: copy on one side, screenshot on the other, sides alternating. */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <li className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={flipped ? "lg:order-2" : undefined}>
        <div className="flex items-baseline gap-3">
          <span className="text-accent font-mono text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {project.title}
          </h3>
        </div>

        <p className="text-muted mt-4 max-w-md text-base lg:max-w-lg lg:text-lg">
          {project.summary}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="text-muted rounded-full border border-white/10 px-2.5 py-1 text-xs lg:px-3 lg:text-sm"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/90 hover:text-foreground inline-flex items-center gap-2 border-b border-white/20 pb-1 text-xs tracking-[0.2em] uppercase transition-colors hover:border-white/50 lg:text-sm"
            >
              Visit site
              <span aria-hidden>&#8599;</span>
            </a>
          ) : null}
          <Link
            href={`/work/${project.slug}`}
            className="text-muted hover:text-foreground inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors lg:text-sm"
          >
            Case study
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* The screenshot is the most obvious thing to click, so it goes to the
          live site when there is one. */}
      <ProjectCover project={project} flipped={flipped} />
    </li>
  );
}

function ProjectCover({
  project,
  flipped,
}: {
  project: Project;
  flipped: boolean;
}) {
  const frame = (
    <MediaFrame
      src={project.cover}
      alt={`${project.title} interface`}
      label={`${project.title} screenshot`}
      className="aspect-[16/10] transition-colors group-hover:border-white/25"
    />
  );

  if (!project.liveUrl) {
    return <div className={flipped ? "lg:order-1" : undefined}>{frame}</div>;
  }

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.title} — open the live site`}
      className={`group block ${flipped ? "lg:order-1" : ""}`}
    >
      {frame}
    </a>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="space-y-20 sm:space-y-28 lg:space-y-32">
      {projects.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </ul>
  );
}
