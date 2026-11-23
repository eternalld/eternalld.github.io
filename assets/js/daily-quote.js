(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.DailyQuote = api;
  if (typeof document !== "undefined" && typeof api.bootDailyQuote === "function") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", api.bootDailyQuote);
    } else {
      api.bootDailyQuote();
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function renderDailyQuote(quoteRoot, result) {
    if (!quoteRoot) return false;
    var text = quoteRoot.querySelector("[data-quote-text]");
    var author = quoteRoot.querySelector("[data-quote-author]");
    var source = quoteRoot.querySelector("[data-quote-source]");
    if (!result || !result.quote || !text || !author || !source) {
      quoteRoot.hidden = true;
      return false;
    }
    text.textContent = result.quote.text;
    author.textContent = result.quote.author;
    source.textContent = result.quote.sourceTitle;
    source.href = result.quote.sourceUrl;
    quoteRoot.hidden = false;
    return true;
  }

  function bootDailyQuote() {
    if (typeof document === "undefined" || !globalThis.QuoteCalendar) return;
    var quoteRoot = document.getElementById("daily-quote");
    if (!quoteRoot) return;
    var url = quoteRoot.getAttribute("data-quotes") || "assets/data/quotes.json";
    fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error("quotes");
        return response.json();
      })
      .then(function (quotes) {
        globalThis.QuoteCalendar.scheduleQuoteRefresh({
          quotes: quotes,
          now: function () { return new Date(); },
          setTimer: function (fn, ms) { return setTimeout(fn, ms); },
          clearTimer: function (id) { clearTimeout(id); },
          onRender: function (result) { renderDailyQuote(quoteRoot, result); },
        });
      })
      .catch(function () {
        quoteRoot.hidden = true;
      });
  }

  return {
    renderDailyQuote: renderDailyQuote,
    bootDailyQuote: bootDailyQuote,
  };
});
