import { vi, describe, it, expect } from "vitest";

// Stub the SFC so no Vue compiler is needed in the test environment.
vi.mock("../../components/vue/Icon.vue", () => ({
  default: { name: "Icon", setup: vi.fn() },
}));

describe("astro-iconset/vue entry point", () => {
  it("exports a default component object", async () => {
    const mod = await import("../../components/vue/index.ts");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("object");
  });

  it("named export Icon equals the default export", async () => {
    const mod = await import("../../components/vue/index.ts");
    expect(mod.Icon).toBe(mod.default);
  });
});
