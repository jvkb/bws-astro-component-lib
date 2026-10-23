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

Then use the components:

```astro
---
import { Button } from 'bws-astro-components';
// or: import Button from 'bws-astro-components/components/Button.astro';
---

<Button>Click</Button>
```

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
