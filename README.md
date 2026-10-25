# bws-astro-components

Reusable Astro components styled with Tailwind CSS v4.

## Usage

```bash
pnpm add bws-astro-components
```

The project needs Astro 7+ and Tailwind CSS 4+ (`@tailwindcss/vite`).
Import the library styles right after Tailwind in your global stylesheet,
so Tailwind picks up the classes used inside the components:

```css
@import 'tailwindcss';
@import 'bws-astro-components/styles.css';
```

### Required theme variables

The components use the `primary` and `secondary` colors (e.g. `bg-primary`,
`text-secondary-700`), but the library does not define them — every project
supplies its own brand colors. Add them in an `@theme` block **after** the
library import, otherwise Tailwind will not generate those utilities:

| Variable                   | Used for                                        |
| -------------------------- | ----------------------------------------------- |
| `--color-primary`          | Main brand color (`bg-primary`, `text-primary`) |
| `--color-primary-{step}`   | Shades of the main color                        |
| `--color-secondary`        | Accent color (`bg-secondary`, `text-secondary`) |
| `--color-secondary-{step}` | Shades of the accent color                      |

`{step}` is every one of: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`,
`800`, `900`, `950` — all 11 shades are required for both colors.

```css
@import 'tailwindcss';
@import 'bws-astro-components/styles.css';

@theme {
  --color-primary: #2b4570;
  --color-primary-50: #f0f6ff;
  /* … 100–900 … */
  --color-primary-950: #112443;

  --color-secondary: #dc5f26;
  --color-secondary-50: #fff3ee;
  /* … 100–900 … */
  --color-secondary-950: #421300;
}
```

A complete example lives in the repository's `playground/styles/global.css`.
Any CSS color format works (hex, `rgb()`, `oklch()`), and tools like
[uicolors.app](https://uicolors.app) can generate the shades from a single color.

### Optional status colors

Components with a `color` prop (e.g. `<Button color="error">`) also accept
`success`, `warning`, `info` and `error`. These come with defaults from the
Tailwind palette (white text on them passes WCAG AA); override any of them in
the same `@theme` block:

| Variable          | Default     |
| ----------------- | ----------- |
| `--color-success` | `green-700` |
| `--color-warning` | `amber-700` |
| `--color-info`    | `sky-700`   |
| `--color-error`   | `red-600`   |

Then use the components:

```astro
---
import { Button } from 'bws-astro-components';
// or: import Button from 'bws-astro-components/components/Button.astro';
---

<Button>Click</Button>
```

## Icons

[Lucide](https://lucide.dev/icons) ships with the library — no extra install.
Icons are rendered to inline SVG at build time: no JavaScript, and only the
icons you actually use end up in the HTML.

```astro
---
import { Icon } from 'bws-astro-components';
import { Heart, MessageCircle } from 'bws-astro-components/icons';
import Logo from '../assets/logo.svg';
---

<Icon icon={Heart} /> <!-- 1em, scales with the text -->
<Icon icon={MessageCircle} size="lg" /> <!-- xs | sm | default | lg | xl -->
<Icon icon={Heart} size={40} /> <!-- pixels -->
<Icon icon={Logo} label="Company logo" /> <!-- any imported .svg file -->
```

| Prop    | Type                                                               | Default  |
| ------- | ------------------------------------------------------------------ | -------- |
| `icon`  | Lucide icon or imported `.svg` component                           | required |
| `size`  | `'xs'` · `'sm'` · `'default'` · `'lg'` · `'xl'` · px               | `1em`    |
| `label` | Accessible name; without it the icon is decorative (`aria-hidden`) | —        |

The steps are the same `Size` names `Button` uses: `xs` 12 px, `sm` 16 px,
`default` 20 px, `lg` 24 px, `xl` 32 px. Note that `size="default"` is the fixed
20 px step — leave `size` out to make the icon follow the surrounding text
(`1em`), which is what you want inside a `Button`.

Icons take their color from `currentColor`, so use text utilities
(`class="text-primary"`). Any other SVG attribute (e.g. `stroke-width`) is
passed through. Icons live on their own entry point, `bws-astro-components/icons`,
because names like `Link`, `Image` or `Menu` would clash with components.

## Development

| Script               | What it does                                                           |
| -------------------- | ---------------------------------------------------------------------- |
| `pnpm dev`           | Playground (`playground/`) for previewing components                   |
| `pnpm build`         | Builds the playground — catches components that fail to compile        |
| `pnpm check`         | Type-checks `.astro` and `.ts` files                                   |
| `pnpm format`        | Formats code (Prettier + Astro + Tailwind class sorting)               |
| `pnpm lint:pkg`      | Validates `package.json` exports with publint                          |
| `pnpm pack:dry`      | Lists the files that would be published                                |
| `pnpm verify`        | All of the above; runs automatically before publishing                 |
| `pnpm release:patch` | Bumps the version, pushes the tag and publishes (also `minor`/`major`) |

Components are published as `.astro` source files — Astro compiles them in the
consuming project, so there is no separate library build step.
