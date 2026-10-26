// All Lucide icons, e.g. `import { Heart } from 'bws-astro-ui/icons'`.
// Kept off the main entry point — names like Link, Image or Menu would clash with components.
export * from '@lucide/astro';

// Lucide's own low-level `Icon` is shadowed by the library's wrapper.
export { default as Icon } from './components/Icon.astro';
