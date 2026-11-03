# Task: Ship-Path Decision & Housekeeping

## Metadata
- **Priority:** P0 - Critical
- **Deadline:** 2026-11-04
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:architecture, area:devops, required, gate:1-decisions
- **Dependencies:** None
- **GitHub Issue:** _not created_
- **Estimated Effort:** 3h
- **Plan IDs:** D1.1, D1.3

## Requirements

- One deploy target must be chosen from the three configs currently in the repo (`firebase.json`, `netlify.toml`, `vercel.json`) and the other two deleted
- The live domain `esmia.se` currently serves the old React SPA, not this build — the cutover path must be documented before any code changes
- The old SPA must remain recoverable in one command
- Old client-side routes (`/home`, `/contact`, `/about`, `/products`) must map onto the new static routes
- Redirect map must be written down as part of this decision, not improvised at cutover

## User Stories

- **US-01:** As the CTO, I want a single deployment path so that the environment I audit is the environment that ships.
- **US-02:** As the owner, I want a one-command rollback so that a bad cutover does not take the business offline.
- **US-03:** As an engineer, I want the old SPA routes redirected so that existing links and Google's index do not 404.

## Design

### Evidence driving this decision

`esmia.se` responds to every path with the same 6318-byte HTML shell and status 200:

```
/                            200 text/html 6318
/robots.txt                  200 text/html 6318
/sitemap.xml                 200 text/html 6318
/this-page-does-not-exist    200 text/html 6318
```

Response headers identify the CDN as Firebase Hosting (Fastly). The repo's `firebase.json` contains `rewrites: [{source: "**", destination: "/index.html"}]`, which reproduces exactly this behaviour.

### Redirect map

| Old SPA route | New route |
|---|---|
| `/home` | `/` |
| `/contact` | `/about` |
| `/about` | `/about` |
| `/products` | `/products` |

### Recovery

Tag the current production state before cutover, e.g. `git tag spa-pre-cutover`, and keep `firebase.json` for the SPA in that tag. Rollback is then a redeploy of the tag, not a code edit.

## Tasks

- [ ] Confirm Firebase Hosting is the target (it is already serving production)
- [ ] Delete `netlify.toml` and `vercel.json`
- [ ] Tag the current production state as `spa-pre-cutover`
- [ ] Write the redirect map into the hosting config
- [ ] Document the rollback command in README
- [ ] Confirm the build produces `404.html` from `content/404.md`

## Done Criteria

- [ ] Exactly one hosting config remains in the repo
- [ ] `git tag` shows `spa-pre-cutover`
- [ ] Redirect map is committed
- [ ] Rollback procedure is written down and has been read once out loud by someone who did not write it

## Notes

- The SPA is a create-react-app build with `last-modified: 2024-05-04`; it is not worth migrating incrementally
- Netlify and Vercel configs are vestigial from the starter template

## Questions to Resolve

- [ ] **OPEN** — Is Firebase Hosting the long-term home, or should this move to Cloudflare Pages? Revisit after cutover; not blocking.
- [x] Should `/home` redirect permanently (301) or temporarily? → **301 permanent.** The SPA routes are gone for good. (2026-11-03)
