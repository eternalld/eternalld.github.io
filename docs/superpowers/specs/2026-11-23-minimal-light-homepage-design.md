# Minimal Light homepage with a daily quote and page-view count

Date: 2026-11-23
Repository: `eternalld/eternalld.github.io` only
Theme pin: `yaoyao-liu/minimal-light` commit `3786d5d480d2cfb1e384ae83bf43752998d78f80`
Status: approved by Haoxin (original Minimal Light; deployment authorized for a later merge). This spec is the build contract. It does not add a second design review.

## Goal

Replace the current Dmego cover page with a faithful Minimal Light academic homepage. The published page shows only known identity, a local daily quotation, and a page-view count when the counter service actually returns one. Affiliation, biography, interests, publications, and projects stay empty until Haoxin edits them.

## Visual design

Use the vendored Minimal Light layout, type, and color. Do not invent a new mock and do not put research or project blocks in the sidebar.

- Desktop: fixed left sidebar about 232px and a right reading column about 650px, inside a 960px wrapper. Below 960px the sidebar stacks above the column. Body padding keeps the phone layout inside the viewport.
- Light colors stay the theme colors: white page (`#fff`), heading blue (`#043361`), text `#595959`, links `#39c`. The theme's `prefers-color-scheme: dark` rules stay, because they are part of this theme commit.
- Type is the theme serif, Crimson Pro, self-hosted from a pinned Fontsource release under the SIL Open Font License. Chinese falls back to `Songti SC`, `Noto Serif SC`, `Source Han Serif SC`, then `serif`.
- The theme footnote stays: "Powered by Jekyll and Minimal Light theme" with a link to `https://github.com/yaoyao-liu/minimal-light`.
- No motion is added. Existing theme hover transitions are disabled under `prefers-reduced-motion: reduce`. Links and the disclosure use a visible `:focus-visible` outline.

Sidebar order:

1. Avatar, only when `site.avatar` is set. It is unset. Do not use the theme sample portrait, the generic theme avatar, or anyone else's photo.
2. Name: `Haoxin`.
3. Position, affiliation, and email, each only when that field is non-empty.
4. Daily quote.
5. Page-view count.
6. Identity links that are configured. The only one is GitHub, `https://github.com/eternalld`, with an inline SVG and accessible name `GitHub`.

The browser title is `Haoxin`. It gains ` | ` plus the affiliation only when an affiliation exists.

## Identity and empty content

Published identity is only the name Haoxin and the GitHub account eternalld. Do not copy Yaoyao Liu's or Dmego's name, papers, email, affiliation, awards, CV, or avatar. Do not invent a biography, interests, papers, or projects.

These right-column sections render only when their data has at least one real entry:

- Biography, from `bio` in `_config.yml`, heading "About Me".
- Interests, from `_data/interests.yml`.
- Selected publications, from `_data/publications.yml`.
- Projects, from `_data/projects.yml`.

An empty list produces no heading and no placeholder sentence. Filled examples live only in `docs/examples/`, and Jekyll excludes `docs/`.

