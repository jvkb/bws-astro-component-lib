# BWS Astro UI

Vuetify-inspired Astro components styled with Tailwind CSS v4: buttons, cards, chips, inputs,
select, form validation and light/dark themes.

**Documentation:** run `pnpm docs:dev` locally, or see the deployed docs site. It has live
examples and the full API of every component.

## Quick start

```bash
pnpm add bws-astro-ui
```

Requires Astro 7+ and Tailwind CSS 4+ (`@tailwindcss/vite`). In your global stylesheet:

```css
@import 'tailwindcss';
@import 'bws-astro-ui/styles.css';

@theme {
  --color-primary: #2b4570;
  --color-secondary: #dc5f26;
}
```

```astro
---
import { Button, Card } from 'bws-astro-ui';
---

<Card title="Hello" text="Your first card.">
  <Button slot="actions">Get started</Button>
</Card>
```

## Development

| Script            | What it does                                                         |
| ----------------- | -------------------------------------------------------------------- |
| `pnpm dev`        | Playground (`playground/`) for quick checks                          |
| `pnpm docs:dev`   | Documentation site (`docs/`, Starlight) at http://localhost:4400     |
| `pnpm docs:build` | Builds the docs into `docs/dist/` — upload that folder to the server |
| `pnpm build`      | Builds the playground — catches components that fail to compile      |
| `pnpm check`      | Type-checks `.astro` and `.ts` files                                 |
| `pnpm format`     | Formats code (Prettier + Astro + Tailwind class sorting)             |
| `pnpm lint:pkg`   | Validates `package.json` exports with publint                        |
| `pnpm pack:dry`   | Lists the files that would be published                              |
| `pnpm verify`     | All checks above; runs automatically before publishing               |

Components are published as `.astro` source files — Astro compiles them in the consuming project,
so there is no library build step. The docs are a separate package in the pnpm workspace that
installs the library like any project would.

## Versioning and releases

The project follows [semantic versioning](https://semver.org): a new component or feature raises the
minor version, a fix the patch version, a breaking change the major version. Every change that
ships gets an entry in [`CHANGELOG.md`](CHANGELOG.md), which the docs show as well.

1. With the change, bump the version: `pnpm version:minor` (or `version:patch` / `version:major`)
   and describe it in `CHANGELOG.md`. Commit.
2. `pnpm release` — checks everything, publishes to npm, tags the commit `v<version>` and pushes.
3. `pnpm docs:build` and upload `docs/dist/` to the docs server.
