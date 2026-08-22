import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-24">
      <SectionHeading eyebrow="About" title="A little background" />
      <div className="text-muted max-w-2xl space-y-6 text-lg">
        <p>
          Replace this with your story — what you build, how you think about
          craft, and the kind of work you want more of.
        </p>
        <p>Keep it short. Two or three paragraphs is plenty here.</p>
      </div>
    </Container>
  );
}
