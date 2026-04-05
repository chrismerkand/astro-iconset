declare module "virtual:astro-iconset" {
  const icons: import("./integration").AstroIconCollectionMap;
  export default icons;
  export const config: import("./integration").AstroIconVirtualConfig;
}
