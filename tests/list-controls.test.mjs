import assert from "node:assert/strict";
import test from "node:test";
import controls from "../assets/js/list-controls.js";

const awards = [
  { year: 2024, title: "Older" },
  { year: 2026, title: "Newer" },
  { year: 2025, title: "Middle" },
];

test("projects stay within the initial count until expanded", () => {
  assert.deepEqual(controls.projectState(6, false, 4), { visible: 4, toggle: true, more: 2 });
  assert.deepEqual(controls.projectState(6, true, 4), { visible: 6, toggle: true, more: 2 });
  assert.deepEqual(controls.projectState(2, false, 4), { visible: 2, toggle: false, more: 0 });
  assert.deepEqual(controls.projectState(0, false, 4), { visible: 0, toggle: false, more: 0 });
});

test("award years filter only when more than one year exists", () => {
  assert.deepEqual(controls.awardYears(awards), ["2026", "2025", "2024"]);
  assert.equal(controls.showYearFilter(awards), true);
  assert.equal(controls.showYearFilter([{ year: 2026, title: "Only" }]), false);
  assert.equal(controls.showYearFilter([]), false);
  assert.deepEqual(controls.awardsForYear(awards, "2025").map((item) => item.title), ["Middle"]);
  assert.equal(controls.awardsForYear(awards, "all").length, 3);
});

test("blog tags filter posts and stay hidden when there are none", () => {
  const posts = [
    { title: "One", tags: ["math", "robotics"] },
    { title: "Two", tags: ["robotics"] },
  ];
  assert.deepEqual(controls.postTags(posts), ["math", "robotics"]);
  assert.equal(controls.showTagFilter(posts), true);
  assert.equal(controls.showTagFilter([]), false);
  assert.equal(controls.showTagFilter([{ title: "Plain", tags: [] }]), false);
  assert.deepEqual(controls.postsForTag(posts, "math").map((item) => item.title), ["One"]);
  assert.equal(controls.postsForTag(posts, "all").length, 2);
});
