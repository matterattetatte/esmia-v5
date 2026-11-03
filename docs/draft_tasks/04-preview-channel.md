# Task: Preview Channel for Audits

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-07
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:chore, area:devops, required, gate:2-scaffold
- **Dependencies:** 01-ship-path-decision.md, 03-hosting-rewrite-404s-headers.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 3h
- **Plan IDs:** D1.4

## Requirements

- A deployable preview URL that serves this build from the real CDN, without touching `esmia.se`
- Preview must include the production headers from task 03 so audits measure the real configuration
- Preview should be disposable and re-creatable on demand
- Production must stay on the SPA until task 18

## User Stories

- **US-01:** As an engineer, I want a real-CDN URL so that my Lighthouse numbers are not localhost fiction.
- **US-02:** As the CTO, I want to audit headers and status codes in production conditions before switching the domain.

## Design

```bash
npm run build
firebase hosting:channel:deploy lh-audit --expires 7d
```

The channel URL (`https://esmia--lh-audit-<hash>.web.app`) is the audit target for tasks 17 and 18.

## Tasks

- [ ] Create the preview channel
- [ ] Confirm headers match production configuration
- [ ] Confirm `robots.txt` is served correctly on the channel
- [ ] Record the channel Lighthouse baseline
- [ ] Document the command in README

## Done Criteria

- [ ] Preview URL serves this build
- [ ] Header checks from task 03 pass on the preview URL
- [ ] Audits on preview are the numbers quoted in the plan
- [ ] `esmia.se` still serves the SPA

## Notes

- Preview channels are public URLs; do not put anything confidential behind one
- Preview is per-environment, so preview and production config divergence is possible and must be checked

## Questions to Resolve

- [x] Should preview deploys happen on every PR, or only on demand? → **Every PR**, because the Lighthouse job asserts against it. (2026-11-03)
