// Stub for virtual:astro-iconset — used by all framework component tests.
// The alias in vitest.config.ts points here instead of the real virtual module,
// which only exists after `astro dev` / `astro build` generates it.
import type { AstroIconCollectionMap } from "../../typings/integration";

// A tiny, self-contained collection so `resolveIcon({ name: "test:circle" })`
// has a real icon to resolve. Keep the prefix as "test" (NOT "local"/"missing")
// so existing "icon set not found" tests keep passing.
const collections: AstroIconCollectionMap = {
  test: {
    prefix: "test",
    width: 24,
    height: 24,
    icons: {
      circle: { body: '<circle cx="12" cy="12" r="10" fill="currentColor"/>' },
    },
    aliases: {
      "circle-alias": { parent: "circle" },
    },
  },
};

export default collections;
export const config = { include: {}, localIconSets: [] as string[] };
