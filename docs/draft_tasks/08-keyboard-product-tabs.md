# Task: Keyboard-Accessible Product Tabs

## Metadata
- **Priority:** P1 - High
- **Deadline:** 2026-11-11
- **Status:** TODO
- **Assignee:** TBD
- **Tags:** type:feature, area:frontend, required, gate:3-features
- **Dependencies:** 07-heading-order-and-landmarks.md
- **GitHub Issue:** _not created_
- **Estimated Effort:** 4h
- **Plan IDs:** A2

## Requirements

- Tab controls must be reachable and operable by keyboard
- The tablist must expose `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and `role="tabpanel"`
- Arrow keys must move between tabs; `Home`/`End` jump to first/last
- The selected tab must be visually distinguishable without relying on colour alone
- The panel must be hidden with `hidden`, not only `display: none` in CSS

## User Stories

- **US-01:** As a keyboard-only user, I want to switch product categories so that I can browse the whole menu.
- **US-02:** As a screen-reader user, I want to know which tab is active so that I do not lose my place.
- **US-03:** As an engineer, I want the tab widget to be a real widget so that browser and assistive behaviour is free.

## Design

### Current implementation

```html
<div class="tab" data-tab="skinka">Skinka</div>
```

A `div` with a click handler: not focusable, no role, no state. 21 of 22 users without a pointing device cannot reach it.

### Target implementation

```html
<div class="tab-container" role="tablist" aria-label="Produktkategorier">
  <button role="tab" id="tab-skinka" aria-controls="skinka" aria-selected="true" tabindex="0">Skinka</button>
  ...
</div>
<section role="tabpanel" id="skinka" aria-labelledby="tab-skinka" tabindex="0">...</section>
```

Use roving tabindex: the selected tab is `tabindex="0"`, the rest `-1`.

## Tasks

- [ ] Convert tab `div`s to `button role="tab"`
- [ ] Add `aria-selected`/`aria-controls`/`aria-labelledby`
- [ ] Add `role="tablist"` and an accessible name
- [ ] Implement roving tabindex and arrow-key navigation
- [ ] Use `hidden` on inactive panels
- [ ] Add a visible focus style
- [ ] Make the widget work without JS, or document that it requires it

## Done Criteria

- [ ] Every tab is reachable with Tab and operable with Enter/Space
- [ ] Arrow keys move selection
- [ ] `aria-selected` tracks the active tab
- [ ] Inactive panels are hidden from the accessibility tree
- [ ] Focus is visible against the dark background at 3:1 or better
- [ ] Lighthouse `aria-*` and name-role-value audits pass

## Notes

- With JS disabled, only the first panel renders. That is acceptable for a product catalogue page but worth stating
- Consider whether tabs are the right pattern at all; a plain list of categories with anchor links needs no JS

## Questions to Resolve

- [ ] Keep tabs, or replace with anchored sections that work without JS?
