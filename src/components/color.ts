// Color props beyond the theme roles: Tailwind color names, hex codes and any CSS color.
// Server-side only (component frontmatter): it imports Tailwind's whole palette.
import palette from 'tailwindcss/colors';
import type { Color, ColorVariant } from './types.ts';

const themeColors: readonly string[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'info',
  'error',
];

export function isThemeColor(color: Color | undefined): color is ColorVariant {
  return color !== undefined && themeColors.includes(color);
}

const hex = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
const cssFunction =
  /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix|light-dark|var)\(.+\)$/i;
// CSS color keywords are single lowercase words; the browser ignores the ones it doesn't know.
const cssNamed = /^[a-z]+$/;

const tailwindName = /^([a-z]+(?:-[a-z]+)*)(?:-(\d{2,3}))?(?:\/(\d{1,3}))?$/;

/**
 * The CSS color for a color prop that isn't a theme role, or undefined (with a warning) when it
 * isn't one. Tailwind names use the theme's variable, so custom `@theme` colors work too, with
 * Tailwind's default palette as the fallback for variables your CSS doesn't emit:
 *
 *   'red-500'  → var(--color-red-500, oklch(63.7% 0.237 25.331))
 *   'white/50' → color-mix(in oklab, var(--color-white, #fff) 50%, transparent)
 *   '#2B4570'  → #2B4570
 */
export function toCssColor(color: string): string | undefined {
  const value = color.trim();
  // Nothing that could end the declaration it's put into.
  if (/[;{}<>]/.test(value)) return warn(color);
  if (hex.test(value) || cssFunction.test(value)) return value;

  const match = tailwindName.exec(value);
  if (!match) return warn(color);
  const [, name, shade, alpha] = match;
  if (name === 'current') return withAlpha('currentColor', alpha);
  const token = shade ? `${name}-${shade}` : name;
  // The default palette's value, a plain CSS color name (`rebeccapurple`), or nothing for custom
  // theme colors — those need their variable in the CSS (see the Colors guide).
  const entry = (palette as Record<string, unknown>)[name];
  const fallback = shade
    ? (entry as Record<string, string> | undefined)?.[shade]
    : typeof entry === 'string'
      ? entry
      : cssNamed.test(name)
        ? name
        : undefined;
  return withAlpha(
    fallback ? `var(--color-${token}, ${fallback})` : `var(--color-${token})`,
    alpha,
  );
}

function withAlpha(color: string, alpha: string | undefined) {
  return alpha === undefined
    ? color
    : `color-mix(in oklab, ${color} ${Math.min(Number(alpha), 100)}%, transparent)`;
}

function warn(color: string) {
  console.warn(
    `[bws-astro-ui] Unknown color "${color}": use a theme color, a Tailwind color (e.g. red-500), a hex code or a CSS color.`,
  );
  return undefined;
}

/**
 * Black or white, whichever is easier to read on `color` (the WCAG contrast of both is equal at
 * an OKLCH lightness of about 0.56). Worked out by the browser, so it follows CSS variables too.
 */
export function onColor(color: string) {
  return `oklch(from ${color} clamp(0, (0.56 - l) * 1000, 1) 0 0 / 1)`;
}

/**
 * The inline style for a color prop that isn't a theme role (theme roles use the component's
 * classes): `--{name}-color` and `--{name}-on-color`, a readable text color on it.
 */
export function customColorStyle(name: string, color: Color | undefined) {
  if (color === undefined || isThemeColor(color)) return undefined;
  const css = toCssColor(color);
  return (
    css &&
    cssVars({ [`--${name}-color`]: css, [`--${name}-on-color`]: onColor(css) })
  );
}

/** The inline text color for a color prop that isn't a theme role (theme roles use classes). */
export function customTextStyle(color: Color | undefined) {
  if (color === undefined || isThemeColor(color)) return undefined;
  const css = toCssColor(color);
  return css && `color: ${css}`;
}

/** An inline style setting custom properties; undefined when there's nothing to set. */
export function cssVars(vars: Record<string, string | undefined>) {
  const declarations = Object.entries(vars)
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => `${name}: ${value}`);
  return declarations.length > 0 ? declarations.join('; ') : undefined;
}

/** Joins inline styles; objects are written like Astro writes them (camelCase → kebab-case). */
export function joinStyles(
  // `object`: Astro's style prop also takes a CSSProperties object.
  ...styles: (string | object | undefined | null | false)[]
) {
  const parts = styles.flatMap((style) => {
    if (!style) return [];
    if (typeof style === 'string') return style.trim() ? [style.trim()] : [];
    return Object.entries(style as Record<string, unknown>)
      .filter(
        ([, value]) =>
          typeof value === 'number' ||
          (typeof value === 'string' && value.trim()),
      )
      .map(
        ([key, value]) =>
          `${key.startsWith('--') ? key : key.replaceAll(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${value}`,
      );
  });
  return parts.length > 0
    ? parts.map((part) => part.replace(/;\s*$/, '')).join('; ')
    : undefined;
}
