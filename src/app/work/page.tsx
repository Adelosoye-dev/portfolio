import { Section } from "@/components/layout/section";
import { ProjectList } from "@/components/sections/project-list";
import { createMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/lib/projects";

export const metadata = createMetadata({
  title: "Work",
  description: "Selected projects and case studies.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <Section id="projects" index="01" title="Projects" className="border-t-0">
      <ProjectList projects={getAllProjects()} />
    </Section>
  );
}
