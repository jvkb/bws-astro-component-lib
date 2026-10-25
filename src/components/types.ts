export type Variant = 'flat' | 'outlined' | 'elevated' | 'tonal';
export type ButtonVariant = 'text' | Variant;
export type ColorVariant =
  'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error';
export type Size = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export type RoundedVariant = 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'full';
export type InputVariant = 'filled' | 'outlined' | 'underlined';

export type SharedProps = {
  class?: string;
  id?: string;
};
