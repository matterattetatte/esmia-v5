# Task Timeline (Gantt)

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqVlc9O20AQxl9lZAmUSnHjdf4BN3CgUAJEOKrUqpeJvbG3cXaj3XUgQkh9h_bY9-i9j8KTdBzH4EolTX2x12P_9pvxN-MHJ1Ixd46cBKW1nyXQYYXNOIy0-sIjC2Mx55mQvIzFaPmZ0nO0AB_pcK-u3MGgjOG9MFVsbwJ78WdZBgxxhJLwjl4G5g54JAytTRn1GISpWLgjtClUMdiHc5UbPuN8IWQCjUN_D379BMZazC8uYkW338ARILGXvAm-5_dcxlyv0wQWb9A-DEWS2rRAwQmadSZwjlpyY_4H2n2B_pGN74YRTqcqq3Zsk25jC8m3_E4LS5CO1zFFPhxjrg08_fhGO8RK1vm9mugO1Z4vBb-DIEUpeQZTpeE4j4UlzcwrNbeYV5ytitVfFfdrxC5czDGhbyoWZQUKNVrBMBgRsCyC32K9fwH9CtiDcSp0TN9M2xW8Dwl4pqSF81UiOPGfvn6Hk-FNcHk6gMZBJdjfyj98pcRt94yjzTWv_NJfl7Io8Y2mitLeQ5TxHPVs9_Iwr1aeA7jkq4lCSug4isgZYlI2QJwXDYAT4vYrbGcrltWwhxCoTOWaTtJqNBZGuHZdhWJbUf4LinK5xiWMVZJk9Eg4EwsytpxR6mPUCbe7U9s1KoMrKlq-gA-YCXLXCoKMo6QbO5ex1mz0eSlRo6h0awyJC3mU64JbeX9HL7D-K17ouBfS8kRjcWuzbRsCjXcZhLmeYkSUcTG_TBMClEqKCDNScqsmat09pYB2i_W3Cjio5dWBoSLKSW7EemyEUcrnSNDr49HOGdXczbrP3tqHm-mULLxBvsDa22B-zbzUtFk2N2_tvS3HRMLl7nbw2SuF7tKUzuhRvdps069P0uACTvKYfLfzPnWfHECQW7Vcd27IUUfps3EavQq3dRb5tXHJDmGU4YpmLcmDU_-UqFUXi6wwX5jTGIZG6WivRS9sQ_vlmHOaTqJF7BxZnfOmM-f0XyuWzsMjhRYoPyk1r6Ja5UnqHE0xM7TKF8VfciCQfLp55PE3N5M87A)** (pako/zlib-compressed, verified to round-trip).

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
    01 Ship-Path Decision & Housekeeping (92% · 11/12 · doing) : active, 2026-11-04, 1d
    02 Lighthouse Baseline Harness (92% · 11/12 · doing) : active, 2026-11-05, 1d
    section Gate 2-Scaffold
    03 Hosting Rewrite, 404s & Headers ✓ : done, 2026-11-06, 1d
    04 Preview Channel for Audits (10% · 1/10 · todo) : active, 2026-11-07, 1d
    05 Image Pipeline & Hero LCP (12% · 2/16 · todo) : active, 2026-11-07, 2d
    06 Third-Party JS & Font Hygiene — BLOCKED (8% · 1/12 · todo) : active, 2026-11-09, 1d
    section Gate 3-Features
    07 Heading Order & Landmarks (10% · 1/10 · todo) : active, 2026-11-10, 1d
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
