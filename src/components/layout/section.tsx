import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  /** Anchor target for the header nav. */
  id: string;
  /** Two-digit marker, e.g. "01". */
  index: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * A numbered page section. `scroll-mt` clears the sticky 4rem header when
 * the nav jumps here.
 */
export function Section({
  id,
  index,
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-t border-white/5 py-20 sm:py-28 lg:py-32",
        className,
      )}
    >
      <Container>
        <div className="flex items-baseline gap-4">
          <span className="text-accent font-mono text-xs lg:text-sm">
            {index}
          </span>
          <h2 className="text-muted text-xs tracking-[0.25em] uppercase lg:text-sm">
            {title}
          </h2>
        </div>
        <div className="mt-12 lg:mt-16">{children}</div>
      </Container>
    </section>
  );
}
