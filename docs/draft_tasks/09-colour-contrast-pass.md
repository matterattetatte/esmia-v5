# Task: Colour Contrast Pass

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-12
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:feature, area:frontend, required, gate:3-features
- **Dependencies:** None
- **GitHub Issue:** _not created_
- **Estimated Effort:** 2h
- **Plan IDs:** A3

## Requirements

- All body text must reach 4.5:1 against its background
- Large text may meet 3:1
- Interactive elements and focus indicators must reach 3:1
- The muted text token must be fixed at the token level, not per-rule
- Contrast must hold on both surfaces (`--color-bg` and `--color-surface`)

## User Stories

- **US-01:** As a low-vision user, I want to read the newsletter and legal pages without straining.
- **US-02:** As the owner, I want the palette to stay recognisably Spanish while being legible.

## Design

### Measured problem

`--color-text-muted: #A67B5B` on `--color-bg: #1A252F` is approximately **4.2:1** — below the 4.5:1 threshold for normal text. It is used in five places in `css/news.css`, including 13px metadata.

### Direction

Lighten the token rather than the backgrounds, so the dark Spanish-night palette is preserved:

| Role | Current | Candidate |
|---|---|---|
| muted text | `#A67B5B` (4.2:1) | `#C49A78` (~6.3:1) |

`--color-primary #D4A017` on `#1A252F` is approximately 6.6:1 and passes; verify it is not used as a background behind light text.

## Tasks

- [ ] Audit every foreground/background pair in use
- [ ] Raise `--color-text-muted` to at least 6:1
- [ ] Check `--color-primary` used as text on surface colours
- [ ] Check footer and legal page link colours
- [ ] Check focus rings and button borders
- [ ] Record the measured ratios in this file

## Done Criteria

- [ ] Lighthouse `color-contrast` audit passes on all pages
- [ ] No text below 4.5:1 anywhere in the build
- [ ] Focus indicators are visible on every interactive element
- [ ] Ratios are documented, not just asserted

## Notes

- Measure with a tool, then verify with Lighthouse; automated checks miss gradient and image-backed text
- The hero has white text over a photo with a dark overlay — check the overlay's opacity at the lightest part of the image

## Questions to Resolve

- [ ] Is the muted tone a brand requirement, or can it move further for legibility?
