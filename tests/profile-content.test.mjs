import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync(new URL("../_config.yml", import.meta.url), "utf8");
const interests = readFileSync(new URL("../_data/interests.yml", import.meta.url), "utf8");

const about = [
  "I am currently a large language model algorithm engineer.",
  "I received my bachelor's degree in Computer Science and Technology through the Xu Teli Honors Program (徐特立英才班) at Beijing Institute of Technology (BIT), where I also completed my master's degree in Computer Science.",
  "My work focuses on Agent RSI, post-training for agents and generative models, and controllable image and video generation conditioned on text, images, and references.",
].join(" ");

test("About Me states the role once, then the BIT degrees, then the work", () => {
  assert.equal(config.includes(about), true);
  assert.equal(config.split("large language model algorithm engineer").length - 1, 1);
  assert.equal(config.includes("徐特立英才班"), true);
  assert.equal(config.includes("Agent RSI"), true);
  assert.equal(/Ph\.?D|B\.Eng|M\.Eng|20\d\d/.test(config), false);
});

test("quantitative trading is only a personal interest", () => {
  assert.match(interests, /^heading: Research Interests$/m);
  assert.equal(interests.includes("Agent RSI"), true);
  assert.equal(interests.includes("Post-Training for Agents and Generative Models"), true);
  assert.equal(interests.includes("Controllable Image and Video Generation (Text / Image / Reference Conditioning)"), true);
  assert.match(interests, /^personal_heading: Personal Interests$/m);
  assert.equal(interests.includes("AI Agents for Quantitative Trading"), true);
  const research = interests.split("personal_heading:")[0];
  assert.equal(research.includes("Quantitative"), false);
});
