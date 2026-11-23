import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const site = new URL("../../_site/", import.meta.url);
const index = readFileSync(new URL("index.html", site), "utf8");

function absent(needle) {
  assert.equal(index.includes(needle), false, needle);
}

test("the built homepage keeps identity and hides empty sections", () => {
  assert.match(index, /<title>Haoxin Lyu<\/title>/);
  assert.match(index, /I am currently a large language model algorithm engineer\./);
  assert.equal(index.split("large language model algorithm engineer").length - 1, 1);
  assert.match(index, /Xu Teli Honors Program \(徐特立英才班\)/);
  assert.match(index, /<h2>Research Interests<\/h2>/);
  assert.match(index, /<h2>Personal Interests<\/h2>/);
  const researchAt = index.indexOf("<h2>Research Interests</h2>");
  const personalAt = index.indexOf("<h2>Personal Interests</h2>");
  const publicationsAt = index.indexOf('id="publications"');
  assert.ok(researchAt < personalAt && personalAt < publicationsAt);
  assert.equal(index.slice(researchAt, personalAt).includes("Quantitative"), false);
  assert.equal(index.slice(personalAt, publicationsAt).includes("AI Agents for Quantitative Trading"), true);
  assert.match(index, /End-to-End Story Visualization Framework/);
  assert.match(index, /GTMS: A Gradient-Driven Tree-Guided Mask-Free Referring Image Segmentation Method/);
  assert.match(index, /https:\/\/doi\.org\/10\.1109\/icassp55912\.2026\.11464718/);
  assert.match(index, /https:\/\/www\.ecva\.net\/papers\/eccv_2024\/papers_ECCV\/papers\/08341\.pdf/);
  assert.match(index, /Repository \(code pending\)/);
  assert.match(index, /<strong>Haoxin Lyu<\/strong>/);
  assert.match(index, /<abbr class="badge badge-static">ICASSP 2026<\/abbr>/);
  assert.match(index, /<abbr class="badge badge-static">ECCV 2024<\/abbr>/);
  absent("gtms-eccv2024-fig1.png");
  absent("Fig. 1 from the ECVA PDF");
  absent("<figure");
  assert.match(index, /aria-label="Google Scholar"/);
  assert.match(index, /https:\/\/scholar\.google\.com\/citations\?user=lMEcQNwAAAAJ(?:&|&amp;)hl=zh-CN/);
  assert.match(index, /href="https:\/\/github\.com\/eternalld"/);
  assert.match(index, /每日一句/);
  assert.match(index, /本站累计访问/);
  const counterStart = index.indexOf('id="busuanzi_container_site_pv"');
  const countAt = index.indexOf("本站累计访问");
  const counterEnd = index.indexOf("</div>", countAt);
  assert.ok(counterStart !== -1 && counterStart < countAt && countAt < counterEnd);
  absent("统计说明");
  absent("<details");
  absent("按页面浏览次数统计，非独立访客人数");
  assert.match(index, /Powered by Jekyll and/);
  assert.match(index, /minimal-light/);
  absent("Your Name");
  absent("Your Affiliation");
  absent("Yaoyao");
  absent("Dmego");
  absent("example.edu");
  absent("example.com");
  absent("CVPR");
  absent("i.dmego.cn");
  absent("履历表");
  absent("bit.edu.cn");
  absent("gmail.com");
  absent(">Projects<");
  absent("位访客");
  absent("googletagmanager");
  absent("fonts.googleapis.com");
  absent("font-awesome");
  absent("busuanzi_value_site_uv");
  absent("docs/examples");
  absent("孔子");
  absent("論語");
  const publishedQuotes = JSON.parse(readFileSync(new URL("assets/data/quotes.json", site), "utf8"));
  assert.deepEqual(publishedQuotes, ["all design is redesign"]);
});

test("local assets and preserved pages are present, and drafts are not", () => {
  for (const relative of [
    "assets/css/style.css",
    "assets/css/font.css",
    "assets/js/quote-calendar.js",
    "assets/js/daily-quote.js",
    "assets/js/page-views.js",
    "assets/data/quotes.json",
    "assets/fonts/crimson-pro-latin-400-normal.woff2",
    "blog.html",
    "resume.html",
    "404.html",
  ]) {
    assert.equal(existsSync(new URL(relative, site)), true, relative);
  }
  assert.match(readFileSync(new URL("blog.html", site), "utf8"), /这是博客。/);
  assert.match(readFileSync(new URL("resume.html", site), "utf8"), /这是简历/);
  assert.equal(existsSync(new URL("docs", site)), false);
  assert.equal(existsSync(new URL("legacy", site)), false);
  assert.equal(existsSync(new URL("CNAME", site)), false);
  assert.equal(readdirSync(new URL(".", site)).includes("tests"), false);
});

test("stylesheet and script references point at built files", () => {
  const refs = [...index.matchAll(/(?:href|src)="(\.[^"]+)"/g)].map((match) => match[1]);
  assert.ok(refs.length > 0);
  for (const ref of refs) {
    const path = ref.replace(/^\.\//, "");
    assert.equal(existsSync(new URL(path, site)), true, ref);
  }
});
