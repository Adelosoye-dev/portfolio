import { stackMarks, type StackMark } from "@/data/stack-marks";

export type Stack = StackMark;

/**
 * The tools worth naming, in the order they appear in the strip under the
 * hero. Marks are generated from `simple-icons` into `@/data/stack-marks`
 * (see `pnpm run icons`) so both this strip and the hero cube can read them
 * without shipping the whole icon package.
 */
export const stacks: Stack[] = stackMarks;
