# Task Dependency Graph

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqFVttu4zYQ_ZWBgiyygJ0VZcm3AgUcZ7dJm-4aa6MPbfpASZREmBYNkoprLPYr-tr_6Hs_pV_SoWypCqO0frF9Zs5wLocjffESmTJv7mVCHpKCKgOb28cS8HN5CWspeApUKXmABQyH38LNHG4gZXtWphpkiehVLGSyZSnER1i8bam30hgEBS-ZpV6DYoJa5HpogyyAlimGooo1lpa6lEIqPYdcMVZCKjHCX39CLCoGvIS9kmjQ2mIp1QWGzBU9gpGphKtSGtAGy2DpORddxWjfF5h1wjWXpf7l0fsODwQyvG2gR-_Xk_fGJ2j2CawLvh-uqCmgcYI3cCcrzbaM7XmZw99__N6hBZYWwAPPC1NYN7ihmtXl31FV2oS7BOyfk55OaJZJkTbZBcP1GemcMrKnjDAPbWwKn9lBccMGEPqhtvkxmjKlndRCSwphpdgTZwdYFrQsmYBMKlhUKTcargL_0vYzeEd8-217-bYTIbIRIrjf0ZzBiu9PddnzlISH5co5cGzdx7ApuEqxh8oc4fs1un-QpYG7Y84Zsv-7GxmjpsIxN90YDT-ckc45E3vOpK7aduOTwuLxmAeU1o6qrduHqXWfwg_sGEuKmS2SBMfCY4E1KZlWCWqfxi5rZlmzWpSVwq_SKKoNrKgz0Q3x0RP795E-wUbmucC5rLd8j5oot5jWhqqcGZdk5UYI_Ij5Vnv4ieKF49ivpWC0ROC5sxUZCWwSWmLWtRNGXrOkUpbVN_-XveWlYfjLoKab9obD-3_BzoFWb2QES0UPAtaVymiCVW24EUwPYElLWfKECszhs4zli-Ks8kgIDxJ9birN62uwTgq2o0j5uHCEQ6zOSNRO4w18yjIc6Znx3NeKjIxBiJ2-Nr-Zk5xzVpr_Kz9F9T4xdWxqj3ANnJBOdCstMule5-U93FQpThCuZqS-LcR_h5Oza0ii_Dr3hVilkSksKyOfakmuGVVJ0Q7uigTNfRv33DdiNUdmsBL0iBccU4D3wXsM0yiWCzvtdYV3v79YXGP1usaN4QJhu0tcYHIGpo4HCdqL7QKNR3tKdAYi12PcasIFIgfALXoCJu0CcwDywqOJMXU9WmDkAqELvIgxdoGJC8wcALfLCZi128MB2sRmndSfPRyxy52BOKbpqyZCOpU6pm7vXzNFr5kSgZvulmWnB3HGhZhfpAlLk-lAGyW3bH4RRdM4yAaJfW7PL0gcscB_QbYb-syO2SyLWzaJxlHiN2w_DSeUOOz62X4iZ_WnJcd-zJKoIUfhmE3o2Ti0bwf47kKP8wjCTsT6MthqvnkOBn3gqA8M64wcMOrzHPeBkz5w2gfOekB8xPSAfRWRvopIX0WojB6wryLSVxGZnAbsoNOeNpG2JG_g5Yqn3tyoig28HVM7av96X76iaU_Ln6XcNVYlq7zw5hkVGv9V-xR1esspbvSzy9d_AMt4PPk)** (pako/zlib-compressed, verified to round-trip).

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
    T01["01 Ship-Path Decision & Housekeeping ✓"]
    T02["02 Lighthouse Baseline Harness ✓"]
    end
    subgraph scaffold["Gate 2-Scaffold"]
    T03["03 Hosting Rewrite, 404s & Headers ✓"]
    T04["04 Preview Channel for Audits (20% · 2/10 · todo)"]
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
    T13["13 Crawl Surface, Titles, Canonical & Robots ✓"]
    T14["14 LocalBusiness Schema & NAP ✓"]
    T15["15 Product & Offer Schema ✓"]
    T16["16 llms.txt for Agents ✓"]
    end
    subgraph delivery["Gate 5-Delivery"]
    T17["17 Lighthouse CI Budget (91% · 10/11 · doing)"]
    T18["18 Cutover & Search Console (12% · 2/16 · todo)"]
    T19["19 Playwright E2E & Accessibility Suite ✓"]
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
    class T01 done;
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
    class T13 done;
    class T14 done;
    class T15 done;
    class T16 done;
    class T17 doing;
    class T18 todo;
    class T19 done;
```
