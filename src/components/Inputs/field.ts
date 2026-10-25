// Field styles shared by the Vuetify-style inputs (TextInput, Select), so they look and behave alike.
import { twMerge } from 'tailwind-merge';
import type { ColorVariant, InputVariant } from '../types.ts';

export function getInputColor(color: ColorVariant) {
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

// filled/underlined get Vuetify's underline that grows from the middle on focus (the ::after line).
export function getFieldClasses(variant: InputVariant) {
  switch (variant) {
    case 'filled': {
      return 'rounded-t-md border-b border-gray-500 bg-gray-100 hover:border-gray-900 hover:bg-gray-200 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:scale-x-0 after:bg-(--input-color) after:transition-transform after:duration-200 focus-within:after:scale-x-100';
    }
    case 'underlined': {
      return 'border-b border-gray-500 hover:border-gray-900 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:scale-x-0 after:bg-(--input-color) after:transition-transform after:duration-200 focus-within:after:scale-x-100';
    }
    case 'outlined': {
      return 'rounded-md border border-gray-400 hover:border-gray-900 focus-within:border-(--input-color) focus-within:ring-1 focus-within:ring-(--input-color) focus-within:ring-inset';
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
      // Floated onto the border; the background covers the line behind the text (override with --input-bg).
      return 'left-3 top-0 -translate-y-1/2 bg-[var(--input-bg,white)] px-1';
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
