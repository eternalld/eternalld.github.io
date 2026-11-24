import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const data = readFileSync(new URL("../_data/publications.yml", import.meta.url), "utf8");
const template = readFileSync(new URL("../_includes/publications.md", import.meta.url), "utf8");
const css = readFileSync(new URL("../_sass/minimal-light-publications.scss", import.meta.url), "utf8");

test("only the verified corresponding author is marked", () => {
  const icassp = data.slice(0, data.indexOf("GTMS:"));
  assert.equal(icassp.includes("role:"), false);
  assert.match(data, /name: Sanyuan Zhao\n {8}role: corresponding/);
  assert.equal((data.match(/highlight: true/g) || []).length, 2);
  assert.equal(data.includes("equal"), false);
  assert.equal(data.includes("leader"), false);
  assert.match(template, /class="author-self"/);
  assert.match(template, /<abbr title="corresponding author">†<\/abbr>/);
  assert.match(template, /†<\/abbr> corresponding author/);
  assert.equal(template.includes("equal contribution"), false);
  assert.equal(template.includes("project leader"), false);
});

test("author highlight and conference badges stay inside publications", () => {
  assert.match(css, /\.pub-compact__authors \.author-self \{\s*color: #6454d6;\s*font-weight: 700;/);
  assert.match(css, /color: #c4b8ff;/);
  assert.match(css, /\.pub-compact \{[\s\S]*\.badge \{[\s\S]*background-color: #6454d6;/);
  assert.match(css, /\.pub-compact \{[\s\S]*\.badge \{[\s\S]*border-radius: 0\.35rem;/);
  assert.equal(/\.pub-compact \{[\s\S]*\.badge \{[\s\S]*border-radius:\s*999px/.test(css), false);
});
