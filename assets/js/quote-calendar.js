(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.QuoteCalendar = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function field(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function normalizeQuote(entry) {
    if (typeof entry === "string") {
      return { text: entry.trim(), author: "", sourceTitle: "", sourceUrl: "" };
    }
    if (!entry || typeof entry !== "object") return null;
    return {
      text: field(entry.text),
      author: field(entry.author),
      sourceTitle: field(entry.sourceTitle),
      sourceUrl: field(entry.sourceUrl),
    };
  }

  function isDisplayableQuote(entry) {
    var quote = normalizeQuote(entry);
    return !!(quote && quote.text);
  }

  function usableQuotes(quotes) {
    if (!Array.isArray(quotes)) return [];
    var list = [];
    for (var i = 0; i < quotes.length; i += 1) {
      var quote = normalizeQuote(quotes[i]);
      if (quote && quote.text) list.push(quote);
    }
    return list;
  }

  function selectQuote(quotes, random) {
    var list = usableQuotes(quotes);
    if (list.length === 0) return null;
    if (list.length === 1) return { index: 0, quote: list[0] };
    var roll = typeof random === "function" ? Number(random()) : Math.random();
    if (!isFinite(roll) || roll < 0 || roll >= 1) roll = 0;
    var index = Math.floor(roll * list.length);
    if (index < 0 || index >= list.length) index = 0;
    return { index: index, quote: list[index] };
  }

  return {
    isDisplayableQuote: isDisplayableQuote,
    selectQuote: selectQuote,
  };
});
