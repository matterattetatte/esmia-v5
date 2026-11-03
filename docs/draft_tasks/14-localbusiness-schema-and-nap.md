# Task: LocalBusiness Schema & NAP

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-19
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:feature, area:seo, required, gate:4-integration
- **Dependencies:** None
- **Related:** 16-llms-txt-for-agents.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 3h
- **Plan IDs:** G1, G5

## Requirements

- A `LocalBusiness` (or `FoodEstablishment`) JSON-LD block on every page, generated from `_data`
- Name, email, telephone, area served, founding date and `sameAs` must be accurate
- Contact details must also exist as visible HTML text — schema must describe the page, not replace it
- No address must be published that the business has not confirmed

## User Stories

- **US-01:** As a local searcher, I want the business's contact details to be machine-readable.
- **US-02:** As an AI assistant, I want to answer "who caters paella in Stockholm" with facts, not guesses.
- **US-03:** As the owner, I want the phone number back on the site — the old site had it.

## Design

### Regression to fix

The live SPA exposes `norberto@esmia.se` and `0707223191`. The new build drops the phone entirely, and `content/about.njk` has no NAP block at all. Structured data cannot fix that: schema must mirror visible content.

### Shape

```json
{
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Esmia HB",
  "email": "norberto@esmia.se",
  "telephone": "+46707223191",
  "url": "https://esmia.se/",
  "foundingDate": "1993",
  "areaServed": { "@type": "City", "name": "Stockholm" },
  "servesCuisine": "Spanish",
  "sameAs": ["https://www.facebook.com/<page>"]
}
```

Data lives in `_data/metadata.js` so one edit updates schema, footer and `llms.txt`.

## Tasks

- [ ] Add NAP fields to `_data/metadata.js`
- [ ] Restore phone and email as visible HTML on about/contact
- [ ] Add the `LocalBusiness` JSON-LD to `base.njk`
- [ ] Confirm `sameAs` URL is the real Facebook page
- [ ] Validate with the Rich Results Test
- [ ] Confirm schema values match the visible page

## Done Criteria

- [ ] Rich Results Test reports 0 errors for the business entity
- [ ] Phone and email appear in rendered HTML, not only in JSON-LD
- [ ] No invented street address
- [ ] One source of truth for the contact data

## Notes

- `telephone` should be E.164 (`+46...`) even though the visible text can stay local
- If there is a real visiting address, add `PostalAddress`; do not guess one

## Questions to Resolve

- [ ] Is there a public visiting address, or is this delivery-only?
- [ ] Should `openingHours` be published? Only if it is stable.
