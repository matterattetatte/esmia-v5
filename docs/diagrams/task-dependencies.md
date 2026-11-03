# Task Dependency Graph

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqNVttu4zYQ_ZWBFll4ATsRbcm3AgV8yTbpphtjbfShTR8oiZII06JBUUmNxQL9iP5L3_sp_ZIOZUurlZm6fpF1hnM4Zzgz4mcnlBFzpk4s5EuYUqVhs3zKAH9XV7CWgkdAlZIvMINe73uYT2EOEduzLMpBZoh2AiHDLYsgOMDsXe26lFojKHjGjOs1KCaoQa57hmQGNIuQiipWWWrXhRRS5VNIFGMZRBIZ_v4LAlEw4BnslURDnhssonmKlImiB9AyktDJpIZcowwWnWLJiwDt-xSjDnnOZZb_-uT8gBsC6S0r6Mn57bh64xI0uwTWKd_3VlSnUC2Ct3Ani5xtGdvzLIHO-MrEQG5I3zzN_u8aPH3D04cHnqQ6NX4wpzkr83FHVWYUdMiopOhbKTDFLQV5SONYiqgS0O-tT0hj34HZd4Ch5tpE-Ym9KK5ZFzzXy40ERiOm8kvRe4bFg5Viz5y9wCKlWcYExFLBrIi4NsG7FYNrY_ANgw_3O5owWPH9UboJQEl4WKyQoF-pH9oIhoZgCJuUqwhPQukD_LhGgvcy03B3SDhDvn_--BPmD4-LD7fL_5Z0ns2YUV1gJVXZHPTen5BGECMTxKjMmsnmo8LkYQwPWL07qraX0zA2BGP4wA6BpChkFoZ49DwQmBQloyLEhqMB8owqGs9GMzE0k7I1CoWPTCuaa1hRU0aTypVYXImLrhjbR_oMG5kkAmthveV7rMxsi1I2VCVMX2QxbYGWn1B0sYefKQ4GjieyEIxmCFxIAzHdgMeCgecSpZduuPmahYUyPP-rLM_PkGea4T-N7Vkdo9e7_wo2IjB9QQawUPRFwLpQMQ0xExuuBcu7sKCZzHhIBQb1SQayLPBjLIMbMrJJMi2Ch_Ug0Wte5Lxs6XWYsh1Fko-z1YUeI6ZDiF-XwVt4jGOsrhPFV-eBzdl0B_aNELv8Wv-uj52ZsOzSSZ7nMMLOfGbqUCXQx7F4RBrbmT7ANDSm2eIe5kWEpXOpckwHkDEsCi2fy-ZZM6rCtK6FzrByt40BYiqfTGAl6AEnGW4Pt_1bZKkaiQtTP-sChxx0jkXo3qDD68pxxpffMpyVbcCrp2gbGJ2AcWsF6dfzqg1UK-pd_BPgt1cM65pqA34LwC_KERjVk7oFkLMVFce4vaIGBm3AawNnHMM2MGoDkxaAU_AITOqh1gLqwCaN0L-5OWCWGwfSMo1fNRHSUNoyNXP_msl_zRQKHMBLFh9vKTEXYvomClkUjru5VnLLpm98fxz0425oLjXTNyTwWd89czbflpN3wCZxUHsTf-iHbuXtRt6IkpZ3efE5Osflr3YO3ICFfuXse0M2oidjz1yd8GJHD1MfvAZj2QyG8rtvwb4NHNhAzwb6NnBoA0c2cGwDJxYQvz4W0KaI2BQRmyJiU0RsiohNEbEpIjZFpFbkdJ1E8ciZalWwrrNjakfNq_P5C5r2NPtFyl1lVbJIUmcaU5HjW7GPsEyXnOJ0Py358i8RvYpD)** (pako/zlib-compressed, verified to round-trip).

Regenerate whenever task metadata changes:

```bash
python3 -m project_management plan graph --output docs/diagrams/task-dependencies.md
```

## Legend

