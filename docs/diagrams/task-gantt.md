# Task Timeline (Gantt)

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqVlc9u2kAQxl9lZCkRlXDDmv_cgkmaNCRBMarUKpfBXuwtZhftrklQFKkP0XfpvY_SJ-kY48Q9hFAulj3mNzPffjN-ckIVcWfgxCitvZdAPytsymGi1XceWpiKJU-F5EUsQsvPlV6iBfhKP_f62h2Nihg-ClPGjmZwFN3LImCII5SET_RnYO6Ih8LQvSmiDQZBIlbuBG0CZQyO4UJlhi84XwkZQ613BL9_ATthXn61KlIfYABI4DWvg9fwOi5jbqNVBxbtuB6MRZzYJOfAEM22DbhALbkxUGPdLdJ7D9l-Rf7TiOcGIc7nKi3zNalkY_Nq7_iDFpYgrUbL5K1wjLg2B3fRqXTRopPga8EfwE9QSp7CXGk4zSJh8yYaJbGxl9itENtwucSYTlisCknyArWCsT8hoFeq0nkP6JXADkwToSM6QW038Dkg4LmSFi42seDE__PjJwzHt_7V2ehgCfpvqN50zznaTPPSPd2turnqt5pEptxjlNES9SKXh-2y9fclY42KOj244puZQurnNAzJKWJWTEOU5dOAM8J2yx5ae7Gsgu2Dr1KVabpIq9FYmGDuwn6JYntR3iuKTvoG1zBVcZzSK8FCrMjockGdT1HH3B5ObVaoDK5Js2wFXzAVZK4N-ClHSQ8ONRmrDB-dLjVqFEm3xVBxAQ8znXP_cxpY9w0rtNxLaXmsMX-0S9sEX-NDCkGm5xgSZZovM1MHH6WSIsSUKrlTM7UdnqKA5gnr7i2gV-mrBWNFlGFmxHaNBGHCl0jQm9PJwR1VzM3aL946htv5nBy8Q77CmvtgXsW8NLNpujQf7aMttkTM5eF28NgbQrdpZaf0qt7s0nSrm9W_hGEWke8OzlP1SQ_8zKr1dnADjjpMXoxT65S4vavIq2xL1odJihvavlQenHlnRC2nWKS5-YKMFjPUCkc3TtjexeB5xZZz6k6sReQMrM543Vly-sjlt87TM4VWKL8ptSyjWmVx4gzmmBq6y1b5J3MkkHy6e-X5L3LYQNY)** (pako/zlib-compressed, verified to round-trip).

Regenerate whenever task metadata changes:

```bash
python3 -m project_management plan gantt --output docs/diagrams/task-gantt.md
```

## Legend

| Bar | Meaning |
|---|---|
| `✓` task | **done** — rendered in the mermaid `done` style |
| plain task | **active** — scheduled work (or in progress) |
| `(50% · 3/6 · doing)` | checkbox progress + status, same format as the dependency graph |

Same design as the dependency graph: every task ends on its deadline (or on the
earliest deadline of the tasks that depend on it); duration comes from the
Estimated Effort. Tasks are grouped into Gate sections. Tasks with no usable
date cannot be drawn as a bar — they are listed under the chart until they get
a **Deadline**. (Mermaid gantt has no 'skipped' row state.)

```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    axisFormat  %b %d

    section Gate 1-Decisions
    01 Ship-Path Decision & Housekeeping (8% · 1/12 · todo) : active, 2026-11-04, 1d
    02 Lighthouse Baseline Harness (17% · 2/12 · todo) : active, 2026-11-05, 1d
    section Gate 2-Scaffold
    03 Hosting Rewrite, 404s & Headers (8% · 1/12 · todo) : active, 2026-11-06, 1d
    04 Preview Channel for Audits (10% · 1/10 · todo) : active, 2026-11-07, 1d
    05 Image Pipeline & Hero LCP (12% · 2/16 · todo) : active, 2026-11-07, 2d
    06 Third-Party JS & Font Hygiene — BLOCKED (8% · 1/12 · todo) : active, 2026-11-09, 1d
    section Gate 3-Features
    07 Heading Order & Landmarks (11% · 1/9 · todo) : active, 2026-11-10, 1d
    08 Keyboard-Accessible Product Tabs (7% · 1/14 · todo) : active, 2026-11-11, 1d
    09 Colour Contrast Pass (9% · 1/11 · todo) : active, 2026-11-12, 1d
    10 Nav Toggle, Skip Link & Targets (9% · 1/11 · todo) : active, 2026-11-13, 1d
    11 Markup Validity Cleanup (10% · 1/10 · todo) : active, 2026-11-14, 1d
    12 Console Clean & Security Headers (8% · 1/12 · todo) : active, 2026-11-17, 1d
    section Gate 4-Integration
    13 Crawl Surface, Titles, Canonical & Robots (18% · 3/17 · todo) : active, 2026-11-18, 1d
    14 LocalBusiness Schema & NAP (8% · 1/12 · todo) : active, 2026-11-19, 1d
    15 Product & Offer Schema (8% · 1/13 · todo) : active, 2026-11-20, 1d
    16 llms.txt for Agents (9% · 1/11 · todo) : active, 2026-11-21, 1d
    section Gate 5-Delivery
    17 Lighthouse CI Budget (9% · 1/11 · todo) : active, 2026-11-24, 1d
    18 Cutover & Search Console (6% · 1/16 · todo) : active, 2026-11-26, 1d
    19 Playwright E2E & Accessibility Suite (0% · 0/19 · todo) : active, 2026-11-22, 2d
```
