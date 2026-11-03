# Task: Lighthouse Baseline Harness

## Metadata
- **Priority:** P0 - Critical
- **Deadline:** 2026-11-05
- **Status:** DOING
- **Assignee:** TBD
- **Tags:** type:testing, area:devops, required, gate:1-decisions
- **Dependencies:** None
- **GitHub Issue:** _not created_
- **Estimated Effort:** 3h
- **Plan IDs:** V1

## Requirements

- A repeatable way to run Lighthouse locally against the built site, with no Chrome assumptions on the developer machine
- Baselines recorded as JSON so that "before" and "after" are comparable numbers, not impressions
- Mobile preset, since that is the configuration the target scores refer to
- Scores recorded for all four categories on the home page and `/products`

## User Stories

- **US-01:** As an engineer, I want to run one command and get four scores so that I can tell whether my change helped.
- **US-02:** As the CTO, I want a stored baseline so that the 100/100/100/100 claim is verifiable rather than asserted.

## Design

Lighthouse needs a Chrome binary. Use the bundled one rather than a system install:

```bash
npm install --no-save lighthouse chrome-launcher
npx @puppeteer/browsers install chrome@stable
```

Serve the build, then audit by URL (Lighthouse cannot audit `file://`):

```bash
npm run build
npx serve _site -l 4173 &
npx lighthouse http://localhost:4173/ --preset=desktop --output=json --output-path=docs/baselines/home.json
```

Baselines live under `docs/baselines/` and are committed, so score regressions are visible in git history.

## Tasks

- [x] Add a local Lighthouse runner script
- [x] Install a pinned Chrome for the runner
- [x] Record a baseline for `/`
- [x] Record a baseline for `/products`
- [x] Record the mobile preset as the reference configuration
- [x] Summarise baseline scores in PLAN.md

## Done Criteria

- [x] One command produces four scores for a given URL
- [x] `docs/baselines/` contains committed JSON for both pages
- [x] The baseline numbers are quoted in PLAN.md with the date they were taken
- [ ] A second run of the same command reproduces the same scores within noise

## Notes

- Local Lighthouse scores run higher than production because there is no CDN latency and no cache-miss penalty; the production number is the real one
- Do not compare a localhost audit against a production audit

## Questions to Resolve

- [x] Should the reference run be mobile (default) or desktop? → **Mobile**, matching the 100 target and real traffic. (2026-11-03)
- [x] Do we keep Chrome pinned in the repo toolchain or let the runner download it? → **Pin via `@puppeteer/browsers`** so scores are comparable across machines. (2026-11-03)


## Measured baseline — 2026-11-03

Recorded with `npm run lighthouse -- --runs=3`, mobile form factor, Chrome 156.0.8078.80, against
`_site/` served locally. Medians of three runs:

| Page | Perf | A11y | Best-practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` | 83 | 89 | 96 | 100 | 830 ms | 1027 ms | 714 ms | 0 |
| `/products/` | 56 | 98 | 96 | 100 | 871 ms | **46 689 ms** | 706 ms | **0.155** |

`/` reproduces tightly (82 / 83 / 85 across runs). `/products/` does not: 51 / 56 / 69, because its
LCP is a lazily-loaded grid image that sometimes paints after the run's measurement window. The
reproducibility criterion therefore stays open until task 05 fixes the product image pipeline —
gating a volatile score at 100 would produce a CI failure nobody can act on.
