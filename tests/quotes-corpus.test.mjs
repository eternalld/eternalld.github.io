import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const quotes = JSON.parse(readFileSync(new URL("../assets/data/quotes.json", import.meta.url), "utf8"));

const expected = [
  ["xueer-1-3", "巧言令色，鮮矣仁。", "子曰：「巧言令色，鮮矣仁。」", "《論語·學而》", "https://zh.wikisource.org/wiki/論語/學而第一#一之三"],
  ["xueer-1-16", "不患人之不己知，患不知人也。", "子曰：「不患人之不己知，患不知人也。」", "《論語·學而》", "https://zh.wikisource.org/wiki/論語/學而第一#一之十六"],
  ["weizheng-2-11", "溫故而知新，可以爲師矣。", "子曰：「溫故而知新，可以爲師矣。」", "《論語·爲政》", "https://zh.wikisource.org/wiki/論語/為政第二#二之十一"],
  ["weizheng-2-12", "君子不器。", "子曰：「君子不器。」", "《論語·爲政》", "https://zh.wikisource.org/wiki/論語/為政第二#二之十二"],
  ["weizheng-2-15", "學而不思則罔，思而不學則殆。", "子曰：「學而不思則罔，思而不學則殆。」", "《論語·爲政》", "https://zh.wikisource.org/wiki/論語/為政第二#二之十五"],
  ["weizheng-2-17", "由，誨女知之乎！知之爲知之，不知爲不知，是知也。", "子曰：「由，誨女知之乎！知之爲知之，不知爲不知，是知也。」", "《論語·爲政》", "https://zh.wikisource.org/wiki/論語/為政第二#二之十七"],
  ["liren-4-8", "朝聞道，夕死可矣！", "子曰：「朝聞道，夕死可矣！」", "《論語·里仁》", "https://zh.wikisource.org/wiki/論語/里仁第四#四之八"],
  ["liren-4-16", "君子喻於義，小人喻於利。", "子曰：「君子喻於義，小人喻於利。」", "《論語·里仁》", "https://zh.wikisource.org/wiki/論語/里仁第四#四之十六"],
  ["liren-4-17", "見賢思齊焉，見不賢而內自省也。", "子曰：「見賢思齊焉，見不賢而內自省也。」", "《論語·里仁》", "https://zh.wikisource.org/wiki/論語/里仁第四#四之十七"],
  ["liren-4-24", "君子欲訥於言而敏於行。", "子曰：「君子欲訥於言而敏於行。」", "《論語·里仁》", "https://zh.wikisource.org/wiki/論語/里仁第四#四之二四"],
  ["liren-4-25", "德不孤，必有鄰。", "子曰：「德不孤，必有鄰。」", "《論語·里仁》", "https://zh.wikisource.org/wiki/論語/里仁第四#四之二五"],
  ["shuer-7-21", "三人行，必有我師焉。擇其善者而從之，其不善者而改之。", "子曰：「三人行，必有我師焉。擇其善者而從之，其不善者而改之。」", "《論語·述而》", "https://zh.wikisource.org/wiki/論語/述而第七#七之二一"],
  ["shuer-7-29", "仁遠乎哉？我欲仁，斯仁至矣。", "子曰：「仁遠乎哉？我欲仁，斯仁至矣。」", "《論語·述而》", "https://zh.wikisource.org/wiki/論語/述而第七#七之二九"],
  ["zihan-9-17", "逝者如斯夫！不舍晝夜。", "子在川上曰：「逝者如斯夫！不舍晝夜。」", "《論語·子罕》", "https://zh.wikisource.org/wiki/論語/子罕第九#九之十七"],
  ["zihan-9-28", "歲寒，然後知松柏之後凋也。", "子曰：「歲寒，然後知松柏之後凋也。」", "《論語·子罕》", "https://zh.wikisource.org/wiki/論語/子罕第九#九之二八"],
  ["weiling-15-38", "有教無類。", "子曰：「有教無類。」", "《論語·衛靈公》", "https://zh.wikisource.org/wiki/論語/衛靈公第十五#十五之三八"],
];

test("corpus matches the verified Wikisource lines in order", () => {
  assert.equal(quotes.length, expected.length);
  quotes.forEach((quote, index) => {
    const row = expected[index];
    assert.equal(quote.id, row[0]);
    assert.equal(quote.text, row[1]);
    assert.equal(quote.sourceLine, row[2]);
    assert.equal(quote.author, "孔子");
    assert.equal(quote.sourceTitle, row[3]);
    assert.equal(quote.sourceUrl, row[4]);
    assert.equal(quote.retrieved, "2026-11-23");
    assert.equal(quote.sourceLine.includes("「" + quote.text + "」"), true);
    assert.equal(quote.text.includes("为"), false);
  });
});
