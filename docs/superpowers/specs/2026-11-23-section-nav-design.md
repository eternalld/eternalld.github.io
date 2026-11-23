# Reading-column hierarchy

Date: 2026-11-23
Branch: `cursor/about-interests-6ae4`
Pull request: https://github.com/eternalld/eternalld.github.io/pull/5
Base: `main` at `e425829cf3c721d7bfd4583cb22dcd7e91aaf24b`

This change stays on the open pull request. It is not merged and not deployed.

The hierarchy and visual tone follow the public page at https://wentaoguo.net/ and the supplied screenshots: a light in-page nav, a centered welcome and research title, short theme tags, then left-aligned paragraphs, section titles with a light rule, gray body text, and a purple accent. Nothing from that site is copied: no name, portrait, address, email, degree, advisor, news, blog, papers, awards, projects, or experience entries.

## What is on the page

The left column stays the Minimal Light sidebar: the name, the daily sentence `all design is redesign`, the page-view line without a disclosure, and the GitHub and Google Scholar links. No avatar is added.

The reading column opens with a centered intro and no "About Me" heading:

- Welcome line: `Welcome, I'm Haoxin Lyu.`
- Title, on two lines: `Agents, Post-Training,` / `and Controllable Generation`
- Tags: `Agent RSI`, `Agent & Generative Model Post-Training`, `Controllable Generation`

The confirmed biography stays underneath, left aligned, in three paragraphs:

1. I am currently an algorithm engineer working on large language models (LLMs).
2. I earned my bachelor's degree in Computer Science and Technology through the Xu Teli Honors Program at Beijing Institute of Technology (BIT), where I also earned a master's degree in computing.
3. My work focuses on Agent RSI, post-training for agents and generative models, and controllable image and video generation, including text-conditioned, image-conditioned, and reference-guided generation.

Research Interests and Personal Interests stay, including the full interest names and `AI Agents for Quantitative Trading`. The tags are short labels; they do not replace those sections. Publications stay the two verified papers, with the blue conference badges, no figures, and the existing DOI, PDF, and Repository (code pending) links.

News, Projects, and 履历表 render only when their lists have entries. 履历表 keeps that name. Blog, Awards, and Experience are not created. There is no Selected/Full switch, year filter, or search.

## Navigation

`<nav aria-label="On this page">` lists only sections that render, in page order: Research Interests, Personal Interests, News, Publications, Projects, 履历表. With the current data that is Research Interests, Personal Interests, and Publications. The intro has no nav item. The bar can stick on desktop. Headings use `scroll-margin-top`, and the page uses `scroll-padding-top`, so a jumped heading stays below the bar. Links wrap, remain in tab order, and keep a visible focus outline. There is no hamburger.

## Color and type

Body text is `#5f6368` (about 6.0:1 on white). The name and section titles are `#202124`. The accent used for the welcome line, tags, links, and news dates is `#6454d6` (about 5.5:1 on white and 5.1:1 on the tag background `#f6f4ff`). Hover is `#4f46e5`. In dark mode, body text stays light and links use `#c4b8ff` (about 8.9:1 on `#20212b`). Conference badges stay blue. The reading text uses self-hosted Nunito, with the system sans-serif fallbacks, under the SIL Open Font License. No Google Fonts request is added.

Section titles that are present get a light bottom rule and gray body text beneath them. Publication resource links use the accent color and a shared gap. They are not a filter.

## Motion

Checked observation used here: the reference navigation has a hover underline and the bar can stick. A Blog title can change from dark to purple. This page has no Blog, so that color change is not copied onto a Blog heading.

Continuous floating, parallax, and card lift were not reliably observed, so they are not stated as facts about the reference site.

The motion added on this page is separate and restrained:

- Text links in the reading column change color and gain an underline on hover and keyboard focus.
- The centered intro fades in once, for 0.8 seconds.
- The three theme tags move up 3 pixels and back once. The longest one, including its delay, finishes in 3.5 seconds.
- There is no infinite animation, no moving biography or publication cards, and no background particles.
- Text stays in normal flow. The float uses `transform` only.
- `prefers-reduced-motion: reduce` removes those animations and transforms and forces `scroll-behavior: auto`. The intro is visible without waiting for JavaScript or for an animation to finish.

## Footer

The line is `© 2026 Haoxin Lyu. Powered by Jekyll and Minimal Light theme.` The theme credit stays because this site is the Minimal Light layout. It does not name AcademicPages or copy another person's copyright line.

## Self-review

- Empty News, Projects, 履历表, Blog, Awards, and Experience produce no heading and no nav link.
- The biography plain text is the three confirmed sentences, with no Chinese class name and no degree abbreviation.
- Quantitative trading remains only under Personal Interests.
- Paper targets are unchanged, and no arXiv, video, Selected, or Full control is added.
- The quote list, page-view line, and avatar setting are unchanged.
