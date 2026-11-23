import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync(new URL("../_config.yml", import.meta.url), "utf8");
const interests = readFileSync(new URL("../_data/interests.yml", import.meta.url), "utf8");

const about = [
  "I am currently an algorithm engineer working on large language models (LLMs).",
  "I earned my bachelor's degree in Computer Science and Technology through the Xu Teli Honors Program at Beijing Institute of Technology (BIT), where I also earned a master's degree in computing.",
  "My work focuses on Agent RSI, post-training for agents and generative models, and controllable image and video generation, including text-conditioned, image-conditioned, and reference-guided generation.",
].join(" ");

test("About Me uses the checked wording once for the role", () => {
  assert.equal(config.includes(about), true);
  assert.equal(config.split("algorithm engineer").length - 1, 1);
  assert.equal(config.includes("Xu Teli Honors Program"), true);
  assert.equal(config.includes("talent class"), false);
  assert.equal(config.includes("徐特立"), false);
  assert.equal(config.includes("master's degree in computing"), true);
  assert.equal(/M\.?Sc|M\.?Eng|Ph\.?D|B\.Eng/.test(config), false);
  assert.equal(config.includes("Agent RSI"), true);
});

test("quantitative trading is only a personal interest", () => {
  assert.match(interests, /^heading: Research Interests$/m);
  assert.equal(interests.includes("Agent RSI"), true);
  assert.equal(interests.includes("Post-Training for Agents and Generative Models"), true);
  assert.equal(interests.includes("Controllable Image and Video Generation"), true);
  assert.equal(interests.includes("Text-conditioned, image-conditioned, and reference-guided generation"), true);
  assert.equal(interests.includes("Text / Image / Reference"), false);
  assert.match(interests, /^personal_heading: Personal Interests$/m);
  assert.equal(interests.includes("AI Agents for Quantitative Trading"), true);
  const research = interests.split("personal_heading:")[0];
  assert.equal(research.includes("Quantitative"), false);
});
