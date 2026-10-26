# Changelog

All notable changes to this project are documented here. The project follows
[Semantic Versioning](https://semver.org): a new component or feature raises the
minor version, a fix the patch version, and an incompatible change the major version.

## [1.11.0] - 2026-10-26

### Added

- `Pagination` — links to the pages of a list, without JavaScript: `href` as a `{page}` template or
  a function (fits Astro's `paginate()`), ellipses for long ranges (`totalVisible`), previous/next
  arrows with `rel`, optional first/last arrows, `color` and `activeColor`, `size`, `rounded`, `variant` and
  `activeVariant`. The current page has `aria-current="page"`; all labels can be translated.

## [1.10.0] - 2026-10-26

### Added

- `Breadcrumbs` — the path to the current page in a `<nav>` with an ordered list: items with links,
  icons and disabled states, `aria-current="page"` on the last one, a text or icon `divider`, link
  `color`, and optional schema.org `BreadcrumbList` structured data (`schema`).

## [1.9.0] - 2026-10-26

### Added

- `Alert` — success, info, warning and error messages: `type` sets the color and icon; `title`,
  `text` and slots, `variant`, `color`, `icon`, an accent `border`, `prominent`, `closable` with an
  `alert:close` event. Warnings and errors get `role="alert"`, the rest `role="status"`; text on
  tinted variants meets WCAG AA in both themes.

## [1.8.0] - 2026-10-26

### Added

- `Tooltip` — a hint on hover and keyboard focus, positioned with Floating UI in the top layer:
  `text` or rich content, any `location`, `openDelay` / `closeDelay`. Linked with
  `aria-describedby`, hoverable and dismissible with Escape (WCAG 1.4.13).

### Changed

- `Menu` and `Tooltip` share one Floating UI positioning helper.

## [1.7.0] - 2026-10-26

### Added

- `Checkbox` — a native checkbox with Vuetify's look: `label` or a slot, `color`,
  `indeterminate`, `hint`, `error`, `rules` (`required` means checked).

## [1.6.0] - 2026-10-26

### Added

- `Switch` — an on/off toggle on a native checkbox (`role="switch"`), no JavaScript: `label` or a
  slot, `color`, `inset` (Material 3 look), `hint`, `error`, `rules` (`required` means on).

### Fixed

- `Form` treats an unchecked checkbox as empty, so `required` works on checkboxes.

## [1.5.0] - 2026-10-26

### Added

- `Menu` — a dropdown next to its activator, positioned with Floating UI (any `location`, flips
  and shifts, follows scrolling) in the top layer. `items` with links, actions (`menu:select`
  event), icons, colors, disabled items and dividers, with the WAI-ARIA menu button keyboard
  pattern; free-form content in the slot; `openOnHover` and `closeOnContentClick`.

## [1.4.0] - 2026-10-26

### Added

- `NavigationDrawer` — a menu that slides in from the `left`, `right`, `top` or `bottom` edge on the
  native `<dialog>`: `title`, `closable`, `prepend` / `append` slots and a scrolling `<nav>`;
  opens from the `activator` slot or `data-drawer-open`, closes on the backdrop, Escape,
  `data-drawer-close` and link clicks (`closeOnNavigate`); `width`, `persistent`, `open`.

### Changed

- `Dialog` and `NavigationDrawer` share one browser script for opening, closing and the scroll lock.

## [1.3.0] - 2026-10-26

### Added

- `Dialog` — modal dialog on the native `<dialog>`: title, text and actions like `Card`; opens from
  the `activator` slot or `data-dialog-open`, closes with `data-dialog-close`, `closable`, the
  backdrop or Escape; `persistent`, `width`, `fullscreen`, `open`. Page scroll is locked while it's
  open — keeping the scrollbar's space, so the page doesn't shift — with open/close animations.

### Fixed

- `Card`, `Chip` and `Avatar` show their `text` prop when an MDX page passes them an empty default
  slot (e.g. a component written on one line with only named slots).

## [1.2.0] - 2026-10-26

### Added

- `Textarea` — multi-line field with `TextInput`'s variants, floating label, hint, error and
  validation; `rows`, `autoGrow` with `maxRows`, a character `counter` and `noResize`.
- `Form` validates textareas with `rules`.

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
