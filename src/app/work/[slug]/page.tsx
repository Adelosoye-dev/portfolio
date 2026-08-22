import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
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

  return (
    <Container className="py-24">
      <p className="text-muted text-xs tracking-[0.2em] uppercase">
        {project.year} · {project.role}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        {project.title}
      </h1>
      <p className="text-muted mt-6 max-w-2xl text-lg">{project.description}</p>

      <dl className="mt-12 grid gap-6 border-t border-white/8 pt-8 sm:grid-cols-2">
        <div>
          <dt className="text-muted text-xs tracking-[0.2em] uppercase">
            Stack
          </dt>
          <dd className="mt-2 text-sm">{project.stack.join(", ")}</dd>
        </div>
        {project.liveUrl ? (
          <div>
            <dt className="text-muted text-xs tracking-[0.2em] uppercase">
              Live
            </dt>
            <dd className="mt-2 text-sm">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {project.liveUrl}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
    </Container>
  );
}
