import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync(new URL("../_config.yml", import.meta.url), "utf8");
const interests = readFileSync(new URL("../_data/interests.yml", import.meta.url), "utf8");

const about = [
  "I am currently an algorithm engineer working on large language models (LLMs).",
  "I earned my bachelor's degree in Computer Science and Technology through the Xu Teli Honors Program at Beijing Institute of Technology (BIT), where I also earned a master's degree in computing.",
  "My work focuses on Agent RSI, post-training for agents and generative models, and controllable image and video generation, including text-conditioned, image-conditioned, and reference-guided generation.",
  "I am also interested in AI agents for quantitative trading.",
].join(" ");

test("About Me uses the checked wording once for the role", () => {
  const raw = config.match(/^bio: \|\r?\n([\s\S]*?)^favicon:/m);
  assert.ok(raw, "bio is a literal block that can hold paragraphs");
  const paragraphs = raw[1].split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  assert.equal(paragraphs.length, 4);
  const plain = raw[1].replace(/\*/g, "").split("\n").map((line) => line.trim()).filter(Boolean).join(" ");
  assert.equal(plain, about);
  assert.equal(plain.split("algorithm engineer").length - 1, 1);
  assert.equal(raw[1].includes("**"), false);
  assert.equal(config.includes("talent class"), false);
  assert.equal(config.includes("徐特立"), false);
  assert.equal(/M\.?Sc|M\.?Eng|Ph\.?D|B\.?Eng/.test(config), false);
});

test("quantitative trading stays out of the research list", () => {
  assert.match(interests, /^heading: Research Interests$/m);
  assert.equal(interests.includes("Agent RSI"), true);
  assert.equal(interests.includes("Post-Training for Agents and Generative Models"), true);
  assert.equal(interests.includes("Controllable Image and Video Generation"), true);
  assert.equal(interests.includes("Text-conditioned, image-conditioned, and reference-guided generation"), true);
  assert.equal(interests.includes("Text / Image / Reference"), false);
  assert.equal(interests.includes("Personal Interests"), false);
  assert.equal(interests.includes("Quantitative"), false);
  assert.equal(config.includes("I am also interested in AI agents for quantitative trading."), true);
  assert.equal(config.split("quantitative trading").length - 1, 1);
});
