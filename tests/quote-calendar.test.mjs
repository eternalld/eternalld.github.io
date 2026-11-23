import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const cal = require("../assets/js/quote-calendar.js");

test("one saved sentence stays on that sentence", () => {
  const only = ["all design is redesign"];
  assert.deepEqual(cal.selectQuote(only, () => 0.99), {
    index: 0,
    quote: { text: "all design is redesign", author: "", sourceTitle: "", sourceUrl: "" },
  });
});

test("several sentences are chosen from the supplied random value", () => {
  const quotes = ["one", "two", "three"];
  assert.equal(cal.selectQuote(quotes, () => 0).quote.text, "one");
  assert.equal(cal.selectQuote(quotes, () => 0.34).quote.text, "two");
  assert.equal(cal.selectQuote(quotes, () => 0.99).index, 2);
  assert.equal(cal.selectQuote(quotes, () => 0.99).quote.text, "three");
});

test("an empty list and blank text select nothing", () => {
  assert.equal(cal.selectQuote([], () => 0), null);
  assert.equal(cal.selectQuote(["", "   ", { text: "" }], () => 0), null);
  assert.equal(cal.selectQuote(null, () => 0), null);
});

test("a sentence does not need an author or source", () => {
  assert.equal(cal.isDisplayableQuote("all design is redesign"), true);
  assert.equal(cal.isDisplayableQuote({ text: "all design is redesign" }), true);
  const selected = cal.selectQuote([{ text: "all design is redesign" }], () => 0.5);
  assert.equal(selected.quote.author, "");
  assert.equal(selected.quote.sourceTitle, "");
  assert.equal(selected.quote.sourceUrl, "");
});
