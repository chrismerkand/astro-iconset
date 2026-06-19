import { vi, describe, it, expect } from "vitest";

// Stub the JSX component so no Solid compiler is needed in the test environment.
vi.mock("../../components/solid/Icon.js", () => ({
  default: vi.fn().mockName("SolidIcon"),
}));

describe("astro-iconset/solid entry point", () => {
  it("exports a default component", async () => {
    const mod = await import("../../components/solid/index.ts");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("named export Icon equals the default export", async () => {
    const mod = await import("../../components/solid/index.ts");
    expect(mod.Icon).toBe(mod.default);
  });
});
