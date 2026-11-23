# Section navigation implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an in-page nav for visible sections, split the confirmed biography into short paragraphs, keep empty News hidden, and give existing paper links one shared spacing style.

**Architecture:** Jekyll includes decide visibility from the same data files the sections already use. News items are rendered by one include, and both the News section and the nav use that output so an empty list cannot leave a dangling link. Styles stay in the existing Minimal Light Sass. No new client script.

**Tech Stack:** Jekyll 3.10.0 via `github-pages` 232, Node built-in test runner, system Chrome.

## Global Constraints

- Stay on `cursor/about-interests-6ae4` and update pull request 5. Do not open another pull request, merge, or deploy.
- Do not edit any other repository.
- Do not add paper search, filters, Selected, or Full.
- Do not invent news, projects, curriculum entries, links, or biography facts.
- Leave the quote list, page-view markup, and avatar configuration unchanged.

---

### Task 1: Navigation and empty News

**Files:**
- Create: `tests/section-nav.test.mjs`
- Create: `_includes/section-nav.md`
- Create: `_includes/news-items.md`
- Modify: `_includes/news.md`
- Modify: `_layouts/homepage.html`
- Modify: `_includes/biography.md`
- Modify: `_includes/interests.md`
- Modify: `_includes/publications.md`
- Modify: `_includes/projects.md`
- Modify: `_includes/curriculum.md`
- Modify: `tests/integration/built-site.test.mjs`
- Create: `docs/examples/news.sample.yml`
- Modify: `README.md`

**Interfaces:**
- Nav anchors: `#about`, `#research-interests`, `#personal-interests`, `#news`, `#publications`, `#projects`, `#curriculum`
- A news row renders only when that item has `date` and `text`

- [ ] Write failing tests that require those anchors only for populated data, no `#news` while `items: []`, no search or Selected control, and the four real paper resource URLs.
- [ ] Run `node --test tests/section-nav.test.mjs` and confirm the new include is missing.
- [ ] Add the includes and heading ids. Share the news row markup between the section and the nav.
- [ ] Re-run the test and the built-site test after `bundle exec jekyll build`.

### Task 2: Biography paragraphs and link spacing

**Files:**
- Modify: `_config.yml`
- Modify: `tests/profile-content.test.mjs`
- Modify: `_sass/minimal-light.scss`
- Modify: `_sass/minimal-light-publications.scss`

**Interfaces:**
- `bio` plain text equals the three confirmed sentences.
- Paper links use `class="resource-link"` and render only with a label and URL.

- [ ] Extend the biography test so emphasis marks and blank lines are required, while the words must still match.
- [ ] Run it and confirm it fails on the one-line biography.
- [ ] Split the biography and add the sticky nav, news list, and resource-link styles. Headings get `scroll-margin-top`; the document gets `scroll-padding-top`.
- [ ] Rebuild, run `npm test` and `npm run check:site`, then check 1280×900 and 390×844 in Chrome for overflow, keyboard focus, and uncovered anchors.

---

## Self-review

The two tasks are independently testable: Task 1 can pass with the old one-paragraph biography, and Task 2 does not add sections. No step introduces a filter or sample news in `_data/`.
