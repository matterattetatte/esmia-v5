# Task Dependency Graph

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqNVu-O4jYQf5URqz1xEuzGkBCgUiX-7HX3bnuLDtQP7faDkziJhYmR4yxFp5P6EH2Xfu-j9Ek6DiTHBe9RvoT8xvPz_MYzE39uhTJirXErFnIXplRpWM2fM8Df9TUspeARUKXkDibQ7f4I0zFMIWJblkU5yAzRdiBkuGYRBHuYvK1d51JrBAXPmHG9AcUENchN15BMgGYRUlHFKkvtOpNCqnwMiWIsg0giwz9_QyAKBjyDrZJoyHODRTRPkTJRdA9aRhLamdSQa5TBomMseRGgfZti1CHPuczy355bP-GGQLrzCnpu_X5YvXIImh0Cy5RvuwuqU6gWwRu4l0XO1oxteZZAe3htYiC3pGeeZv-3Jzw9w9ODR56kOjV-MKU5K_NxT1VmFLSJX1L0rBSY4oaCPKRxLEVUCeh1l0fkZN--2bePoebaRPmJ7RTXrAOu4-ZGAqMRU_ml6F3D4sJCsRfOdjBLaZYxAbFUMCkirk3wTsXg2Bg8w-DBw4YmDBZ8e5BuAlASHmcLJOhV6gc2goEhGMAq5SrCk1B6D--XSPBOZhru9wlnyPfvn3_B9PFp9uFu_n1J59mMGdUFVlKVzX733RE5CcI3Qfhl1kw2nxQmD2N4xOrdULU2aSDHXUc2EUPjP4QPbB9IijomYYgnzwOBOVEyKkLsNxogjV_F7tpoRoZmVHZGofCRaUVzDQtqqmhUuRKLK3HQFU_oI32BlUwSgaWwXPMtFma2RiUrqhKmL7KYrkDLz6i52MIvFOcCxwOZCUYzBC4UAzHNgKeCgecSpZduuPmShYUyPP-rKs-PkGea4T-N3Vmdott9-AqeRGDagvRhpuhOwLJQMQ0xEyuuBcs7MKOZzHhIBQb1SQayrO9DLP1b4tskmQ7Bw3qU6DUtcl529DJM2YYiycfJ4kKLEdMgxKvL4A08xTEW15Hiq3Pf5myaA9tGiE1-o__Qh8ZMWHbpJM9zGGFjvjC1rxLo4VQ8ICfbmTbANJwMs9kDTIsIS-dS5ZgOIEOYFVq-lL2zZFSFaV0L7UHlbpsCxFQ-GcFC0D0OMtwe7np3yFI1EhemfpYFzjhoH4rQuSWj7yjHEV9-ynBUNgG3HqJNwD8Cw8YK0qvHVROoVtS7eEfAa64Y1DXVBLwGgB-UA-DXg7oBkLMVFcewuaIG-k3AbQJnHIMm4DeBUQPAKXgARvVQawB1YKOT0L-5OGCWTw6kYRq-aiLkRGnDdJr710zea6ZQ4ACes_hwSYm5EOOrKGRROOzkWsk1G1953jDoxZ3Q3GnGVyTwWM85czaflqN3wEZxUHsTb-CFTuXtRK5PScO7vPccnOPyVzsHTsBCr3L23AHz6dHYNTcnvNfR_dgD94SxbAZD-cO3YM8G9m2gawM9Gziwgb4NHNrAkQXEr48FtCkiNkXEpojYFBGbImJTRGyKiE0RqRW1Oq1E8ag11qpgndaGqQ01r63PX9C0pdmvUm4qq5JFkrbGMRU5vhXbCMt0zilO9-OSL_8BtueKHA)** (pako/zlib-compressed, verified to round-trip).

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
    T07["07 Heading Order & Landmarks (11% · 1/9 · todo)"]
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
