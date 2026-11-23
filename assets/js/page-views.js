(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.PageViews = api;
  if (typeof document !== "undefined" && typeof api.bootPageViews === "function") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", api.bootPageViews);
    } else {
      api.bootPageViews();
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  var PAGE_VIEW_NOTE = "按页面浏览次数统计，非独立访客人数";

  function acceptPageViewCount(value) {
    if (typeof value === "number") {
      if (!Number.isInteger(value) || value <= 0) return null;
      return value;
    }
    if (typeof value !== "string") return null;
    if (!/^[1-9]\d{0,11}$/.test(value)) return null;
    return Number(value);
  }

  function pageViewSentence(count) {
    return "本站累计访问 " + count + " 次";
  }

  function syncPageViewCount(documentRef) {
    var container = documentRef.getElementById("busuanzi_container_site_pv");
    var value = documentRef.getElementById("busuanzi_value_site_pv");
    if (!container || !value) return false;
    var count = acceptPageViewCount(value.textContent);
    if (count === null) {
      container.hidden = true;
      container.classList.remove("is-ready");
      return false;
    }
    container.hidden = false;
    container.classList.add("is-ready");
    return true;
  }

  function watchPageViewCount(options) {
    var documentRef = options.document;
    var Observer = options.MutationObserver;
    var setTimer = options.setTimer;
    var clearTimer = options.clearTimer;
    var timeoutMs = options.timeoutMs || 4000;
    var value = documentRef.getElementById("busuanzi_value_site_pv");
    var observer = null;

    if (typeof Observer === "function" && value) {
      observer = new Observer(function () {
        syncPageViewCount(documentRef);
      });
      if (typeof observer.observe === "function") {
        observer.observe(value, { childList: true, characterData: true, subtree: true });
      }
    }

    syncPageViewCount(documentRef);
    var timer = setTimer(function () {
      var container = documentRef.getElementById("busuanzi_container_site_pv");
      if (!container || container.classList.contains("is-ready")) return;
      container.hidden = true;
      container.classList.remove("is-ready");
      if (observer && typeof observer.disconnect === "function") observer.disconnect();
    }, timeoutMs);

    return function cancel() {
      if (typeof clearTimer === "function") clearTimer(timer);
      if (observer && typeof observer.disconnect === "function") observer.disconnect();
    };
  }

  function bootPageViews() {
    if (typeof document === "undefined") return;
    if (!document.getElementById("busuanzi_container_site_pv")) return;
    watchPageViewCount({
      document: document,
      MutationObserver: typeof MutationObserver === "function" ? MutationObserver : null,
      setTimer: function (fn, ms) { return setTimeout(fn, ms); },
      clearTimer: function (id) { clearTimeout(id); },
      timeoutMs: 4000,
    });
  }

  return {
    PAGE_VIEW_NOTE: PAGE_VIEW_NOTE,
    acceptPageViewCount: acceptPageViewCount,
    pageViewSentence: pageViewSentence,
    syncPageViewCount: syncPageViewCount,
    watchPageViewCount: watchPageViewCount,
    bootPageViews: bootPageViews,
  };
});
