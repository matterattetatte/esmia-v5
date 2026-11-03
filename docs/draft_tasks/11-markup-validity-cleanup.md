# Task: Markup Validity Cleanup

## Metadata
- **Priority:** P2 - Medium
- **Deadline:** 2026-11-14
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:chore, area:frontend, required, gate:3-features
- **Dependencies:** None
- **Related:** 07-heading-order-and-landmarks.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 1h
- **Plan IDs:** A6

## Requirements

- No unbalanced or orphaned tags in any template
- No nested `<main>` elements
- No orphan closing tags after removed sections
- The favicon must declare the correct MIME type for its actual format

## User Stories

- **US-01:** As a browser, I want well-formed markup so that error recovery does not invent a DOM we did not design.
- **US-02:** As an engineer, I want valid output so that debugging render issues does not start with guessing.

## Design

`content/index.njk` currently contains a stray `</section>` and an orphan opening `<div>` around the social-feed script block. Browsers recover silently by closing elements early, which means the accessibility tree and the assumed tree differ.

`base.njk` declares `<link rel="icon" type="image/png" href="/img/favicon.ico">` — the file is an `.ico`, so the type is wrong.

## Tasks

- [ ] Remove the stray `</section>` in `index.njk`
- [ ] Balance the wrapper `div` around the social block
- [ ] Replace the inner `<main>` in `products.njk` with `section`
- [ ] Fix the favicon `type` attribute
- [ ] Validate all built HTML
- [ ] Add a validation step to the build or CI

## Done Criteria

- [ ] HTML validator reports no errors on any page
- [ ] Every page has exactly one `main`, one `header`, one `footer`
- [ ] Favicon loads without a MIME mismatch

## Notes

- Prefer a validator run over eyeballing templates; silent recovery is exactly what makes this class of bug survive review
- `npx html-validate _site` is enough for this scope

## Questions to Resolve

- [ ] Should HTML validation fail the build, or only warn?
