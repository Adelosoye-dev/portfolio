"use client";

import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, type ReactNode } from "react";
import { CanvasTexture, Shape, ShapeGeometry, SRGBColorSpace } from "three";
import type { StickerContent } from "@/data/cube-stickers";

type Placement = {
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
};

type StickerProps = Placement & { content: StickerContent };

const geometries = new Map<string, ShapeGeometry>();

/** Rounded square, centred on the origin, with UVs normalised to 0-1. */
function stickerGeometry(size: number): ShapeGeometry {
  const key = size.toFixed(3);
  const cached = geometries.get(key);
  if (cached) return cached;

  const half = size / 2;
  const radius = size * 0.16;
  const shape = new Shape();
  shape.moveTo(-half + radius, -half);
  shape.lineTo(half - radius, -half);
  shape.quadraticCurveTo(half, -half, half, -half + radius);
  shape.lineTo(half, half - radius);
  shape.quadraticCurveTo(half, half, half - radius, half);
  shape.lineTo(-half + radius, half);
  shape.quadraticCurveTo(-half, half, -half, half - radius);
  shape.lineTo(-half, -half + radius);
  shape.quadraticCurveTo(-half, -half, -half + radius, -half);

  const geometry = new ShapeGeometry(shape, 8);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i += 1) {
    uv.setXY(
      i,
      (position.getX(i) + half) / size,
      (position.getY(i) + half) / size,
    );
  }
  uv.needsUpdate = true;

  geometries.set(key, geometry);
  return geometry;
}

function StickerMesh({
  position,
  rotation,
  size,
  children,
}: Placement & { children: ReactNode }) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      geometry={stickerGeometry(size)}
    >
      {children}
    </mesh>
  );
}

/** Split out so the texture hook only runs for stickers that have one. */
function ImageSticker({ src, ...placement }: Placement & { src: string }) {
  const texture = useTexture(src, (loaded) => {
    const one = Array.isArray(loaded) ? loaded[0] : loaded;
    one.colorSpace = SRGBColorSpace;
  });

  return (
    <StickerMesh {...placement}>
      <meshStandardMaterial map={texture} roughness={0.35} metalness={0} />
    </StickerMesh>
  );
}

/**
 * Paints a brand mark onto a tile with Canvas2D. The path data already lives
 * in the bundle, so this needs no logo files and no extra requests, and it
 * stays sharp because it is rasterised at texture resolution.
 */
function MarkSticker({
  path,
  color,
  ...placement
}: Placement & { path: string; color: string }) {
  const texture = useMemo(() => {
    const resolution = 256;
    const canvas = document.createElement("canvas");
    canvas.width = resolution;
    canvas.height = resolution;

    const context = canvas.getContext("2d");
    if (!context) return null;

    // Tile: the surface colour washed with the mark own hue, so the cube
    // reads as colour at a glance and the glyph still has contrast.
    context.fillStyle = "#171d27";
    context.fillRect(0, 0, resolution, resolution);
    context.globalAlpha = 0.34;
    context.fillStyle = color;
    context.fillRect(0, 0, resolution, resolution);
    context.globalAlpha = 1;

    // The marks are authored for a 24×24 viewBox.
    const inset = resolution * 0.2;
    const scale = (resolution - inset * 2) / 24;
    context.translate(inset, inset);
    context.scale(scale, scale);
    context.fillStyle = color;
    context.fill(new Path2D(path));

    const created = new CanvasTexture(canvas);
    created.colorSpace = SRGBColorSpace;
    return created;
  }, [path, color]);

  useEffect(() => () => texture?.dispose(), [texture]);

  return (
    <StickerMesh {...placement}>
      <meshStandardMaterial
        map={texture}
        color={texture ? undefined : color}
        roughness={0.35}
        metalness={0}
      />
    </StickerMesh>
  );
}

function ColorSticker({ color, ...placement }: Placement & { color: string }) {
  return (
    <StickerMesh {...placement}>
      <meshStandardMaterial color={color} roughness={0.35} metalness={0} />
    </StickerMesh>
  );
}

/**
 * One cube sticker: a project screenshot, a tool's brand mark, or the flat
 * face colour when there is nothing to show.
 */
export function Sticker({ content, ...placement }: StickerProps) {
  if (content.kind === "image") {
    return <ImageSticker src={content.src} {...placement} />;
  }

  if (content.kind === "mark") {
    return (
      <MarkSticker path={content.path} color={content.color} {...placement} />
    );
  }

  return <ColorSticker color={content.color} {...placement} />;
}
