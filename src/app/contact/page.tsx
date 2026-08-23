import { Section } from "@/components/layout/section";
import { Contact } from "@/components/sections/contact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section id="contact" index="04" title="Contact" className="border-t-0">
      <Contact />
    </Section>
  );
}
