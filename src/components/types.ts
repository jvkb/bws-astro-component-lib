import type { Placement } from '@floating-ui/dom';
import type { AstroComponent as LucideIcon } from '@lucide/astro';
import type { SvgComponent } from 'astro/types';

export type Variant = 'flat' | 'outlined' | 'elevated' | 'tonal';
export type ButtonVariant = 'text' | Variant;
export type ColorVariant =
  'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error';
/** A theme role, a Tailwind color (`white`, `red-500`, `sky-400/50`), a hex code or any CSS color. */
export type Color = ColorVariant | (string & {});
export type Size = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export type RoundedVariant = 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'full';
export type InputVariant = 'filled' | 'outlined' | 'underlined';
export type NumberControlVariant = 'default' | 'split' | 'hidden';
export type FormValidateOn = 'blur' | 'input' | 'submit';
export type MenuLocation = 'auto' | 'bottom' | 'top';
export type DrawerLocation = 'left' | 'right' | 'top' | 'bottom';
/** A Breadcrumbs entry. The last one is the current page. */
export type BreadcrumbItem = {
  title: string;
  href?: string;
  icon?: LucideIcon | SvgComponent;
  disabled?: boolean;
};
export type AlertType = 'success' | 'info' | 'warning' | 'error';
/** The edge an Alert's accent border is on (`start` / `end` follow the text direction). */
export type AlertBorder = 'start' | 'end' | 'top' | 'bottom';
/** Where a Menu opens next to its activator — any Floating UI placement, e.g. `bottom-start`. */
export type MenuPlacement = Placement;
/** Where a Tooltip appears next to its activator — any Floating UI placement, e.g. `top`. */
export type TooltipPlacement = Placement;
/** A Menu entry: a link (`href`), an action (`value`) or a divider. */
export type MenuItem =
  | {
      title: string;
      /** Makes the item a link. */
      href?: string;
      /** Sent with the `menu:select` event when the item isn't a link. */
      value?: string;
      icon?: LucideIcon | SvgComponent;
      /** E.g. `error` for a destructive action. */
      color?: Color;
      disabled?: boolean;
    }
  | { divider: true };
export type SelectItem =
  string | { title: string; value: string; disabled?: boolean };

export type SharedProps = {
  class?: string;
  id?: string;
};

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/**
 * How much of a Row a Col takes: a number of its 12 columns, `auto` (as wide as its content) or
 * `true` (an equal share of what's left).
 */
export type ColSpan = GridColumns | `${GridColumns}` | 'auto' | boolean;
/** How many of the Row's 12 columns to leave empty before a Col. */
export type ColOffset = 0 | GridColumns | `${0 | GridColumns}`;
/** Where a Col sits in its Row, whatever its place in the markup. */
export type ColOrder =
  0 | GridColumns | `${0 | GridColumns}` | 'first' | 'last';
export type GridAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type GridJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
