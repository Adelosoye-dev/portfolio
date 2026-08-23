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
 * point the data at it, and the frame fills in.
 */
export function MediaFrame({ src, alt, label, className }: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]",
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
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <div>
            <p className="text-muted text-sm lg:text-base">{label}</p>
            <p className="text-muted/60 mt-2 font-mono text-xs">
              image placeholder
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
