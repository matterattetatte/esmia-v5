# Task: Lighthouse CI Budget

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-24
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:testing, area:devops, required, gate:5-delivery
- **Dependencies:** 02-lighthouse-baseline-harness.md, 04-preview-channel.md, 12-console-clean-and-security-headers.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 5h
- **Plan IDs:** V2, V3, V4

## Requirements

- All four categories asserted at 1.0 on mobile
- The assertion runs against the preview URL, not localhost
- A regression fails the pull request
- The scorecard is published per run
- Budget covers page weight as a secondary guard

## User Stories

- **US-01:** As the CTO, I want the target enforced mechanically so that it does not decay.
- **US-02:** As a reviewer, I want a failing PR to tell me which audit regressed.
- **US-03:** As the owner, I want a visible scorecard.

## Design

### Configuration

```json
{
  "ci": {
    "collect": { "url": ["<preview>/", "<preview>/products/"], "numberOfRuns": 3 },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 1 }],
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:best-practices": ["error", { "minScore": 1 }],
        "categories:seo": ["error", { "minScore": 1 }]
      }
    }
  }
}
```

`numberOfRuns: 3` with median aggregation, because a single run is noisy enough to produce false failures.

### Reality check

Performance at 1.0 is achievable but the least stable of the four. If it flakes, narrow the measured pages rather than lowering the threshold, and record the decision here.

## Tasks

- [ ] Add `lighthouserc.json`
- [ ] Run `lhci collect`/`assert` against the preview URL
- [ ] Wire it into a workflow triggered on pull requests
- [ ] Publish the scorecard artefact
- [ ] Verify a deliberately broken build fails the job
- [ ] Document how to reproduce a failure locally

## Done Criteria

- [ ] A PR with a regression fails CI
- [ ] A clean PR passes with 100/100/100/100
- [ ] Scorecard artefact is linked from the run
- [ ] Flake rate over ten runs is zero or explained

## Notes

- Assert on the real CDN URL; localhost audits are optimistic and will let regressions through
- Assertions should fail on the category, not on individual audit ids, unless chasing a specific regression

## Questions to Resolve

- [x] Full 1.0 on performance, or 0.95 with a tracking task for the gap? → **Hard 1.0, median of 3 runs.** If it flakes, fix the page rather than the threshold. (2026-11-03)
