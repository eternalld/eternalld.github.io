import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const layout = readFileSync(new URL("../_layouts/homepage.html", import.meta.url), "utf8");
const config = readFileSync(new URL("../_config.yml", import.meta.url), "utf8");
const font = readFileSync(new URL("../assets/css/font.css", import.meta.url), "utf8");

test("the layout names Haoxin's GitHub link and only the Busuanzi counter", () => {
  assert.match(config, /^title: Haoxin Lyu$/m);
  assert.match(config, /^github_link: https:\/\/github\.com\/eternalld$/m);
  assert.equal(config.includes("google_analytics"), false);
  assert.equal(config.includes("Yaoyao"), false);
  assert.equal(layout.includes("https://github.com/yaoyao-liu/minimal-light"), true);
  assert.equal(layout.includes("googletagmanager"), false);
  assert.equal(layout.includes("fonts.googleapis.com"), false);
  assert.equal(layout.includes("font-awesome"), false);
  assert.equal(layout.includes("academicons"), false);
  assert.equal(layout.includes("busuanzi_value_site_uv"), false);
  assert.equal(layout.includes("位访客"), false);
  assert.equal(layout.includes("https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"), true);
  assert.equal(layout.includes("sha384-oaKlriFiEaHzTKw66TKlzwgjYHPT5tvx+uf4JRnAGvP7HCHj5NPqEoAkyyOAPxZN"), true);
  assert.equal(layout.includes("integrity="), false);
  assert.equal(layout.includes("crossorigin"), false);
  assert.equal(layout.includes("本站累计访问"), true);
  assert.equal(layout.includes("按页面浏览次数统计，非独立访客人数"), true);
  assert.equal(font.includes("fonts.googleapis.com"), false);
});
