# Task: Lighthouse Baseline Harness

## Metadata
- **Priority:** P0 - Critical
- **Deadline:** 2026-11-05
- **Status:** TODO
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

- [ ] Add a local Lighthouse runner script
- [ ] Install a pinned Chrome for the runner
- [ ] Record a baseline for `/`
- [ ] Record a baseline for `/products`
- [ ] Record the mobile preset as the reference configuration
- [ ] Summarise baseline scores in PLAN.md

## Done Criteria

- [ ] One command produces four scores for a given URL
- [ ] `docs/baselines/` contains committed JSON for both pages
- [ ] The baseline numbers are quoted in PLAN.md with the date they were taken
- [ ] A second run of the same command reproduces the same scores within noise

## Notes

- Local Lighthouse scores run higher than production because there is no CDN latency and no cache-miss penalty; the production number is the real one
- Do not compare a localhost audit against a production audit

## Questions to Resolve

- [x] Should the reference run be mobile (default) or desktop? → **Mobile**, matching the 100 target and real traffic. (2026-11-03)
- [x] Do we keep Chrome pinned in the repo toolchain or let the runner download it? → **Pin via `@puppeteer/browsers`** so scores are comparable across machines. (2026-11-03)
