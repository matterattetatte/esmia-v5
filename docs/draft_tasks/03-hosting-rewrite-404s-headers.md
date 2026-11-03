# Task: Hosting Rewrite, 404s & Headers

## Metadata
- **Priority:** P0 - Critical
- **Deadline:** 2026-11-06
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:chore, area:devops, required, gate:2-scaffold
- **Dependencies:** 01-ship-path-decision.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 4h
- **Plan IDs:** D1.1, D1.2

## Requirements

- Remove the catch-all `** -> /index.html` rewrite so real files are served
- Missing paths must return HTTP 404 with `404.html`, not the homepage with 200
- `robots.txt` must be `text/plain`, `sitemap.xml` must be `application/xml` (or `text/xml`), `llms.txt` must be `text/plain`
- Hashed assets keep long-lived immutable caching; HTML must not be immutable
- No response may advertise a content type that misrepresents its body

## User Stories

- **US-01:** As a search engine, I want `/robots.txt` to be plain text so that I can read crawl directives.
- **US-02:** As an agent or crawler, I want a real 404 status on unknown paths so that I do not index infinite soft-404s.
- **US-03:** As an engineer, I want correct content types so that browsers and parsers agree on what they received.

## Design

### Current state

```json
"rewrites": [{ "source": "**", "destination": "/index.html" }]
```

This rewrites *every* path, including `/robots.txt`, to the HTML shell. Removing it lets Firebase serve static files and fall back to `404.html` on its own.

### Target headers

| Source | Headers |
|---|---|
| `**/*.@(jpg\|jpeg\|png\|svg\|webp\|avif\|woff2\|css\|js)` | `Cache-Control: max-age=31536000, public, immutable` |
| `**/*.html` | `Cache-Control: max-age=0, must-revalidate` |
| `/robots.txt`, `/llms.txt` | `Content-Type: text/plain; charset=utf-8` |
| `/sitemap.xml` | `Content-Type: application/xml; charset=utf-8` |

## Tasks

- [ ] Delete the `**` rewrite
- [ ] Confirm `404.html` is served with a 404 status
- [ ] Add per-type `Content-Type` headers for the text and xml endpoints
- [ ] Separate asset caching from HTML caching
- [ ] Verify `/robots.txt` bytes are text, not HTML
- [ ] Verify a bogus path returns 404

## Done Criteria

- [ ] `curl -sI https://<host>/robots.txt` shows `200` and `text/plain`
- [ ] `curl -sI https://<host>/nope` shows `404`
- [ ] `curl -sS https://<host>/robots.txt` returns directives, not `<!doctype html>`
- [ ] HTML is not served with immutable caching
- [ ] Lighthouse SEO `robots-txt` and `http-status-code` audits pass

## Notes

- This is the root of the dependency graph for everything measurable
- Firebase serves `404.html` automatically once the rewrite is gone

## Questions to Resolve

- [x] Do we want `/sitemap.xml` at the root or under `/sitemap_index.xml`? → **Root `/sitemap.xml`**, referenced from robots.txt. (2026-11-03)
