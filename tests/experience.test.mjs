import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const curriculum = readFileSync(new URL("../_data/curriculum.yml", import.meta.url), "utf8");
const template = readFileSync(new URL("../_includes/curriculum.md", import.meta.url), "utf8");
const css = readFileSync(new URL("../_sass/minimal-light.scss", import.meta.url), "utf8");
const publications = readFileSync(new URL("../_data/publications.yml", import.meta.url), "utf8");

test("Experience lists the job, the degree, then the four internships", () => {
  const names = [
    "Kuaishou Technology",
    "Beijing Institute of Technology",
    "TAL Education Group (AI Growth Lab)",
    "Institute of Artificial Intelligence, China Telecom (TeleAI)",
    "Xuzhi Technology (ByteDance Seed GUI Agent, Doubao Phone startup team)",
    "Unipus, Foreign Language Teaching and Research Press (FLTRP)",
  ];
  const positions = names.map((name) => curriculum.indexOf(name));
  assert.ok(positions.every((index, i) => index !== -1 && (i === 0 || index > positions[i - 1])));
  assert.match(curriculum, /period: "2026\.07 – Present"/);
  assert.match(curriculum, /period: "2023\.09 – 2026\.06"/);
  assert.match(curriculum, /period: "2024\.02 – 2025\.06 \(including remote\)"/);
  assert.match(curriculum, /period: "2024\.11 – 2025\.02"/);
  assert.match(curriculum, /period: "2024\.06 – 2024\.08"/);
  assert.match(curriculum, /period: "2023\.10 – 2024\.02"/);
  for (const phrase of [
    "recursive self-improvement",
    "post-training for agents and generative models",
    "generative models",
    "post-training",
    "controllable generation",
    "medical image analysis",
    "multimodal understanding",
    "film generation (from idea to video)",
    "model post-training",
    "quality assessment of long-sequence consistent images and videos",
    "reference-image-consistent generation",
    "post-training for generative models",
    "controllable generation (layout-to-image)",
    "benchmarks for GUI agents",
  ]) {
    assert.equal(curriculum.includes(`text: "${phrase}"`), true, phrase);
  }
  assert.equal(curriculum.includes('text: "visual generative models"'), false);
  assert.equal(curriculum.includes('text: "idea generation"'), false);
  assert.equal(curriculum.includes('text: "screenplay rewriting"'), false);
  assert.equal(curriculum.includes("bachelor"), false);
  assert.equal(curriculum.includes("advisor"), false);
  assert.equal(curriculum.includes("http"), false);
  assert.match(template, /class="experience-focus"/);
  assert.match(template, /part\.focus/);
  assert.match(css, /\.experience-focus \{\s*color: #6454d6;\s*font-weight: 700;/);
  assert.match(css, /\.experience-focus \{[\s\S]*@include dark \{\s*color: #c4b8ff;/);
});

test("experience cards use the confirmed measurements", () => {
  assert.match(css, /\.experience-list \{[\s\S]*gap: 10px;/);
  assert.match(css, /\.experience-card \{[\s\S]*padding: 10px 14px;[\s\S]*border-radius: 12px;[\s\S]*background: #f9f9f9;/);
  assert.match(css, /\.experience-head strong \{[\s\S]*color: #202124;[\s\S]*font-size: 16px;/);
  assert.match(css, /\.experience-head em \{[\s\S]*color: #9aa0a6;[\s\S]*font-size: 14px;/);
  assert.match(css, /\.experience-info \{[\s\S]*color: #5f6368;[\s\S]*font-size: 15px;[\s\S]*line-height: 1\.5;/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*\.experience-head \{[\s\S]*flex-direction: column;/);
});

test("GTMS no longer links to the pending repository", () => {
  assert.equal(publications.includes("https://github.com/eternalld/GTMS"), false);
  assert.equal(publications.includes("Repository (code pending)"), false);
  assert.equal(publications.includes("https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/08341.pdf"), true);
  assert.equal(publications.includes("https://doi.org/10.1007/978-3-031-72848-8_17"), true);
});
