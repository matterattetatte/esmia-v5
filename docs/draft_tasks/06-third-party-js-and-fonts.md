# Task: Third-Party JS & Font Hygiene

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-09
- **Status:** DONE
- **Assignee:** TBD
- **Tags:** type:feature, area:frontend, required, gate:2-scaffold
- **Dependencies:** None
- **Related:** 05-image-pipeline-and-hero-lcp.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 5h
- **Plan IDs:** P5, P6, B4

## Requirements

- The Facebook embed must not load on page load; it loads when its container approaches the viewport
- Its container must reserve its final height so the embed cannot shift layout
- The 62 KB `/scripts/iframe-widget.js` must not block the main thread during load
- Remove the `new Image().src` pseudo-preload
- Remove the never-loaded `Montserrat` and `Heebo` families and use the system stack deliberately (decided 2026-11-03)

## User Stories

- **US-01:** As a visitor on a slow connection, I want the page usable before the social feed loads.
- **US-02:** As an engineer, I want third-party failures to degrade quietly instead of breaking the page.
- **US-03:** As the CTO, I do not want Meta's code in our critical path.

## Design

### Current behaviour

`content/index.njk` injects the widget on `DOMContentLoaded`, and a `MutationObserver` rewrites every `img[alt="sk-header-picture"], img[alt="sk-post-userpic"]` to a local placeholder. That observer runs on every DOM mutation for the life of the page.

### Target behaviour

```js
const embed = document.querySelector('.sk-ww-facebook-page-posts');
const io = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) return;
  io.disconnect();
  injectWidget();
}, { rootMargin: '400px' });
io.observe(embed);
```

The container gets a fixed `min-height` matching the embed's final height so nothing shifts when it fills in.

### Fonts

`--font-family` names Montserrat and `--font-family-body` names Heebo, but no `@font-face` or stylesheet loads either. Every visitor silently gets the system fallback. **Decided 2026-11-03: keep the system stack** and drop the names. Self-hosting would add 50–100 KB and two requests to buy a look that nobody currently sees.

## Tasks

- [x] Gate the widget behind `IntersectionObserver` (superseded: replaced embed with static Facebook CTA section)
- [x] Reserve the embed height to prevent CLS
- [x] Remove the `new Image()` preload line
- [x] Remove or replace the `MutationObserver` image rewrite
- [x] Decide the font story and implement it
- [x] Measure TBT and CLS before and after

## Done Criteria

- [x] No request to Facebook before scroll reaches the embed
- [x] CLS remains 0 with the widget present
- [x] No unused `@font-face` families declared
- [x] TBT is within budget with the widget loaded

## Notes

- If the business does not need the live feed, deleting the embed is the single cheapest performance win available
- Cross-origin iframes cannot be styled; the placeholder image swap exists only because of that constraint

## Questions to Resolve

- [x] Does the owner need the live Facebook feed, or would a static "latest posts" strip do? → **Static section + link to Facebook.** Removes 62 KB of third-party JS and all third-party contrast/target-size/link-name failures. (2026-11-03)
- [x] Self-host fonts or accept the system stack? → **System stack.** The site already renders in the fallback for every visitor. (2026-11-03)
