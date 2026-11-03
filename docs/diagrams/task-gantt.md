# Task Timeline (Gantt)

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqVlc9O20AQxl9lZAmUSnHJOv9zIw4USoAIR5VacZnYG3sbZzfaXQcihNSH6Lv03kfpk3Qcx-AeCKkvlj3r3858-834yQlVxJ2BE6O09l4CXVbYlMNEq-88tDAVS54KyYtYhJafK71EC_CVLvf62h2Nihg-ClPGjmZwFN3LImCII5SET_QxMHfEQ2Ho2RTRBoMgESt3gjaBMgbHcKEywxecr4SModY7gt-_gJ0wL79bFakPMAAk8JrXwWt4HZcxt9GqA4t2XA_GIk5sknNgiGZbBlygltwYqLHuFum9h2y_Iv8pxHODEOdzlZb7NSllY_Ns7_iDFpYgrUbL5KVwjLg2B1fRqVTRopPga8EfwE9QSp7CXGk4zSJh8yIaJbGxl9itENtwucSYTlisCknyBLWCsT8hoFeq0nkP6JXADkwToSM6QW038Dkg4LmSFi42seDE__PjJwzHt_7V2ehgCfpvqN50zznaTPPSPd2turnqt5pEpr3HKKMl6sXh8rBGRZ4eXPHNTCEVdBqGZBUxK9ohyvJ2wBlxuyW2tRfLKtg--CpVmaabtBqNhQnmNuyXKLYX5b2iqJYbXMNUxXFKS4KFWJHT5YJKn6KOuT2c2qxQGVyTaNkKvmAqyF0b8FOOkl4cLGOl--h4qVCjSLothpILeJjpnPuf7cC6b3ih5V5Ky2ON-avdtk3wNT6kEGR6jiFRpvk0M3XwUSopQkwpkzs1U9vuKRJonrDu3gR6lbpaMFZEGWZGbOdIECZ8iQS9OZ0cXFHF3az94q1juJ3PycI75CusuQ_mVcxLTZumS_PRPtpiTMRcHm4Hj70hdJtmdkpL9Wa3Tbc6Wv1LGGYR-e7gfao-6YGfWbXedm7AUYfJi3FqnRK3dxZ5lXHJ-jBJcUPjl9KDM--MqGUXizQ3X5DRZIZa4ejGCX2wD-0VY86pO7EWkTOwOuN1Z8npL5c_Ok_PFFqh_KbUsoxqlcWJM5hjaugpW-X_zJFA8uluyfNfBl5A_Q)** (pako/zlib-compressed, verified to round-trip).

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
