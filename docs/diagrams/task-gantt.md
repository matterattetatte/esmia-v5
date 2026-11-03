# Task Timeline (Gantt)

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNp9VUtu2zAQvcpAQAIXsBpR8Sf2LpGTJq2TGJFRoEU2Y4mWWMukQVJOjCCn6Lb36L5H6Uk6sqxEBSxrI5Oj9_hm5nH84kQq5s7QSVBa-yiBHitsxmGi1Q8eWZiKJc-E5GUsRsuvlF6iBfhGj3t7645GZQyfhaliRzM4ih9lGTDEI5SETwQG5o54JAytTRn1GISpWLkTtClUMTiGa5UbvuB8JWQCrYF_BH9-A2MnzC9-xIq2P8AQkLjXvA2-5_dcxlyv0wYW76h9GIsktWlBBRdotpnANWrJjYG_v34SQaxkHd59h_-n23fDCOdzlVXcp6TQ2ELcA3_SwhJJx-uYQjnHmOsG_l5NXoeqzNeCP0GQopQ8g7nScJ7HwhpoMa9M-YR5xduqWO1NuF9j7MLNEhPqnliVuRZqtIJxMNkvh8B-Be7BNBU6pk5ou4HPIYGvlLRwvUkEJ669BIOGep26VxxtrnnV5v62LkW97jWVh8jHKOMl6sX-SjGvltcZfOGbmUJSdx5F1DwxKz0a54VHcdbAwWocAwhUpnJNL2k1GgsTbHAB899xVP07XMNUJUlGn4QLsSJXyQUlMEWdcNtAcVqjYHBLeeYr-IqZoO5uIMg4StrYC61ZmNxOco2ibLcQOjXkUa4LjkM-Y_2GvnTcG2l5orHY2p1xCoHGpwzCXM8xIpZpMQJMGwKUSooIMzr2Qc1UU65nNcEdGCtCXORGbG9ZGKV8iURwd77fg6xmIdZ9a-ox3M_n5JMdfh_Sr1mE9SDLluajfbblLUq4bJDrs4badGk2ZXS59GbH2a_Pj-AGLvKYGk7TqLqZ7NDN9Ot9PIMgt2q9NX7IUUfpW2NbvYqud5CuNjrYACYZbmjukDy49C-JtboYIivMEeY0kqBVzhDvhACHqP1yDDhtJ9EidoZW57ztLDlN82LpvLxSaIXyu1LLKqpVnqTOcI6ZoVW-Kv4bRgLJWrtPXv8BZW_xdg)** (pako/zlib-compressed, verified to round-trip).

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
    02 Lighthouse Baseline Harness ✓ : done, 2026-11-05, 1d
    section Gate 2-Scaffold
    03 Hosting Rewrite, 404s & Headers ✓ : done, 2026-11-06, 1d
    04 Preview Channel for Audits (10% · 1/10 · todo) : active, 2026-11-07, 1d
    05 Image Pipeline & Hero LCP ✓ : done, 2026-11-07, 2d
    06 Third-Party JS & Font Hygiene ✓ : done, 2026-11-09, 1d
    section Gate 3-Features
    07 Heading Order & Landmarks ✓ : done, 2026-11-10, 1d
    08 Keyboard-Accessible Product Tabs ✓ : done, 2026-11-11, 1d
    09 Colour Contrast Pass ✓ : done, 2026-11-12, 1d
    10 Nav Toggle, Skip Link & Targets ✓ : done, 2026-11-13, 1d
    11 Markup Validity Cleanup ✓ : done, 2026-11-14, 1d
    12 Console Clean & Security Headers ✓ : done, 2026-11-17, 1d
    section Gate 4-Integration
    13 Crawl Surface, Titles, Canonical & Robots ✓ : done, 2026-11-18, 1d
    14 LocalBusiness Schema & NAP ✓ : done, 2026-11-19, 1d
    15 Product & Offer Schema ✓ : done, 2026-11-20, 1d
    16 llms.txt for Agents ✓ : done, 2026-11-21, 1d
    section Gate 5-Delivery
    17 Lighthouse CI Budget (9% · 1/11 · todo) : active, 2026-11-24, 1d
    18 Cutover & Search Console (6% · 1/16 · todo) : active, 2026-11-26, 1d
    19 Playwright E2E & Accessibility Suite (0% · 0/19 · todo) : active, 2026-11-22, 2d
```
