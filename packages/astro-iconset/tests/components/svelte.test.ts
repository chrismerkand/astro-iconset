import { vi, describe, it, expect } from "vitest";

// Stub the Svelte component so no Svelte compiler is needed in the test environment.
vi.mock("../../components/svelte/Icon.svelte", () => ({
  default: vi.fn().mockName("SvelteIcon"),
}));

describe("astro-iconset/svelte entry point", () => {
  it("exports a default component", async () => {
    const mod = await import("../../components/svelte/index.ts");
    expect(mod.default).toBeDefined();
  });

  it("named export Icon equals the default export", async () => {
    const mod = await import("../../components/svelte/index.ts");
    expect(mod.Icon).toBe(mod.default);
  });
});
