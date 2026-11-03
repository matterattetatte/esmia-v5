# Task Dependency Graph

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNp9Vt1u2zYUfpUDBylcwE5EW7IkDxjgOO2SLW2N2tjFll1QEiURpkWDopIZRZ9it32P3e9R9iQ7lC1NoZX6xvZ3znf--PFIXwaxTNhgPkiFfI5zqjRsbh8LwM_lJayl4AlQpeQzLGA8_hFu5nADCduzIilBFogOIyHjLUsgOsDibUu9lVojKHjBDPUKFBPUIFdjE2QBtEgwFFWssbTUpRRSlXPIFGMFJBIj_PM3RKJiwAvYK4mGsjRYQsscQ2aKHkDLRMKwkBpKjW2w5FRLWUVo3-dYdcxLLovy98fBT5gQyPi2gR4Hfxy9Nw5Bs0NgnfP9eEV1Do0TvIE7WZVsy9ieFxkMw8mlKYKQazKpq5EIv-2EmphQE3jgWa5zQ4UbWrJ6JHdUFaaJf7_91RJwplbJZUzTVIqkqXgyXp-QTpapyTLF2kptyvrMnhXXbASu45amZkYTpl5m2jiuIbmwUuyJs2dY5rQomIBUKlhUCdclDIlzbO-aOObbzLfbnGcieHC_oxmDFd8f-zL5lISH5cpKODPuM9jkXCU4V6UP8PMa3d_LQsPdIeMM2d-fRsqorvDom2lMx-9PSCePb_L4dddmGp8UNo9pHlBuO6q29hwC4x7AL-wQSYqVLeIYj4VHAntSMqlivA80slmhYYW1UCuFX4VWtNSwotaJboiDnji_j_QJNjLLBJ7Lesv3qIlii2VtqMqYtklGgoTAB6y32sOvFC8hx3ktBaMFAi-djchQf1hEKbHq2gkjr1lcKcPqO__z2fJCM_ylUefNeN3x_f9gJ6HRG5nCUtFnAetKpTTGrjZcC1aOYEkLWfCYCqzhs4xkraSgVtL0mvg9SiJGi8SFB4msm6rk9cVYxznbUQzycbHCCH4dYXK6aXYEo0XitSf2Bj6lKR77KcYwaIQ87SMbZZIZCLErr_Sf-ngHMlaYysOGSc6Z50NM8A48MXVoJujhgjkinXRGoDiHzlJY3sNNlaAOvp9vQ4xYSQDLSsunWtVrRlWct2c_nDX0WR_dqJaEsBL0gCsC08O7yTuM0mieC6OXdYXbA4bHy-9cI-H1znFb1k8FXEI24LbryQb8ExBYHmTS7gobaDzaLN4J8GyPWSsqG_AsABfzEfDbnWgB5MyjiRHYHi0wtQHXBs5izGzAt4HQAnBhHYGwXUgW0BYWdkp_8QzGKXcOxDIFr5oI6XRqmbqzf83kvWaKBS7PW5Yen_cpF2J-kcQsiYNRqZXcsvmF5wXRJB3F5vVgfkEij02cM7JZ-id2xMI0atnEm3mx07CdxPUpsdj1K8SRnNaflhw5EYu9huy5M-bTk3FsXkLwFYke5h64nYj1ZagL-uElOql7tMBpH-jWJVmg1-c56wP9PjDoA8MeEB9bPSDpA_s6QoGcF0_6OkJR9ICzPtDvA4M-MGzAwWiQKZ4M5lpVbDTYMbWj5u_gy1c07Wnxm5S7xqpkleWDeUpFif-qfYI6veUU1_vJ5et_fb5YxA)** (pako/zlib-compressed, verified to round-trip).

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
    T02["02 Lighthouse Baseline Harness ✓"]
    end
    subgraph scaffold["Gate 2-Scaffold"]
    T03["03 Hosting Rewrite, 404s & Headers ✓"]
    T04["04 Preview Channel for Audits (10% · 1/10 · todo)"]
    T05["05 Image Pipeline & Hero LCP ✓"]
    T06["06 Third-Party JS & Font Hygiene ✓"]
    end
    subgraph features["Gate 3-Features"]
    T07["07 Heading Order & Landmarks ✓"]
    T08["08 Keyboard-Accessible Product Tabs ✓"]
    T09["09 Colour Contrast Pass ✓"]
    T10["10 Nav Toggle, Skip Link & Targets ✓"]
    T11["11 Markup Validity Cleanup ✓"]
    T12["12 Console Clean & Security Headers ✓"]
    end
    subgraph integration["Gate 4-Integration"]
    T13["13 Crawl Surface, Titles, Canonical & Robots (18% · 3/17 · todo)"]
    T14["14 LocalBusiness Schema & NAP (17% · 2/12 · todo)"]
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
    class T02 done;
    class T03 done;
    class T04 todo;
    class T05 done;
    class T06 done;
    class T07 done;
    class T08 done;
    class T09 done;
    class T10 done;
    class T11 done;
    class T12 done;
    class T13 todo;
    class T14 todo;
    class T15 todo;
    class T16 todo;
    class T17 todo;
    class T18 todo;
    class T19 todo;
```
