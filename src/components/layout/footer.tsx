import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

const social = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "X", href: siteConfig.links.x },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <ul className="flex gap-6">
          {social.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-foreground text-sm transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
