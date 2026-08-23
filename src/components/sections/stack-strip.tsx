import { Container } from "@/components/layout/container";
import { stacks } from "@/data/stacks";

/** The tool strip that sits directly under the hero. */
export function StackStrip() {
  return (
    <section
      aria-label="Tools I work with"
      className="border-muted/10 border-t py-10 lg:py-12"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <p className="text-muted/70 shrink-0 font-mono text-xs tracking-[0.25em] uppercase lg:pt-2 lg:text-sm">
            My stack
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-6 sm:gap-x-8">
            {stacks.map((tool) => (
              <li
                key={tool.label}
                className="flex w-16 shrink-0 flex-col items-center gap-2.5 text-center lg:w-20"
              >
                {tool.path ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    focusable="false"
                    fill={tool.color}
                    className="size-7 lg:size-8"
                  >
                    <path d={tool.path} />
                  </svg>
                ) : (
                  <span
                    aria-hidden
                    style={{ color: tool.color }}
                    className="border-muted/30 grid size-7 place-items-center rounded-md border font-mono text-xs lg:size-8 lg:text-sm"
                  >
                    {tool.label.charAt(0)}
                  </span>
                )}
                <span className="text-muted text-[0.7rem] leading-snug lg:text-xs">
                  {tool.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
