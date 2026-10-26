// Chip styles shared by Chip and ChipGroup, so standalone and selectable chips look alike.
import type {
  ButtonVariant,
  ColorVariant,
  RoundedVariant,
  Size,
} from './types.ts';

// Every variant has a 1px border (transparent unless outlined), so all of them are the same size.
export const chipBase =
  'inline-flex max-w-full shrink-0 items-center border align-middle font-medium whitespace-nowrap';

export function getChipColor(color: ColorVariant | undefined) {
  switch (color) {
    case 'primary': {
      return '[--chip-color:var(--color-primary)]';
    }
    case 'secondary': {
      return '[--chip-color:var(--color-secondary)]';
    }
    case 'success': {
      return '[--chip-color:var(--color-success)]';
    }
    case 'warning': {
      return '[--chip-color:var(--color-warning)]';
    }
    case 'info': {
      return '[--chip-color:var(--color-info)]';
    }
    case 'error': {
      return '[--chip-color:var(--color-error)]';
    }
    case undefined: {
      return '[--chip-color:var(--color-gray-700)]';
    }
  }
}

// Same idea as Button: variants describe the shape, the color comes from --chip-color.
export function getChipVariantClasses(variant: ButtonVariant) {
  switch (variant) {
    case 'tonal': {
      return 'border-transparent bg-(--chip-color)/12 text-(--chip-color)';
    }
    case 'flat': {
      return 'border-transparent bg-(--chip-color) text-white';
    }
    case 'elevated': {
      return 'border-transparent bg-(--chip-color) text-white shadow-sm';
    }
    case 'outlined': {
      return 'border-(--chip-color) text-(--chip-color)';
    }
    case 'text': {
      return 'border-transparent text-(--chip-color)';
    }
  }
}

// Hover/focus states for chips you can click (links, chips in a ChipGroup).
export function getChipInteractiveClasses(variant: ButtonVariant) {
  const focus =
    'cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--chip-color)';
  switch (variant) {
    case 'tonal': {
      return `${focus} hover:bg-(--chip-color)/20`;
    }
    case 'flat':
    case 'elevated': {
      return `${focus} hover:bg-(--chip-color)/90`;
    }
    case 'outlined':
    case 'text': {
      return `${focus} hover:bg-(--chip-color)/8`;
    }
  }
}

// Icons default to 1em, so they follow the text size of each step.
export function getChipSize(size: Size) {
  switch (size) {
    case 'xs': {
      return 'h-5 gap-1 px-2 text-[0.625rem]';
    }
    case 'sm': {
      return 'h-6 gap-1 px-2.5 text-xs';
    }
    case 'default': {
      return 'h-8 gap-1.5 px-3 text-sm';
    }
    case 'lg': {
      return 'h-9 gap-2 px-4 text-base';
    }
    case 'xl': {
      return 'h-11 gap-2 px-5 text-lg';
    }
  }
}

export function getChipRounded(rounded: RoundedVariant) {
  switch (rounded) {
    case 'xs': {
      return 'rounded-xs';
    }
    case 'sm': {
      return 'rounded-sm';
    }
    case 'default': {
      return 'rounded-md';
    }
    case 'lg': {
      return 'rounded-lg';
    }
    case 'xl': {
      return 'rounded-xl';
    }
    case 'full': {
      return 'rounded-full';
    }
  }
}
