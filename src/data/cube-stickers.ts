import { projects } from "@/data/projects";
import { stackMarks } from "@/data/stack-marks";
import type { CubeFace } from "@/types";

/** What a single sticker on the hero cube shows. */
export type StickerContent =
  | { kind: "image"; src: string; label: string }
  | { kind: "mark"; path: string; color: string; label: string }
  | { kind: "color"; color: string };

/** A face holds 9 stickers, in reading order seen head-on. */
export type StickerSlots = readonly (StickerContent | null)[];

const FACES: CubeFace[] = ["front", "back", "right", "left", "top", "bottom"];
const SLOTS_PER_FACE = 9;
/** Every third sticker is a project; the rest are tools. */
const WORK_EVERY = 3;

/**
 * 384px square crops of the project screenshots, made for this cube so the
 * hero does not download the full-size images. They were produced from
 * /public/images by rendering each one into a 384×384 frame with
 * `object-fit: cover` — regenerate the same way if a screenshot changes.
 */
function workStickers(): StickerContent[] {
  return projects
    .filter((project) => project.cover)
    .map((project) => ({
      kind: "image" as const,
      src: `/textures/work/${project.slug}.png`,
      label: project.title,
    }));
}

/** Brand marks, drawn onto the sticker at runtime rather than loaded. */
function markStickers(): StickerContent[] {
  return stackMarks
    .filter((mark): mark is Required<typeof mark> => Boolean(mark.path))
    .map((mark) => ({
      kind: "mark" as const,
      path: mark.path,
      color: mark.color,
      label: mark.label,
    }));
}

/**
 * Interleaves work and tools across all 54 stickers so no face is all one or
 * the other, and each image recurs on a different face rather than clustering.
 * With nothing to show, slots stay null and the cube falls back to the flat
 * face colours.
 */
function buildFaces(): Record<CubeFace, StickerSlots> {
  const work = workStickers();
  const marks = markStickers();
  const faces = {} as Record<CubeFace, StickerSlots>;

  let index = 0;
  for (const face of FACES) {
    const slots: (StickerContent | null)[] = [];

    for (let slot = 0; slot < SLOTS_PER_FACE; slot += 1, index += 1) {
      const wantsWork = index % WORK_EVERY === 0;
      const pool = wantsWork && work.length > 0 ? work : marks;
      const position = wantsWork
        ? Math.floor(index / WORK_EVERY)
        : index - Math.floor(index / WORK_EVERY) - 1;

      slots.push(pool.length > 0 ? pool[position % pool.length] : null);
    }

    faces[face] = slots;
  }

  return faces;
}

export const cubeStickers: Record<CubeFace, StickerSlots> = buildFaces();
