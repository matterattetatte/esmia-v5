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

### Reference structure

[paellakungen.se](https://paellakungen.se) is the model for how a Stockholm paella caterer presents itself: a booking CTA above the fold, an occasion grid (bröllop, företagsevent, trädgårdsfest, AW), menu cards that list ingredients, an "Om kocken" credibility block with years and awards, testimonials, a quote form, and a footer carrying full NAP.

Esmia should mirror the **structure** — booking CTA, explicit service area, visible NAP, social proof — and the schema that goes with it. Not the copy, not the identity, and not the other company's address or contact details.

Their footer is the concrete pattern to copy:

```
Foodonfleek AB · Rabygatan 42 · 216 13 Limhamn · info@paellakungen.se · 0708-63 63 64
```

Esmia's equivalent needs Esmia's own values — see the open question below.

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

- [ ] **OPEN** — Is there a public visiting address, or is this delivery-only? Needs Esmia's real values; the Paellakungen footer is the pattern, not the data.
- [x] Should `openingHours` be published? Only if it is stable. → **Omit for now.** Catering is by arrangement, not by opening hours; a wrong schedule is worse than none. (2026-11-03)
