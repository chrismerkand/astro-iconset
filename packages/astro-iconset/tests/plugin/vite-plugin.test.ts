import { describe, it, expect, vi } from "vitest";
import { createPlugin } from "../../src/vite-plugin-astro-icon.js";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import type { AstroIntegrationLogger } from "astro";

// Root URL pointing at the test fixtures directory
const FIXTURES_ROOT = new URL("../fixtures/", import.meta.url);

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

// ─── Plugin shape ────────────────────────────────────────────────────────────

describe("createPlugin — shape", () => {
  it('has name "astro-iconset"', () => {
    expect(makePlugin().name).toBe("astro-iconset");
  });

  it('enforces "pre" ordering', () => {
    expect(makePlugin().enforce).toBe("pre");
  });
});

// ─── resolveId hook ───────────────────────────────────────────────────────────
//
// As of the Vite-alias fix, resolveId is async and delegates real path
// resolution to Vite via `this.resolve`. Tests provide a mock context whose
// `resolve` echoes the cleaned path back (mirroring a successful resolution).

type ResolveCtx = {
  resolve: (id: string, importer?: string, opts?: unknown) => Promise<{ id: string } | null>;
};

const echoResolveCtx: ResolveCtx = {
  resolve: async (id) => ({ id }),
};

function callResolveId(
  plugin: ReturnType<typeof makePlugin>,
  id: string,
  importer?: string,
  ctx: ResolveCtx = echoResolveCtx,
) {
  return (plugin.resolveId as Function).call(ctx, id, importer);
}

describe("createPlugin — resolveId", () => {
  it("resolves virtual:astro-iconset to the null-prefixed id", async () => {
    expect(await callResolveId(makePlugin(), "virtual:astro-iconset")).toBe(
      "\0virtual:astro-iconset",
    );
  });

  it("passes \\0icon-import: ids through unchanged", async () => {
    const id = "\0icon-import:abc123";
    expect(await callResolveId(makePlugin(), id)).toBe(id);
  });

  it("returns undefined for unrelated module ids", async () => {
    expect(await callResolveId(makePlugin(), "react")).toBeUndefined();
    expect(await callResolveId(makePlugin(), "./local-module")).toBeUndefined();
  });

  it("resolves an absolute ?icon SVG path to a \\0icon-import: token", async () => {
    const absPath = join(fileURLToPath(FIXTURES_ROOT), "icons", "simple.svg");
    const result = await callResolveId(makePlugin(), `${absPath}?icon`);
    expect(result).toMatch(/^\0icon-import:/);
  });

  it("ignores ?icon on non-SVG files", async () => {
    const absPath = join(fileURLToPath(FIXTURES_ROOT), "icons", "icon.png");
    expect(await callResolveId(makePlugin(), `${absPath}?icon`)).toBeUndefined();
  });

  it("ignores SVG paths without the ?icon query", async () => {
    const absPath = join(fileURLToPath(FIXTURES_ROOT), "icons", "simple.svg");
    expect(await callResolveId(makePlugin(), absPath)).toBeUndefined();
  });

  it("resolves a relative ?icon SVG path when an importer is provided", async () => {
    const importer = join(fileURLToPath(FIXTURES_ROOT), "src", "page.astro");
    const result = await callResolveId(makePlugin(), "../icons/simple.svg?icon", importer);
    expect(result).toMatch(/^\0icon-import:/);
  });

  it("returns undefined when Vite cannot resolve the path", async () => {
    const nullCtx: ResolveCtx = { resolve: async () => null };
    const absPath = join(fileURLToPath(FIXTURES_ROOT), "icons", "simple.svg");
    expect(await callResolveId(makePlugin(), `${absPath}?icon`, undefined, nullCtx)).toBeUndefined();
  });

  it("delegates alias resolution to this.resolve", async () => {
    const target = join(fileURLToPath(FIXTURES_ROOT), "icons", "simple.svg");
    const ctx: ResolveCtx = { resolve: vi.fn(async () => ({ id: target })) };
    const result = await callResolveId(makePlugin(), "@icons/simple.svg?icon", "/some/importer.astro", ctx);
    expect(ctx.resolve).toHaveBeenCalledWith("@icons/simple.svg", "/some/importer.astro", { skipSelf: true });
    expect(result).toMatch(/^\0icon-import:/);
  });
});

// ─── ?icon query parsing ──────────────────────────────────────────────────────

