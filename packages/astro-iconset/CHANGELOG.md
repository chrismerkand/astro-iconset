# astro-iconset Changelog

## 0.0.5

### Patch

- Refactor: icon-resolution logic extracted into a shared `core.ts` — eliminates duplication across all framework components.
- Fix: throws a clear error when neither `name` nor `icon` is provided.

## 0.0.4

### Patch

- Fix: `size` no longer overrides an explicit `width` or `height` — it only fills the axis left unset.
- Fix: failed icon-collection loads now abort the build instead of silently producing an empty icon map.
- Fix: optional chaining on `tryGetHash` prevents a crash on a missing or empty `.astro/icon.d.ts`.
- Framework `Icon` components (React, Preact, Vue, Svelte, Solid) now throw when both `name` and `icon` are provided, and warn in dev when `size` is mixed with `width`/`height`.
- `?icon` imports now set `data-icon="astro-iconset:import"` for a consistent CSS hook.
- Solid: `computed()` is called once per render instead of twice.

## 0.0.3

### Patch

- Fix: exclude framework sub-packages (`react`, `preact`, `solid`, `svelte`, `vue`) from Vite's `optimizeDeps` in the integration hook, preventing the "Could not resolve virtual:astro-iconset" error on dev server startup when framework `Icon` components are used.

## 0.0.2

### Initial release

- `<Icon />` Astro component with automatic SVG inlining and sprite deduplication
- Local SVG support via `src/icons/` (configurable with `iconDir` / `iconDirs`)
- [Iconify](https://iconify.design/) icon-set support via `@iconify-json/*` packages
- `include` option to tree-shake Iconify icons in server output builds
- Automatic SVGO optimisation with configurable `svgoOptions`
- Named local icon sets (`iconDirs`) for multi-prefix workflows
- Framework components for React, Vue, Svelte, Preact, and Solid (`astro-iconset/react`, etc.)
- Full TypeScript support — `Icon` name union auto-generated on `astro dev` / `astro build`
- `title` and `desc` props for accessible labelled icons
- `size`, `width`, and `height` props for responsive scaling
- `is:inline` escape-hatch to bypass sprite deduplication per-instance

## 0.0.1

Placeholder release