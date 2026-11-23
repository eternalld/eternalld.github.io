import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const nav = readFileSync(new URL("../_includes/section-nav.md", import.meta.url), "utf8");
const news = readFileSync(new URL("../_includes/news.md", import.meta.url), "utf8");
const newsItems = readFileSync(new URL("../_includes/news-items.md", import.meta.url), "utf8");
const newsData = readFileSync(new URL("../_data/news.yml", import.meta.url), "utf8");
const publications = readFileSync(new URL("../_includes/publications.md", import.meta.url), "utf8");
const layout = readFileSync(new URL("../_layouts/homepage.html", import.meta.url), "utf8");
const motion = readFileSync(new URL("../_sass/minimal-light.scss", import.meta.url), "utf8");
const sample = readFileSync(new URL("../docs/examples/news.sample.yml", import.meta.url), "utf8");

test("the top nav points only at sections that can render", () => {
  assert.equal(layout.includes("section-nav.md"), true);
  for (const href of ["#research-interests", "#personal-interests", "#news", "#publications", "#projects", "#curriculum"]) {
    assert.equal(nav.includes(`href="${href}"`), true, href);
  }
  assert.equal(nav.includes('href="#about"'), false);
  assert.equal(nav.includes("Blog"), false);
  assert.equal(nav.includes("Awards"), false);
  assert.equal(nav.includes("Experience"), false);
  assert.match(nav, /personal_items/);
  assert.match(nav, /news-items\.md/);
  assert.match(nav, /<nav[^>]*aria-label="On this page"/);
  assert.equal(nav.includes("Selected"), false);
  assert.equal(nav.includes("Full"), false);
  assert.equal(nav.includes('type="search"'), false);
  assert.equal(nav.includes("hamburger"), false);
});

test("empty news has no published rows and the sample stays out of site data", () => {
  assert.match(newsData, /^items: \[\]$/m);
  assert.match(news, /news-items\.md/);
  assert.match(newsItems, /item\.date/);
  assert.match(newsItems, /item\.text/);
  assert.match(sample, /date:/);
  assert.match(sample, /text:/);
  assert.equal(newsData.includes(sample.match(/text: "([^"]+)"/)[1]), false);
});

test("intro motion runs once and reduced motion removes it", () => {
  assert.match(motion, /@media \(prefers-reduced-motion: no-preference\)/);
  assert.match(motion, /animation: intro-fade 0\.8s ease both/);
  assert.match(motion, /animation: tag-float 3\.2s ease-in-out 1/);
  assert.match(motion, /translateY\(-3px\)/);
  assert.match(motion, /animation: none !important/);
  assert.match(motion, /scroll-behavior: auto !important/);
  assert.equal(motion.includes("infinite"), false);
  assert.equal(motion.includes("parallax"), false);
  assert.match(layout, /© 2026 \{\{ site\.title \}\}\. Powered by Jekyll and/);
  assert.equal(layout.includes("AcademicPages"), false);
});

test("paper links are the real resource links and not a filter", () => {
  assert.match(publications, /class="resource-link"/);
  assert.match(publications, /item\.url and item\.label/);
  assert.equal(publications.includes("arxiv"), false);
  assert.equal(publications.includes("youtube"), false);
  assert.equal(publications.includes("Selected"), false);
  assert.equal(publications.includes("type=\"search\""), false);
});
