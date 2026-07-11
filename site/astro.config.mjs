// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-iconset';

// https://starlight.astro.build/reference/configuration/
export default defineConfig({
  site: 'https://astro-iconset.wingflows.com',
  integrations: [
    icon(),
    starlight({
      title: 'Astro Iconset',
      description:
        'SVG icons for Astro — local files, Iconify, build-time optimization, and optional sprites.',
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://astro-iconset.wingflows.com/og-image.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://astro-iconset.wingflows.com/og-image.png' } },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'astro-iconset',
            url: 'https://astro-iconset.wingflows.com',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            description: 'SVG icons for Astro — local files, Iconify sets, and build-time optimization.',
            license: 'https://opensource.org/licenses/MIT',
            codeRepository: 'https://github.com/sudeep2003/astro-iconset',
          }),
        },
      ],
      customCss: [
        '@fontsource-variable/space-grotesk',
        '@fontsource/ibm-plex-mono/400.css',
        '@fontsource/ibm-plex-mono/500.css',
        '@fontsource/ibm-plex-mono/600.css',
        '@fontsource/ibm-plex-mono/700.css',
        './src/styles/custom.css',
      ],
      components: {
        Hero: './src/components/Hero.astro',
        SiteTitle: './src/components/SiteTitle.astro',
      },
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '0.85rem',
          codeFontFamily:
            "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
          codeFontSize: '0.8125rem',
          codeBackground: ({ theme }) =>
            theme.type === 'dark' ? '#0d1017' : '#f4f6fb',
        },
      },
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
          items: [{ autogenerate: { directory: 'reference' } }],
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