`blog.html` and `resume.html` stay at their current URLs with their current text. They are not added to the sidebar. `404.html` stays. The old cover page, `CNAME` (`i.dmego.cn`, which is not this site's Pages domain), `ActionNotes.md`, the one-byte `assets` file, and the old favicon files move to `legacy/dmego-homepage/` and are excluded from the site. Git history is not rewritten.

## Daily quote

A compact block labeled `每日一句` sits under the name. It shows the quotation, the author, and a link whose text is the work title. Text wraps. There is no animation, spinner, or marquee.

The corpus is local. Sixteen passages were copied on 2026-11-23 from Chinese Wikisource wikitext. `text` is the exact sequence between `「` and `」`. `sourceLine` is the full wikitext line. The author of each `子曰` or `子在川上曰` passage is 孔子. The work is 《論語》. Nothing is translated, simplified, or shortened.

| Anchor | Display text | sourceLine |
| --- | --- | --- |
| [學而第一#一之三](https://zh.wikisource.org/wiki/論語/學而第一#一之三) | 巧言令色，鮮矣仁。 | 子曰：「巧言令色，鮮矣仁。」 |
| [學而第一#一之十六](https://zh.wikisource.org/wiki/論語/學而第一#一之十六) | 不患人之不己知，患不知人也。 | 子曰：「不患人之不己知，患不知人也。」 |
| [為政第二#二之十一](https://zh.wikisource.org/wiki/論語/為政第二#二之十一) | 溫故而知新，可以爲師矣。 | 子曰：「溫故而知新，可以爲師矣。」 |
| [為政第二#二之十二](https://zh.wikisource.org/wiki/論語/為政第二#二之十二) | 君子不器。 | 子曰：「君子不器。」 |
| [為政第二#二之十五](https://zh.wikisource.org/wiki/論語/為政第二#二之十五) | 學而不思則罔，思而不學則殆。 | 子曰：「學而不思則罔，思而不學則殆。」 |
| [為政第二#二之十七](https://zh.wikisource.org/wiki/論語/為政第二#二之十七) | 由，誨女知之乎！知之爲知之，不知爲不知，是知也。 | 子曰：「由，誨女知之乎！知之爲知之，不知爲不知，是知也。」 |
| [里仁第四#四之八](https://zh.wikisource.org/wiki/論語/里仁第四#四之八) | 朝聞道，夕死可矣！ | 子曰：「朝聞道，夕死可矣！」 |
| [里仁第四#四之十六](https://zh.wikisource.org/wiki/論語/里仁第四#四之十六) | 君子喻於義，小人喻於利。 | 子曰：「君子喻於義，小人喻於利。」 |
| [里仁第四#四之十七](https://zh.wikisource.org/wiki/論語/里仁第四#四之十七) | 見賢思齊焉，見不賢而內自省也。 | 子曰：「見賢思齊焉，見不賢而內自省也。」 |
| [里仁第四#四之二四](https://zh.wikisource.org/wiki/論語/里仁第四#四之二四) | 君子欲訥於言而敏於行。 | 子曰：「君子欲訥於言而敏於行。」 |
| [里仁第四#四之二五](https://zh.wikisource.org/wiki/論語/里仁第四#四之二五) | 德不孤，必有鄰。 | 子曰：「德不孤，必有鄰。」 |
| [述而第七#七之二一](https://zh.wikisource.org/wiki/論語/述而第七#七之二一) | 三人行，必有我師焉。擇其善者而從之，其不善者而改之。 | 子曰：「三人行，必有我師焉。擇其善者而從之，其不善者而改之。」 |
| [述而第七#七之二九](https://zh.wikisource.org/wiki/論語/述而第七#七之二九) | 仁遠乎哉？我欲仁，斯仁至矣。 | 子曰：「仁遠乎哉？我欲仁，斯仁至矣。」 |
| [子罕第九#九之十七](https://zh.wikisource.org/wiki/論語/子罕第九#九之十七) | 逝者如斯夫！不舍晝夜。 | 子在川上曰：「逝者如斯夫！不舍晝夜。」 |
| [子罕第九#九之二八](https://zh.wikisource.org/wiki/論語/子罕第九#九之二八) | 歲寒，然後知松柏之後凋也。 | 子曰：「歲寒，然後知松柏之後凋也。」 |
| [衛靈公第十五#十五之三八](https://zh.wikisource.org/wiki/論語/衛靈公第十五#十五之三八) | 有教無類。 | 子曰：「有教無類。」 |

Selection uses the `Asia/Shanghai` calendar date, not the visitor's timezone and not `Math.random`. The date key is `YYYY-MM-DD` from `Intl.DateTimeFormat` with `timeZone: "Asia/Shanghai"`. The index is the UTC day number of that calendar date, modulo 16. Every visitor sees the same passage for the whole Shanghai date. An open tab schedules the next render at the next Shanghai date boundary and renders again then. No GitHub Action, cron, or daily commit is involved.

The block stays hidden when JavaScript is off, the corpus is empty, or the selected record lacks text, author, source title, or an `https` source URL. A hidden block has no empty quotation marks.

## Page views

GitHub Pages cannot count unique people from the static files. The number is a page-view count.

The service is 不蒜子, documented at <https://ibruce.info/2015/04/04/busuanzi/> and <https://busuanzi.ibruce.info/>. Integration is the documented script `https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js`, pinned with subresource integrity from the file retrieved on 2026-11-23 (1939 bytes, `sha384-oaKlriFiEaHzTKw66TKlzwgjYHPT5tvx+uf4JRnAGvP7HCHj5NPqEoAkyyOAPxZN`). On that day a request with a distinct `Referer` host returned JSONP `site_pv`, `page_pv`, and `site_uv`, and a second request to the same host increased `site_pv`. A request without `Referer` returned `Bad Request`. The response sets a `busuanziId` cookie. No account, token, or payment is required. This site does not set an initial count.

Only `site_pv` is displayed, and only after it is a positive integer. The sentence is `本站累计访问 N 次`. A control labeled `统计说明` discloses: the figure counts page views, not unique people; it starts when 不蒜子 first records this host and is not a historical total; the page requests `busuanzi.ibruce.info`, which can see IP address, page URL, and browser information and can set `busuanziId`; no other analytics service is used. The visible note `按页面浏览次数统计，非独立访客人数` is in the disclosure. The page must not say `第N位访客`.

The widget stays hidden, with no spinner and no zero, when the script fails, times out after 4 seconds, returns a non-integer, returns zero or a negative number, or the feature is disabled with `pageviews: false`. There is no `localStorage` counter and no seeded number. Google Analytics is not configured. Font Awesome, Academicons, and Google Fonts are not loaded.

## Build and deploy

The editable source is Jekyll, matching this theme and the existing Pages setting (legacy build, branch `main`, path `/`, custom domain unset, HTTPS on, site `https://eternalld.github.io/`). Local dependencies are pinned to `github-pages` 232, which is the Pages version set recorded on 2026-11-23 (`jekyll` 3.10.0). No custom Jekyll plugin is added.

Merging this branch into `main` is what publishes the site. This change stops before that merge. No secret is added.

## Tests

- Shanghai date keys around `2026-11-22T16:00:00Z`, stable selection within a date, a different passage on the next date, and the same passage 16 dates later.
- An open-tab timer renders again after that boundary.
- Corpus records match the table above, including the character `爲`.
- Page-view acceptance rejects zero, blanks, and non-integers, and the widget stays hidden on timeout or an invalid value.
- The production build contains Haoxin and the GitHub link, and does not contain template biography, papers, `example.edu`, Google Analytics, or the sample files.
- `blog.html` and `resume.html` still build.
- A real Chrome render at desktop and phone widths shows no horizontal overflow, a visible focus outline, and reduced motion honored.
