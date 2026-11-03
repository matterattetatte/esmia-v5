# Positioning & Competitive Notes

Captured 2026-11-03 from the owner's notes, after reading `paellakungen.se` and `paella.nu`.

## The strategic call

| | **Esmia HB** | **Paellakungen** | **Paella.nu** |
|---|---|---|---|
| **Positioning** | undefined — currently a product list | experience, craft, high end | logistics catering |
| **Geography** | Stockholm | Skåne (Limhamn) | Skåne, Halland, Blekinge |
| **Catering price** | not published | not published | from 185 kr/person, min 30 guests |
| **Menu depth** | 29 named products across 5 categories | 3 named paellas + oyster bar + DIY kit | menus by occasion |
| **Credibility** | since 1993, restaurant supply | named chef, 17 years, Svenska Storköksmästerskapen 2025 | process clarity, philosophy |
| **Social proof** | live Facebook feed | named testimonials with party sizes, Trustpilot | reviews page |
| **Conversion** | `mailto:` link | inline quote form | inquiry page |
| **SEO surface** | 5 pages | ~8 sections on one page | ~15 pages incl. location landing pages |

**The call:** Paella.nu is ordinary logistics catering, so do not compete on price per head. Paellakungen and Esmia are experience, craft and high end. Compete there — but steal Paella.nu's *distribution*, because location pages and published prices are why they rank.

## What to borrow

### From Paellakungen (experience)

1. Hero with two CTAs — book, and see the menu.
2. A "this is more than catering" narrative block.
3. An occasion grid: weddings, corporate, garden party, after-work, summer party.
4. Named menus with full ingredient lists.
5. A credibility block — for Esmia: since 1993, restaurant supply, imported directly.
6. Named testimonials that include party size.
7. A quote form instead of `mailto:`.
8. Footer with full NAP.

### From Paella.nu (distribution)

1. Title tag carrying the offer, e.g. `Paellacatering i Stockholm | Kock på plats | Esmia HB`.
2. Geographic landing pages — Greater Stockholm areas rather than Skåne towns.
3. A published starting price, or an explicit "from" figure.
4. A short "how it works" section.
5. A hub page listing every URL. Useful for visitors *and* for agents.

## What not to copy

- **Not their address.** `Foodonfleek AB, Rabygatan 42, 216 13 Limhamn` is Paellakungen's. Esmia's own NAP is still an open question in task 14.
- **Not their testimonials or copy.** Republishing them would be a straight fabrication.
- **Not a price war.** Undercutting Paella.nu contradicts the premium position.

## Gaps this exposes in the current build

| Gap | Where it belongs |
|---|---|
| No occasion pages | new content, post-cutover |
| No testimonials at all | new content, needs real quotes + permission |
| No booking form, only `mailto:` | new feature, not yet ticketed |
| No location pages (Stockholm areas) | SEO, the biggest ranking lever |
| Catering prices unpublished | task 15 (schema) depends on this |
| No credibility block on `/about` | task 14 |

## Influencers

Owner's note: 10 influencers at roughly 5K followers each, about 50K combined reach.

For that to convert rather than just spike traffic:

- Point every creator at a single landing page with a tracked link (`?ref=creator-name`) so the traffic is attributable.
- Ask for written permission to quote their caption as a testimonial — permissions in writing, not assumed.
- Make sure the booking path survives a traffic spike; today it is a `mailto:`, which is the most resilient option and also the least measurable.

## AI + SEO

- `robots.txt` now names the AI crawlers explicitly rather than relying on a wildcard.
- `llms.txt` is generated from `_data/products.js`, so agent-quoted prices cannot drift.
- Structured data (tasks 14, 15) is what turns "a website" into "an answer".
- Publishing prices is an agent-visibility decision as much as a pricing one: agents quote what is published, and "contact us for pricing" is a dead end in an answer engine.
