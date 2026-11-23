(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ListControls = api;
  if (typeof document === "undefined") return;
  function boot() { api.mount(document); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function projectState(count, expanded, initial) {
    var start = initial > 0 ? initial : 4;
    var toggle = count > start;
    return {
      visible: !toggle || expanded ? count : start,
      toggle: toggle,
      more: toggle ? count - start : 0
    };
  }

  function awardYears(items) {
    var seen = {};
    (items || []).forEach(function (item) {
      if (item && item.year !== undefined && item.year !== null && String(item.year) !== "") seen[String(item.year)] = true;
    });
    return Object.keys(seen).sort().reverse();
  }

  function showYearFilter(items) {
    return awardYears(items).length >= 2;
  }

  function awardsForYear(items, year) {
    if (!year || year === "all") return items || [];
    return (items || []).filter(function (item) { return String(item.year) === String(year); });
  }

  function postTags(items) {
    var seen = {};
    (items || []).forEach(function (item) {
      (item.tags || []).forEach(function (tag) {
        if (tag) seen[String(tag)] = true;
      });
    });
    return Object.keys(seen).sort();
  }

  function showTagFilter(items) {
    return postTags(items).length > 0;
  }

  function postsForTag(items, tag) {
    if (!tag || tag === "all") return items || [];
    return (items || []).filter(function (item) {
      return (item.tags || []).map(String).indexOf(String(tag)) !== -1;
    });
  }

  function applyProjects(list, expanded) {
    var items = list.querySelectorAll("[data-project]");
    var initial = Number(list.getAttribute("data-initial") || "4");
    var state = projectState(items.length, expanded, initial);
    items.forEach(function (item, index) { item.hidden = index >= state.visible; });
    var button = list.querySelector("[data-project-toggle]");
    if (!button) return state;
    button.hidden = !state.toggle;
    button.textContent = expanded ? "Show fewer projects" : "Show " + state.more + " more projects";
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    return state;
  }

  function applyYear(list, year) {
    var selected = year || "all";
    list.querySelectorAll("[data-award]").forEach(function (item) {
      item.hidden = selected !== "all" && item.getAttribute("data-year") !== selected;
    });
    list.querySelectorAll("[data-award-year]").forEach(function (heading) {
      var value = heading.getAttribute("data-award-year");
      heading.hidden = !list.querySelector('[data-award][data-year="' + value + '"]:not([hidden])');
    });
    list.querySelectorAll("[data-year-button]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-year-button") === selected ? "true" : "false");
    });
  }

  function applyTag(scope, tag) {
    var selected = tag || "all";
    scope.querySelectorAll("[data-post]").forEach(function (post) {
      var tags = (post.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
      post.hidden = selected !== "all" && tags.indexOf(selected) === -1;
    });
  }

  function mount(doc) {
    doc.querySelectorAll("[data-project-list]").forEach(function (list) {
      var expanded = false;
      var button = list.querySelector("[data-project-toggle]");
      if (!button) return;
      button.addEventListener("click", function () {
        expanded = !expanded;
        applyProjects(list, expanded);
      });
    });
    doc.querySelectorAll(".award-list").forEach(function (list) {
      list.querySelectorAll("[data-year-button]").forEach(function (button) {
        button.addEventListener("click", function () {
          applyYear(list, button.getAttribute("data-year-button"));
        });
      });
    });
    var params = typeof URLSearchParams === "function" && doc.location ? new URLSearchParams(doc.location.search || "") : null;
    if (params) applyTag(doc, params.get("tag") || "all");
    doc.querySelectorAll(".tag-filter a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        var url = new URL(link.href, doc.location ? doc.location.href : "http://localhost/");
        if (url.pathname !== (doc.location ? doc.location.pathname : url.pathname)) return;
        event.preventDefault();
        var tag = url.searchParams.get("tag") || "all";
        applyTag(doc, tag);
        if (doc.location && typeof history !== "undefined" && history.replaceState) {
          history.replaceState(null, "", tag === "all" ? url.pathname : url.pathname + "?tag=" + encodeURIComponent(tag));
        }
      });
    });
  }

  return {
    projectState: projectState,
    awardYears: awardYears,
    showYearFilter: showYearFilter,
    awardsForYear: awardsForYear,
    postTags: postTags,
    showTagFilter: showTagFilter,
    postsForTag: postsForTag,
    applyProjects: applyProjects,
    applyYear: applyYear,
    applyTag: applyTag,
    mount: mount
  };
});
