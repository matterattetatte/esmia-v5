# Task: Console Clean & Security Headers

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-17
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:feature, area:devops, required, gate:3-features
- **Dependencies:** 03-hosting-rewrite-404s-headers.md, 06-third-party-js-and-fonts.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 4h
- **Plan IDs:** B1, B2, B3

## Requirements

- Zero console errors and zero failed requests on first load of every route
- No deprecated browser APIs invoked by our own code or by third parties on first load
- `X-Frame-Options` or CSP `frame-ancestors` must be present
- `X-Content-Type-Options: nosniff` and a `Referrer-Policy` must be present
- A CSP decision must be recorded, including its trade-off with inline CSS

## User Stories

- **US-01:** As the CTO, I want a console I can hand to a client without apologising for red text.
- **US-02:** As a security reviewer, I want the standard response headers present.
- **US-03:** As an engineer, I want a written CSP decision so that the next person does not re-litigate it.

## Design

### Scored audits in play

| Audit | Requirement |
|---|---|
| `errors-in-console` | No browser errors on load |
| `deprecations` | No deprecated APIs used during load |
| `clickjacking-mitigation` | `X-Frame-Options` or `frame-ancestors` |
| `inspector-issues` | No console/network issues from the page |

### CSP trade-off

All CSS is inlined into `<head>` via `{% getBundle "css" %}`. A CSP without `style-src 'unsafe-inline'` will block it. Two honest options:

1. Keep inlining, declare `style-src 'self' 'unsafe-inline'` — fast, weaker.
2. Switch to `{% getBundleFileUrl "css" %}` — one extra request, no inline allowance.

Note that CSP effectiveness is not a scored Lighthouse audit; this is hardening, not scoring.

## Tasks

- [ ] Sweep all 15 routes for console errors and 404s
- [ ] Fix the `new Image().src` load if it 404s
- [ ] Confirm the `js` bundle URL resolves
- [ ] Add `X-Frame-Options`/`frame-ancestors`
- [ ] Add `X-Content-Type-Options` and `Referrer-Policy`
- [ ] Record the CSP decision in this file
- [ ] Re-check the console with the widget loaded

## Done Criteria

- [ ] No console errors on any route, before or after scrolling to the embed
- [ ] No request returns 404
- [ ] Response headers include clickjacking mitigation, nosniff, referrer policy
- [ ] CSP decision documented with the chosen trade-off

## Notes

- HSTS is already set at the CDN (`max-age=31556926`); no action needed
- Third-party deprecation warnings from Meta's widget disappear once the widget is deferred, which is why this task depends on task 06

## Questions to Resolve

- [x] Inline CSS with `unsafe-inline`, or a separate stylesheet with a stricter policy? → **Keep inline CSS, allow `style-src 'self' 'unsafe-inline'`.** CSP strength is not a scored audit; the extra request costs more than the policy buys here. (2026-11-03)
