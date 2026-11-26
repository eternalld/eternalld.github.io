import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const curriculum = readFileSync(new URL("../_data/curriculum.yml", import.meta.url), "utf8");
const template = readFileSync(new URL("../_includes/curriculum.md", import.meta.url), "utf8");
const css = readFileSync(new URL("../_sass/minimal-light.scss", import.meta.url), "utf8");
const publications = readFileSync(new URL("../_data/publications.yml", import.meta.url), "utf8");

const job = "Algorithm Engineer in large language models. Working on recursive self-improvement, and post-training for agents and generative models.";
const degree = "Master's in Computer Technology. Research on generative models, including post-training and controllable generation, as well as medical image analysis and multimodal understanding.";

test("Experience lists the confirmed job before the master's degree", () => {
  assert.ok(curriculum.indexOf("Kuaishou Technology") < curriculum.indexOf("Beijing Institute of Technology"));
  assert.match(curriculum, /period: "2026\.07 – Present"/);
  assert.match(curriculum, /period: "2023\.09 – 2026\.06"/);
  assert.equal(curriculum.includes(job), true);
  assert.equal(curriculum.includes(degree), true);
  assert.equal(curriculum.includes("Intern"), false);
  assert.equal(curriculum.includes("bachelor"), false);
  assert.equal(curriculum.includes("advisor"), false);
  assert.equal(curriculum.includes("http"), false);
  assert.match(template, /class="experience-card"/);
  assert.match(template, /class="experience-head"/);
  assert.equal(template.includes("<ul"), false);
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
