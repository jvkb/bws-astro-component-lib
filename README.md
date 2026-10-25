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

## Card

Like Vuetify's `v-card`: a title with an optional subtitle, a body and actions.
Each part is a prop for plain text or a slot for anything else.

```astro
<Card
  title="Konsultacja"
  subtitle="30 min, online"
  text="Omówimy Twój projekt."
>
  <Fragment slot="actions">
    <Button variant="text">Później</Button>
    <Button variant="text">Umów</Button>
  </Fragment>
</Card>
```

| Prop       | Default    |                                                                           |
| ---------- | ---------- | ------------------------------------------------------------------------- |
| `variant`  | `elevated` | `elevated` · `flat` · `outlined` · `tonal`                                |
| `color`    | —          | solid background (elevated, flat) or tinted border/text (outlined, tonal) |
| `rounded`  | `default`  | same scale as `Button`                                                    |
| `titleTag` | `div`      | `h2`–`h6` to put the title into the page's heading outline                |

Slots: `title`, `subtitle`, the default slot (body) and `actions`.

## Select

A Vuetify-style dropdown with the same variants, colors, label, hint and
error as `TextInput`:

```astro
<Select name="city" label="City" items={['Warszawa', 'Kraków', 'Gdańsk']} />
<Select
  name="plan"
  label="Plan"
  value="pro"
  items={[
    { title: 'Free', value: 'free' },
    { title: 'Pro', value: 'pro' },
    { title: 'Enterprise', value: 'enterprise', disabled: true },
  ]}
/>
```

It follows the WAI-ARIA select-only combobox pattern: arrow keys, Home/End,
Enter/Space, Escape and type-to-jump work, and screen readers announce the
highlighted option. The value is kept in a hidden native `<select>`, so it
submits with the form, resets and fires `input`/`change` like a native one.
It needs JavaScript to open.

The list is positioned with [Floating UI](https://floating-ui.com): it is never
clipped by a parent with `overflow: hidden` and follows the field while
scrolling. `location` sets where it opens — `auto` (default) opens below and
flips above when there's no room, `bottom` / `top` always open on that side.

## Form validation

Inspired by Vuetify's `rules`, but rules are plain objects instead of functions,
so the same rules run in the browser and on the server.

```astro
---
import { Button, Form, NumberInput, TextInput } from 'bws-astro-components';
import { email, max, required } from 'bws-astro-components/rules';
---

<Form method="post">
  <TextInput
    name="email"
    label="Email"
    rules={[required('Enter your email'), email()]}
  />
  <NumberInput
    name="guests"
    label="Guests"
    rules={[required(), max(20, 'At most 20 guests')]}
  />
  <Button type="submit">Send</Button>
</Form>
```

Inside a `<Form>`, fields with `rules` (`TextInput`, `NumberInput`, `Select`) validate in the browser: messages replace
the hint, the submit is blocked while anything is invalid and the first invalid
field gets focus. Without JavaScript, the rules still apply as native attributes
(`required`, `min`, `maxlength`, …).

| Rule                                                | Fails when                                          |
| --------------------------------------------------- | --------------------------------------------------- |
| `required(message?)`                                | the value is empty (or only whitespace)             |
| `email(message?)`                                   | not a valid email address                           |
| `minLength(n, message?)` / `maxLength(n, message?)` | shorter / longer than `n` characters                |
| `min(n, message?)` / `max(n, message?)`             | the number is below / above `n`                     |
| `pattern(regex, message?)`                          | the **whole** value doesn't match                   |
| `custom(name, message?)`                            | a rule registered with `defineRule` returns `false` |

Like in Vuetify, every rule except `required` passes on an empty value, and only
the first failing rule's message is shown. Default messages are in English —
pass your own as the last argument.

`<Form validateOn="…">` sets when fields start validating: `blur` (default —
after leaving a field, then live while typing), `input` (from the first
keystroke) or `submit` (on submit, then live). Submit handlers on the form only
run once everything is valid.

### Server-side validation

Always validate again on the server. Keep the rules in a module both sides import:

```ts
// src/forms/contact.ts
import {
  custom,
  defineRule,
  email,
  required,
} from 'bws-astro-components/rules';

defineRule('nip', (value) => isValidNip(value)); // custom rules: register them here

export const contactRules = {
  email: [required(), email()],
  nip: [custom('nip', 'Invalid NIP')],
};
```

Use it in the markup (`rules={contactRules.email}`), import the module in a
page `<script>` so custom rules exist in the browser, and check submissions with
`validateForm` — in an Astro Action, an endpoint or the page frontmatter:

```ts
import { validateForm } from 'bws-astro-components/rules';

const { valid, errors } = validateForm(
  await Astro.request.formData(),
  contactRules,
);
// errors → { email: 'Enter a valid email address' }; render fields with error={errors.email}
```

A field with an `error` prop starts out invalid, and the message clears as soon
as the value is edited into something valid.

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
