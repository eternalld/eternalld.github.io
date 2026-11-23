import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const quotes = JSON.parse(readFileSync(new URL("../assets/data/quotes.json", import.meta.url), "utf8"));
const raw = readFileSync(new URL("../assets/data/quotes.json", import.meta.url), "utf8");

test("the active list is only the sentence supplied by the user", () => {
  assert.deepEqual(quotes, ["all design is redesign"]);
  assert.equal(raw.includes("孔子"), false);
  assert.equal(raw.includes("論語"), false);
  assert.equal(raw.includes("论语"), false);
});
