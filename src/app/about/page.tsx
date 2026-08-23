import { Section } from "@/components/layout/section";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  path: "/about",
});

/** The same sections the home page shows, on their own page for direct links. */
export default function AboutPage() {
  return (
    <>
      <Section id="about" index="02" title="About me" className="border-t-0">
        <About />
      </Section>
      <Section id="experience" index="03" title="Experience">
        <Experience />
      </Section>
    </>
  );
}
