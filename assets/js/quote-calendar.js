(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.QuoteCalendar = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  var DEFAULT_ZONE = "Asia/Shanghai";

  function shanghaiDateKey(date, timeZone) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone || DEFAULT_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(date);
    var map = {};
    for (var i = 0; i < parts.length; i += 1) {
      map[parts[i].type] = parts[i].value;
    }
    return map.year + "-" + map.month + "-" + map.day;
  }

  function utcDayNumber(dateKey) {
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
    if (!match) return null;
    var year = Number(match[1]);
    var month = Number(match[2]);
    var day = Number(match[3]);
    var utc = Date.UTC(year, month - 1, day);
    var check = new Date(utc);
    if (
      check.getUTCFullYear() !== year ||
      check.getUTCMonth() !== month - 1 ||
      check.getUTCDate() !== day
    ) {
      return null;
    }
    return Math.floor(utc / 86400000);
  }

  function isDisplayableQuote(quote) {
    if (!quote || typeof quote !== "object") return false;
    if (typeof quote.text !== "string" || quote.text.trim() === "") return false;
    if (typeof quote.author !== "string" || quote.author.trim() === "") return false;
    if (typeof quote.sourceTitle !== "string" || quote.sourceTitle.trim() === "") return false;
    if (typeof quote.sourceUrl !== "string" || !/^https:\/\/\S+$/.test(quote.sourceUrl)) return false;
    return true;
  }

  function selectQuote(quotes, date, timeZone) {
    if (!Array.isArray(quotes) || quotes.length === 0) return null;
    var dateKey = shanghaiDateKey(date, timeZone);
    var day = utcDayNumber(dateKey);
    if (day === null) return null;
    var index = ((day % quotes.length) + quotes.length) % quotes.length;
    var quote = quotes[index];
    if (!isDisplayableQuote(quote)) return null;
    return { index: index, dateKey: dateKey, quote: quote };
  }

  function millisecondsUntilNextDateKey(date, timeZone) {
    var zone = timeZone || DEFAULT_ZONE;
    var startKey = shanghaiDateKey(date, zone);
    var lo = date.getTime();
    var hi = lo + 36 * 60 * 60 * 1000;
    if (shanghaiDateKey(new Date(hi), zone) === startKey) {
      hi = lo + 48 * 60 * 60 * 1000;
    }
    while (hi - lo > 1000) {
      var mid = Math.floor((lo + hi) / 2);
      if (shanghaiDateKey(new Date(mid), zone) === startKey) lo = mid;
      else hi = mid;
    }
    var wait = hi - date.getTime();
    return wait > 0 ? wait : 0;
  }

  function scheduleQuoteRefresh(options) {
    var quotes = options.quotes;
    var now = options.now;
    var setTimer = options.setTimer;
    var clearTimer = options.clearTimer;
    var onRender = options.onRender;
    var timerId = null;
    var stopped = false;

    function render() {
      onRender(selectQuote(quotes, now()));
    }

    function arm() {
      if (stopped) return;
      var wait = millisecondsUntilNextDateKey(now());
      timerId = setTimer(function () {
        render();
        arm();
      }, Math.max(wait + 50, 50));
    }

    render();
    arm();

    return function cancel() {
      stopped = true;
      if (timerId !== null && typeof clearTimer === "function") clearTimer(timerId);
    };
  }

  return {
    shanghaiDateKey: shanghaiDateKey,
    selectQuote: selectQuote,
    millisecondsUntilNextDateKey: millisecondsUntilNextDateKey,
    isDisplayableQuote: isDisplayableQuote,
    scheduleQuoteRefresh: scheduleQuoteRefresh,
  };
});
