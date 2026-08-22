"use client";

import { useTexture } from "@react-three/drei";
import { Shape, ShapeGeometry, SRGBColorSpace } from "three";

type StickerProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
  /** Shown when `image` is null — the placeholder. */
  color: string;
  image: string | null;
};

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

/** Split out so the texture hook only ever runs for stickers that have one. */
function ImageSticker({
  position,
  rotation,
  size,
  image,
}: StickerProps & { image: string }) {
  const texture = useTexture(image, (loaded) => {
    const one = Array.isArray(loaded) ? loaded[0] : loaded;
    one.colorSpace = SRGBColorSpace;
  });

  return (
    <mesh
      position={position}
      rotation={rotation}
      geometry={stickerGeometry(size)}
    >
      <meshStandardMaterial map={texture} roughness={0.35} metalness={0} />
    </mesh>
  );
}

/**
 * One cube sticker. Renders `image` when given a path, otherwise the flat
 * face colour that stands in for it.
 */
export function Sticker(props: StickerProps) {
  if (props.image) return <ImageSticker {...props} image={props.image} />;

  const { position, rotation, size, color } = props;
  return (
    <mesh
      position={position}
      rotation={rotation}
      geometry={stickerGeometry(size)}
    >
      <meshStandardMaterial color={color} roughness={0.35} metalness={0} />
    </mesh>
  );
}
