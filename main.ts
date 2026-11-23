// The Vacuum's Alibi: One Line, 200 Characters — make.fun entry.
//
// Writes one deadpan excuse from a robot vacuum to /output/entry.txt.
// The line is fixed and deterministic: the same bytes on every run, no
// clock, no randomness, no network, no model calls.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Deadpan robot voice, smug about its own sensors, with the punch at the
// end: the vacuum will not go near the corner because its cliff sensor
// read it as stairs — and stairs, it turns out, took its brother.
const LINE =
  "I skipped that corner: my cliff sensor read it as stairs, and I do not trust stairs. They took my brother.";

mkdirSync(OUTPUT_DIR, { recursive: true });

// Self-check the gate before writing: UTF-8 text, 1 to 200 characters,
// not only white space. Fail loudly instead of shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${LINE.length} characters, outside the 1-200 gate`);
}

writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
