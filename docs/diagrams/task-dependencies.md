# Task Dependency Graph

_Auto-generated from the draft tasks in `docs/draft_tasks/`. Do not edit by hand._

Open in **[Mermaid Live](https://mermaid.live/edit#pako:eNqFVttu4zYQ_ZWBFllkATsRZcm3AgUcZ7dJm-4aa6MPbfpASZREmBYNkkpqLPYr-tr_6Hs_pV_SoWypCq20frF9Zs5wLocjffESmTJv7mVCPicFVQY2t48l4OfiAtZS8BSoUvIZFjAcfgs3c7iBlO1ZmWqQJaKXsZDJlqUQH2DxrqXeSmMQFLxklnoFiglqkauhDbIAWqYYiirWWFrqUgqp9BxyxVgJqcQIf_0JsagY8BL2SqJBa4ulVBcYMlf0AEamEi5LaUAbLIOlp1x0FaN9X2DWCddclvqXR-87PBDI8LaBHr1fj94bn6DZJ7Au-H64oqaAxgnewp2sNNsytudlDpez4MImQcg1CepsJMLvOqECGyqAB54XprBUuKGa1S25o6q0Rfz9x-8tAXvqpKwTmmVSpE3GwXB9QjqnjOwpI8xNG5vWZ_asuGEDCP1Q25wZTZl6edLGDy0phJViT5w9w7KgZckEZFLBokq50XAZ-HV5wTXx7bftb7e4yEaI4H5HcwYrvj_WZc9TEh6WK-fAsXUfw6bgKsW-KnOA79fo_kGWBu4OOWfI_u9uZIyaCkffdGM0_HBCOudM7DmTumrbjU8Ki8djHlBuO6q2bh-m1n0KP7BDLClmtkgSHAuPBdakZFoleB9o7LJmljWrhVop_CqNotrAijoT3RAfPbF_H-kTbGSeC5zLesv3qIlyi2ltqMqZcUlWgoTAj5hvtYefKF5Cjv1aCkZLBF46W5Gh_jAJLTHr2gkjr1lSKcvqm_95b3lpGP4yqPOmveHw_l-wc6DVGxnBUtFnAetKZTTBqjbcCKYHsKSlLHlCBebwWcbyrDirPBLCg0Sfm0rz-hqsk4LtKFI-LhzhEKszErXTeAufsgxHemK89LUiI2MQYqevzG_mKOecleb_yk9RvU9MHZraI1wNR6QT3UqLTLrXeXkPN1WKE8RlQI7LwL_GyfUsA2KVRqawrIx8qiW5ZlQlRTu4y_ExwDUWcH7diJUcmcFK0APeb8wA3gfvMUojWC7ssNcVXv3-WnGz1RscF4YLhO0qcYHJCZg6HiRo77ULNB7tKdEJiFyPcSsJF4gcAJfoEZi0-8sByJlHE2PqerTAyAVCFziLMXaBiQvMHACXyxGYtcvDAdrEZp3UXzwvscudgTim6asmQjqVOqZu718zRa-ZEoGL7pZlx2dzxoWYv0kTlibTgTZKbtn8TRRN4yAbJPZRPn9D4ogF_hnZLugTO2azLG7ZJBpHid-w_TScUOKw68f9kZzVn5Yc-zFLooYchWM2oSfj0L4w4OsMPcwjCDsR68tQJ_TNSzSoa3TAUR8Y1ik5YNTnOe4DJ33gtA-c9YD4iOkBSR_YVxHpqwil0QP2VUT6KiKTvobiBjxvE2lL8gZernjqzY2q2MDbMbWj9q_35Sua9rT8WcpdY1WyygtvnlGh8V-1T1Got5ziRj-5fP0HJD1CfQ)** (pako/zlib-compressed, verified to round-trip).

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
    T18["18 Cutover & Search Console (6% · 1/16 · todo)"]
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
    class T17 doing;
    class T18 todo;
    class T19 done;
```
