import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import pkg from 'bws-astro-ui/package.json' with { type: 'json' };

export default defineConfig({
  // The address the docs are served from — used for canonical URLs and the sitemap.
  // If they live in a subfolder (e.g. https://example.com/ui/), also set `base: '/ui'`.
  site: 'https://example.com',
  integrations: [
    starlight({
      title: `BWS Astro UI v${pkg.version}`,
      logo: {
        // The navy badge on light pages, the light one on dark pages.
        light: './src/assets/bws-short.svg',
        dark: './src/assets/bws-short-light.svg',
        alt: 'BWS',
      },
      favicon: '/favicon.svg',
      components: {
        // Adds a "Created by Banach Web Solutions" credit under every page.
        Footer: './src/components/Footer.astro',
      },
      customCss: ['./src/styles/global.css'],
      sidebar: [
        { label: 'Start', items: ['getting-started', 'changelog'] },
        { label: 'Guides', items: ['guides/themes', 'guides/validation'] },
        {
          label: 'Components',
          items: [
            { label: 'Actions', items: ['components/button'] },
            { label: 'Containment', items: ['components/card'] },
            {
              label: 'Data display',
              items: [
                'components/avatar',
                'components/chip',
                'components/icon',
              ],
            },
            { label: 'Feedback', items: ['components/alert'] },
            {
              label: 'Navigation',
              items: [
                'components/breadcrumbs',
                'components/navigation-drawer',
                'components/pagination',
              ],
            },
            {
              label: 'Overlays',
              items: [
                'components/dialog',
                'components/menu',
                'components/tooltip',
              ],
            },
            {
              label: 'Forms',
              items: [
                'components/form',
                'components/checkbox',
                'components/text-input',
                'components/textarea',
                'components/number-input',
                'components/select',
                'components/chip-group',
                'components/switch',
              ],
            },
          ],
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
