# AGENTS.md

## What this is

Haidar Nanda's portfolio — a single-page static site (HTML + CSS + JS). No build step, no package manager, no server.

## Develop

Open `index.html` directly in a browser. Edit the 3 source files and reload.

CDN deps (loaded from `index.html`):
- Google Fonts: Archivo Black + Work Sans
- Font Awesome 6.7.2, GSAP 3.12.5, Vanilla Tilt 1.8.1, EmailJS

## Design

VoiceBox editorial system (`voicebox-DESIGN.md`). Zero `border-radius`, zero `box-shadow`. 2px borders do structure. Red (`#EF4444`) is the sole accent, used sparingly. Archivo Black for headings, Work Sans for body.

## Deploy

`git push origin main` → GitHub Pages. Custom domain: `porto.ndadev.my.id` (set in `CNAME`). No CI config.

## Key code facts

- **Projects section** (`index.html:167`): GitHub repos (dynamic).
- **Websites section** (`index.html:173`): separate full-width block with warm `#F5F3EF` background — lists published websites with visit links.
- **GitHub projects** (`script.js:195`): fetches 6 most recently updated repos from `api.github.com/users/ndadevdev/repos`. Unauthenticated — 60 req/hr limit. Vanilla Tilt re-initialized after cards render at `script.js:217`.
- **Contact form** (`script.js:223-238`): EmailJS — `publicKey: "IRRkXUn7gTZiY00u0"`, service `service_ufdpiuj`, template `template_9tsw574`. No backend. Keys are client-side by design (free tier).
- **LinkedIn link** (`index.html:181`): placeholder (`href="#"`).
- **Animations**: GSAP loader timeline, IntersectionObserver scroll reveal, mousemove parallax on hero image.
- **Theme toggle removed**: Dark mode was intentionally removed in commit `d723dad`. CSS for `#themeBtn` at `style.css:149-174` is dead code; no toggle is wired in HTML or JS.
- **No `package.json`**, no test/lint/typecheck commands exist. No `.gitignore`.
