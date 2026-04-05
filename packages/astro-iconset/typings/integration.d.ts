import type { IconifyJSON, SVGOOptions } from "./iconify";

export type IntegrationOptions = {
  /**
   * Iconify packs and icon names to include in `virtual:astro-iconset` (used with `<Icon name="…" />`).
   * For local SVGs without a shared directory, prefer importing with the `?icon` query and `<Icon icon={…} />`.
   */
  include?: Record<string, ["*"] | string[]>;
  /**
   * Root directory (or directories) for the default **`local`** icon set.
   * Multiple entries merge into one `local` set; duplicate icon keys across folders throw at build time.
   * Do not set together with `iconDirs.local`.
   * @default "src/icons"
   */
  iconDir?: string | string[];
  /**
   * Named filesystem directories for local icons. Each key becomes an Iconify prefix:
   * use `<Icon name="prefix:icon-name" />` (for example `brand:logo`).
   * Use `local` as the key to set the default local set instead of {@link IntegrationOptions.iconDir}.
   * Do not set both `iconDirs.local` and `iconDir`.
   */
  iconDirs?: Record<string, string>;
  /**
   * @default { plugins: ['preset-default'] }
   */
  svgoOptions?: SVGOOptions;
};

/** Serialized into `virtual:astro-iconset` alongside `include`. */
export type AstroIconVirtualConfig = Pick<IntegrationOptions, "include"> & {
  /** Prefixes for filesystem-backed sets: `local` (when configured) plus each `iconDirs` key except `local`. */
  localIconSets?: string[];
};

export type IconCollection = IconifyJSON;
export type AstroIconCollectionMap = Record<string, IconCollection>;
