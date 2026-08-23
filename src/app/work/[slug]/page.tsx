import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { createMetadata } from "@/lib/metadata";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Both are optional, so build the line from whatever this project has.
  const meta = [project.period, project.role].filter(Boolean).join(" · ");

  return (
    <Container className="py-20 sm:py-28 lg:py-32">
      <Link
        href="/work"
        className="text-muted hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors lg:text-sm"
      >
        <span aria-hidden>&larr;</span> All work
      </Link>

      {meta ? (
        <p className="text-muted mt-10 text-xs tracking-[0.2em] uppercase lg:text-sm">
          {meta}
        </p>
      ) : null}
      <h1 className="mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">
        {project.title}
      </h1>
      <p className="text-muted mt-6 max-w-2xl text-lg lg:text-xl">
        {project.description}
      </p>

      <MediaFrame
        src={project.cover}
        alt={`${project.title} interface`}
        label={`${project.title} screenshot`}
        className="mt-12 aspect-[16/10]"
      />

      <dl className="border-muted/10 mt-12 grid gap-6 border-t pt-8 sm:grid-cols-2">
        <div>
          <dt className="text-muted text-xs tracking-[0.2em] uppercase lg:text-sm">
            Stack
          </dt>
          <dd className="mt-2 text-sm lg:text-base">
            {project.stack.join(", ")}
          </dd>
        </div>
        {project.liveUrl ? (
          <div>
            <dt className="text-muted text-xs tracking-[0.2em] uppercase lg:text-sm">
              Live
            </dt>
            <dd className="mt-2 text-sm lg:text-base">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {project.liveUrl.replace(/^https?:\/\//, "")}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
    </Container>
  );
}
