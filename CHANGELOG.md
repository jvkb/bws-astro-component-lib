# Changelog

All notable changes to this project are documented here. The project follows
[Semantic Versioning](https://semver.org): a new component or feature raises the
minor version, a fix the patch version, and an incompatible change the major version.

## [1.1.0] - 2026-10-26

### Added

- `Avatar` — an image, icon or text (e.g. initials) in a circle or rounded square; size steps or
  pixels, `variant`, `color`, `rounded` and an accessible `label`. Imported images are optimized
  with `astro:assets`, and a broken image falls back to the text underneath.

## [1.0.0] - 2026-10-26

First versioned release.

### Added

- `Button` — `elevated`, `flat`, `tonal`, `outlined` and `text` variants; `color`, `size`,
  `rounded` and `block`; renders a link with `href`.
- `Icon` — Lucide icons (`bws-astro-components/icons`) or imported `.svg` files, with size steps
  and an accessible `label`.
- `Card` — title, subtitle, body and actions as props or slots; `variant`, `color`, `rounded`.
- `Chip` — variants, colors, sizes, icons, link chips and closable chips (`chip:close` event).
- `ChipGroup` — single or multiple selection on native radios/checkboxes; `mandatory`, `filter`,
  `selectedVariant`.
- `TextInput` — `filled`, `outlined` and `underlined` with a floating label, hint and error;
  `prepend-inner` / `append-inner` slots.
- `NumberInput` — step buttons (`default`, `split`, `hidden`) respecting `min`, `max` and `step`.
- `Select` — accessible dropdown (WAI-ARIA combobox) positioned with Floating UI; `location`.
- `Form` and validation rules (`bws-astro-components/rules`) shared by the browser and the server
  (`validateForm`).
- Light/dark themes: theme roles, `data-theme` (`light`, `dark`, `system`), `ThemeScript` and
  `setTheme` / `toggleTheme` (`bws-astro-components/theme`).
