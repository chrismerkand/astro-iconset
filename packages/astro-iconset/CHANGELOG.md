# astro-iconset Changelog

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