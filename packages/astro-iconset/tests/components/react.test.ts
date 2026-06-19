import { vi, describe, it, expect } from "vitest";

// Prevent Vitest from transforming the JSX file — the smoke test only cares
// that the entry-point module re-exports the component correctly.
vi.mock("../../components/react/Icon.js", () => ({
  default: vi.fn().mockName("ReactIcon"),
}));

describe("astro-iconset/react entry point", () => {
  it("exports a default component", async () => {
    const mod = await import("../../components/react/index.ts");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("named export Icon equals the default export", async () => {
    const mod = await import("../../components/react/index.ts");
    expect(mod.Icon).toBe(mod.default);
  });
});
