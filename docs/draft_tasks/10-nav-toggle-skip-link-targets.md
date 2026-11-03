# Task: Nav Toggle, Skip Link & Targets

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-13
- **Status:** DONE
- **Assignee:** TBD
- **Tags:** type:feature, area:frontend, required, gate:3-features
- **Dependencies:** None
- **GitHub Issue:** _not created_
- **Estimated Effort:** 2h
- **Plan IDs:** A4, A5

## Requirements

- The mobile nav toggle must expose its expanded state
- Touch targets must be at least 44×44 CSS pixels
- The skip link must be hidden until focused, then visible
- The toggle's active area must not shrink on small screens

## User Stories

- **US-01:** As a screen-reader user, I want to know whether the menu is open.
- **US-02:** As a user with limited dexterity, I want to hit the menu button reliably.
- **US-03:** As a keyboard user, I want the skip link to appear when I tab to it.

## Design

### Current markup

```html
<button class="nav-toggle" aria-label="Toggle navigation">
  <span class="hamburger"></span>
</button>
```

Has a name, but no state, and the inner element carries the visual size while the button may be smaller.

### Fix

```html
<button class="nav-toggle" aria-label="Meny" aria-expanded="false" aria-controls="nav">
```

Toggle `aria-expanded` in the click handler. The skip link uses `.visually-hidden`, which must gain a `:focus` variant that reveals it.

## Tasks

- [x] Add `aria-expanded` and `aria-controls`
- [x] Update `aria-expanded` on open/close
- [x] Give the button a 44×44 minimum target
- [x] Reveal the skip link on focus
- [x] Verify focus order from the top of the page
- [x] Confirm the nav closes with Escape

## Done Criteria

- [x] Lighthouse `tap-targets`-class issues are absent
- [x] `aria-expanded` flips with the menu
- [x] Skip link is invisible until focused and jumps to `#main`
- [x] Menu is operable by keyboard alone

## Notes

- The scroll handler in `base.njk` is registered non-passively; adding `{ passive: true }` is a free win while in this file
- Escape-to-close is not required by Lighthouse but is expected behaviour for a disclosure

## Questions to Resolve

- [x] Should the nav toggle be a `button` with `aria-expanded` (disclosure) or a menu button with `aria-haspopup`? → **Disclosure with `aria-expanded`.** The nav is a list of links, not a menu widget. (2026-11-03)
