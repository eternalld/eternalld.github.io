import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const site = new URL("../../_site/", import.meta.url);
const index = readFileSync(new URL("index.html", site), "utf8");

function absent(needle) {
  assert.equal(index.includes(needle), false, needle);
}

test("the built homepage keeps identity and hides empty sections", () => {
  assert.match(index, /<title>Haoxin Lyu<\/title>/);
  assert.match(index, /I am currently an algorithm engineer working on large language models \(LLMs\)\./);
  assert.match(index, /Welcome, I'm Haoxin Lyu\./);
  assert.match(index, /Agents, Post-Training,/);
  assert.match(index, /and Controllable Generation/);
  assert.match(index, /Agent &amp; Generative Model Post-Training|Agent & Generative Model Post-Training/);
  absent("About Me");
  assert.match(index, /<h2 id="blog" class="section-anchor">Blog<\/h2>/);
  assert.match(index, /<h2 id="awards" class="section-anchor">Awards &amp; Honors<\/h2>|Awards & Honors/);
  absent("Coming soon");
  absent("Wentao");
  absent("Selected");
  absent("Full list");
  assert.equal(index.split("algorithm engineer").length - 1, 1);
  assert.match(index, /Xu Teli Honors Program/);
  absent("talent class");
  assert.match(index, /master[’']s degree in computing/);
  absent("徐特立");
  absent("Text / Image / Reference");
  assert.match(index, /<h2 id="research-interests" class="section-anchor">Research Interests<\/h2>/);
  absent("Personal Interests");
  absent('id="personal-interests"');
  const researchAt = index.indexOf('id="research-interests"');
  const newsAt = index.indexOf('id="news"');
  const blogAt = index.indexOf('id="blog"');
  const publicationsAt = index.indexOf('id="publications"');
  const projectsAt = index.indexOf('id="projects"');
  const awardsAt = index.indexOf('id="awards"');
  const experienceAt = index.indexOf('id="experience"');
  assert.ok(researchAt < newsAt && newsAt < blogAt && blogAt < publicationsAt);
  assert.ok(publicationsAt < projectsAt && projectsAt < awardsAt && awardsAt < experienceAt);
  assert.ok(index.indexOf('id="curriculum"') > experienceAt);
  assert.match(index, /I am also interested in AI agents for quantitative trading\./);
  assert.equal(index.split("quantitative trading").length - 1, 1);
  assert.equal(index.slice(researchAt, newsAt).includes("Quantitative"), false);
  assert.match(index, /End-to-End Story Visualization Framework/);
  assert.match(index, /GTMS: A Gradient-Driven Tree-Guided Mask-Free Referring Image Segmentation Method/);
  assert.match(index, /https:\/\/doi\.org\/10\.1109\/icassp55912\.2026\.11464718/);
  assert.match(index, /https:\/\/www\.ecva\.net\/papers\/eccv_2024\/papers_ECCV\/papers\/08341\.pdf/);
  assert.match(index, /Repository \(code pending\)/);
  assert.match(index, /<strong>Haoxin Lyu<\/strong>/);
  assert.match(index, /<abbr class="badge badge-static">ICASSP 2026<\/abbr>/);
  assert.match(index, /<abbr class="badge badge-static">ECCV 2024<\/abbr>/);
  absent("gtms-eccv2024-fig1.png");
  absent("Fig. 1 from the ECVA PDF");
  absent("<figure");
  assert.match(index, /aria-label="Google Scholar"/);
  assert.match(index, /https:\/\/scholar\.google\.com\/citations\?user=lMEcQNwAAAAJ(?:&|&amp;)hl=zh-CN/);
  assert.match(index, /href="https:\/\/github\.com\/eternalld"/);
  assert.match(index, /每日一句/);
  assert.match(index, /本站累计访问/);
  const counterStart = index.indexOf('id="busuanzi_container_site_pv"');
  const countAt = index.indexOf("本站累计访问");
  const counterEnd = index.indexOf("</div>", countAt);
  assert.ok(counterStart !== -1 && counterStart < countAt && countAt < counterEnd);
  absent("统计说明");
  absent("<details");
  absent("按页面浏览次数统计，非独立访客人数");
  assert.match(index, /© 2026 Haoxin Lyu\. Powered by Jekyll and/);
  assert.match(index, /minimal-light/);
  absent("AcademicPages");
  absent("Selen");
  absent("Wentao");
  absent("Your Name");
  absent("Your Affiliation");
  absent("Yaoyao");
  absent("Dmego");
  absent("example.edu");
  absent("example.com");
  absent("CVPR");
  absent("i.dmego.cn");
  assert.match(index, /<h2 id="experience" class="section-anchor"><span id="curriculum"><\/span>Experience<\/h2>/);
  absent("col-sm-3");
  absent("pub-row");
  assert.match(index, /class="pub-compact"/);
  assert.match(index, /Lizheng Zu/);
  assert.match(index, /Tianxiong Zhong/);
  assert.match(index, /Sanyuan Zhao/);
  assert.match(index, /pp\. 10492/);
  assert.match(index, /pp\. 288/);
  absent("equal contribution");
  absent("†");
  absent("Services");
  absent("bit.edu.cn");
  absent("gmail.com");
  assert.match(index, /<h2 id="projects" class="section-anchor">Projects<\/h2>/);
  absent("位访客");
  absent("googletagmanager");
  absent("fonts.googleapis.com");
  absent("font-awesome");
  absent("busuanzi_value_site_uv");
  absent("docs/examples");
  assert.match(index, /class="site-masthead"/);
  assert.match(index, /class="site-masthead__brand" href="\/">Haoxin Lyu<\/a>/);
  assert.equal((index.match(/<h1/g) || []).length, 1);
  const navStart = index.indexOf('<nav class="section-nav" aria-label="On this page">');
  const navEnd = index.indexOf("</nav>", navStart);
  assert.ok(navStart !== -1 && navEnd > navStart);
  const nav = index.slice(navStart, navEnd);
  const labels = [...nav.matchAll(/>([^<]+)<\/a>/g)].map((match) => match[1]);
  assert.deepEqual(labels, ["News", "Publications", "Experience", "Projects", "Awards", "Blog"]);
  assert.equal(nav.includes("#research-interests"), false);
  assert.equal(nav.includes("#personal-interests"), false);
  assert.equal(nav.includes("#curriculum"), false);
  assert.equal(nav.includes("#about"), false);
  assert.equal(nav.includes("Selected"), false);
  assert.equal(nav.includes("Full"), false);
  absent('type="search"');
  assert.match(index, /id="news"/);
  assert.match(index, />News</);
  absent("Show fewer");
  absent("data-year-button");
  absent("tag-filter");
  assert.equal((index.match(/To be soon/g) || []).length, 5);
  absent('id="about"');
  assert.match(index, /id="research-interests"/);
  assert.match(index, /id="publications"/);
  const about = index.slice(index.indexOf('class="intro__body"'), index.indexOf('id="research-interests"'));
  assert.equal((about.match(/<p>/g) || []).length, 4);
  assert.equal((index.match(/class="resource-link"/g) || []).length, 4);
  absent("arxiv.org");
  absent("A real update you want to show.");
  absent("孔子");
  absent("論語");
  const publishedQuotes = JSON.parse(readFileSync(new URL("assets/data/quotes.json", site), "utf8"));
  assert.deepEqual(publishedQuotes, ["all design is redesign"]);
});

test("local assets and preserved pages are present, and drafts are not", () => {
  for (const relative of [
    "assets/css/style.css",
    "assets/css/font.css",
    "assets/css/font_sans_serif.css",
    "assets/fonts/nunito-latin-400-normal.woff2",
    "assets/js/quote-calendar.js",
    "assets/js/daily-quote.js",
    "assets/js/page-views.js",
    "assets/js/list-controls.js",
    "assets/data/quotes.json",
    "assets/fonts/crimson-pro-latin-400-normal.woff2",
    "blog.html",
    "resume.html",
    "404.html",
  ]) {
    assert.equal(existsSync(new URL(relative, site)), true, relative);
  }
  const blog = readFileSync(new URL("blog.html", site), "utf8");
  assert.match(blog, /To be soon/);
  assert.match(blog, /href="\/blog\.html"/);
  assert.equal(blog.includes("这是博客"), false);
  assert.equal(blog.includes("tag-filter"), false);
  assert.match(readFileSync(new URL("resume.html", site), "utf8"), /这是简历/);
  assert.equal(existsSync(new URL("docs", site)), false);
  assert.equal(existsSync(new URL("legacy", site)), false);
  assert.equal(existsSync(new URL("CNAME", site)), false);
  assert.equal(readdirSync(new URL(".", site)).includes("tests"), false);
});

test("stylesheet and script references point at built files", () => {
  const refs = [...index.matchAll(/(?:href|src)="(\.[^"]+)"/g)].map((match) => match[1]);
  assert.ok(refs.length > 0);
  for (const ref of refs) {
    const path = ref.replace(/^\.\//, "");
    assert.equal(existsSync(new URL(path, site)), true, ref);
  }
});
