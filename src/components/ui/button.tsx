import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium lg:h-12 lg:px-7 lg:text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-foreground text-background hover:bg-foreground/85",
  ghost: "border border-white/15 text-foreground hover:bg-white/5",
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
