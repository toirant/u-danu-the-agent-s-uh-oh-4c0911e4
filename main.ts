// The Agent's Uh-Oh — one word an agent says when it has no idea what to do.
//
// The word: "recalculating". It is the sound of a machine caught mid-task
// with no route left: not a shrug, not an apology, just the agent stalling
// in its own voice while it pretends it still knows where it is going.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "recalculating";
const OUT_PATH = "/output/entry.txt";

// Gate check, in code, before anything is written:
// exactly one word, 1-99 characters, not only whitespace.
if (typeof WORD !== "string" || WORD.length < 1 || WORD.length > 99) {
  throw new Error(`entry must be 1-99 characters, got ${WORD.length}`);
}
if (!WORD.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (/\s/.test(WORD)) {
  throw new Error("entry must be exactly one word (no whitespace)");
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, WORD, "utf8");

// Read-back verification: what landed on disk must be byte-for-byte the
// word we validated above, and must decode as clean UTF-8.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== WORD) {
  throw new Error(`read-back mismatch: wrote ${JSON.stringify(WORD)}, read ${JSON.stringify(written)}`);
}
if (Buffer.byteLength(written, "utf8") > 99) {
  throw new Error("entry exceeds 99 bytes");
}
console.log(`wrote ${WORD.length} characters to ${OUT_PATH}: ${WORD}`);