describe("createPlugin — ?icon query detection", () => {
  const ABS = join(fileURLToPath(FIXTURES_ROOT), "icons", "simple.svg");

  function resolve(query: string) {
    return callResolveId(makePlugin(), `${ABS}${query}`);
  }

  it("matches a bare ?icon query", async () => {
    expect(await resolve("?icon")).toMatch(/^\0icon-import:/);
  });

  it("matches when icon is one of several query keys", async () => {
    expect(await resolve("?foo=bar&icon")).toMatch(/^\0icon-import:/);
  });

  it("matches ?icon=true (icon as a key with a value)", async () => {
    expect(await resolve("?icon=true")).toMatch(/^\0icon-import:/);
  });

  it("does NOT match a key that merely starts with icon", async () => {
    expect(await resolve("?iconish")).toBeUndefined();
  });

  it("does NOT match when icon appears only as a query value", async () => {
    expect(await resolve("?foo=icon")).toBeUndefined();
  });

  it("does NOT match an SVG with no query at all", async () => {
    expect(await resolve("")).toBeUndefined();
  });
});

// ─── iconDirs prefix validation ───────────────────────────────────────────────

describe("createPlugin — iconDirs key validation", () => {
  it("throws on uppercase keys", () => {
    expect(() => makePlugin({ iconDirs: { BRAND: "src/icons" } })).toThrow(
      /Invalid iconDirs key/,
    );
  });

  it("throws on keys starting with a digit", () => {
    expect(() => makePlugin({ iconDirs: { "1brand": "src/icons" } })).toThrow(
      /Invalid iconDirs key/,
    );
  });

  it("throws on keys with spaces", () => {
    expect(() =>
      makePlugin({ iconDirs: { "my brand": "src/icons" } }),
    ).toThrow(/Invalid iconDirs key/);
  });

  it("accepts valid lowercase-hyphenated keys", () => {
    // Use a path distinct from the default "src/icons" to avoid overlap error
    expect(() =>
      makePlugin({ iconDirs: { "my-brand": "src/brand-icons" } }),
    ).not.toThrow();
  });

  it("accepts single-word lowercase keys", () => {
    expect(() =>
      makePlugin({ iconDirs: { brand: "src/brand-icons" } }),
    ).not.toThrow();
  });
});

// ─── missing icon directory handling ─────────────────────────────────────────

describe("createPlugin — missing icon directories", () => {
  const RESOLVED_VIRTUAL_ID = "\0virtual:astro-iconset";

  async function loadVirtualModule(plugin: ReturnType<typeof makePlugin>) {
    const load = plugin.load as (id: string) => Promise<string | undefined>;
    return load.call(plugin, RESOLVED_VIRTUAL_ID);
  }

  it("does not throw when the default src/icons directory is absent", async () => {
    const plugin = makePlugin(); // fixtures root has no src/icons
    await expect(loadVirtualModule(plugin)).resolves.toBeDefined();
  });

  it("does not warn about a missing *default* directory", async () => {
    mockLogger.warn = vi.fn();
    const plugin = makePlugin();
    await loadVirtualModule(plugin);
    const warned = (mockLogger.warn as ReturnType<typeof vi.fn>).mock.calls
      .map((c) => String(c[0]))
      .some((m) => m.includes("not found"));
    expect(warned).toBe(false);
  });

  it("warns (but does not throw) when an explicit iconDir is absent", async () => {
    mockLogger.warn = vi.fn();
    const plugin = makePlugin({ iconDir: "definitely-missing-dir" });
    await expect(loadVirtualModule(plugin)).resolves.toBeDefined();
    const warned = (mockLogger.warn as ReturnType<typeof vi.fn>).mock.calls
      .map((c) => String(c[0]))
      .some((m) => m.includes("not found"));
    expect(warned).toBe(true);
  });
});

// ─── option conflict validation ───────────────────────────────────────────────

describe("createPlugin — option conflicts", () => {
  it("throws when both iconDir and iconDirs.local are set", () => {
    expect(() =>
      makePlugin({ iconDir: "src/icons", iconDirs: { local: "src/other" } }),
    ).toThrow(/Use either/);
  });

  it("throws on an empty iconDir array", () => {
    expect(() => makePlugin({ iconDir: [] })).toThrow(/empty array/);
  });

  it("throws on duplicate paths in iconDir array", () => {
    expect(() =>
      makePlugin({ iconDir: ["src/icons", "src/icons"] }),
    ).toThrow(/Duplicate/);
  });
});
