# AGENTS.md

## What this is

Personal portfolio site for Haidar Nanda Supriyadi Aziz — a single-page static site (HTML + CSS + JS). No build step, no package manager, no server.

## Development

- No build tools, bundlers, or npm — open `index.html` directly in a browser to develop.
- Just edit `index.html`, `style.css`, or `script.js` and reload.
- All dependencies loaded from CDN: Google Fonts (Archivo Black + Work Sans), Font Awesome 6.7.2, GSAP 3.12.5, Vanilla Tilt 1.8.1, EmailJS.

## Design System (VoiceBox)

The site uses the **VoiceBox** editorial/magazine design system defined in `voicebox-DESIGN.md`. Key rules:
- **Typography**: Archivo Black for headings/display, Work Sans for UI/body. No serif fonts.
- **Colors**: Black (`#0A0A0A`), White (`#FAFAFA`), Red (`#EF4444` accent). Red is used sparingly.
- **Shape**: Zero `border-radius` everywhere. All corners are square.
- **Shadows**: None. Hierarchy comes from weight, scale, and contrast — never from elevation.
- **Borders**: 2px borders do all structural work. Cards use `border-top: 4px solid #EF4444` for the elevated variant.
- **Theme**: `body.light` = VoiceBox light mode (white bg). `body.dark` = inverted (black bg) — dark mode swaps black ↔ white while keeping red accent.

## Deploy

- **GitHub Pages** via the `main` branch. Push to deploy.
- Custom domain: `ndadev.my.id` — configured in `CNAME` and GitHub repo settings.
- No CI/CD config present.

## Key code details

- **GitHub projects section** (`script.js:242`) fetches the 6 most recently updated public repos from `api.github.com/users/ndadevdev/repos` at runtime. Add `?` query params or handle rate limits if testing offline.
- **Contact form** (`script.js:275-291`) uses EmailJS with `publicKey: "IRRkXUn7gTZiY00u0"`, service ID `service_ufdpiuj`, and template ID `template_9tsw574`. Form submits via `emailjs.sendForm` — no backend.
- **Theme**: dark/light toggle with `localStorage` persistence and `prefers-color-scheme` fallback.
- **Animations**: GSAP timeline on load, IntersectionObserver scroll reveals, mousemove parallax on hero image.
- **Asset files** (image + PDF CV) live in `assets/`. Update these to swap the hero photo or downloadable CV.

## Important constraints

- The EmailJS public key and credentials are client-side exposed — this is by design (free tier EmailJS). Do not attempt to hide or move them server-side.
- GitHub API calls are unauthenticated and subject to rate limits (60 req/hr per IP). Avoid excessive reloads during development.
- Vanilla Tilt is re-initialized after GitHub projects are rendered (see `script.js:266`).
- No `package.json`, no `node_modules`, no test/lint/typecheck commands — none of these exist.
- The only `.gitignore` is the default one; there's no CI workflow file.
