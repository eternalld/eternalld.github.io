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
  function textOrEmpty(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function renderDailyQuote(quoteRoot, result) {
    if (!quoteRoot) return false;
    var text = quoteRoot.querySelector("[data-quote-text]");
    var byline = quoteRoot.querySelector("[data-quote-by]");
    var author = quoteRoot.querySelector("[data-quote-author]");
    var source = quoteRoot.querySelector("[data-quote-source]");
    if (!result || !result.quote || !text) {
      quoteRoot.hidden = true;
      return false;
    }
    var sentence = textOrEmpty(result.quote.text);
    if (!sentence) {
      quoteRoot.hidden = true;
      return false;
    }
    text.textContent = sentence;
    var authorText = textOrEmpty(result.quote.author);
    var sourceTitle = textOrEmpty(result.quote.sourceTitle);
    var sourceUrl = textOrEmpty(result.quote.sourceUrl);
    var hasSource = /^https:\/\/\S+$/.test(sourceUrl) && sourceTitle;
    if (author) {
      author.textContent = authorText;
      author.hidden = !authorText;
    }
    if (source) {
      source.textContent = hasSource ? sourceTitle : "";
      source.href = hasSource ? sourceUrl : "";
      source.hidden = !hasSource;
    }
    if (byline) byline.hidden = !authorText && !hasSource;
    quoteRoot.hidden = false;
    return true;
  }

  function bootDailyQuote() {
    if (typeof document === "undefined" || !globalThis.QuoteCalendar) return;
    var quoteRoot = document.getElementById("daily-quote");
    if (!quoteRoot) return;
    var url = quoteRoot.getAttribute("data-quotes") || "./assets/data/quotes.json";
    fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error("quotes");
        return response.json();
      })
      .then(function (quotes) {
        renderDailyQuote(quoteRoot, globalThis.QuoteCalendar.selectQuote(quotes));
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
