import { describe, it, expect } from "vitest";
import {
  loadLocalCollectionFromDir,
  loadMergedLocalIconDirs,
} from "../../src/loaders/loadLocalCollection.js";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const FIXTURES = fileURLToPath(new URL("../fixtures", import.meta.url));
const ICONS_DIR = join(FIXTURES, "icons");
const ICONS_B_DIR = join(FIXTURES, "icons-b");
const RASTER_DIR = join(FIXTURES, "raster");

// ─── loadLocalCollectionFromDir ───────────────────────────────────────────────

describe("loadLocalCollectionFromDir", () => {
  it("returns a collection with the given prefix", async () => {
    const col = await loadLocalCollectionFromDir(ICONS_DIR, "test");
    expect(col.prefix).toBe("test");
  });

  it("loads all SVG files as icons", async () => {
    const col = await loadLocalCollectionFromDir(ICONS_DIR, "test");
    expect(Object.keys(col.icons).length).toBeGreaterThan(0);
  });

  it('includes icon named "simple" from simple.svg', async () => {
    const col = await loadLocalCollectionFromDir(ICONS_DIR, "test");
    expect(col.icons["simple"]).toBeDefined();
  });

  it('includes icon named "monochrome" from monochrome.svg', async () => {
    const col = await loadLocalCollectionFromDir(ICONS_DIR, "test");
    expect(col.icons["monochrome"]).toBeDefined();
  });

  it("each icon has a body property", async () => {
    const col = await loadLocalCollectionFromDir(ICONS_DIR, "test");
    for (const icon of Object.values(col.icons)) {
      expect(typeof icon.body).toBe("string");
      expect(icon.body.length).toBeGreaterThan(0);
    }
  });

  it("does not throw on a directory whose SVG embeds a raster image", async () => {
    // @iconify/tools drops raster icons during import (with its own warning);
    // the loader must stay resilient and never crash the build.
    await expect(
      loadLocalCollectionFromDir(RASTER_DIR, "test"),
    ).resolves.toBeDefined();
  });
});

// ─── loadMergedLocalIconDirs ──────────────────────────────────────────────────

describe("loadMergedLocalIconDirs", () => {
  it("throws on an empty directory list", async () => {
    await expect(loadMergedLocalIconDirs([])).rejects.toThrow(
      /No local icon directories/,
    );
  });

  it('returns a "local"-prefixed collection for a single directory', async () => {
    const col = await loadMergedLocalIconDirs([ICONS_DIR]);
    expect(col.prefix).toBe("local");
  });

  it("single directory result contains the same icons as direct load", async () => {
    const [merged, direct] = await Promise.all([
      loadMergedLocalIconDirs([ICONS_DIR]),
      loadLocalCollectionFromDir(ICONS_DIR, "local"),
    ]);
    expect(Object.keys(merged.icons)).toEqual(Object.keys(direct.icons));
  });

  it("merges icons from two non-overlapping directories", async () => {
    const col = await loadMergedLocalIconDirs([ICONS_DIR, ICONS_B_DIR]);
    expect(col.icons["simple"]).toBeDefined();  // from icons/
    expect(col.icons["other"]).toBeDefined();   // from icons-b/
  });

  it("total icon count equals sum of both directories", async () => {
    const [colA, colB, merged] = await Promise.all([
      loadLocalCollectionFromDir(ICONS_DIR, "a"),
      loadLocalCollectionFromDir(ICONS_B_DIR, "b"),
      loadMergedLocalIconDirs([ICONS_DIR, ICONS_B_DIR]),
    ]);
    expect(Object.keys(merged.icons).length).toBe(
      Object.keys(colA.icons).length + Object.keys(colB.icons).length,
    );
  });

  it("throws on duplicate icon names across directories", async () => {
    // Using the same directory twice guarantees duplicate keys
    await expect(
      loadMergedLocalIconDirs([ICONS_DIR, ICONS_DIR]),
    ).rejects.toThrow(/Duplicate icon key/);
  });
});
