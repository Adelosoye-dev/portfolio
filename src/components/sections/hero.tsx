import { Container } from "@/components/layout/container";
import { LazyHeroScene } from "@/components/three/lazy-hero-scene";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Interactive, so no `pointer-events-none` here: the cube can be
          clicked wherever the copy above it doesn't cover it. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 cursor-pointer opacity-70"
      >
        <LazyHeroScene />
      </div>

      {/* Fills the space under the sticky 4rem header, so the backdrop
          scene is centred on what the visitor actually sees. The wrapper
          passes clicks through to the cube; the copy itself still takes
          them, so text stays selectable and the links stay clickable. */}
      <Container className="pointer-events-none flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-24 text-center">
        <p className="text-muted pointer-events-auto text-sm tracking-[0.2em] uppercase">
          {siteConfig.role}
        </p>
        <h1 className="pointer-events-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          I build interactive things for the web.
        </h1>
        <p className="text-muted pointer-events-auto mt-6 max-w-xl text-lg">
          {siteConfig.description}
        </p>
        <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/work">View work</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Get in touch
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
