# Task: Colour Contrast Pass

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-12
- **Status:** DONE
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

- [x] Audit every foreground/background pair in use
- [x] Raise `--color-text-muted` to at least 6:1
- [x] Check `--color-primary` used as text on surface colours
- [x] Check footer and legal page link colours
- [x] Check focus rings and button borders
- [x] Record the measured ratios in this file

## Done Criteria

- [x] Lighthouse `color-contrast` audit passes on all pages
- [x] No text below 4.5:1 anywhere in the build
- [x] Focus indicators are visible on every interactive element
- [x] Ratios are documented, not just asserted

## Measured ratios — 2026-11-03

| Pair | Foreground | Background | Ratio | Threshold |
|---|---|---|---|---|
| Body text | `#F4E4BC` | `#1A252F` | 12.19:1 | 4.5:1 |
| Muted text (`--color-text-muted`) | `#C49A78` | `#1A252F` | 6.26:1 | 4.5:1 |
| Primary headings (`--color-primary`) | `#D4A017` | `#1A252F` | 6.56:1 | 3.0:1 / 4.5:1 |
| Links (`--text-color-link`) | `#FFD60A` | `#1A252F` | 10.61:1 | 4.5:1 |
| Visited links (`--text-color-link-visited`) | `#F4C430` | `#1A252F` | 9.21:1 | 4.5:1 |
| CTA buttons (`.btn-reserva`, `.btn-secondary`) | `#8A0018` | `#FFD60A` | 6.46:1 | 4.5:1 |
| Welcome section body | `#FFFFFF` | `#9E0E19` | 7.45:1 | 4.5:1 |
| Welcome section heading | `#FFD60A` | `#9E0E19` | 5.48:1 | 3.0:1 |

## Notes

- Measure with a tool, then verify with Lighthouse; automated checks miss gradient and image-backed text
- The hero has white text over a photo with a dark overlay — check the overlay's opacity at the lightest part of the image

## Questions to Resolve

- [x] Is the muted tone a brand requirement, or can it move further for legibility? → **Legibility wins.** Move the token as far as needed to clear 4.5:1; the palette stays recognisably Spanish either way. (2026-11-03)
