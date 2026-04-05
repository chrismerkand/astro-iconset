/**
 * Icon JSON from `import icon from "*.svg?icon"` (Iconify-compatible).
 * Shipped from this package so apps do not need `@iconify/types` for `?icon` typings.
 */
export interface AstroIconImport {
  body: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  rotate?: number;
  hFlip?: boolean;
  vFlip?: boolean;
}
