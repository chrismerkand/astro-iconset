// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://starlight.astro.build/reference/configuration/
export default defineConfig({
  site: 'https://astro-iconset.wingflows.com',
  integrations: [
    starlight({
      title: 'Astro Iconset',
      description:
        'SVG icons for Astro — local files, Iconify, build-time optimization, and optional sprites.',
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/sudeep2003/astro-iconset',
        },
      ],
      sidebar: [
        {
          label: 'Start',
          items: [
            { label: 'Overview', link: '/' },
            { label: 'Getting Started', link: '/getting-started/' },
            { label: 'Features', link: '/features/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Local & Iconify icons', link: '/guides/customization/' },
            { label: 'SVG imports (?icon)', link: '/guides/icon-imports/' },
            { label: 'Components', link: '/guides/components/' },
            { label: 'Framework islands', link: '/guides/frameworks/' },
            { label: 'CSS & styling', link: '/guides/styling/' },
            { label: 'Deployment & SSR bundles', link: '/guides/deployment/' },
            { label: 'Troubleshooting', link: '/guides/troubleshooting/' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Project',
          items: [
            {
              label: 'Migrate from astro-icon',
              link: '/guides/migrate-from-astro-icon/',
            },
            { label: 'Version upgrade notes', link: '/guides/migration/' },
            { label: 'Credits', link: '/acknowledgements/' },
          ],
        },
      ],
    }),
    sitemap(),
  ],
});
