# FontWandel Website — Frontend

Vite + React 19 + TypeScript + Tailwind CSS 4 + Preline. Multi-page site
(Routes via `react-router-dom`) for FontWandel Technologies Ltd.

## Scripts

| Command         | What it does                                      |
|-----------------|---------------------------------------------------|
| `npm install`   | Install dependencies                              |
| `npm run dev`   | Start dev server (http://localhost:5173/FontWandelWeb/) |
| `npm run build` | Type-check + production build → `dist/` (also writes `dist/404.html` SPA fallback) |
| `npm run preview` | Serve the production build locally              |
| `npm run lint`  | Lint with Oxlint                                  |

## Project layout

- `src/pages/` — routes: Home, About, Contact, Platform (Wandel Suite),
  support section (guides, documentation, support center, whitepapers), 404.
- `src/components/` — layout sections (Navbar with mega-menus, Footer,
  hero, feature sections), UI primitives (Button, Icon), all styling via
  Tailwind classes.
- `src/data/` — navigation, mega-menu content, guide/documentation entries,
  whitepapers.
- `src/index.css` — Tailwind v4 `@theme` brand tokens (see
  `../docs/FW-profile/brand-colors.md`), Preline, custom animations.
- `public/assets/images/` — hand-drawn brand SVG illustrations (+2 photos).

## Deploy

Pushing `main` triggers `.github/workflows/deploy.yml`, which builds
`frontend/` and publishes `dist/` to GitHub Pages (project site
`https://from-system.github.io/FontWandelWeb/`). Requirements: repo
Settings → Pages → Source **GitHub Actions**.
