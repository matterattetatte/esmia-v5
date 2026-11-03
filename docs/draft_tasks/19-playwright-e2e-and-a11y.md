# Task: Playwright E2E & Accessibility Suite

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-23
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:testing, area:devops, required, gate:5-delivery
- **Dependencies:** 08-keyboard-product-tabs.md, 09-colour-contrast-pass.md, 12-console-clean-and-security-headers.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 6h
- **Plan IDs:** new — requested in the 2026-11-03 review

## Requirements

- Playwright runs headless against the built site in CI and locally
- Every route is smoke-tested for a 200 response and a rendered `<h1>`
- Product tabs are driven by keyboard only: Tab to reach, arrows to move, Enter/Space to select
- The mobile nav opens and closes by keyboard, and `aria-expanded` tracks state
- The skip link becomes visible on focus and moves focus to `#main`
- An automated accessibility scan passes on every page
- The suite asserts zero console errors and zero failed requests
- Unknown paths return 404 and old SPA routes redirect

## User Stories

- **US-01:** As a keyboard-only user, I want the tabs and menu to work without a mouse, and I want that guaranteed by a test rather than by review.
- **US-02:** As an engineer, I want a failing test the moment an accessibility fix regresses.
- **US-03:** As the CTO, I want the accessibility work to be enforced, not just done once.

## Design

### Stack

```bash
npm install --save-dev @playwright/test @axe-core/playwright
npx playwright install --with-deps chromium
```

### Configuration

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'npm run build && npx serve _site -l 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Accessibility scan

```ts
import AxeBuilder from '@axe-core/playwright';

const results = await new AxeBuilder({ page }).analyze();
expect(results.violations).toEqual([]);
```

Run it over all 15 pages, not just the homepage — the date-driven layouts are where contrast and heading bugs hide.

### Keyboard tests

```ts
await page.keyboard.press('Tab');           // reach the tab list
await page.keyboard.press('ArrowRight');    // move selection
await expect(page.getByRole('tab', { selected: true })).toHaveText('Ost');
```

## Tasks

- [ ] Install Playwright and `@axe-core/playwright`
- [ ] Add `playwright.config.ts` with the build-and-serve `webServer`
- [ ] Write a route smoke test covering all 15 pages
- [ ] Write the keyboard test for the product tabs
- [ ] Write the keyboard test for the mobile nav toggle
- [ ] Write the skip-link focus test
- [ ] Write the axe scan across every page
- [ ] Assert zero console errors and zero failed requests
- [ ] Assert 404 status on unknown paths and redirects on old SPA routes
- [ ] Wire the suite into CI
- [ ] Document how to run and debug it locally

## Done Criteria

- [ ] `npx playwright test` passes locally
- [ ] CI runs the suite on every pull request
- [ ] Keyboard-only operation of tabs and nav is proven by a test
- [ ] axe reports zero violations on all 15 pages
- [ ] A deliberately broken heading level fails the suite
- [ ] No test depends on Facebook being reachable

## Notes

- Task 06 is blocked, so the social embed must be excluded from the suite or mocked — do not let a third party make CI red
- Run the axe scan against the production preview URL too, not only localhost; headers and redirected routes differ
- Keep the suite fast: chromium only, no visual snapshots

## Questions to Resolve

- [ ] Should the axe scan be a hard failure or a warning list during the first pass?
- [ ] Do we add WebKit and Firefox, or chromium only?
