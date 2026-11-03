# Task Timeline (Gantt)

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqVldtO20AQhl9lZAnUSnFrOyfIHTii0AaIcFSpFTcTe2xvY-9Gu-tAhHiu3vfJOs4BzAWp6xtrPetvdv79d_bJiVVCzsjJUFp7L4EfK2xBMNXqF8UWZqKkQkjaxhK0dKF0iRbgBz_u9bU7Hm9j-CjMPnY0h6PkXm4DhjlCSfjCP4PvjikWhsdmG_V8iHKxdKdoc9jH4BguVWVoQbQUMoMP3hH8-Q3eZz-o31Yl6iOMABm8og4EXjBwfd_1eh3wkx03gInIcpvXHDhHsykDLlFLMqY1sf9KfFNH4EYxpqkq9um6vGJj68Xe0YMWliE9r2fqSggT0u1TDhpF9HgjaCXoAcIcpaQCUqXhrEqEbQK9g8BhA9iHqxIz3l-x3ApSr08rmITTBm_wL16w5w1glgud8PZpu4avEfMulLRwuc4EMb5t0afv6Nx1LwhtpWlvl-FGz1rnW82ycr4JyqREvWgIcnool-819DiBb7SeK-QSzuKYnSHmW_cnVe1-nDdl7h3E-g3sKYSqUJXml7QajYUpvnGdfxAVvKJ4b29wBTOVZQVPiRZiycaWCy58hjoj257abVB9uGbJqiV8x0Kwm9YQFoSSP7R0ld84a7y3XKdRrNyGwmuLKK50jf1P9_vDd4zQc6-kpUxj_WmXtguhxocCokqnGDNlVvcu04EQpZIixoJXcqfm6o1Iw4P5Txpl9WCiGHJeGbFpGlGcU4nMvDmbti6o4Wy__-KsY7hNU7bvDvkK6x6CBQ3r8iEtitJ8so922xQyku3NEPjv6NznBl3wVL3epRk2-2h4BedVwq5rnadpkxMIK6tWm1MbEeo4f_FNy94T7Jqj03EyLRJnZHVFHackvnfqofP0zKElyp9KlfuoVlWWO6MUC8OjalnfYmOB7KXdlOe_Zy8fhQ)** (pako/zlib-compressed, verified to round-trip).

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
    01 Ship-Path Decision & Housekeeping (0% · 0/12 · todo) : active, 2026-11-04, 1d
    02 Lighthouse Baseline Harness (0% · 0/12 · todo) : active, 2026-11-05, 1d
    section Gate 2-Scaffold
    03 Hosting Rewrite, 404s & Headers (0% · 0/12 · todo) : active, 2026-11-06, 1d
    04 Preview Channel for Audits (0% · 0/10 · todo) : active, 2026-11-07, 1d
    05 Image Pipeline & Hero LCP (0% · 0/16 · todo) : active, 2026-11-07, 2d
    06 Third-Party JS & Font Hygiene (0% · 0/12 · todo) : active, 2026-11-09, 1d
    section Gate 3-Features
    07 Heading Order & Landmarks (0% · 0/9 · todo) : active, 2026-11-10, 1d
    08 Keyboard-Accessible Product Tabs (0% · 0/14 · todo) : active, 2026-11-11, 1d
    09 Colour Contrast Pass (0% · 0/11 · todo) : active, 2026-11-12, 1d
    10 Nav Toggle, Skip Link & Targets (0% · 0/11 · todo) : active, 2026-11-13, 1d
    11 Markup Validity Cleanup (0% · 0/10 · todo) : active, 2026-11-14, 1d
    12 Console Clean & Security Headers (0% · 0/12 · todo) : active, 2026-11-17, 1d
    section Gate 4-Integration
    13 Crawl Surface, Titles, Canonical & Robots (0% · 0/17 · todo) : active, 2026-11-18, 1d
    14 LocalBusiness Schema & NAP (0% · 0/12 · todo) : active, 2026-11-19, 1d
    15 Product & Offer Schema (0% · 0/13 · todo) : active, 2026-11-20, 1d
    16 llms.txt for Agents (0% · 0/11 · todo) : active, 2026-11-21, 1d
    section Gate 5-Delivery
    17 Lighthouse CI Budget (0% · 0/11 · todo) : active, 2026-11-24, 1d
    18 Cutover & Search Console (0% · 0/16 · todo) : active, 2026-11-26, 1d
```
