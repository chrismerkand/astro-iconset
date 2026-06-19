import { vi, describe, it, expect } from "vitest";

// Stub the JSX component so no Preact JSX transform is needed in the test environment.
vi.mock("../../components/preact/Icon.js", () => ({
  default: vi.fn().mockName("PreactIcon"),
}));

describe("astro-iconset/preact entry point", () => {
  it("exports a default component", async () => {
    const mod = await import("../../components/preact/index.ts");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("named export Icon equals the default export", async () => {
    const mod = await import("../../components/preact/index.ts");
    expect(mod.Icon).toBe(mod.default);
  });
});
