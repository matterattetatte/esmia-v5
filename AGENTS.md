# Agent notes (Esmia / esmia.se)

Static site built with [Eleventy v3](https://www.11ty.dev/). Firebase Hosting is the only deploy target.

## Build

```bash
npm run build
```

Outputs to `_site/` and runs HTML validation (12 pages). See `package.json` for other scripts (`start`, `test`, `test:e2e`, `verify:agentic`).

## Deploy (Firebase, project `esmia-hb`)

Run from the project root. Deploying is an external/publishing action — do it only when the user explicitly asks.

```bash
# Authenticate once if needed (interactive; requires a human/browser session)
npx --yes firebase-tools login            # or: npx --yes firebase-tools login --no-localhost

# Production deploy
npm run build && npx --yes firebase-tools deploy

# Preview channel (optional)
npm run build && npx --yes firebase-tools hosting:channel:deploy lh-audit --expires 7d
```

- Prefer `npx --yes firebase-tools ...` over a global install (avoids `sudo` / EACCES on `/usr/local`).
- `npm run deploy` in `package.json` calls `firebase` directly and assumes a global CLI; the `npx` form above works without it.
- Hosting config: `firebase.json` (`public: _site`), project alias: `.firebaserc` (`default: esmia-hb`).

More detail: [README.md](README.md#deployment).
