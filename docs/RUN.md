# Running FontWandel Web — Frontend & Backend

Instructions for **Windows** (PowerShell) and **Linux** (bash).
Repo layout:

```text
FontWandelWeb/
├── frontend/     # Vite + React 19 + TypeScript site
├── backend/      # FastAPI API (serves the API + the built site)
├── docs/         # This file, company profile, brand colors
└── .github/      # Deploy workflow (push to main → GitHub Pages)
```

## Ports & URLs (local)

| What              | URL                                            |
|-------------------|------------------------------------------------|
| Frontend (dev)    | http://localhost:5173/FontWandelWeb/            |
| Frontend (preview)| http://localhost:4173/FontWandelWeb/            |
| Backend API       | http://127.0.0.1:8000                          |
| API docs (Swagger)| http://127.0.0.1:8000/docs                     |
| Site via backend  | http://127.0.0.1:8000/FontWandelWeb/ (needs frontend build first) |

## Prerequisites

- **Node.js 22+** (includes `npm`) — check with `node -v` / `npm -v`.
  - Windows: install from https://nodejs.org (LTS), then use PowerShell.
  - Linux: install via your package manager or https://nodejs.org.
- **Python 3.10+** — check with `py --version` (Windows) or `python3 --version` (Linux).
  - Windows: install from https://www.python.org, tick **"Add python.exe to PATH"**.
  - Linux: `sudo apt install python3 python3-venv python3-pip` (Debian/Ubuntu).

---

## 1. Frontend

### Windows (PowerShell)

```powershell
cd path\to\FontWandelWeb\frontend
npm install          # first time only
npm run dev          # dev server → http://localhost:5173/FontWandelWeb/
```

Other commands:

```powershell
npm run build        # type-check + build to dist\ (also writes dist\404.html)
npm run preview      # serve the build → http://localhost:4173/FontWandelWeb/
npm run lint         # lint check
```

### Linux (bash)

```bash
cd path/to/FontWandelWeb/frontend
npm install          # first time only
npm run dev          # dev server → http://localhost:5173/FontWandelWeb/
```

Other commands:

```bash
npm run build        # type-check + build to dist/ (also writes dist/404.html)
npm run preview      # serve the build → http://localhost:4173/FontWandelWeb/
npm run lint         # lint check
```

> The site lives under the `/FontWandelWeb/` subpath (GitHub project page),
> so always open the URLs **with** the trailing `/FontWandelWeb/` part.

---

## 2. Backend

### Windows (PowerShell)

```powershell
cd path\to\FontWandelWeb\backend
py -m venv .venv                    # first time only
.\.venv\Scripts\Activate.ps1        # activate (each new terminal)
pip install -r requirements.txt     # first time only
python -m uvicorn app.main:app --port 8000
```

> If activation is blocked, run once as a one-liner (CurrentUser only):
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Linux (bash)

```bash
cd path/to/FontWandelWeb/backend
python3 -m venv .venv               # first time only
source .venv/bin/activate           # activate (each new terminal)
pip install -r requirements.txt     # first time only
python3 -m uvicorn app.main:app --port 8000
```

API base: `http://127.0.0.1:8000` — try `/api/health` and the Swagger UI at `/docs`.

For auto-reload during development, add `--reload`:

```bash
python3 -m uvicorn app.main:app --port 8000 --reload
```

### Backend configuration (optional `.env`)

Create `backend/.env` (already gitignored) to override defaults. All
variables use the `FW_` prefix:

```env
FW_ADMIN_USERNAME=admin
FW_ADMIN_PASSWORD=fontwandel123
FW_SECRET_KEY=change-me-in-production
FW_COOKIE_SECURE=false
```

> Defaults equal the demo values. **Change `FW_SECRET_KEY` and the admin
> password before any non-local use.** `FW_COOKIE_SECURE=true` is required
> when serving over HTTPS.

### Serving the built site from the backend

The backend serves `frontend/dist` at `/FontWandelWeb/` (with SPA fallback),
so one process can run everything locally:

```bash
# 1. Build the site
cd frontend && npm run build && cd ..
# 2. Run the API (from backend/)
python3 -m uvicorn app.main:app --port 8000
# 3. Open http://127.0.0.1:8000/FontWandelWeb/
```

If `dist/` is missing you get a `503` telling you to build first.

### Frontend ↔ backend integration

The frontend talks to same-origin `/api` (no extra config):

- **Dev:** Vite proxies `/api` → `http://127.0.0.1:8000`, so run both
  processes and open the dev URL — login, content saving, guides, and the
  contact form all hit the live API.
- **Backend-served:** `frontend/dist` served by uvicorn — same origin,
  everything works.
- **Static hosting (no backend):** `/api/*` isn't there, so the site
  automatically falls back to bundled content, demo login
  (`admin` / `fontwandel123`), and a contact form that explains email
  fallback. Nothing breaks.
- **Split hosting:** set `VITE_API_URL=https://api-host` in
  `frontend/.env` (must allow the site in the backend's `cors_origins`
  and use HTTPS with `FW_COOKIE_SECURE=true` for admin sessions).

---

## 3. Demo logins & data
- **Site admin (frontend):** `/FontWandelWeb/fontadmin/login` →
  username `admin`, password `fontwandel123` (mocked in-browser demo).
- **API admin:** same credentials against `POST /api/auth/login`
  (signed-cookie session, 8 hours).
- **Content API:** `GET /api/content` (public) ·
  `PUT /api/content` + `POST /api/content/reset` (admin).
- **Support content:** `GET /api/articles`, `/api/references`,
  `/api/whitepapers`, `/api/knowledge-base`.
- **Contact inbox:** visitors `POST /api/contact`; admins read
  `GET /api/contact/messages`.
- Runtime files (`backend/app/data/content-live.json`,
  `backend/app/data/messages.json`) are created automatically and are
  gitignored — seed content lives in `site-content.json`, `articles.json`,
  `references.json`, `whitepapers.json`.

## 4. Deploying (live site)

Pushing `main` runs `.github/workflows/deploy.yml`: builds `frontend/`
and publishes `dist/` to GitHub Pages. One-time repo setup: **Settings →
Pages → Source: GitHub Actions**. Live URL:
`https://mrdino-tz.github.io/FontWandelWeb/`
