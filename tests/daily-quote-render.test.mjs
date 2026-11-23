import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const daily = require("../assets/js/daily-quote.js");

function element(id) {
  return {
    id,
    hidden: true,
    textContent: "",
    href: "",
    lang: "",
    children: {},
    querySelector(selector) {
      return this.children[selector] || null;
    },
  };
}

test("fills the quote block and keeps an incomplete result hidden", () => {
  const root = element("daily-quote");
  root.children["[data-quote-text]"] = element("text");
  root.children["[data-quote-by]"] = element("by");
  root.children["[data-quote-author]"] = element("author");
  root.children["[data-quote-source]"] = element("source");

  assert.equal(daily.renderDailyQuote(root, null), false);
  assert.equal(root.hidden, true);
  assert.equal(root.children["[data-quote-text]"].textContent, "");

  const ok = daily.renderDailyQuote(root, {
    index: 0,
    quote: { text: "all design is redesign" },
  });
  assert.equal(ok, true);
  assert.equal(root.hidden, false);
  assert.equal(root.children["[data-quote-text]"].textContent, "all design is redesign");
  assert.equal(root.children["[data-quote-by]"].hidden, true);
  assert.equal(root.children["[data-quote-author]"].textContent, "");
  assert.equal(root.children["[data-quote-source]"].textContent, "");
  assert.equal(root.children["[data-quote-source]"].hidden, true);
  assert.equal(root.children["[data-quote-author]"].textContent.includes("undefined"), false);
});
