// Config for the local playground only — it is not published to npm.
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  srcDir: './playground',
  publicDir: './playground/public',
  outDir: './playground/dist',
  vite: {
    plugins: [tailwindcss()],
  },
});
