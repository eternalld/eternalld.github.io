import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const views = require("../assets/js/page-views.js");

test("accepts only a positive integer page-view count", () => {
  assert.equal(views.acceptPageViewCount("12"), 12);
  assert.equal(views.acceptPageViewCount(3), 3);
  for (const value of ["0", 0, "", "01", "1.5", "1e2", "<b>2</b>", null, undefined, -4, " 8", "+8", "000"]) {
    assert.equal(views.acceptPageViewCount(value), null, JSON.stringify(value));
  }
});

test("keeps the published sentence and the page-view note", () => {
  assert.equal(views.pageViewSentence(12), "本站累计访问 12 次");
  assert.equal(views.PAGE_VIEW_NOTE, "按页面浏览次数统计，非独立访客人数");
  assert.equal(views.pageViewSentence(12).includes("位访客"), false);
});

function fakeDocument() {
  const elements = {};
  function make(id) {
    const classNames = new Set();
    const element = {
      id,
      hidden: true,
      textContent: "",
      classList: {
        add(name) { classNames.add(name); },
        remove(name) { classNames.delete(name); },
        contains(name) { return classNames.has(name); },
      },
    };
    elements[id] = element;
    return element;
  }
  make("busuanzi_container_site_pv");
  make("busuanzi_value_site_pv");
  return {
    elements,
    getElementById(id) { return elements[id] || null; },
  };
}

test("shows the widget only after a positive count is written", () => {
  const documentRef = fakeDocument();
  assert.equal(views.syncPageViewCount(documentRef), false);
  assert.equal(documentRef.elements.busuanzi_container_site_pv.hidden, true);

  documentRef.elements.busuanzi_value_site_pv.textContent = "0";
  assert.equal(views.syncPageViewCount(documentRef), false);
  assert.equal(documentRef.elements.busuanzi_container_site_pv.classList.contains("is-ready"), false);

  documentRef.elements.busuanzi_value_site_pv.textContent = "12";
  assert.equal(views.syncPageViewCount(documentRef), true);
  assert.equal(documentRef.elements.busuanzi_container_site_pv.hidden, false);
  assert.equal(documentRef.elements.busuanzi_container_site_pv.classList.contains("is-ready"), true);
});

test("a timeout without a count leaves the widget hidden", () => {
  const documentRef = fakeDocument();
  let observerCallback = null;
  const timers = [];
  function Observer(callback) {
    observerCallback = callback;
  }
  Observer.prototype.observe = function observe() {};
  Observer.prototype.disconnect = function disconnect() {};

  views.watchPageViewCount({
    document: documentRef,
    MutationObserver: Observer,
    setTimer: (fn, ms) => {
      timers.push({ fn, ms });
      return timers.length;
    },
    clearTimer: () => {},
    timeoutMs: 4000,
  });

  assert.equal(timers[0].ms, 4000);
  timers[0].fn();
  assert.equal(documentRef.elements.busuanzi_container_site_pv.hidden, true);
  assert.equal(documentRef.elements.busuanzi_value_site_pv.textContent, "");

  documentRef.elements.busuanzi_value_site_pv.textContent = "4";
  observerCallback();
  assert.equal(documentRef.elements.busuanzi_container_site_pv.hidden, false);
});
