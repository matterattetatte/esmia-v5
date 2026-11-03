# Task: Crawl Surface, Titles, Canonical & Robots

## Metadata
- **Priority:** P0 - Critical
- **Deadline:** 2026-11-18
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:feature, area:seo, required, gate:4-integration
- **Dependencies:** 03-hosting-rewrite-404s-headers.md
- **Related:** 16-llms-txt-for-agents.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 5h
- **Plan IDs:** S1, S2, S3, S4, S5, S6, G3

## Requirements

- Every page must have a unique `<title>` and a unique meta description
- Every page must have a self-referencing canonical URL
- `/README/` must stop being published
- `robots.txt` must declare the sitemap and state the AI-crawler policy explicitly
- The sitemap must contain only real, indexable pages
- Non-home pages carry a `BreadcrumbList`

## User Stories

- **US-01:** As a search engine, I want distinct titles so that I can distinguish 15 pages instead of one.
- **US-02:** As the owner, I want the site's pages to appear with the right title in results.
- **US-03:** As a crawler, I want a sitemap that lists only pages that should rank.

## Design

### Current state

All 15 pages emit the same title, and the brand is doubled because `metadata.title` already starts with `Esmia HB`:

```
<title>Esmia - Esmia HB - Spanska delikatesser i Sverige</title>
```

`content/README.md` is treated as a page, so `/README/` is built and listed in `sitemap.xml`. There is no canonical link anywhere. `robots.txt` is two lines with no sitemap directive.

### Title pattern

```njk
<title>{% if title %}{{ title }} | Esmia HB{% else %}{{ metadata.title }}{% endif %}</title>
```

Per-page front matter supplies `title` and `description`; the layout stops prefixing.

### Sitemap hygiene

- Exclude `content/README.md` from collections and output
- Decide on `/tags/*`: these are thin pages with little unique content
- Add `<lastmod>` only where a real date exists

## Tasks

- [ ] Exclude `README.md` from collections and output
- [ ] Add unique `title` and `description` front matter to every page
- [ ] Fix the doubled-brand title template
- [ ] Add a self-referencing canonical to `base.njk`
- [ ] Add a `Sitemap:` line to `robots.txt`
- [ ] State the AI-crawler policy in `robots.txt`
- [ ] Decide the fate of `/tags/*`
- [ ] Add `BreadcrumbList` JSON-LD to non-home pages
- [ ] Validate the sitemap against the built pages

## Done Criteria

- [ ] 15 pages emit 15 distinct titles
- [ ] No title contains the brand twice
- [ ] Every page has one absolute canonical URL
- [ ] `sitemap.xml` contains no `/README/` and no duplicates
- [ ] `robots.txt` names the sitemap
- [ ] Breadcrumb JSON-LD validates

## Notes

- Lighthouse's SEO category barely inspects structured data; breadcrumbs are here for rich results and agent comprehension, not for the score
- Keep the sitemap generated from `collections.all` so it cannot drift, but filter the exclusions

## Questions to Resolve

- [ ] Do we keep `/tags/*` pages at all, or drop the tag system?
- [ ] Should AI crawlers be allowed by default? Recommendation: allow, and say so explicitly in the file.
