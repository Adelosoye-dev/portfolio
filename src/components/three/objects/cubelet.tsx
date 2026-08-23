"use client";

import { RoundedBox } from "@react-three/drei";
import type { Ref } from "react";
import type { Group } from "three";
import {
  CUBELET,
  type CubeletSpec,
  PITCH,
  STICKER,
} from "@/components/three/objects/cube-layout";
import { Sticker } from "@/components/three/objects/sticker";

type CubeletProps = {
  spec: CubeletSpec;
  ref?: Ref<Group>;
};

/**
 * One of the 27 pieces. The solved transform is set here so the first frame
 * looks right; after that `RubiksCube` drives position and rotation directly
 * so twists can move a layer without re-rendering React.
 */
export function Cubelet({ spec, ref }: CubeletProps) {
  const [x, y, z] = spec.coords;

  return (
    <group ref={ref} position={[x * PITCH, y * PITCH, z * PITCH]}>
      <RoundedBox
        args={[CUBELET, CUBELET, CUBELET]}
        radius={0.07}
        smoothness={3}
      >
        <meshStandardMaterial color="#101013" roughness={0.5} metalness={0.1} />
      </RoundedBox>

      {spec.stickers.map((sticker) => (
        <Sticker
          key={sticker.key}
          position={sticker.position}
          rotation={sticker.rotation}
          size={STICKER}
          color={sticker.color}
          image={sticker.image}
        />
      ))}
    </group>
  );
}
