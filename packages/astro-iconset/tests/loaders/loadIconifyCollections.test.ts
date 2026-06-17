import { describe, it, expect } from "vitest";
import loadIconifyCollections, {
  loadCollection,
} from "../../src/loaders/loadIconifyCollections.js";

const EMPTY_ROOT = new URL("../fixtures/empty/", import.meta.url);
const WITH_ICONIFY_ROOT = new URL("../fixtures/with-iconify/", import.meta.url);

// ─── loadCollection ───────────────────────────────────────────────────────────

describe("loadCollection", () => {
  it("returns undefined for an empty name", async () => {
    expect(await loadCollection("")).toBeUndefined();
  });

  it("returns undefined for a non-existent icon set", async () => {
    expect(
      await loadCollection("__nonexistent_set_xyz__"),
    ).toBeUndefined();
  });

  it("loads an installed collection by prefix", async () => {
    // @iconify-json/ri is a devDependency of this package
    const col = await loadCollection("ri");
    expect(col).toBeDefined();
    expect(col?.prefix).toBe("ri");
  });

  it("loaded collection contains icons", async () => {
    const col = await loadCollection("ri");
    expect(Object.keys(col!.icons).length).toBeGreaterThan(0);
  });
});

// ─── loadIconifyCollections ───────────────────────────────────────────────────

describe("loadIconifyCollections", () => {
  it("returns an empty map when package.json lists no @iconify-json packages", async () => {
    const result = await loadIconifyCollections({ root: EMPTY_ROOT });
    expect(result).toEqual({});
  });

  it("loads all collections declared in package.json", async () => {
    const result = await loadIconifyCollections({ root: WITH_ICONIFY_ROOT });
    expect(result["ri"]).toBeDefined();
  });

  it("returned collection has correct prefix", async () => {
    const result = await loadIconifyCollections({ root: WITH_ICONIFY_ROOT });
    expect(result["ri"]?.prefix).toBe("ri");
  });

  it("respects include filter — loads only specified icon names", async () => {
    // "home-line" is a valid Remix Icons name; bare "home" does not exist in ri
    const result = await loadIconifyCollections({
      root: WITH_ICONIFY_ROOT,
      include: { ri: ["home-line"] },
    });
    const icons = Object.keys(result["ri"]!.icons);
    expect(icons).toContain("home-line");
    // A filter for one icon should yield far fewer than the full set
    expect(icons.length).toBeLessThan(10);
  });

  it("include: ['*'] loads the entire collection", async () => {
    const [full, filtered] = await Promise.all([
      loadIconifyCollections({ root: WITH_ICONIFY_ROOT, include: { ri: ["*"] } }),
      loadIconifyCollections({ root: WITH_ICONIFY_ROOT, include: { ri: ["home-line"] } }),
    ]);
    expect(Object.keys(full["ri"]!.icons).length).toBeGreaterThan(
      Object.keys(filtered["ri"]!.icons).length,
    );
  });
});
