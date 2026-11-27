import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const layout = readFileSync(new URL("../_layouts/homepage.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../_sass/minimal-light.scss", import.meta.url), "utf8");

test("the Latin motto sits under the portrait and nowhere else", () => {
  const avatar = layout.indexOf('class="image avatar"');
  const motto = layout.indexOf('<p class="avatar-motto" lang="la">Mens, Manus et Cor</p>');
  const counter = layout.indexOf("本站累计访问");
  assert.ok(avatar !== -1 && motto > avatar && counter > motto);
  assert.equal(layout.split("Mens, Manus et Cor").length - 1, 1);
  assert.equal(layout.includes('"Mens, Manus et Cor"'), false);
  assert.equal(layout.includes("心灵"), false);
  assert.match(css, /\.avatar-motto \{\s*margin: 0\.35rem 0 0;\s*color: #6454d6;\s*font-size: 15px;\s*font-style: italic;\s*line-height: 1\.35;\s*text-align: center;/);
  assert.match(css, /\.avatar-motto \{[\s\S]*@include dark \{\s*color: #c4b8ff;/);
  assert.equal(css.includes(".avatar-motto") && css.includes("animation:") && css.slice(css.indexOf(".avatar-motto"), css.indexOf(".avatar-motto") + 400).includes("animation:"), false);
});
