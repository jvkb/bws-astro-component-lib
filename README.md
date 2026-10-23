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
