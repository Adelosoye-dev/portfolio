import { siteConfig } from "@/config/site";
import { ButtonAnchor } from "@/components/ui/button";

export function Contact() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl lg:max-w-2xl lg:text-3xl">
          Have a product with complex state and a deadline? That is the work I
          like most.
        </p>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-muted/70 font-mono text-xs tracking-[0.2em] uppercase lg:text-sm">
              Email
            </dt>
            <dd className="mt-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm underline underline-offset-4 transition-colors hover:text-white lg:text-base"
              >
                {siteConfig.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted/70 font-mono text-xs tracking-[0.2em] uppercase lg:text-sm">
              Based in
            </dt>
            <dd className="mt-2 text-sm lg:text-base">{siteConfig.location}</dd>
          </div>
        </dl>
      </div>

      <ButtonAnchor href={`mailto:${siteConfig.email}`} className="w-fit">
        Let&rsquo;s work together
        <span aria-hidden className="ml-2">
          &rarr;
        </span>
      </ButtonAnchor>
    </div>
  );
}
