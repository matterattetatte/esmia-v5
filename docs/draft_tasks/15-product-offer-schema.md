# Task: Product & Offer Schema

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-20
- **Status:** DONE
- **Assignee:** TBD
- **Tags:** type:feature, area:seo, required, gate:4-integration
- **Dependencies:** 05-image-pipeline-and-hero-lcp.md
- **Related:** 16-llms-txt-for-agents.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 5h
- **Plan IDs:** G2

## Requirements

- Every priced product emits a `Product` with an `Offer`
- Schema is generated from `_data/products.js`, never hand-written
- Prices parse from the existing strings into `price` + `priceCurrency: SEK`
- Unit must be preserved (`/ st`, `/ kg`) via `priceSpecification`
- Products without a price must not invent one

## User Stories

- **US-01:** As an AI assistant, I want structured product data so that I can quote prices accurately.
- **US-02:** As the owner, I want menu changes to update schema automatically.
- **US-03:** As a search engine, I want product markup that matches the visible price.

## Design

### Source data

```js
{ name: 'Serranoskinka skivad 500g', image: '../../images/products/serrano500.jpg', price: '115 kr / st', description: '...' }
```

### Parsing

| Input | price | unitText |
|---|---|---|
| `115 kr / st` | `115` | `st` |
| `170 kr / kg` | `170` | `kg` |

A filter in `_config/filters.js` exposes `{ amount, unit }` so template and schema share one parser.

### Shape

```json
{
  "@type": "Product",
  "name": "Serranoskinka skivad 500g",
  "description": "Över 15 månader lufttorkad...",
  "image": "https://esmia.se/img/...",
  "offers": {
    "@type": "Offer",
    "price": "115",
    "priceCurrency": "SEK",
    "availability": "https://schema.org/InStock",
    "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "st" }
  }
}
```

## Tasks

- [x] Write a price parser filter
- [x] Add a unit test for the parser against every product string
- [x] Emit `Product`/`Offer` JSON-LD per visible product
- [x] Reuse the transformed image URL, not the source path
- [x] Handle products with no price
- [x] Validate with the Rich Results Test

## Done Criteria

- [x] Every priced product has a valid `Offer`
- [x] Schema prices equal the rendered prices
- [x] No product invents a price
- [x] Parser has tests covering all price formats in the data
- [x] Rich Results Test reports 0 errors

## Notes

- Schema must describe what is visible on the page; emitting markup for hidden tab panels is acceptable only if the content is in the DOM
- `availability` is a guess unless the owner confirms stock status; leaving it out is safer than inventing it

## Questions to Resolve

- [x] Is everything always in stock, or should availability be omitted? → **Keep `availability` omitted** so the site never claims an item is in stock when it may be seasonal or made to order. (2026-11-03)
- [x] Should `/products` emit every product, or only the visible tab? → **All 29 named products.** They are present in the DOM; hidden panels still carry the content. (2026-11-03)
