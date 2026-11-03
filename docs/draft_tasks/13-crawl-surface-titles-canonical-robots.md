# Task: Crawl Surface, Titles, Canonical & Robots

## Metadata
- **Priority:** P0 - Critical
- **Deadline:** 2026-11-18
- **Status:** DONE
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

- [x] Exclude `README.md` from collections and output
- [x] Add unique `title` and `description` front matter to every page
- [x] Fix the doubled-brand title template
- [x] Add a self-referencing canonical to `base.njk`
- [x] Add a `Sitemap:` line to `robots.txt`
- [x] State the AI-crawler policy in `robots.txt`
- [x] Decide the fate of `/tags/*` — drop the tag system
- [x] Add `BreadcrumbList` JSON-LD to non-home pages
- [x] Validate the sitemap against the built pages

## Done Criteria

- [x] 15 pages emit 15 distinct titles (10 distinct titles across the 10 remaining pages after dropping `/README/` and `/tags/*`)
- [x] No title contains the brand twice
- [x] Every page has one absolute canonical URL
- [x] `sitemap.xml` contains no `/README/` and no duplicates
- [x] `robots.txt` names the sitemap
- [x] Breadcrumb JSON-LD validates

## Notes

- Lighthouse's SEO category barely inspects structured data; breadcrumbs are here for rich results and agent comprehension, not for the score
- Keep the sitemap generated from `collections.all` so it cannot drift, but filter the exclusions

## Questions to Resolve

- [x] Do we keep `/tags/*` pages at all, or drop the tag system? → **Drop it.** `tags.njk` and `tag-pages.njk` leave the build; four thin near-duplicate URLs are not worth defending in the index. (2026-11-03)
- [x] Should AI crawlers be allowed by default? → **Allow explicitly.** Name GPTBot, ClaudeBot, PerplexityBot and Google-Extended with `Allow: /` so the position is unambiguous. (2026-11-03)
