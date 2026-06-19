import { describe, it, expect } from "vitest";
import createIntegration from "../../src/index.js";

describe("createIntegration", () => {
  it('returns an integration with name "astro-iconset"', () => {
    const integration = createIntegration();
    expect(integration.name).toBe("astro-iconset");
  });

  it("has an astro:config:setup hook", () => {
    const integration = createIntegration();
    expect(typeof integration.hooks["astro:config:setup"]).toBe("function");
  });

  it("accepts no options", () => {
    expect(() => createIntegration()).not.toThrow();
  });

  it("accepts an include option", () => {
    expect(() =>
      createIntegration({ include: { ri: ["home", "search"] } }),
    ).not.toThrow();
  });

  it("accepts a custom iconDir", () => {
    expect(() =>
      createIntegration({ iconDir: "src/custom-icons" }),
    ).not.toThrow();
  });
});
