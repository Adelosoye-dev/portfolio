import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type DivProps = ComponentPropsWithoutRef<"div">;

type ContainerProps = DivProps & {
  /** Render as a different element, e.g. `as="section"`. */
  as?: ElementType<DivProps>;
};

/** Shared page gutter so every section lines up. */
export function Container({
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-5xl px-6 sm:px-8", className)}
      {...props}
    />
  );
}
