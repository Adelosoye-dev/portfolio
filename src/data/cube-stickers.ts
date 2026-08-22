/**
 * Images shown on the hero cube's stickers.
 *
 * Each face holds 9 slots in reading order (top-left → bottom-right, as seen
 * looking straight at that face). A slot is either a path under /public or
 * `null`, which renders the face's flat colour instead — the placeholder.
 *
 * Drop files in /public/images and swap the nulls out one at a time; the cube
 * stays valid at every step.
 */
import type { CubeFace } from "@/types";

export type StickerSlots = readonly [
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
];

const empty: StickerSlots = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

export const cubeStickers: Record<CubeFace, StickerSlots> = {
  front: empty,
  back: empty,
  right: empty,
  left: empty,
  top: empty,
  bottom: empty,
};
