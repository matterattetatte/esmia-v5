# Esmia — esmia.se

The static site for Esmia HB (Spanish delicatessen and paella catering), built with the [Eleventy](https://www.11ty.dev/) site generator (v3).

## Deployment

**Firebase Hosting is the single deploy target.** `firebase.json` is the only hosting config in the
repository.

| | |
|---|---|
| Build | `npm run build` → `_site/` (includes HTML, JSON-LD, canonical & title validation) |
| Preview deploy | `npm run deploy:preview` (`firebase hosting:channel:deploy lh-audit --expires 7d`) |
| Production deploy | `npm run deploy` (`npm run build && firebase deploy`) |
| Lighthouse audit | `npm run lighthouse -- --runs=3` (writes `docs/baselines/home.json` & `docs/baselines/products.json`) |
| Lighthouse CI gate | `npm run lighthouse:assert` (asserts 100/100/100/100 + page-weight budgets) |
| Agentic readiness gate | `npm run verify:agentic` (asserts llms.txt, robots.txt, sitemap coverage, canonicals, and JSON-LD) |
| Playwright + axe | `npm run test:e2e` (15 E2E + axe accessibility tests across all routes) |
| Config | [`firebase.json`](firebase.json) · [`lighthouserc.json`](lighthouserc.json) · [`playwright.config.js`](playwright.config.js) |
| Scorecards | [`docs/baselines/home.json`](docs/baselines/home.json) · [`docs/baselines/products.json`](docs/baselines/products.json) |

## Features

- **Zero-JavaScript static output** — content is pre-rendered HTML, no client-side JS required
- **Performance-focused** — four-hundos Lighthouse score target, 0 CLS, minimal TBT
- **Accessible** — skip link, keyboard-navigable tabs, focus-visible states, semantic HTML
- **Dark Spanish-themed design** — saffron gold accents, crimson red highlights, deep navy background
- **Fluid typography** — clamp-based scaling for headlines that never clip on mobile
- **Responsive** — mobile-first with hamburger menu, grid layouts that adapt to viewport

### SEO & AI Search

- **Structured data** (JSON-LD):
  - `FoodEstablishment` / `LocalBusiness` — business info, contact, founding date, geo coordinates
  - `BreadcrumbList` — on all non-home pages
  - `FAQPage` — on homepage
  - `ItemList` / `Product` + `Offer` — on products page
  - `Menu` — on products page (structured menu data for AI search)
  - `Service` — catering services listed
- **llms.txt** — plain-text site summary for AI agents at `/llms.txt`
- **Semantic HTML** — proper heading hierarchy, landmark regions, aria attributes
- **Unique titles & descriptions** — per-page meta tags
- **Canonical URLs** — self-referencing on every page
- ** robots.txt** — with sitemap reference and AI crawler policy

### Content Sections

- **Hero banner** — full-bleed paella photo with overlay, CTA buttons, fluid typography
- **Welcome section** — introduction with flamenco image
- **Occasions grid** — wedding, corporate, garden party, restaurant/wholesale
- **How it works** — 3-step process (request → menu → live cooking)
- **FAQ** — collapsible questions with structured data
- **Products** — tabbed categories with product cards and prices
- **About** — company history, chef bio, contact details
- **News** — blog articles with recipes and inspiration

## Getting Started

1. Make a directory and navigate to it:

```
mkdir my-blog-name
cd my-blog-name
```

2. Clone this Repository

```
git clone https://github.com/11ty/eleventy-base-blog.git .
```

_Optional:_ Review `eleventy.config.js` and `_data/metadata.js` to configure the site's options and data.

3. Install dependencies

```
npm install
```

4. Run Eleventy

Generate a production-ready build to the `_site` folder:

```
npx @11ty/eleventy
```

Or build and host on a local development server:

```
npx @11ty/eleventy --serve
```

Or you can run [debug mode](https://www.11ty.dev/docs/debugging/) to see all the internals.

## Development

### Local preview

```bash
npm run start
```

This starts the Eleventy dev server with live reload. The site is available at `http://localhost:8080`.

### Running tests

```bash
# E2E + accessibility tests
npm run test:e2e

# Lighthouse audit (writes baseline files)
npm run lighthouse -- --runs=3

# Lighthouse CI assertion (fails on regression)
npm run lighthouse:assert

# Agentic readiness check
npm run verify:agentic
```

### Project structure

```
├── _data/              # Global data files (metadata.js)
├── _includes/
│   └── layouts/        # Base, home, post layouts
├── content/            # Page content (njk, md)
│   ├── news/           # Blog articles
│   └── legal/          # Legal pages
├── css/                # Per-page CSS bundles
│   ├── index.css       # Home page styles
│   ├── products.css    # Products page styles
│   ├── about.css       # About page styles
│   ├── banner.css      # Hero banner styles
│   └── ...
├── public/             # Static assets (copied to _site/)
├── scripts/            # Build/validation scripts
└── _site/              # Build output (gitignored)
```

### Content Security Policy

If your site enforces a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (as public-facing sites should), you have a few choices (pick one):

1. In `base.njk`, remove `<style>{% getBundle "css" %}</style>` and uncomment `<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">`
2. Configure the server with the CSP directive `style-src: 'unsafe-inline'` (less secure).

### Deployment

This project deploys to Firebase Hosting only — see [Deployment](#deployment). The upstream template's other deploy targets (Netlify, Vercel, GitHub Pages) are not used here.

#### Rollback

Two ways back, fastest first:

```bash
# 1. Instant: restore the previous Firebase release (no build, ~seconds)
firebase hosting:rollback

# 2. From git: the annotated tag marks the last state before the static site took over
#    the catch-all rewrite. Check it out, build, deploy.
git checkout spa-pre-cutover
npm ci && npm run deploy
```

The React SPA that `esmia.se` served before this build **is not in this repository**, so the tag marks the repo's pre-cutover state rather than the SPA source. For the SPA itself, Firebase keeps its own release history — roll back there, not in git.

## Redirects

Client-side routes from the SPA era are redirected permanently in [`firebase.json`](firebase.json).

| Old route | New route | Status |
|---|---|---|
| `/home` | `/` | 301 |
| `/contact` | `/about/` | 301 |

## Tech Stack

- **Generator:** [Eleventy v3](https://www.11ty.dev/)
- **Hosting:** Firebase Hosting
- **Images:** `@11ty/eleventy-img` (AVIF/WebP, lazy loading, srcset)
- **Syntax highlighting:** Prism.js (zero-JS output)
- **Navigation:** Eleventy Navigation plugin
- **CSS:** Per-page bundles via `eleventy-plugin-bundle`
- **Icons:** Inline SVG (no icon font)
- **Fonts:** Google Fonts (Playfair Display + Nunito)

## License

MIT
