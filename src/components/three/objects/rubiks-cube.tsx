"use client";

import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import { type Group, Quaternion, Vector3 } from "three";
import { CUBELET_SPECS, PITCH } from "@/components/three/objects/cube-layout";
import { Cubelet } from "@/components/three/objects/cubelet";
import { useMousePosition } from "@/hooks/use-mouse-position";

type RubiksCubeProps = {
  /** Scales the idle sway. 0 stops it; pointer tracking is unaffected. */
  idleMotion?: number;
};

/** Resting orientation, so a centred pointer still shows three faces. */
const BASE_YAW = 0.6;
const BASE_PITCH = -0.3;
/** How far the pointer can swing the cube, in radians. */
const YAW_RANGE = 0.9;
const PITCH_RANGE = 0.55;
/** Higher follows the pointer more sharply. */
const FOLLOW = 4;
/** Seconds one quarter-turn takes. */
const TWIST_DURATION = 0.42;

const HALF_PI = Math.PI / 2;
const AXES = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];
/** Local facing of a sticker plane, used when a hit reports no face. */
const OUTWARD = new Vector3(0, 0, 1);

/** Where a piece currently sits, and how it has been turned to get there. */
type CubeletState = {
  coords: Vector3;
  quaternion: Quaternion;
};

/** A quarter-turn in progress. */
type Twist = {
  /** Index into `AXES`. */
  axis: number;
  /** Coordinate along that axis shared by the nine turning pieces. */
  layer: number;
  direction: 1 | -1;
  elapsed: number;
};

// Scratch objects — reused every frame so the loop allocates nothing.
const offset = new Vector3();
const orientation = new Quaternion();
const spin = new Quaternion();
const facing = new Vector3();
const world = new Quaternion();
const inverseWorld = new Quaternion();

/** Smooth start and finish, so a twist reads as a hand turning it. */
function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function dominantAxis(vector: Vector3): number {
  const x = Math.abs(vector.x);
  const y = Math.abs(vector.y);
  const z = Math.abs(vector.z);
  if (x >= y && x >= z) return 0;
  return y >= z ? 1 : 2;
}

/**
 * Decorative 3×3 cube. It leans toward the pointer, and clicking a face
 * twists that layer a quarter-turn like someone idly playing with it.
 *
 * Each sticker is an image slot: give it a path in `@/data/cube-stickers`
 * and the flat colour is replaced by that image.
 */
export function RubiksCube({ idleMotion = 1 }: RubiksCubeProps) {
  const group = useRef<Group>(null);
  const pieces = useRef<(Group | null)[]>([]);
  const twist = useRef<Twist | null>(null);
  const pointer = useMousePosition();

  const states = useMemo<CubeletState[]>(
    () =>
      CUBELET_SPECS.map((spec) => ({
        coords: new Vector3(...spec.coords),
        quaternion: new Quaternion(),
      })),
    [],
  );

  const startTwist = useCallback(
    (index: number, event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      const cube = group.current;
      if (!cube || twist.current) return;

      // Which way the clicked face points, expressed in the cube's own space.
      facing
        .copy(event.face?.normal ?? OUTWARD)
        .applyQuaternion(event.object.getWorldQuaternion(world))
        .applyQuaternion(
          inverseWorld.copy(cube.getWorldQuaternion(world)).invert(),
        );

      // Turn around one of the two axes lying in that face, picked at random
      // so repeated clicks in one spot keep the cube moving.
      const faceAxis = dominantAxis(facing);
      const options = [0, 1, 2].filter((axis) => axis !== faceAxis);
      const axis = options[Math.random() < 0.5 ? 0 : 1];

      twist.current = {
        axis,
        layer: Math.round(states[index].coords.getComponent(axis)),
        direction: Math.random() < 0.5 ? 1 : -1,
        elapsed: 0,
      };
    },
    [states],
  );

  useFrame((state, delta) => {
    const cube = group.current;
    if (!cube) return;

    const time = state.clock.elapsedTime;
    const sway = idleMotion * 0.1;

    // Pointer up/right turns that side of the cube toward the cursor.
    const targetYaw =
      BASE_YAW + pointer.current.x * YAW_RANGE + Math.sin(time * 0.3) * sway;
    const targetPitch =
      BASE_PITCH -
      pointer.current.y * PITCH_RANGE +
      Math.sin(time * 0.23) * sway;

    // Frame-rate independent damping toward the target.
    const step = 1 - Math.exp(-FOLLOW * delta);
    cube.rotation.y += (targetYaw - cube.rotation.y) * step;
    cube.rotation.x += (targetPitch - cube.rotation.x) * step;

    const active = twist.current;
    let angle = 0;
    if (active) {
      active.elapsed = Math.min(active.elapsed + delta, TWIST_DURATION);
      angle =
        easeInOut(active.elapsed / TWIST_DURATION) * HALF_PI * active.direction;
    }

    for (let index = 0; index < states.length; index += 1) {
      const piece = pieces.current[index];
      if (!piece) continue;

      const { coords, quaternion } = states[index];
      offset.copy(coords).multiplyScalar(PITCH);
      orientation.copy(quaternion);

      if (active && coords.getComponent(active.axis) === active.layer) {
        const axis = AXES[active.axis];
        offset.applyAxisAngle(axis, angle);
        orientation.premultiply(spin.setFromAxisAngle(axis, angle));
      }

      piece.position.copy(offset);
      piece.quaternion.copy(orientation);
    }

    // Bake the finished quarter-turn into the layer's pieces, so the next
    // twist starts from where they actually ended up.
    if (active && active.elapsed >= TWIST_DURATION) {
      const axis = AXES[active.axis];
      spin.setFromAxisAngle(axis, HALF_PI * active.direction);

      for (const piece of states) {
        if (piece.coords.getComponent(active.axis) !== active.layer) continue;
        piece.coords.applyQuaternion(spin).round();
        piece.quaternion.premultiply(spin).normalize();
      }

      twist.current = null;
    }
  });

  return (
    <group ref={group} rotation={[BASE_PITCH, BASE_YAW, 0]}>
      {CUBELET_SPECS.map((spec, index) => (
        <Cubelet
          key={spec.id}
          spec={spec}
          ref={(piece) => {
            pieces.current[index] = piece;
          }}
          onSelect={(event) => startTwist(index, event)}
        />
      ))}
    </group>
  );
}
