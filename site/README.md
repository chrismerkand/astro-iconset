# Documentation site

[Starlight](https://starlight.astro.build) site for **Astro Iconset**: guides and reference for the `astro-iconset` package. Content lives under **`src/content/docs/`** as `.md`/`.mdx` files; navigation and branding are set in **`astro.config.mjs`**.

## Commands

From the **repository root** (after `pnpm install` at the root):

```sh
pnpm --filter site dev
```

```sh
pnpm --filter site build
```

```sh
pnpm --filter site preview
```

Or run the same `dev`, `build`, and `preview` scripts from **`site/`**. The dev server URL is printed in the terminal (Starlight’s default is `http://localhost:4321`).

## Layout

| Path | Role |
| --- | --- |
| `src/content/docs/` | Documentation pages and nested sections (`guides/`, `reference/`, etc.) |
| `src/content.config.ts` | Content collection config for Starlight |
| `public/` | Static assets (for example favicons) |
| `astro.config.mjs` | Starlight integration: title, sidebar, social links |

## Related

- Package source and npm-focused docs: [`packages/astro-iconset`](../packages/astro-iconset/README.md)
- Monorepo overview: [root `README.md`](../README.md)

For Starlight-specific topics (frontmatter, custom components, sidebar patterns), see the [Starlight documentation](https://starlight.astro.build/).
