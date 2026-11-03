# Task Dependency Graph

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqVVtuO2zYQ_ZWBFhs4gL1rypJvBQr4sulusskasdGHdvtASZREmBYNitqtEQToP6SP_Y--91PyJR1KlqLI2hr1i6wznMM5w5kRP1m-DJg1tUIhn_2YKg2b5WMC-Lu8hLUUPACqlHyGGfR6P8J8CnMI2J4lQQoyQbTjCelvWQDeAWavK9el1BpBwRNmXK9AMUENctUzJDOgSYBUVLHSUrkupJAqnUKkGEsgkMjwz9_giYwBT2CvJBrS1GABTWOkjBQ9gJaBhE4iNaQaZbDgGEuaeWjfxxi1z1Muk_TXR-sn3BBIb1lCj9ZvxepNn6C5T2Ad831vRXUM5SJ4BbcyS9mWsT1PIuhM7EsTBCHXxM6jkQi_rlHZhsqGex7FOjauMKcpy1NyS1ViRJwjwTw3ZKQ-DUMpglKF3VsfkdrOA7PzAONNtQn1I3tWXLMuOH0nNToYDZhK4etfX2pOjnFyYKXYE2fPsIhpkjABoVQwywKuMVrSL6K9Jn3zNDmvC3YNgwt3OxoxWPF9odXspyTcL1ZIUMi1r8mwjWBoCIawibkKMPtKH-DtGgneyETD7SHiDPm-_vEnzO8fFu9ultAZlwHZp3ynyQsZ1RlWT5m8Qe_NEakFMTJBjPIkmeQ9KMwVxnCPFbujans-DWNDMIZ37OBJikJmvo9nzT2BSVEyyHxsMuohz6ikcdpoJoZmkrdDpvCRaEVTDSua103pSlpcSR9dMbYP9Ak2MooEHv16y_dYiskWpWyoipg-y2JaAS3vUXS2h58pDgOOJ7IQjCYInEkDMeWPx4KBpxKl5264-Zr5mTI8ZRX-zzPkiWb4T2NLlsfo9O6-gbUITBuQASwUfRawzlRIfczEhmvB0i4saCIT7lOBQX2UnswLvIhlcE1GbZJMi-Bh3Uv0mmcpz3t47cdsR5Hkw2z132I2xHQIcasyeAUPYYjVdaT45jxoczbdgX0jxC690r_rojMjlpw7ydMcBtiZT0wdygS6OAoLpLad6QNMQ218Le5gngVYOucqx3QAGcMi0_Ipb541o8qPq1roDEv3tjFATOWTCawEPeDgwu3hxr5BlrKRuDD1s85wpkGnKML-NTq8rBznev79wtHYBJxqaDaB0REYN1YQu5pXTaBcUe3iHgG3uWJY1VQTcBsAfkIKYFRN6gZATlaUHOPmigoYNAGnCZxwDJvAqAlMGgBOwQKYVEOtAVSBTWqhf3dbwCzXDqRhGr9oIqSmtGGq5_4lk_uSyRc4gJcsLG4mIRdiehH4LPDH3VQruWXTC9cde3bY9c1FZnpBPJfZ_RNn8205entsEnqVN3GHrt8vvfuBM6Kk4Z1fdgrnMP9Vzl7fY75bOrvOkI3o0dgz1yW8zNHD1AWnxpg3Qx7QD9-jdis6yJU3QCePqQG6beCwDRy1geM2cNIC4venBSRtoN0GDtrANkWkTRFpU0TaFJE2RaRSZHWtSPHAmmqVsa61Y2pHzav16TOa9jT5RcpdaVUyi2JrGlKR4lu2D7BQl5zifD8u-fwvZZGHrg)** (pako/zlib-compressed, verified to round-trip).

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
    T01["01 Ship-Path Decision & Housekeeping (92% · 11/12 · doing)"]
    T02["02 Lighthouse Baseline Harness (92% · 11/12 · doing)"]
    end
    subgraph scaffold["Gate 2-Scaffold"]
    T03["03 Hosting Rewrite, 404s & Headers ✓"]
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
    class T01 doing;
    class T02 doing;
    class T03 done;
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
