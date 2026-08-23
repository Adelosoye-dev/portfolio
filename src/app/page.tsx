import { Section } from "@/components/layout/section";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { ProjectList } from "@/components/sections/project-list";
import { StackStrip } from "@/components/sections/stack-strip";
import { ButtonLink } from "@/components/ui/button";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const remaining = getAllProjects().length - featured.length;

  return (
    <>
      <Hero />
      <StackStrip />

      <Section id="projects" index="01" title="Projects">
        <ProjectList projects={featured} />

        {remaining > 0 ? (
          <div className="mt-20 flex justify-center lg:mt-24">
            <ButtonLink href="/work" variant="ghost">
              View all work
              <span aria-hidden className="ml-2">
                &rarr;
              </span>
            </ButtonLink>
          </div>
        ) : null}
      </Section>

      <Section id="about" index="02" title="About me">
        <About />
      </Section>

      <Section id="experience" index="03" title="Experience">
        <Experience />
      </Section>

      <Section id="contact" index="04" title="Contact">
        <Contact />
      </Section>
    </>
  );
}
