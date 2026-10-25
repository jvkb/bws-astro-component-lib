export type Variant = 'flat' | 'outlined' | 'elevated' | 'tonal';
export type ButtonVariant = 'text' | Variant;
export type ColorVariant =
  'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error';
export type Size = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

export type SharedProps = {
  class?: string;
  id?: string;
};
