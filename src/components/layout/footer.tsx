import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-muted/10 border-t py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium tracking-tight">
            {siteConfig.name}
          </p>
          <p className="text-muted mt-1 text-sm">
            {siteConfig.role} &middot; &copy; {new Date().getFullYear()}
          </p>
        </div>
        <ul className="flex gap-6">
          {siteConfig.social.map((item) => (
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
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-muted hover:text-foreground text-sm transition-colors"
            >
              Email
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
