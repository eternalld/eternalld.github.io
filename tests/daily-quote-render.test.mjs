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
  root.children["[data-quote-author]"] = element("author");
  root.children["[data-quote-source]"] = element("source");

  assert.equal(daily.renderDailyQuote(root, null), false);
  assert.equal(root.hidden, true);
  assert.equal(root.children["[data-quote-text]"].textContent, "");

  const ok = daily.renderDailyQuote(root, {
    dateKey: "2026-11-23",
    index: 0,
    quote: {
      text: "君子不器。",
      author: "孔子",
      sourceTitle: "《論語·爲政》",
      sourceUrl: "https://zh.wikisource.org/wiki/論語/為政第二#二之十二",
    },
  });
  assert.equal(ok, true);
  assert.equal(root.hidden, false);
  assert.equal(root.children["[data-quote-text]"].textContent, "君子不器。");
  assert.equal(root.children["[data-quote-author]"].textContent, "孔子");
  assert.equal(root.children["[data-quote-source]"].textContent, "《論語·爲政》");
  assert.equal(root.children["[data-quote-source]"].href, "https://zh.wikisource.org/wiki/論語/為政第二#二之十二");
});
