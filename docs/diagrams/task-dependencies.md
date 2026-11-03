# Task Dependency Graph

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqFVs1u20YQfpUBDQcKINlcidRfgQKynNRunUSIhB5a97Akl-RCK66wu7QrBHmKXvMevfdR-iSdpUSWXtGtLpK-mW_-Z8gvXiwT5s29VMjnOKfKwOb2sQD8XF7CWgqeAFVKPsMCBoPv4WYON5CwPSsSDbJAtBcJGW9ZAtEBFm8b6q00BkHBC2apV6CYoBa5GlgjC6BFgqaoYrWkoS6lkErPIVOMFZBItPDXnxCJkgEvYK8kCrS2WEJ1jiYzRQ9gZCKhV0gD2mAaLDnFossI5fsco4655rLQvz56P6BDIIPbGnr0fjtqb3yCYp_AOuf7wYqaHGoleAN3stRsy9ieFxn0ZsNLGwQh12RYRSMRftsyNbSmhvDAs9zklgo3VLOqJHdUFTaJv7_90RCwpk7IOqZpKkVSRzwcrE9Iy8vIehlhbNrYsD6zZ8UN60PgB9rGzGjC1EtPGz-wpABWij1x9gzLnBYFE5BKBYsy4UZDj_jH9K6Jb79tfdvJhdZCCPc7mjFY8f0xL-tPSXhYrhyHY6s-hk3OVYJ1VeYAP65R_b0sDNwdMs6Q_d_VSBk1Jba-rsZo8P6EtPxMrJ9JlbWtxieFyaObBxy3HVVbtw5Tqz6Fn9ghkhQjW8QxtoVHAnNSMilj3AcauayZZc2qQS0VfhVGUW1gRZ2OboiPmli_j_QJNjLLBPZlveV7nIlii2FtqMqYcUl2BAmBDxhvuYefKS4hx3otBaMFAi-V7ZDh_GEQWmLUlRJaXrO4VJbV1f_z2vLCMPxlcM7r8gaD-3_BlkM7b2QES0WfBaxLldIYs9pwI5juw5IWsuAxFRjDZxnJs-Ts5JEAHiTq3JSaV2uwjnO2o0j5uHAGh9g5I2HTjTfwKU2xpSfGS107ZGQMQuz0lfndHMc5Y4X5v_QTnN4npg517iGehiPSsm5Hi0za67y8h5sywQ7iMaiXhXQsC7FjRqawLI18quZxzaiK86ZrvXFNH3fR7byRGawEPeByo3t4N3yHVupp5cJ2el3i3kPvuLb-NRLOTDWZ452r7jmeDxcImsPiApMTMHU0yLDZcheoNRov4QkIXY1xMyAuEDoAntQjMGmumQOQM43axtTVaICRCwQucGZj7AITF5g5AJ6aIzBrTokDNIHNWqG_eHpilVsNcUTTV0WEtDJ1RO3avyYKXxPFAs_eLUuPT-qUCzG_SGKWxNO-Nkpu2fwiDKfRMO3H9sE-vyBRyIb-Gdme6xM7YrM0atgkHIexX7P9JJhQ4rCrh_-RnFafhhz5EYvDmhwGYzahJ-HAvj7gyw09zEMIWharZagC-u4lOqxydMBRFxhUITlg2KU57gInXeC0C5x1gPjA6QBJF9iVEenKCEejA-zKiHRlhKtxXhC8iB3grAa9vpcpnnhzo0rW93ZM7aj96335iqI9LX6RcldLlSyz3JunVGj8V-4TnNNbTvG8n1S-_gOfNUX6)** (pako/zlib-compressed, verified to round-trip).

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
    T13["13 Crawl Surface, Titles, Canonical & Robots ✓"]
    T14["14 LocalBusiness Schema & NAP ✓"]
    T15["15 Product & Offer Schema ✓"]
    T16["16 llms.txt for Agents ✓"]
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
    class T13 done;
    class T14 done;
    class T15 done;
    class T16 done;
    class T17 todo;
    class T18 todo;
    class T19 todo;
```
