# Task: Cutover & Search Console

## Metadata
- **Priority:** P0 - Critical
- **Deadline:** 2026-11-26
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:chore, area:devops, required, gate:5-delivery
- **Dependencies:** 05-image-pipeline-and-hero-lcp.md, 12-console-clean-and-security-headers.md, 13-crawl-surface-titles-canonical-robots.md, 14-localbusiness-schema-and-nap.md, 15-product-offer-schema.md, 16-llms-txt-for-agents.md, 17-lighthouse-ci-budget.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 4h
- **Plan IDs:** D1.5, S8

## Requirements

- `esmia.se` serves this build, with all four categories at 100 on mobile
- Old SPA routes redirect instead of 404
- A real 404 is served for unknown paths
- Search Console receives the sitemap and a reindex request
- Rollback is one command and has been tested once

## User Stories

- **US-01:** As the owner, I want the new site live without losing existing traffic.
- **US-02:** As a search engine, I want the new URLs submitted so that the domain stops being associated with soft-404s.
- **US-03:** As the CTO, I want a proven rollback before the switch, not after.

## Design

### Sequence

1. Freeze content changes for the cutover window
2. Deploy to production hosting with the new config
3. Verify headers, status codes and redirects on the live domain
4. Re-run Lighthouse on the live URL
5. Submit `sitemap.xml` in Search Console, request indexing for `/` and `/products`
6. Watch for 404 spikes and soft-404 reports for 72 hours

### Verification, not vibes

```
curl -sI https://esmia.se/robots.txt     # 200 text/plain
curl -sI https://esmia.se/nope           # 404
curl -sS https://esmia.se/sitemap.xml    # xml, not html
curl -sS https://esmia.se/llms.txt       # plain text
```

## Tasks

- [ ] Run the full pre-cutover checklist on the preview URL
- [ ] Deploy to production
- [ ] Verify the four curl checks on the live domain
- [ ] Run Lighthouse on the live domain
- [ ] Submit the sitemap in Search Console
- [ ] Request indexing for the main pages
- [ ] Test rollback on a preview channel
- [ ] Monitor 404s for 72 hours

## Done Criteria

- [ ] Live domain: 100/100/100/100 mobile
- [ ] Live `robots.txt` is plain text and names the sitemap
- [ ] Unknown paths return 404
- [ ] Old SPA routes redirect
- [ ] Sitemap status in Search Console is Success
- [ ] Rollback demonstrated, not just documented

## Notes

- The domain previously returned 200 for every path; expect Search Console to report soft-404s for a while as the old URLs are reprocessed
- Keep the `spa-pre-cutover` tag until 72 hours of clean monitoring

## Questions to Resolve

- [ ] Cut over during a weekday or a weekend?
- [ ] Who is on call for the 72-hour window?
