import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync(new URL("../_config.yml", import.meta.url), "utf8");
const layout = readFileSync(new URL("../_layouts/homepage.html", import.meta.url), "utf8");
const publications = readFileSync(new URL("../_data/publications.yml", import.meta.url), "utf8");
const curriculum = readFileSync(new URL("../_data/curriculum.yml", import.meta.url), "utf8");
const index = readFileSync(new URL("../index.md", import.meta.url), "utf8");

test("the homepage name is Haoxin Lyu and Scholar is linked exactly once", () => {
  assert.match(config, /^title: Haoxin Lyu$/m);
  assert.equal(config.includes("bit.edu.cn"), false);
  assert.equal(config.includes("@"), false);
  assert.equal(config.includes("https://scholar.google.com/citations?user=lMEcQNwAAAAJ&hl=zh-CN"), true);
  assert.equal(layout.includes("site.scholar_link"), true);
  assert.equal(layout.includes(">Google Scholar</span>"), true);
  assert.equal(layout.includes(">GitHub</span>"), true);
  assert.equal(layout.indexOf(">GitHub</span>") < layout.indexOf(">Google Scholar</span>"), true);
  assert.equal(layout.includes('aria-hidden="true"'), true);
  assert.match(config, /^github_link: https:\/\/github\.com\/eternalld$/m);
  assert.equal(layout.includes("site.github_link"), true);
});

test("the two verified papers are editable data without citation counts or invented files", () => {
  assert.equal(publications.includes("End-to-End Story Visualization Framework with Penalty-Based Evaluation using Vision-Language Models"), true);
  assert.equal(publications.includes("https://doi.org/10.1109/icassp55912.2026.11464718"), true);
  assert.equal(publications.includes("GTMS: A Gradient-Driven Tree-Guided Mask-Free Referring Image Segmentation Method"), true);
  assert.equal(publications.includes("https://doi.org/10.1007/978-3-031-72848-8_17"), true);
  assert.equal(publications.includes("https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/08341.pdf"), true);
  assert.equal(publications.includes("https://github.com/eternalld/GTMS"), false);
  assert.equal(publications.includes("Repository (code pending)"), false);
  assert.equal(publications.includes("Haoxin Lyu"), true);
  assert.equal(publications.includes("ICASSP 2026"), true);
  assert.equal(publications.includes("ECCV 2024"), true);
  assert.equal(publications.includes("image:"), false);
  assert.equal(publications.includes("Fig. 1"), false);
  assert.equal(publications.includes("citation"), false);
  assert.equal(publications.includes("bit.edu.cn"), false);
  assert.equal(publications.includes("gmail.com"), false);
});

test("Experience is the final section and is not a Services block", () => {
  assert.match(curriculum, /^heading: Experience$/m);
  assert.equal(curriculum.includes("items: []"), false);
  assert.equal(curriculum.includes("Services"), false);
  assert.ok(index.indexOf("publications.md") < index.indexOf("curriculum.md"));
  assert.ok(index.indexOf("projects.md") < index.indexOf("curriculum.md"));
});
