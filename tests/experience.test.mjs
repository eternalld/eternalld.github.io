import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const curriculum = readFileSync(new URL("../_data/curriculum.yml", import.meta.url), "utf8");
const template = readFileSync(new URL("../_includes/curriculum.md", import.meta.url), "utf8");
const css = readFileSync(new URL("../_sass/minimal-light.scss", import.meta.url), "utf8");
const publications = readFileSync(new URL("../_data/publications.yml", import.meta.url), "utf8");

const job = "Algorithm Engineer in large language models. Working on recursive self-improvement, and post-training for agents and generative models.";
const degree = "Master's in Computer Technology. Research on generative models, including post-training and controllable generation, as well as medical image analysis and multimodal understanding.";
const intern = "Research Intern in visual generative models. Worked on post-training for generative models, and controllable generation (layout-to-image).";

test("Experience lists the job, the master's degree, then the TeleAI internship", () => {
  const kuaishou = curriculum.indexOf("Kuaishou Technology");
  const bit = curriculum.indexOf("Beijing Institute of Technology");
  const teleai = curriculum.indexOf("Institute of Artificial Intelligence, China Telecom (TeleAI)");
  assert.ok(kuaishou !== -1 && kuaishou < bit && bit < teleai);
  assert.match(curriculum, /period: "2026\.07 – Present"/);
  assert.match(curriculum, /period: "2023\.09 – 2026\.06"/);
  assert.match(curriculum, /period: "2024\.11 – 2025\.02"/);
  for (const phrase of [
    "recursive self-improvement",
    "post-training for agents and generative models",
    "generative models",
    "post-training",
    "controllable generation",
    "medical image analysis",
    "multimodal understanding",
    "post-training for generative models",
    "controllable generation (layout-to-image)",
  ]) {
    assert.equal(curriculum.includes(`text: "${phrase}"`), true, phrase);
  }
  assert.equal(curriculum.includes('text: "visual generative models"'), false);
  assert.equal(curriculum.includes("bachelor"), false);
  assert.equal(curriculum.includes("advisor"), false);
  assert.equal(curriculum.includes("http"), false);
  assert.match(template, /class="experience-focus"/);
  assert.match(template, /part\.focus/);
  assert.match(css, /\.experience-focus \{\s*color: #6454d6;\s*font-weight: 700;/);
  assert.match(css, /\.experience-focus \{[\s\S]*@include dark \{\s*color: #c4b8ff;/);
  assert.equal([job, degree, intern].every((sentence) => sentence.length > 0), true);
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
