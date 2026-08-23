import { Container } from "@/components/layout/container";
import { LazyHeroScene } from "@/components/three/lazy-hero-scene";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Ground: a console grid fading out from the centre, with two washes
          of the accent hues so the black is never flat. Behind the cube. */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 -z-20 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(55%_45%_at_50%_35%,rgb(91_157_255/0.18),transparent_70%),radial-gradient(45%_45%_at_80%_82%,rgb(47_212_160/0.12),transparent_70%),radial-gradient(40%_40%_at_15%_75%,rgb(245_165_36/0.07),transparent_70%)]"
      />

      {/* Takes no pointer events: the cube hit-tests the pointer itself, so it
          stays reachable through the copy without the copy giving up its own
          clicks or text selection. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      >
        <LazyHeroScene />
      </div>

      {/* Scrim: darkens the cube only where the copy sits, so the headline
          keeps its contrast without dimming the whole scene. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] bg-[radial-gradient(46%_34%_at_50%_50%,rgb(10_12_16/0.88),rgb(10_12_16/0.55)_55%,transparent_75%)]"
      />

      {/* Fills the space under the sticky 4rem header, so the backdrop
          scene is centred on what the visitor actually sees. */}
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-24 text-center">
        <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase lg:text-sm">
          {siteConfig.role}
        </p>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl lg:max-w-4xl lg:text-7xl">
          I build interfaces that hold a lot of state.
        </h1>
        <p className="text-muted mt-6 max-w-xl text-lg lg:max-w-2xl lg:text-xl">
          {siteConfig.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/#projects">See the work</ButtonLink>
          <ButtonLink href="/#contact" variant="ghost">
            Get in touch
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
