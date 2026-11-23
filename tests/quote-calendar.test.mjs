import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const cal = require("../assets/js/quote-calendar.js");

function quote(text, n) {
  return {
    text,
    author: "孔子",
    sourceTitle: "《論語》",
    sourceUrl: "https://zh.wikisource.org/wiki/論語/學而第一#" + n,
  };
}

const pair = [quote("one", 1), quote("two", 2)];

test("uses the Asia/Shanghai calendar date across UTC midnight", () => {
  assert.equal(cal.shanghaiDateKey(new Date("2026-11-22T15:59:59.000Z")), "2026-11-22");
  assert.equal(cal.shanghaiDateKey(new Date("2026-11-22T16:00:00.000Z")), "2026-11-23");
});

test("selects one quote for the whole Shanghai date", () => {
  const morning = cal.selectQuote(pair, new Date("2026-11-22T16:00:00.000Z"));
  const evening = cal.selectQuote(pair, new Date("2026-11-23T15:59:59.000Z"));
  assert.equal(morning.dateKey, "2026-11-23");
  assert.equal(evening.dateKey, "2026-11-23");
  assert.equal(morning.index, evening.index);
  assert.equal(morning.quote.text, evening.quote.text);
});

test("selects a different quote on the next Shanghai date", () => {
  const first = cal.selectQuote(pair, new Date("2026-11-22T16:00:00.000Z"));
  const next = cal.selectQuote(pair, new Date("2026-11-23T16:00:00.000Z"));
  assert.equal(first.dateKey, "2026-11-23");
  assert.equal(next.dateKey, "2026-11-24");
  assert.notEqual(first.index, next.index);
});

test("repeats a 16-quote corpus after 16 Shanghai dates", () => {
  const quotes = Array.from({ length: 16 }, (_, index) => quote("q" + index, index));
  const start = cal.selectQuote(quotes, new Date("2026-11-22T16:00:00.000Z"));
  const later = cal.selectQuote(quotes, new Date("2026-12-08T16:00:00.000Z"));
  assert.equal(start.dateKey, "2026-11-23");
  assert.equal(later.dateKey, "2026-12-09");
  assert.equal(start.index, later.index);
  assert.equal(start.quote.text, later.quote.text);
});

test("hides a quote that has no author or https source", () => {
  assert.equal(cal.isDisplayableQuote({ text: "x", author: "", sourceTitle: "《論語》", sourceUrl: "https://zh.wikisource.org/wiki/a" }), false);
  assert.equal(cal.isDisplayableQuote({ text: "x", author: "孔子", sourceTitle: "《論語》", sourceUrl: "http://zh.wikisource.org/wiki/a" }), false);
  assert.equal(cal.selectQuote([
    { text: "x", author: "孔子", sourceTitle: "", sourceUrl: "https://zh.wikisource.org/wiki/a" },
  ], new Date("2026-11-22T16:00:00.000Z")), null);
  assert.equal(cal.selectQuote([], new Date("2026-11-22T16:00:00.000Z")), null);
});

test("refreshes an open tab when the Shanghai date changes", () => {
  let now = new Date("2026-11-22T15:59:58.000Z");
  const timers = [];
  const seen = [];
  const cancel = cal.scheduleQuoteRefresh({
    quotes: pair,
    now: () => now,
    setTimer: (fn, ms) => {
      timers.push({ fn, ms });
      return timers.length;
    },
    clearTimer: () => {},
    onRender: (result) => seen.push(result.dateKey + ":" + result.quote.text),
  });

  assert.equal(seen.length, 1);
  assert.match(seen[0], /^2026-11-22:/);
  assert.ok(timers[0].ms >= 1000 && timers[0].ms < 5000);

  now = new Date("2026-11-22T16:00:01.000Z");
  timers[0].fn();
  assert.match(seen[1], /^2026-11-23:/);
  assert.notEqual(seen[0], seen[1]);
  cancel();
});
