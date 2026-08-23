import { Container } from "@/components/layout/container";
import { LazyHeroScene } from "@/components/three/lazy-hero-scene";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Takes no pointer events: the cube hit-tests the pointer itself, so it
          stays reachable through the copy without the copy giving up its own
          clicks or text selection. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      >
        <LazyHeroScene />
      </div>

      {/* Fills the space under the sticky 4rem header, so the backdrop
          scene is centred on what the visitor actually sees. */}
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-24 text-center">
        <p className="text-muted text-sm tracking-[0.2em] uppercase lg:text-base">
          {siteConfig.role}
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl lg:max-w-4xl lg:text-7xl">
          I build interactive things for the web.
        </h1>
        <p className="text-muted mt-6 max-w-xl text-lg lg:max-w-2xl lg:text-xl">
          {siteConfig.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/#projects">View work</ButtonLink>
          <ButtonLink href="/#contact" variant="ghost">
            Get in touch
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
