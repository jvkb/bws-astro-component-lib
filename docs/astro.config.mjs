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
            {
              label: 'Overlays',
              items: [
                'components/dialog',
                'components/menu',
                'components/navigation-drawer',
              ],
            },
            {
              label: 'Forms',
              items: [
                'components/form',
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
