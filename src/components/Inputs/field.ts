// Field styles shared by the Vuetify-style inputs (TextInput, Textarea, Select), so they look and behave alike.
import { twMerge } from 'tailwind-merge';
import { isThemeColor, onColor, toCssColor } from '../color.ts';
import type { Color, InputVariant } from '../types.ts';

export function getInputColor(color: Color) {
  // Any other color comes inline as --input-custom-color (getInputColorStyle): an inline
  // --input-color would beat the error color the field switches to when it's invalid.
  if (!isThemeColor(color)) {
    return '[--input-color:var(--input-custom-color,var(--color-primary))]';
  }
  switch (color) {
    case 'primary': {
      return '[--input-color:var(--color-primary)]';
    }
    case 'secondary': {
      return '[--input-color:var(--color-secondary)]';
    }
    case 'success': {
      return '[--input-color:var(--color-success)]';
    }
    case 'warning': {
      return '[--input-color:var(--color-warning)]';
    }
    case 'info': {
      return '[--input-color:var(--color-info)]';
    }
    case 'error': {
      return '[--input-color:var(--color-error)]';
    }
  }
}

/** The inline style for a color that isn't a theme role, on the same element as getInputColor. */
export function getInputColorStyle(color: Color | undefined) {
  if (color === undefined || isThemeColor(color)) return undefined;
  const css = toCssColor(color);
  return (
    css &&
    `--input-custom-color: ${css}; --input-custom-on-color: ${onColor(css)}`
  );
}

// filled/underlined get Vuetify's underline that grows from the middle on focus (the ::after line).
export function getFieldClasses(variant: InputVariant) {
  switch (variant) {
    case 'filled': {
      return 'rounded-t-md border-b border-on-surface/50 bg-on-surface/6 hover:border-on-surface/87 hover:bg-on-surface/10 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:scale-x-0 after:bg-(--input-color) after:transition-transform after:duration-200 focus-within:after:scale-x-100';
    }
    case 'underlined': {
      return 'border-b border-on-surface/50 hover:border-on-surface/87 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:scale-x-0 after:bg-(--input-color) after:transition-transform after:duration-200 focus-within:after:scale-x-100';
    }
    case 'outlined': {
      return 'rounded-md border border-on-surface/38 hover:border-on-surface/87 focus-within:border-(--input-color) focus-within:ring-1 focus-within:ring-(--input-color) focus-within:ring-inset';
    }
  }
}

// The invalid state is driven by data-invalid on the wrapper, so Form's script can toggle it in the
// browser and a server-side `error` looks the same.
export function getInvalidFieldClasses(variant: InputVariant) {
  switch (variant) {
    case 'filled':
    case 'underlined': {
      return 'group-data-invalid/field:after:scale-x-100';
    }
    case 'outlined': {
      return 'group-data-invalid/field:border-(--input-color) group-data-invalid/field:hover:border-(--input-color)';
    }
  }
}

// Floated label position; each component adds its own classes for the resting position inside the field.
export function getLabelClasses(variant: InputVariant, hasPrepend: boolean) {
  switch (variant) {
    case 'filled': {
      return 'left-4 top-2';
    }
    case 'underlined': {
      return hasPrepend ? 'left-3 top-2' : 'left-0 top-2';
    }
    case 'outlined': {
      // Floated onto the border; the background covers the line behind the text. It's the page background
      // by default, Card sets its surface — set --input-bg yourself on other backgrounds.
      return 'left-3 top-0 -translate-y-1/2 bg-[var(--input-bg,var(--color-background))] px-1';
    }
  }
}

// Room for the floated label above the value; underlined has no side padding unless something sits before it.
export function getInputPadding(
  variant: InputVariant,
  hasLabel: boolean,
  hasPrepend: boolean,
) {
  switch (variant) {
    case 'filled': {
      return hasLabel ? 'px-4 pt-5 pb-1' : 'px-4';
    }
    case 'underlined': {
      // No side padding, unless something sits before the input in the prepend-inner slot.
      return twMerge(hasLabel && 'pt-5 pb-1', hasPrepend && 'pl-3');
    }
    case 'outlined': {
      return 'px-4';
    }
  }
}
