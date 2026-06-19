import { describe, it, expect, vi } from "vitest";
import { createPlugin } from "../../src/vite-plugin-astro-icon.js";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import type { AstroIntegrationLogger } from "astro";

const FIXTURES_ROOT = new URL("../fixtures/", import.meta.url);
const RESOLVED_VIRTUAL_ID = "\0virtual:astro-iconset";

const mockLogger = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
  fork: vi.fn().mockReturnValue({ info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() }),
  label: "test",
  level: "info",
  options: {},
} as unknown as AstroIntegrationLogger;

function makePlugin(opts: Record<string, unknown> = {}) {
  return createPlugin(opts as never, {
    root: FIXTURES_ROOT,
    output: "static",
    logger: mockLogger,
  });
}

function iconImportId(absSvgPath: string): string {
  const token = Buffer.from(absSvgPath, "utf-8").toString("base64url");
  return `\0icon-import:${token}`;
}

// ─── load — ?icon import token ────────────────────────────────────────────────

describe("createPlugin — load (?icon import)", () => {
  const SIMPLE_SVG = join(fileURLToPath(FIXTURES_ROOT), "icons", "simple.svg");

  it("returns a default export containing the processed icon data", async () => {
    const plugin = makePlugin();
    const load = plugin.load as (this: unknown, id: string) => Promise<string>;
    const ctx = { addWatchFile: vi.fn() };

    const result = await load.call(ctx, iconImportId(SIMPLE_SVG));
    expect(result).toMatch(/^export default /);
    expect(result).toContain('"body"');
  });

  it("registers the source SVG as a watched file", async () => {
    const plugin = makePlugin();
    const load = plugin.load as (this: unknown, id: string) => Promise<string>;
    const ctx = { addWatchFile: vi.fn() };

    await load.call(ctx, iconImportId(SIMPLE_SVG));
    expect(ctx.addWatchFile).toHaveBeenCalledWith(SIMPLE_SVG);
  });

  it("the exported icon data is valid JSON after the prefix", async () => {
    const plugin = makePlugin();
    const load = plugin.load as (this: unknown, id: string) => Promise<string>;
    const ctx = { addWatchFile: vi.fn() };

    const result = await load.call(ctx, iconImportId(SIMPLE_SVG));
    const json = result.replace(/^export default /, "");
    expect(() => JSON.parse(json)).not.toThrow();
  });
});

// ─── load — virtual module ────────────────────────────────────────────────────

describe("createPlugin — load (virtual module)", () => {
  it("emits a default export and a config export", async () => {
    const plugin = makePlugin();
    const load = plugin.load as (this: unknown, id: string) => Promise<string>;

    const result = await load.call(plugin, RESOLVED_VIRTUAL_ID);
    expect(result).toContain("export default ");
    expect(result).toContain("export const config = ");
  });

  it("serializes the user-provided include option into config", async () => {
    const plugin = makePlugin({ include: { ri: ["home", "search"] } });
    const load = plugin.load as (this: unknown, id: string) => Promise<string>;

    const result = await load.call(plugin, RESOLVED_VIRTUAL_ID);
    const configJson = result.slice(result.indexOf("export const config = ") + "export const config = ".length);
    const config = JSON.parse(configJson);
    expect(config.include).toEqual({ ri: ["home", "search"] });
    expect(Array.isArray(config.localIconSets)).toBe(true);
  });

  it("returns undefined for unrelated module ids", async () => {
    const plugin = makePlugin();
    const load = plugin.load as (this: unknown, id: string) => Promise<string | undefined>;
    expect(await load.call(plugin, "some-other-module")).toBeUndefined();
  });
});
