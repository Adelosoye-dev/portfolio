import { Container } from "@/components/layout/container";
import { ProjectGrid } from "@/components/sections/project-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import { createMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/lib/projects";

export const metadata = createMetadata({
  title: "Work",
  description: "Selected projects and case studies.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <Container className="py-24">
      <SectionHeading eyebrow="Archive" title="All work" />
      <ProjectGrid projects={getAllProjects()} />
    </Container>
  );
}
