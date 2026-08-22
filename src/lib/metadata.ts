import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Build page metadata that inherits the site defaults. */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ?? siteConfig.name,
      description,
      url: new URL(path, siteConfig.url).toString(),
      siteName: siteConfig.name,
      type: "website",
    },
  };
}
