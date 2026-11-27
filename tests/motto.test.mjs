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
  assert.match(layout, /<div class="avatar-motto-wrap">\s*<p class="avatar-motto" lang="la">Mens, Manus et Cor<\/p>/);
  assert.match(css, /\.avatar-motto-wrap \{\s*width: 11\.5rem;\s*max-width: 100%;\s*margin: 0\.35rem auto 0;\s*container-type: inline-size;/);
  assert.match(css, /\.avatar-motto \{\s*margin: 0;\s*color: #6454d6;\s*font-size: 10\.87cqi;\s*letter-spacing: 0\.205cqi;\s*font-style: italic;\s*line-height: 1\.35;\s*text-align: center;\s*white-space: nowrap;/);
  assert.match(css, /\.avatar-motto \{[\s\S]*@include dark \{\s*color: #c4b8ff;/);
  const mottoRule = css.slice(css.indexOf(".avatar-motto {"), css.indexOf(".social-icons"));
  assert.equal(mottoRule.includes("transform:"), false);
  assert.equal(mottoRule.includes("scaleX"), false);
});
