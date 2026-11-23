import { lookup } from "node:dns/promises";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
const calendar = require("../../assets/js/quote-calendar.js");
const root = fileURLToPath(new URL("../../_site/", import.meta.url));
const quotes = JSON.parse(readFileSync(new URL("../../assets/data/quotes.json", import.meta.url), "utf8"));
const expected = calendar.selectQuote(quotes, new Date());
const chrome = "/usr/bin/google-chrome";
const artifacts = "/opt/cursor/artifacts";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

function serve(directory) {
  return createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
    const file = normalize(join(directory, pathname));
    if (!file.startsWith(directory)) {
      response.writeHead(403);
      response.end();
      return;
    }
    try {
      const body = readFileSync(file);
      response.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("missing");
    }
  });
}

async function tabSequence(page) {
  const seen = [];
  await page.focus("body");
  for (let index = 0; index < 8; index += 1) {
    await page.keyboard.press("Tab");
    seen.push(await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tag: el.tagName,
        href: el.getAttribute("href") || "",
        label: el.getAttribute("aria-label") || (el.textContent || "").trim().slice(0, 48),
      };
    }));
  }
  return seen;
}

async function openPage(browser, width, height, blockCounter) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "light" },
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  if (blockCounter) {
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (request.url().includes("busuanzi.ibruce.info")) request.abort();
      else request.continue();
    });
  }
  return page;
}

const server = serve(root);
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
let previewHost = "127.0.0.1";
try {
  await lookup("haoxin-preview.test");
  previewHost = "haoxin-preview.test";
} catch {
  previewHost = "127.0.0.1";
}
const base = "http://" + previewHost + ":" + port + "/";
const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const desktop = await openPage(browser, 1280, 900, false);
  await desktop.goto(base, { waitUntil: "networkidle0", timeout: 20000 });
  await desktop.waitForFunction(() => {
    const node = document.querySelector("[data-quote-text]");
    return node && node.textContent.trim().length > 0;
  }, { timeout: 8000 });
  const quoteText = await desktop.$eval("[data-quote-text]", (node) => node.textContent);
  if (quoteText !== expected.quote.text) {
    throw new Error("Desktop quote was " + JSON.stringify(quoteText) + " for " + expected.dateKey);
  }
  const overflow = await desktop.evaluate(() => (
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  ));
  if (overflow) throw new Error("Desktop page overflows horizontally");
  const motion = await desktop.$eval(".social-icons a", (node) => getComputedStyle(node).transitionDuration);
  const motionMs = motion.endsWith("ms") ? Number.parseFloat(motion) : Number.parseFloat(motion) * 1000;
  if (!(motionMs < 1)) throw new Error("Reduced motion was not applied: " + motion);
  const focused = await tabSequence(desktop);
  const hrefs = focused.map((item) => item.href);
  const labels = focused.map((item) => item.label);
  if (!hrefs.some((href) => href.includes("wikisource.org"))) throw new Error("Tab did not reach the quote source");
  if (!labels.includes("GitHub")) throw new Error("Tab did not reach GitHub");
  await desktop.screenshot({ path: join(artifacts, "homepage_desktop_light.png"), fullPage: true });
  await desktop.$eval("details", (node) => {
    node.open = true;
  });
  const headerBox = await desktop.$eval("header", (node) => {
    const rect = node.getBoundingClientRect();
    return {
      x: Math.max(0, rect.x - 12),
      y: Math.max(0, rect.y - 12),
      width: Math.min(520, rect.width + 48),
      height: Math.min(720, rect.height + 36),
    };
  });
  await desktop.screenshot({ path: join(artifacts, "homepage_count_disclosure.png"), clip: headerBox });

  const phone = await openPage(browser, 390, 844, false);
  await phone.goto(base, { waitUntil: "networkidle0", timeout: 20000 });
  await phone.waitForFunction(() => {
    const node = document.querySelector("[data-quote-text]");
    return node && node.textContent.trim().length > 0;
  }, { timeout: 8000 });
  const phoneOverflow = await phone.evaluate(() => (
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  ));
  if (phoneOverflow) throw new Error("Phone page overflows horizontally");
  const phoneQuote = await phone.$eval("[data-quote-text]", (node) => node.textContent);
  if (phoneQuote !== expected.quote.text) throw new Error("Phone quote mismatch");
  await phone.screenshot({ path: join(artifacts, "homepage_phone_light.png"), fullPage: true });

  const blocked = await openPage(browser, 1280, 900, true);
  await blocked.goto(base, { waitUntil: "domcontentloaded", timeout: 20000 });
  await blocked.waitForFunction(() => {
    const node = document.querySelector("[data-quote-text]");
    return node && node.textContent.trim().length > 0;
  }, { timeout: 8000 });
  await new Promise((resolve) => setTimeout(resolve, 4500));
  const hidden = await blocked.$eval("#busuanzi_container_site_pv", (node) => (
    node.hidden === true && !node.classList.contains("is-ready")
  ));
  if (!hidden) throw new Error("Page-view widget stayed visible without Busuanzi");
  const value = await blocked.$eval("#busuanzi_value_site_pv", (node) => node.textContent);
  if (value.trim() !== "") throw new Error("Blocked counter wrote " + JSON.stringify(value));
  const leaked = await blocked.evaluate(() => document.body.innerText.includes("统计说明"));
  if (leaked) throw new Error("Count disclosure stayed visible without a number");

  console.log(JSON.stringify({
    dateKey: expected.dateKey,
    quote: expected.quote.text,
    desktopFocus: focused,
    reducedMotion: motion,
    counterBlockedHidden: hidden,
  }, null, 2));
} finally {
  await browser.close();
  server.close();
}
