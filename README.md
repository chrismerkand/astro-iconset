# Astro Iconset

[![npm version](https://img.shields.io/npm/v/astro-iconset?color=blue)](https://www.npmjs.com/package/astro-iconset)
[![npm downloads](https://img.shields.io/npm/dm/astro-iconset)](https://www.npmjs.com/package/astro-iconset)
[![license](https://img.shields.io/npm/l/astro-iconset)](./LICENSE)

[Astro](https://astro.build) integration for SVG icons: local files, [Iconify](https://iconify.design) collections. Icons are optimized at build time, repeated uses can share a sprite, and the package ships no extra runtime to the browser.

**Install in an Astro project**

```sh
pnpm add astro-iconset
```

Full setup, configuration, and API details are in the [**package README**](./packages/astro-iconset/README.md).

---

## This repository

A **pnpm workspace** with the published npm package, a manual test app, and documentation site sources.

| Path | Role |
| --- | --- |
| [`packages/astro-iconset`](./packages/astro-iconset/) | npm package `astro-iconset` |
| [`playground/`](./playground/) | Astro app used to exercise the integration ([playground README](./playground/README.md)) |
| [`site/`](./site/) | [Starlight](https://starlight.astro.build) docs site (private package in this repo) |

**Repository:** [github.com/sudeep2003/astro-iconset](https://github.com/sudeep2003/astro-iconset) · **Issues:** [github.com/sudeep2003/astro-iconset/issues](https://github.com/sudeep2003/astro-iconset/issues)

## Developing locally

Requires [pnpm](https://pnpm.io) (version pinned in root `package.json`).

```sh
pnpm install
```

```sh
pnpm dev
```

Runs `dev` in every workspace package that defines it (integration build watch, playground, site, etc.). To run only the playground or site:

```sh
pnpm --filter playground dev
```

```sh
pnpm --filter site dev
```

Build the package and site together (as in root `scripts.build`):

```sh
pnpm build
```

```sh
npm run build
```

The root script runs filtered builds for `astro-iconset` and `site`; it invokes **pnpm** internally, so [pnpm](https://pnpm.io) must be available on your `PATH`.

Formatting:

```sh
pnpm format
```

```sh
pnpm lint
```

## License

MIT — see the repository files and [`packages/astro-iconset/package.json`](./packages/astro-iconset/package.json).
