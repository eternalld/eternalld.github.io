# Minimal Light homepage implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a faithful Minimal Light page for Haoxin with a Shanghai-stable daily quotation and a Busuanzi page-view count that disappears when the service does not return a positive integer.

**Architecture:** Vendor Minimal Light commit `3786d5d480d2cfb1e384ae83bf43752998d78f80` and edit its homepage layout. Quote selection and count validation are plain browser scripts with no build step. Jekyll renders identity and the right-column sections. Empty data renders nothing. `github-pages` 232 matches the current GitHub Pages stack.

**Tech Stack:** Jekyll 3.10.0 via `github-pages` 232, Node 22 built-in test runner, system Google Chrome for render checks.

## Global Constraints

- Work only in `eternalld/eternalld.github.io` on branch `cursor/minimal-light-homepage-6ae4`. Do not merge and do not edit any other repository.
- Published identity is `Haoxin` and `https://github.com/eternalld` only.
- Do not copy Yaoyao Liu's or Dmego's personal content, and do not invent bio, papers, interests, or projects.
- Theme license CC0 and the theme footnote stay. Repository MIT license stays beside `licenses/CC0-1.0.txt`.
- Sample content lives in `docs/examples/` and is excluded from the site.
- Quote text is the exact Wikisource interior listed in the spec. Preserve `爲`.
- Quote timezone is `Asia/Shanghai`. No cron and no per-day commit.
- Page views use only the pinned Busuanzi 2.3 script. Hide the widget unless `site_pv` is a positive integer. Never show zero, a spinner, or "第N位访客".
- No Google Analytics, Font Awesome, Academicons, or Google Fonts requests.
- Keep `blog.html`, `resume.html`, and `404.html`. Move the old cover and `CNAME` into excluded `legacy/dmego-homepage/`.
- No force-push, history rewrite, or secrets.

---

### Task 1: Quote calendar

**Files:**
- Create: `assets/js/quote-calendar.js`
- Test: `tests/quote-calendar.test.mjs`

**Interfaces:**
- Produces: `shanghaiDateKey(date)`, `selectQuote(quotes, date)`, `millisecondsUntilNextDateKey(date)`, `isDisplayableQuote(quote)`, `scheduleQuoteRefresh({ now, setTimer, clearTimer, onRender, quotes })`
- `selectQuote` returns `{ index, dateKey, quote }` or `null`

- [ ] Write failing tests for the Shanghai boundary `2026-11-22T15:59:59Z` versus `2026-11-22T16:00:00Z`, same-day stability, next-day change, a 16-day repeat, invalid records, and a timer that renders the new date after the boundary.
- [ ] Run `node --test tests/quote-calendar.test.mjs` and confirm failure because the module is missing.
- [ ] Implement the module in an IIFE that assigns `globalThis.QuoteCalendar` and `module.exports`.
- [ ] Re-run the test and confirm pass.

### Task 2: Page-view guard

**Files:**
- Create: `assets/js/page-views.js`
- Test: `tests/page-views.test.mjs`

**Interfaces:**
- Produces: `acceptPageViewCount(value)`, `PAGE_VIEW_NOTE`, `watchPageViewCount({ document, now, setTimer, clearTimer, timeoutMs })`
- Accept only canonical positive integers, as a number or as a string of 1 to 12 digits without a leading zero.
- `watchPageViewCount` leaves `#busuanzi_container_site_pv` hidden until `#busuanzi_value_site_pv` contains an accepted count, then adds `is-ready`. A 4000ms timeout with no accepted count keeps it hidden.

- [ ] Write failing tests for `0`, `""`, `01`, `1.5`, `"<b>2</b>"`, `null`, a valid `"12"`, and a timeout that does not reveal the widget.
- [ ] Run `node --test tests/page-views.test.mjs` and confirm failure.
- [ ] Implement the guard.
- [ ] Re-run and confirm pass.

### Task 3: Corpus and theme shell

**Files:**
- Create: `assets/data/quotes.json` from the spec table, with `id`, `text`, `author`, `sourceTitle`, `sourceUrl`, `sourceLine`, `retrieved`
- Create: `tests/quotes-corpus.test.mjs` asserting every spec row and that `text` is the interior of `sourceLine`
- Copy theme Sass, favicons, favicon switcher, and CC0 license into the repo
- Create the homepage layout, empty `_data` files, `_config.yml`, and `docs/examples/` samples
- Move recoverable Dmego files into `legacy/dmego-homepage/`

- [ ] Write the corpus test first and confirm it fails.
- [ ] Add `quotes.json` and confirm the corpus test passes.
- [ ] Vendor the theme chrome and write the layout with the quote mount, the hidden Busuanzi mount, and conditional sections.
- [ ] Confirm the layout source contains the pinned script URL and integrity, and does not contain `googletagmanager`, `site_uv`, `font-awesome`, or `fonts.googleapis.com`.

### Task 4: Production build

**Files:**
- Create: `Gemfile`, `Gemfile.lock`
- Modify: `package.json`, `README.md`, `.gitignore`
- Test: `tests/built-site.test.mjs`

- [ ] Pin `gem "github-pages", "232"` and run `bundle exec jekyll build`.
- [ ] Assert `_site/index.html` includes `Haoxin`, `每日一句`, and `https://github.com/eternalld`.
- [ ] Assert it excludes `Your Name`, `Yaoyao`, `Dmego`, `example.edu`, `CVPR`, `i.dmego.cn`, and `docs/examples`.
- [ ] Assert `_site/blog.html` and `_site/resume.html` still contain their original sentences, and `_site/docs` does not exist.

### Task 5: Browser verification

**Files:**
- Create: `tests/browser/render-check.mjs`
- Artifacts: desktop and phone screenshots

- [ ] Serve `_site` on localhost.
- [ ] In system Chrome, at 1280×900 and 390×844, assert the quote text equals `selectQuote` for the current Shanghai date, the page has no horizontal overflow, Tab reaches the source link, GitHub link, and disclosure, and `prefers-reduced-motion: reduce` yields no animation duration on the social link.
- [ ] Assert that blocking `busuanzi.ibruce.info` leaves the count widget hidden.
- [ ] Save the two light-mode screenshots.

### Task 6: Pull request

- [ ] Commit the implementation, push `cursor/minimal-light-homepage-6ae4`, and open a PR to `main`.
- [ ] Do not merge. Leave publication to the coordinator after checks.
