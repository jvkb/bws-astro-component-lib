import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import pkg from 'bws-astro-components/package.json' with { type: 'json' };

export default defineConfig({
  // The address the docs are served from — used for canonical URLs and the sitemap.
  // If they live in a subfolder (e.g. https://example.com/ui/), also set `base: '/ui'`.
  site: 'https://example.com',
  integrations: [
    starlight({
      title: `bws-astro-components v${pkg.version}`,
      customCss: ['./src/styles/global.css'],
      sidebar: [
        { label: 'Start', items: ['getting-started', 'changelog'] },
        { label: 'Guides', items: ['guides/themes', 'guides/validation'] },
        {
          label: 'Components',
          items: [
            'components/avatar',
            'components/button',
            'components/card',
            'components/chip',
            'components/chip-group',
            'components/form',
            'components/icon',
            'components/number-input',
            'components/select',
            'components/text-input',
          ],
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
