"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  type Group,
  type Intersection,
  MathUtils,
  type Mesh,
  type Object3D,
  Quaternion,
  Raycaster,
  Vector2,
  Vector3,
} from "three";
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
/** Sits back at this size, and grows to full size under the pointer. */
const REST_SCALE = 0.82;
const HOVER_SCALE = 1;
/** Higher snaps to the hover size more sharply. */
const SCALE_FOLLOW = 7;
/** Edge of the invisible box that decides whether the cube is hovered. */
const HOVER_BOX = 2.06;
/** Most of the shorter viewport axis the cube is allowed to span. */
const SCREEN_FRACTION = 0.85;
/** Widest silhouette the cube presents while it turns (its face diagonal). */
const CUBE_SPAN = 2.74;
/** Elements that own their clicks — never twist the cube instead. */
const INTERACTIVE = "a, button, input, textarea, select, label, [role=button]";

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
const screen = new Vector2();

/** Smooth start and finish, so a twist reads as a hand turning it. */
function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Keeps the cube inside a narrow viewport. Full size once there is room for
 * it, so wide screens are unaffected and a portrait phone shrinks it to fit.
 */
function fitToViewport(viewport: { width: number; height: number }): number {
  const shorter = Math.min(viewport.width, viewport.height);
  return Math.min(1, (shorter * SCREEN_FRACTION) / CUBE_SPAN);
}

/** Viewport coordinates as device coordinates within the canvas. */
function toScreen(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
): Vector2 {
  const rect = canvas.getBoundingClientRect();
  return screen.set(
    ((clientX - rect.left) / rect.width) * 2 - 1,
    -(((clientY - rect.top) / rect.height) * 2 - 1),
  );
}

function dominantAxis(vector: Vector3): number {
  const x = Math.abs(vector.x);
  const y = Math.abs(vector.y);
  const z = Math.abs(vector.z);
  if (x >= y && x >= z) return 0;
  return y >= z ? 1 : 2;
}

/**
 * Decorative 3×3 cube. It leans toward the pointer, grows under it, and a
 * click twists that layer a quarter-turn like someone idly playing with it.
 *
 * Hit-testing is done here rather than through r3f's pointer events: the cube
 * sits behind the hero copy, so DOM events would be swallowed by the text
 * long before they reached the canvas. Raycasting from the pointer position
 * ignores what is painted on top, which lets the copy stay selectable and
 * the cube stay reachable through it.
 *
 * Each sticker is an image slot: give it a path in `@/data/cube-stickers`
 * and the flat colour is replaced by that image.
 */
export function RubiksCube({ idleMotion = 1 }: RubiksCubeProps) {
  const group = useRef<Group>(null);
  const hitArea = useRef<Mesh>(null);
  const pieces = useRef<(Group | null)[]>([]);
  const twist = useRef<Twist | null>(null);
  const hovered = useRef(false);
  const sized = useRef(false);
  const pointer = useMousePosition();

  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const raycaster = useMemo(() => new Raycaster(), []);

  const states = useMemo<CubeletState[]>(
    () =>
      CUBELET_SPECS.map((spec) => ({
        coords: new Vector3(...spec.coords),
        quaternion: new Quaternion(),
      })),
    [],
  );

  const startTwist = useCallback(
    (hit: Intersection) => {
      const cube = group.current;
      if (!cube || twist.current) return;

      // Which piece was hit — the ray lands on one of its stickers or body.
      let node: Object3D | null = hit.object;
      let index = -1;
      while (node && index < 0) {
        index = pieces.current.indexOf(node as Group);
        node = node.parent;
      }
      if (index < 0) return;

      // Which way the clicked face points, expressed in the cube's own space
      // so the outer lean cannot skew which layer gets picked.
      facing
        .copy(hit.face?.normal ?? OUTWARD)
        .applyQuaternion(hit.object.getWorldQuaternion(world))
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

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (twist.current) return;

      // Real controls keep their clicks, and a click that ends a text
      // selection is the visitor selecting text, not reaching for the cube.
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE)) return;
      if (window.getSelection()?.toString()) return;

      const targets = pieces.current.filter(
        (piece): piece is Group => piece !== null,
      );
      if (!targets.length) return;

      const point = toScreen(gl.domElement, event.clientX, event.clientY);
      if (Math.abs(point.x) > 1 || Math.abs(point.y) > 1) return;

      raycaster.setFromCamera(point, camera);
      const [hit] = raycaster.intersectObjects(targets, true);
      if (hit) startTwist(hit);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [camera, gl, raycaster, startTwist]);

  useFrame((state, delta) => {
    const cube = group.current;
    if (!cube) return;

    const time = state.clock.elapsedTime;
    const sway = idleMotion * 0.1;

    let leanX = 0;
    let leanY = 0;

    if (pointer.current.moved) {
      const point = toScreen(
        state.gl.domElement,
        pointer.current.clientX,
        pointer.current.clientY,
      );
      // Clamped, so a pointer far outside the canvas does not over-rotate.
      leanX = MathUtils.clamp(point.x, -1, 1);
      leanY = MathUtils.clamp(point.y, -1, 1);

      raycaster.setFromCamera(point, state.camera);
      hovered.current =
        hitArea.current !== null &&
        raycaster.intersectObject(hitArea.current, false).length > 0;
    } else {
      hovered.current = false;
    }

    // Pointer up/right turns that side of the cube toward the cursor.
    const targetYaw =
      BASE_YAW + leanX * YAW_RANGE + Math.sin(time * 0.3) * sway;
    const targetPitch =
      BASE_PITCH - leanY * PITCH_RANGE + Math.sin(time * 0.23) * sway;

    // Frame-rate independent damping toward the target.
    const step = 1 - Math.exp(-FOLLOW * delta);
    cube.rotation.y += (targetYaw - cube.rotation.y) * step;
    cube.rotation.x += (targetPitch - cube.rotation.x) * step;

    // Grow to full size under the pointer, shrink back when it leaves, and
    // stay within the viewport either way. The first frame snaps rather than
    // eases, so a small screen never shows the cube at desktop size.
    const targetScale =
      (hovered.current ? HOVER_SCALE : REST_SCALE) *
      fitToViewport(state.viewport);
    const scaleStep = sized.current ? 1 - Math.exp(-SCALE_FOLLOW * delta) : 1;
    sized.current = true;
    cube.scale.setScalar(
      cube.scale.x + (targetScale - cube.scale.x) * scaleStep,
    );

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
    <group ref={group} rotation={[BASE_PITCH, BASE_YAW, 0]} scale={REST_SCALE}>
      {/* Hover target. Never drawn, but still raycast, since the hit-testing
          above is ours rather than the renderer's. One box rather than the 27
          pieces keeps the per-frame test cheap. */}
      <mesh ref={hitArea} visible={false}>
        <boxGeometry args={[HOVER_BOX, HOVER_BOX, HOVER_BOX]} />
      </mesh>

      {CUBELET_SPECS.map((spec, index) => (
        <Cubelet
          key={spec.id}
          spec={spec}
          ref={(piece) => {
            pieces.current[index] = piece;
          }}
        />
      ))}
    </group>
  );
}
