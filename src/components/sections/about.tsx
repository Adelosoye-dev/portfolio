import { about } from "@/data/about";
import { siteConfig } from "@/config/site";
import { ButtonAnchor } from "@/components/ui/button";
// import { MediaFrame } from "@/components/ui/media-frame";

export function About() {
  return (
    // <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
    <div>
      {/* <MediaFrame
        src={about.portrait}
        alt={siteConfig.name}
        label="Portrait"
        className="aspect-[4/5]"
      /> */}

      <div>
        <p className="max-w-2xl text-xl font-medium tracking-tight sm:text-2xl lg:text-3xl">
          {about.lead}
        </p>

        <div className="text-muted mt-8 max-w-2xl space-y-5 lg:space-y-6 lg:text-lg">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <ButtonAnchor
          href={siteConfig.resume}
          variant="ghost"
          className="mt-10"
          download
        >
          Download CV
        </ButtonAnchor>
      </div>
    </div>
  );
}
