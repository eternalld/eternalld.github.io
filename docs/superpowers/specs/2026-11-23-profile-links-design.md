# Sidebar profile links

Date: 2026-11-23
Branch: `cursor/sidebar-text-links-6ae4`
Base: `main` at `19b85af4ffdc7d66ede9b223724ba85c7beae399`

The sidebar lists the two existing links as plain rows, in this order:

1. GitHub → `https://github.com/eternalld`
2. Google Scholar → `https://scholar.google.com/citations?user=lMEcQNwAAAAJ&hl=zh-CN`

Each row is a small inline icon plus the full words `GitHub` or `Google Scholar`. The icon is decorative (`aria-hidden`) so the visible text is the accessible name. Icons stay inline SVG. No new remote icon font.

Rows share one left edge, one icon size, and one gap. They are not round buttons. Nothing else is added: no email, location, CV, or avatar. The same layout is used on the homepage and `/blog.html`.
