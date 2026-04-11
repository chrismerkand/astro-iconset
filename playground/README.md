# Playground

An Astro app in this monorepo that exercises **`astro-iconset`** (`packages/astro-iconset`). Use it to manually verify local icons, Iconify sets, `*.svg?icon` imports, sprite versus inline output, sizing, accessibility props, and the framework-specific `Icon` wrappers.

The integration is configured in **`astro.config.mjs`**: merged `iconDir` folders, named `iconDirs` (`brand:`, `ui:`), and the usual Astro + Vite setup (including Tailwind CSS v4). Change that file when you want to test different integration options.

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Feature matrix: `name`, `icon`, Iconify, sprite vs inline, sizing, a11y, Tailwind (`src/pages/index.astro`) |
| `/local-icons/` | `iconDir` / `iconDirs` behavior and config reference (`src/pages/local-icons.astro`) |
| `/map/` | Repeated Iconify icons to inspect sprite `<symbol>` / `<use>` reuse (`src/pages/map.astro`) |
| `/react/`, `/vue/`, `/svelte/`, `/solid/`, `/preact/` | `Icon` from `astro-iconset/react` (and the matching framework entry) inside islands |

## Commands

From the **repository root** (after `pnpm install`):

```sh
pnpm --filter playground dev
```

```sh
pnpm --filter playground build
```

```sh
pnpm --filter playground preview
```

Or run the same scripts from **`playground/`** after installing dependencies (`pnpm install` at the root is enough for workspace packages).

The dev server prints the local URL (Astro’s default is usually `http://localhost:4321`).

## Project layout

- **`src/pages/`** — File-based routes; each `.astro` page above maps to a URL.
- **`src/components/`** — Framework demos (`react/`, `vue/`, `VueDemos.vue`, `SvelteDemos.svelte`, etc.) and shared UI such as `PageFooter.astro`.
- **`src/icons/`**, **`src/extra-icons/`**, **`src/brand-icons/`**, **`src/ui-icons/`** — Local SVGs used by the integration config and demos.
- **`src/assets/`** — Assets such as `import-only.svg` for `?icon` imports outside scanned directories.

Package behavior and options are documented in [`packages/astro-iconset/README.md`](../packages/astro-iconset/README.md).
