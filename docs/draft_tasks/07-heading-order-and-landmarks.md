# Task: Heading Order & Landmarks

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-10
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:feature, area:frontend, required, gate:3-features
- **Dependencies:** None
- **Related:** 08-keyboard-product-tabs.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 2h
- **Plan IDs:** A1

## Requirements

- Headings must descend without skipping a level on every page
- `/products` currently goes `h1` → `h3`, with the only `h2` being the visually hidden navigation label
- Each tab panel needs a heading so that its products are grouped, not just listed
- Landmarks must be unique: one `main` per page, `header`/`footer` outside it
- No empty headings: `/products` currently emits **7 empty `<h3></h3>` elements** from the image-only gallery entries in `_data/products.js` (they have `image` but no `name`), which pollutes the heading outline

## User Stories

- **US-01:** As a screen-reader user, I want a coherent heading outline so that I can navigate by heading.
- **US-02:** As an engineer, I want the outline to mirror the visual hierarchy so that the two never drift.

## Design

### Current structure on `/products`

```
h1  Produkter
h3    Serranoskinka skivad 500g     <- level skipped
h3    Serranoskinka 5kg vac. benfri
```

Plus a second `<main>` element inside `content/products.njk`, even though `_includes/layouts/base.njk` already wraps content in `<main id="main">`. Nested `main` elements are invalid.

### Target structure

```
h1  Produkter
h2    Skinka
h3      Serranoskinka skivad 500g
h3      Serranoskinka 5kg vac. benfri
h2    Ost
h3      Manchego
```

## Tasks

- [ ] Skip `h3` output when `item.name` is empty (7 gallery-only entries)
- [ ] Replace the inner `<main>` in `products.njk` with a `<section>`
- [ ] Make each category an `h2`
- [ ] Keep product names at `h3`
- [ ] Audit every page for skipped levels
- [ ] Confirm exactly one `main` per page

## Done Criteria

- [ ] Lighthouse `heading-order` audit passes on all pages
- [ ] No page has more than one `<main>`
- [ ] Heading outline read aloud matches the visual grouping

## Notes

- The hidden `h2` for the nav is legitimate and should stay
- `IdAttributePlugin` generates ids for headings; adding levels changes ids, so check in-page anchors still resolve

## Questions to Resolve

- [x] Should category headings be visible, or is the tab bar itself the visual affordance and the `h2` screen-reader-only? → **Visually hidden `h2`.** The tab bar stays the visual affordance; the headings exist for the outline. (2026-11-03)
