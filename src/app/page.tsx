import { Container } from "@/components/layout/container";
import { Hero } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />
      <Container as="section" className="py-24">
        <SectionHeading eyebrow="Selected" title="Featured work" />
        <ProjectGrid projects={featured} />
      </Container>
    </>
  );
}
