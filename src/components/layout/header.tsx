import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="bg-background/80 border-muted/10 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight lg:text-base"
        >
          {/* The full name does not fit beside four nav items on a phone. */}
          <span className="sm:hidden">{siteConfig.monogram}</span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-6">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted hover:text-foreground text-xs transition-colors sm:text-sm lg:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
