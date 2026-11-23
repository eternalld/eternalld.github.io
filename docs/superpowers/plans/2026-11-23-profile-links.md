# Sidebar profile links plan

**Goal:** Replace the icon-only GitHub and Scholar buttons with one text row each.

**Files:**
- `_layouts/homepage.html` renders a `profile-links` list, GitHub then Google Scholar, reusing the current URLs and inline SVGs.
- `_sass/minimal-light.scss` styles the rows. Do not load a new icon runtime.
- Tests assert the visible labels, `aria-hidden` icons, link order, and the existing URLs.

Do not change the masthead, hero, biography, papers, empty sections, page views, or quote removal.
