import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  /** Path under /public. Without it, a labelled placeholder renders. */
  src?: string;
  alt: string;
  /** Shown on the placeholder so it is obvious what belongs here. */
  label: string;
  className?: string;
};

/**
 * Holds a screenshot or portrait. Every image on the page is optional, so the
 * layout is complete before any asset exists — drop a file in /public/images,
 * point the data at it, and the frame fills in. Empty frames are treated as a
 * designed state rather than a gap.
 */
export function MediaFrame({ src, alt, label, className }: MediaFrameProps) {
  return (
    <div
      className={cn(
        "border-surface bg-surface/60 relative overflow-hidden rounded-2xl border",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="grid-lines absolute inset-0 [background-size:36px_36px] opacity-60"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_20%,rgb(91_157_255/0.14),transparent_70%),radial-gradient(60%_60%_at_80%_90%,rgb(47_212_160/0.10),transparent_70%)]"
          />
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div>
              <p className="text-foreground/70 font-mono text-sm tracking-[0.2em] uppercase lg:text-base">
                {label}
              </p>
              <p className="text-muted/60 mt-2 font-mono text-xs">
                awaiting image
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
