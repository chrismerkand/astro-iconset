# Astro Iconset

An [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that adds an `Icon` component for inlining SVGs at build time. Local files and [Iconify](https://iconify.design) sets are optimized with [SVGO](https://github.com/svg/svgo), repeated icons on a page share a sprite when not inlined, and nothing extra ships to the browser as a runtime.

**Features**

- Local icons from `src/icons/` (or your own paths), with optional named prefixes
- Iconify collections via `@iconify-json/*` packages
- Optional `*.svg?icon` imports for one-off files without a shared directory
- Wrapper components for React, Vue, Svelte, Preact, and Solid (install only what you use)

- [Installation](#installation)
- [Usage](#usage)
  - [Local icons](#local-icons)
  - [Iconify icons](#iconify-icons)
  - [Imported SVGs (`?icon`)](#imported-svgs-icon)
  - [Props](#props)
  - [Styling](#styling)
  - [Framework islands](#framework-islands)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Changelog](#changelog)

## Installation

```sh
npm install astro-iconset
```

```sh
pnpm add astro-iconset
```

```sh
yarn add astro-iconset
```

Register the integration in **`astro.config.mjs`**:

```js
import { defineConfig } from "astro/config";
import icon from "astro-iconset";

export default defineConfig({
  integrations: [icon()],
});
```

**Peer dependency:** `astro` (see `package.json` for the supported range). Framework packages (`react`, `vue`, etc.) are optional and only needed if you use the matching `astro-iconset/*` entry.

If something breaks, [open an issue](https://github.com/sudeep2003/astro-iconset/issues).

## Usage

### Local icons

1. Add SVG files under `src/icons/` (or [configure](#icondir) another directory).
2. Reference a file by its basename (no extension) with the `name` prop.

```astro
---
import { Icon } from "astro-iconset/components";
---

<Icon name="close" />
```

### Iconify icons

1. Pick a set on [Iconify Icon Sets](https://icon-sets.iconify.design/).
2. Install the JSON package, for example: `npm i -D @iconify-json/mdi`
3. Use `set:icon-name` in `name` (for example `mdi:account`).

```astro
---
import { Icon } from "astro-iconset/components";
---

<Icon name="mdi:account" />
```

For server or hybrid output, [limit which icons are bundled](#include) with `include` so the server bundle stays small.

### Imported SVGs (`?icon`)

You can import a single file as Iconify-compatible data and pass it to `icon` instead of `name`:

```astro
---
import { Icon } from "astro-iconset/components";
import logo from "../assets/logo.svg?icon";
---

<Icon icon={logo} title="Logo" />
```

Use either `name` or `icon`, not both.

For TypeScript, reference the package’s SVG module types (for example add `"astro-iconset/svg-icon"` to `compilerOptions.types`, or use a triple-slash reference in a `.d.ts` file).

### Props

The `Icon` component accepts standard SVG/HTML attributes (including ARIA). Commonly used options:

| Prop | Description |
| --- | --- |
| `name` | Local basename or `set:icon` for Iconify |
| `icon` | Data from `import x from "…svg?icon"` |
| `size` | Sets both `width` and `height` when provided |
| `width` / `height` | Explicit dimensions |
| `title` / `desc` | Accessible name and description |
| `is:inline` | When `true`, inlines markup without the sprite path |

See [`Icon.astro`](./components/Icon.astro) for the full implementation.

### Styling

Target icons with `[data-icon]`, or a specific file with `[data-icon="close"]` (local) or the full `name` string for Iconify.

```astro
---
import { Icon } from "astro-iconset/components";
---

<style>
  [data-icon] {
    color: blue;
  }
  [data-icon="annotation"] {
    color: red;
  }
</style>

<Icon name="adjustment" />
<Icon name="annotation" />

<Icon name="annotation" class="text-red-500" />
```

### Framework islands

Use the matching subpath so icons work inside framework components:

- `astro-iconset/react`
- `astro-iconset/vue`
- `astro-iconset/svelte`
- `astro-iconset/preact`
- `astro-iconset/solid`

Install the corresponding peer (`react`, `vue`, etc.) for the integration you use.

You can still compose with Astro’s [slots and children](https://docs.astro.build/en/guides/framework-components/#passing-children-to-framework-components) where the framework supports it.

## Configuration

Options are passed to `icon({ ... })` in `astro.config.mjs`.

### `include`

For `output: 'server'` or `output: 'hybrid'`, list the Iconify icons (or whole sets with `"*"`) that should be bundled. Unlisted icons are not included in the server bundle.

```js
import { defineConfig } from "astro/config";
import icon from "astro-iconset";

export default defineConfig({
  integrations: [
    icon({
      include: {
        mdi: ["account", "home"],
        // mdi: ["*"], // entire Material Design set (large)
      },
    }),
  ],
});
```

### `iconDir`

Default is `src/icons`. Set a string or an array of directories merged into the **`local`** set (unprefixed names). Duplicate names across folders fail the build.

```js
icon({
  iconDir: "src/assets/icons",
});
```

```js
icon({
  iconDir: ["src/icons", "src/assets/icons"],
});
```

### `iconDirs`

Named directories become prefixes: `brand:logo`, `ui:menu`, etc.

```js
icon({
  iconDirs: {
    brand: "src/brand-icons",
    ui: "src/ui-icons",
  },
});
```

To use only `iconDirs` for the default local set, set `iconDirs.local` instead of `iconDir`. Do not set both `iconDir` and `iconDirs.local`.

### `svgoOptions`

Override default SVGO behavior. See [SVGO configuration](https://github.com/svg/svgo#configuration).

```js
import { defineConfig } from "astro/config";
import icon from "astro-iconset";

export default defineConfig({
  integrations: [
    icon({
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                inlineStyles: {
                  onlyMatchedOnce: false,
                },
                removeDoctype: false,
              },
            },
          },
        ],
      },
    }),
  ],
});
```

## Contributing

Issues and pull requests are welcome at [github.com/sudeep2003/astro-iconset](https://github.com/sudeep2003/astro-iconset).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
