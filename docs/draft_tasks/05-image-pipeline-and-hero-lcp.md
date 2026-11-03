# Task: Image Pipeline & Hero LCP

## Metadata
- **Priority:** P0 - Critical
- **Deadline:** 2026-11-08
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:feature, area:frontend, required, gate:2-scaffold
- **Dependencies:** None
- **Related:** 06-third-party-js-and-fonts.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 8h
- **Plan IDs:** P1, P2, P3, P4, P7

## Requirements

- `_site` must stop carrying the 56 MB of source images
- Product images must go through `eleventy-img` and emit AVIF + WebP with a responsive `srcset`
- AVIF must actually be produced (it currently is not, despite being configured)
- The hero image must be the eager, preloaded LCP element, not a lazy-loaded one
- Page budgets: home under 1.5 MB transferred, `/products` under 2.5 MB

## User Stories

- **US-01:** As a mobile visitor on 4G, I want the page to arrive quickly so that I do not bounce before the paella photo appears.
- **US-02:** As the owner, I want fast pages because speed is a ranking and conversion factor.
- **US-03:** As an engineer, I want one image pipeline so that adding a product photo does not require remembering three conventions.

## Design

### Root causes

1. `eleventyConfig.addPassthroughCopy("content/images/**/*")` copies every original into `_site` — 56 MB, including a 5.5 MB JPEG.
2. Paths in `_data/products.js` are `../../images/products/*.jpg`, which do not resolve for the transform plugin, so output stays `<img src="../images/products/serrano500.jpg">` — 27 MB on `/products`.
3. `widths` is commented out, so no `srcset` is generated and a single width is emitted.
4. `formats: ["avif", "webp", "auto"]` produces zero `.avif` files — verify whether `failOnError: false` is masking the failure.
5. The hero is emitted with `loading="lazy"` because the plugin applies `imgAttributes.loading` to every image; `fetchpriority="high"` cannot rescue a lazy LCP.

### Approach

- Remove the passthrough copy and reference images through the transform
- Give product images transformable paths (move the originals under `content/images/products/` and reference them relatively to the template, or use a shortcode)
- Restore explicit `widths` and `sizes` per usage (hero, card, thumbnail)
- Override `loading="eager"` on the hero and add `<link rel="preload" as="image">`
- Verify AVIF generation, and if the plugin silently skips it, fix or drop the format

## Tasks

- [ ] Remove `addPassthroughCopy("content/images/**/*")`
- [ ] Repoint product image paths so the transform resolves them
- [ ] Restore `widths` and add `sizes`
- [ ] Confirm AVIF output exists
- [ ] Set the hero to `loading="eager"` and preload it
- [ ] Add `width`/`height` to every transformed image
- [ ] Re-measure page weight
- [ ] Re-measure LCP

## Done Criteria

- [ ] `du -sh _site` is under 10 MB
- [ ] `/products` transfers under 2.5 MB
- [ ] Product grid emits `<picture>` with `srcset`
- [ ] At least one `.avif` exists under `_site`
- [ ] Hero is the LCP element in the trace and is not lazy
- [ ] No layout shift attributable to images

## Notes

- The product photos are 2–5 MB each, which suggests they were exported full-size from a camera; a one-off re-export at 1600px would help but is not required if the pipeline works
- Keep `loading="lazy"` for below-the-fold images; only the hero changes

## Questions to Resolve

- [x] Do we keep the `content/images` originals in git, or move them to object storage? → **Keep them in git.** The deploy problem is solved by the pipeline; migrating adds a bucket and a build-time fetch for no scoring benefit. (2026-11-03)
- [x] Is a 1300px hero wide enough for a 4K display, or do we need a larger variant? → **Add a 1920px variant to the srcset** and let `sizes` choose. (2026-11-03)
