import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 lg:h-12 lg:px-7 lg:text-base";

const variants = {
  /** `live` is the go colour everywhere on the site. */
  primary: "bg-live text-background hover:bg-live/85",
  ghost:
    "border-muted/30 text-foreground hover:border-live/40 hover:bg-live/5 border",
} as const;

type Variant = keyof typeof variants;

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: Variant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & { variant?: Variant }) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}

/**
 * Same look, but a plain anchor — for anything that is not an app route:
 * `mailto:`, downloads, external links.
 */
export function ButtonAnchor({
  variant = "primary",
  className,
  ...props
}: ComponentPropsWithoutRef<"a"> & { variant?: Variant }) {
  return <a className={cn(base, variants[variant], className)} {...props} />;
}
