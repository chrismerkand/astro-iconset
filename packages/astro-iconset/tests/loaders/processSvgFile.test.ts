import { describe, it, expect, vi } from "vitest";
import processSvgFile from "../../src/loaders/processSvgFile.js";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const FIXTURES = fileURLToPath(new URL("../fixtures", import.meta.url));
const SIMPLE_SVG = join(FIXTURES, "icons", "simple.svg");
const RASTER_SVG = join(FIXTURES, "raster", "raster.svg");

describe("processSvgFile", () => {
  it("returns icon data with a non-empty body for a normal SVG", async () => {
    const icon = await processSvgFile(SIMPLE_SVG);
    expect(typeof icon.body).toBe("string");
    expect(icon.body.length).toBeGreaterThan(0);
  });

  it("does not throw on an SVG that embeds a raster image", async () => {
    await expect(processSvgFile(RASTER_SVG)).resolves.toBeDefined();
  });

  it("warns and keeps the un-optimized icon (PNG preserved) for a raster SVG", async () => {
    const onWarn = vi.fn();
    const icon = await processSvgFile(
      RASTER_SVG,
      { plugins: ["preset-default"] },
      onWarn,
    );
    expect(onWarn).toHaveBeenCalled();
    expect(icon.body).toContain("<image");
  });
});
