import { cubeStickers, type StickerContent } from "@/data/cube-stickers";
import type { CubeFace } from "@/types";

/** Edge length of one cubelet. */
export const CUBELET = 0.62;
/** Centre-to-centre distance between neighbouring cubelets. */
export const PITCH = 0.66;
/** Sticker edge length — the inset is what reads as the black gap. */
export const STICKER = 0.5;

const CELLS = [-1, 0, 1] as const;
export type Cell = (typeof CELLS)[number];

const HALF_PI = Math.PI / 2;

const FACE_COLORS: Record<CubeFace, string> = {
  right: "#c41e3a",
  left: "#ff5800",
  top: "#f5f5f5",
  bottom: "#ffd500",
  front: "#009e60",
  back: "#0051ba",
};

type FaceSpec = {
  face: CubeFace;
  /** True when a cubelet at these coords carries this face's sticker. */
  shows: (x: Cell, y: Cell, z: Cell) => boolean;
  /** Outward offset from the cubelet centre. */
  offset: (lift: number) => [number, number, number];
  rotation: [number, number, number];
  /** Slot index 0-8 in reading order, seen head-on. */
  slot: (x: Cell, y: Cell, z: Cell) => number;
};

const FACES: FaceSpec[] = [
  {
    face: "front",
    shows: (_x, _y, z) => z === 1,
    offset: (lift) => [0, 0, lift],
    rotation: [0, 0, 0],
    slot: (x, y) => (1 - y) * 3 + (x + 1),
  },
  {
    face: "back",
    shows: (_x, _y, z) => z === -1,
    offset: (lift) => [0, 0, -lift],
    rotation: [0, Math.PI, 0],
    slot: (x, y) => (1 - y) * 3 + (1 - x),
  },
  {
    face: "right",
    shows: (x) => x === 1,
    offset: (lift) => [lift, 0, 0],
    rotation: [0, HALF_PI, 0],
    slot: (_x, y, z) => (1 - y) * 3 + (1 - z),
  },
  {
    face: "left",
    shows: (x) => x === -1,
    offset: (lift) => [-lift, 0, 0],
    rotation: [0, -HALF_PI, 0],
    slot: (_x, y, z) => (1 - y) * 3 + (z + 1),
  },
  {
    face: "top",
    shows: (_x, y) => y === 1,
    offset: (lift) => [0, lift, 0],
    rotation: [-HALF_PI, 0, 0],
    slot: (x, _y, z) => (z + 1) * 3 + (x + 1),
  },
  {
    face: "bottom",
    shows: (_x, y) => y === -1,
    offset: (lift) => [0, -lift, 0],
    rotation: [HALF_PI, 0, 0],
    slot: (x, _y, z) => (1 - z) * 3 + (x + 1),
  },
];

export type StickerSpec = {
  key: string;
  /** Position within the cubelet, so twists carry the sticker along. */
  position: [number, number, number];
  rotation: [number, number, number];
  content: StickerContent;
};

export type CubeletSpec = {
  id: string;
  /** Solved grid coordinates. Twisting changes where it sits, not this. */
  coords: [Cell, Cell, Cell];
  stickers: StickerSpec[];
};

/**
 * The 27 cubelets in their solved state, each carrying its own stickers.
 * Colours and images are baked in here, so a twist scrambles them the way a
 * real cube does — the sticker belongs to the piece, not to the face.
 */
function buildCubelets(): CubeletSpec[] {
  const lift = CUBELET / 2 + 0.004;
  const cubelets: CubeletSpec[] = [];

  for (const x of CELLS) {
    for (const y of CELLS) {
      for (const z of CELLS) {
        const stickers: StickerSpec[] = [];

        for (const spec of FACES) {
          if (!spec.shows(x, y, z)) continue;
          stickers.push({
            key: spec.face,
            position: spec.offset(lift),
            rotation: spec.rotation,
            // The flat face colour is the fallback when a slot is empty.
            content: cubeStickers[spec.face][spec.slot(x, y, z)] ?? {
              kind: "color",
              color: FACE_COLORS[spec.face],
            },
          });
        }

        cubelets.push({ id: `${x}${y}${z}`, coords: [x, y, z], stickers });
      }
    }
  }

  return cubelets;
}

export const CUBELET_SPECS: CubeletSpec[] = buildCubelets();
