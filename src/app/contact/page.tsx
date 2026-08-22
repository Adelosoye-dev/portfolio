import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-24">
      <SectionHeading eyebrow="Contact" title="Say hello" />
      <p className="text-muted max-w-xl text-lg">
        The fastest way to reach me is email.
      </p>
      <a
        href={`mailto:${siteConfig.email}`}
        className="mt-6 inline-block text-xl underline underline-offset-4"
      >
        {siteConfig.email}
      </a>
    </Container>
  );
}
