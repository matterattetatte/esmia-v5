# Task: llms.txt for Agents

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-21
- **Status:** DONE
- **Assignee:** TBD
- **Tags:** type:feature, area:seo, required, gate:4-integration
- **Dependencies:** 03-hosting-rewrite-404s-headers.md, 14-localbusiness-schema-and-nap.md, 15-product-offer-schema.md
- **Related:** 13-crawl-surface-titles-canonical-robots.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 3h
- **Plan IDs:** G4, G6

## Requirements

- `llms.txt` served at the site root as `text/plain`
- Generated from the same data as the pages, so prices cannot go stale
- States what the business does, where, how to book, and what it costs
- Links only to canonical pages
- An agent smoke test confirms an assistant can answer a real customer question from the site alone

## User Stories

- **US-01:** As an AI assistant, I want a compact factual summary so that I do not have to parse 29 product cards to answer a booking question.
- **US-02:** As the owner, I want price changes to propagate automatically.
- **US-03:** As an engineer, I want one data source for page, schema and agent summary.

## Design

### Why a template, not a static file

A hand-written `llms.txt` goes stale the first time a price changes. Generate it:

```njk
---
permalink: /llms.txt
eleventyExcludeFromCollections: true
---
```

Then render business facts, categories and prices from `products` + `metadata`.

### Shape

```
# Esmia HB
> Spanish deli and paella catering in Stockholm since 1993.

## Contact
Email: norberto@esmia.se
Phone: +46707223191
Area served: Stockholm

## Booking
Email with date, headcount and location. Catering from 10 to 100+ guests.

## Products (SEK)
- Serranoskinka skivad 500g — 115 kr / st
- ...

## Pages
- https://esmia.se/products
- https://esmia.se/about
```

## Tasks

- [x] Add the `llms.txt` template with `permalink`
- [x] Render contact and booking facts from `_data`
- [x] Render product categories and prices from `_data/products.js`
- [x] List canonical page URLs
- [x] Confirm `Content-Type: text/plain` in the hosting config
- [x] Run the agent smoke test

## Done Criteria

- [x] `curl -sS https://<host>/llms.txt` returns text, not HTML
- [x] Prices match the rendered product page
- [x] No stale duplicates of the same fact
- [x] An assistant asked "can Esmia cater paella for 30 in Stockholm, what does it cost, how do I book" answers using only site content

## Notes

- No MCP server and no API: for a static catering site the agentic payoff is readable facts, not a protocol endpoint
- Keep the file short; it is a summary, not a second website

## Questions to Resolve

- [x] Should `llms.txt` include the full product list or only categories with a link? → **Full list with prices.** That is the entire point: an agent should not have to crawl 40 cards to quote a price. (2026-11-03)
