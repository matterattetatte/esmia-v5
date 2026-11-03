# Task Dependency Graph

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqVVttu4zYQ_ZWBgiyygJ2KtmQ7LlDAcbBNtumusTb60KYPlEhJhGXSIKmkxmK_q-_9sg5tS6vITNL6xfYZnjMXzoz0NUgV48E0yEr1lBZUW1jdPEjAz_k5LFUpGFCt1RPMoN__Ca6ncA2Mb7lkBpRE9CIpVbrmDJIdzN431BtlLYKlkNxRL0Hzkjrksu9EZkAlQymqeW1pqHNVKm2mkGvOJTCFCv_8DUlZcRAStlqhwRiHMWoKlMw13YFVTMGFVBaMxTQ4O8ZiqgTt2wKjToURSpo_HoKf0SGQ_k0NPQR_Hk6vQoLmkMCyENv-gtoC6kPwDm5VZfia862QOVyE5y6G8AcycN_O__uWzsDpDOBe5IUtHA-uqeH7etxSLV0GrypghTsJmJRmmSpZHf-gvzwiLbdD53aIkRrrgvzCn7SwvAdRGBmXAaeMa_NW8JFTiWCh-aPgTzAvqJS8hExpmFVM2LZA6BOInUAMdxuac1iI7SFx518ruJ8vWvyRjz9y_BGsCqEZXoO2O_i4RP4HJS3c7nLBUe5_1i_j1FbYOnX9hv0PR6TleOwcj_d1cvX7rLFc6Pce23VD9bqV-JUv7omjT-AXvksUxdBnaYo3LZISq6AVq1KcL5q0yxf5ZK6czNV-EiqNX9Jqaiws6LOuIR4qCZGKd_KJPsJK5XmJd79ciy02olxjIiuqc27fVHFTgJZfMeVqC79R3AMC72BecioReP32iet9vBOM2yjMfM9C30ueVtrJ_KcuPL1AIS3HXxaHsb7DqH_3HWxF4MaADGGu6VMJy0pnNMVCrIQtuenBnEolRUpLDOqLStSzeox9GbmBwKu6V0i6rozYz-8yLfiGosan2eKNiSJuIEjcNME7-Jxl2FlHie_koY_spgHnpCw35tL-ZQ9zmHP51j2elpDhID5yvavrF-MOPCAtd24GsAyt1TW_g-uKYeO81Teu_8kE5pVVj_vBWXKq06JphVfHvgkXt_D-aYPrrAtEzaLrAuMjMOmcIINmqXSB-kTjJT4CcffEqGmELhB3ANz5B2DcLNMOQE5O1BqT7okGGHaBqAucaIy6wLgDOLfPnstYoVYxO6bJiyZCWlF2TO26vWSKXzKlJe67G54d3gEyUZbTM5Zylk56xmq15tOzOJ4kg6yXuleG6RlJYj4IT8hukR_ZCb_KkoZN4lGchjU7ZNGYkg57_1pxIGf7T0NOwoSncU2OoxEf06Ox715M8LWJ7qYxRC3FfSM7yR-fgwMfOPSBkQ-MfeDIB4594MQHXnlA3PYe0JcR8WVEfBkRX0bElxHxZUR8GZEmo6AX5FqwYGp1xXvBhusNdX-Dr9_QtKXyd6U2tVWrKi-CaUZLg_-qLcOOvBEUN-fxyLd_AV0KV6s)** (pako/zlib-compressed, verified to round-trip).

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
    T01["01 Ship-Path Decision & Housekeeping (0% · 0/12 · todo)"]
    T02["02 Lighthouse Baseline Harness (0% · 0/12 · todo)"]
    end
    subgraph scaffold["Gate 2-Scaffold"]
    T03["03 Hosting Rewrite, 404s & Headers (0% · 0/12 · todo)"]
    T04["04 Preview Channel for Audits (0% · 0/10 · todo)"]
    T05["05 Image Pipeline & Hero LCP (0% · 0/16 · todo)"]
    T06["06 Third-Party JS & Font Hygiene (0% · 0/12 · todo)"]
    end
    subgraph features["Gate 3-Features"]
    T07["07 Heading Order & Landmarks (0% · 0/9 · todo)"]
    T08["08 Keyboard-Accessible Product Tabs (0% · 0/14 · todo)"]
    T09["09 Colour Contrast Pass (0% · 0/11 · todo)"]
    T10["10 Nav Toggle, Skip Link & Targets (0% · 0/11 · todo)"]
    T11["11 Markup Validity Cleanup (0% · 0/10 · todo)"]
    T12["12 Console Clean & Security Headers (0% · 0/12 · todo)"]
    end
    subgraph integration["Gate 4-Integration"]
    T13["13 Crawl Surface, Titles, Canonical & Robots (0% · 0/17 · todo)"]
    T14["14 LocalBusiness Schema & NAP (0% · 0/12 · todo)"]
    T15["15 Product & Offer Schema (0% · 0/13 · todo)"]
    T16["16 llms.txt for Agents (0% · 0/11 · todo)"]
    end
    subgraph delivery["Gate 5-Delivery"]
    T17["17 Lighthouse CI Budget (0% · 0/11 · todo)"]
    T18["18 Cutover & Search Console (0% · 0/16 · todo)"]
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
```
