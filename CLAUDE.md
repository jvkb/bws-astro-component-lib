# bws-astro-components

Astro component library styled with Tailwind CSS v4, inspired by Vuetify. Published to npm as
`.astro` source files (no build step); `playground/` is for quick checks, `docs/` is the
Starlight documentation site.

## Conventions for components

- Follow the existing patterns: props types in `src/components/types.ts`, colors through a CSS
  variable set by a `switch` (`--btn-color`, `--chip-color`, …), classes merged with `twMerge`,
  component-only props kept out of the attribute spread.
- Use theme roles, never fixed grays: `bg-surface`, `text-on-surface`, `text-on-surface/70`,
  `border-on-surface/38`, `text-(--x-on-color)` on solid fills. See `src/styles/index.css`.
- Shared styles live in `src/components/Inputs/field.ts` (inputs) and `src/components/chip.ts`.
- Client scripts: one delegated `<script>` per component, working for every instance on the page.

## Every change that ships

1. Export new components from `src/index.ts`.
2. Add a docs page in `docs/src/content/docs/` (live examples, props, slots, events) and add it to
   the sidebar in `docs/astro.config.mjs`. Add an example to the playground.
   In MDX keep a component and its text children on one line (`<Button>Next <Icon … /></Button>`):
   text on its own line becomes a `<p>`. MDX is excluded from Prettier for that reason.
3. Bump the version (`pnpm version:minor` for a new component or feature, `version:patch` for a
   fix, `version:major` for a breaking change) and add an entry to `CHANGELOG.md` under that
   version.
4. Run `pnpm verify` and `pnpm docs:build`.

Releasing (`pnpm release`: publish, tag `v<version>`, push) is done by the maintainer.