| Symbol | Meaning |
|---|---|
| `A --> B` (solid arrow) | B depends on A — B is **blocked by** A |
| `A -. related .- B` (dotted line) | A and B are **related** (soft link, not a dependency) |
| 🟢 green node | task **done** (marked ✓) |
| 🔵 blue node | **in progress** |
| ⬜ dashed-gray node | **todo** — not started |
| `(50% · 3/6 · doing)` | checkbox progress: 3 of 6 task boxes ticked, then the status |
| `(0/0 · todo)` | no checkboxes written yet — the checklist itself is still to be made |

Nodes are grouped into **Gate** subgraphs when tagged (`gate:1-decisions` …
`gate:5-delivery`). Tick `- [x]` boxes in the draft task files as the work
happens, then regenerate this diagram to update the percentages.

```mermaid
flowchart TD
    %% Solid arrow A --> B: B depends on A (blocked by A)
    %% Dotted line A -. related .- B: A and B are related
    %% Colors: green done · blue in progress · dashed gray todo (not started)
    subgraph decisions["Gate 1-Decisions"]
    T01["01 Ship-Path Decision & Housekeeping (8% · 1/12 · todo)"]
    T02["02 Lighthouse Baseline Harness (17% · 2/12 · todo)"]
    end
    subgraph scaffold["Gate 2-Scaffold"]
    T03["03 Hosting Rewrite, 404s & Headers (8% · 1/12 · todo)"]
    T04["04 Preview Channel for Audits (10% · 1/10 · todo)"]
    T05["05 Image Pipeline & Hero LCP (12% · 2/16 · todo)"]
    T06["06 Third-Party JS & Font Hygiene — BLOCKED (8% · 1/12 · todo)"]
    end
    subgraph features["Gate 3-Features"]
    T07["07 Heading Order & Landmarks (10% · 1/10 · todo)"]
    T08["08 Keyboard-Accessible Product Tabs (7% · 1/14 · todo)"]
    T09["09 Colour Contrast Pass (9% · 1/11 · todo)"]
    T10["10 Nav Toggle, Skip Link & Targets (9% · 1/11 · todo)"]
    T11["11 Markup Validity Cleanup (10% · 1/10 · todo)"]
    T12["12 Console Clean & Security Headers (8% · 1/12 · todo)"]
    end
    subgraph integration["Gate 4-Integration"]
    T13["13 Crawl Surface, Titles, Canonical & Robots (18% · 3/17 · todo)"]
    T14["14 LocalBusiness Schema & NAP (8% · 1/12 · todo)"]
    T15["15 Product & Offer Schema (8% · 1/13 · todo)"]
    T16["16 llms.txt for Agents (9% · 1/11 · todo)"]
    end
    subgraph delivery["Gate 5-Delivery"]
    T17["17 Lighthouse CI Budget (9% · 1/11 · todo)"]
    T18["18 Cutover & Search Console (6% · 1/16 · todo)"]
    T19["19 Playwright E2E & Accessibility Suite (0% · 0/19 · todo)"]
    end
    T01 --> T03
    T01 --> T04
    T03 --> T04
    T07 --> T08
    T03 --> T12
    T06 --> T12
    T03 --> T13
    T05 --> T15
    T03 --> T16
    T14 --> T16
    T15 --> T16
    T02 --> T17
    T04 --> T17
    T12 --> T17
    T05 --> T18
    T12 --> T18
    T13 --> T18
    T14 --> T18
    T15 --> T18
    T16 --> T18
    T17 --> T18
    T19 --> T18
    T08 --> T19
    T09 --> T19
    T12 --> T19
    T05 -. related .- T06
    T07 -. related .- T08
    T07 -. related .- T11
    T13 -. related .- T16
    T14 -. related .- T16
    T15 -. related .- T16
    classDef done fill:#dcedc8,stroke:#558b2f,color:#1b5e20
    classDef doing fill:#dbe9fb,stroke:#1565c0,color:#0d47a1
    classDef todo fill:#ffffff,stroke:#b0bec5,color:#546e7a,stroke-dasharray:5 4
    class T01 todo;
    class T02 todo;
    class T03 todo;
    class T04 todo;
    class T05 todo;
    class T06 todo;
    class T07 todo;
    class T08 todo;
    class T09 todo;
    class T10 todo;
    class T11 todo;
    class T12 todo;
    class T13 todo;
    class T14 todo;
    class T15 todo;
    class T16 todo;
    class T17 todo;
    class T18 todo;
    class T19 todo;
```
