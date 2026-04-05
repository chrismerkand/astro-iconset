/// <reference path="./astro-icon-import.d.ts" />

declare module "*?icon" {
  import type { AstroIconImport } from "./astro-icon-import";
  const icon: AstroIconImport;
  export default icon;
}

declare module "*.svg?icon" {
  import type { AstroIconImport } from "./astro-icon-import";
  const icon: AstroIconImport;
  export default icon;
}
