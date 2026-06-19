import { describe, it, expect } from "vitest";
import { resolveIcon } from "../../components/shared/core";
import type { AstroIconImport } from "../../typings/astro-icon-import";

const SIMPLE_ICON: AstroIconImport = {
  body: '<circle cx="12" cy="12" r="10"/>',
  width: 24,
  height: 24,
};

// ─── Guard: neither name nor icon ────────────────────────────────────────────

describe("resolveIcon — missing props", () => {
  it("throws when neither name nor icon is provided", () => {
    expect(() => resolveIcon({}, "react")).toThrow(
      'Either "name" or "icon" must be provided.',
    );
  });
});

// ─── Guard: both name and icon ────────────────────────────────────────────────

describe("resolveIcon — conflicting props", () => {
  it("throws when both name and icon are provided", () => {
    expect(() =>
      resolveIcon({ name: "local:simple", icon: SIMPLE_ICON }, "react"),
    ).toThrow('Use either "name" or "icon", not both.');
  });
});

// ─── Icon set lookup ──────────────────────────────────────────────────────────

describe("resolveIcon — name lookup", () => {
  it("throws a clear error when the icon set is not found", () => {
    expect(() => resolveIcon({ name: "missing:icon" }, "react")).toThrow(
      /Icon set "missing" not found/,
    );
  });

  it("throws when no colon prefix and local set is empty", () => {
    expect(() => resolveIcon({ name: "simple" }, "react")).toThrow(
      /Icon set "local" not found/,
    );
  });
});

// ─── name prop (registry lookup) — happy path ────────────────────────────────

describe("resolveIcon — name lookup (success)", () => {
  it("resolves a known set:icon name to its body", () => {
    const { inner } = resolveIcon({ name: "test:circle" }, "react");
    expect(inner).toContain("circle");
  });

  it("exposes the exact name string via the default data-icon attribute", () => {
    const { dataAttr } = resolveIcon({ name: "test:circle" }, "react");
    expect(dataAttr).toEqual({ name: "data-icon", value: "test:circle" });
  });

  it("returns attrs with a viewBox derived from the collection dimensions", () => {
    const { attrs } = resolveIcon({ name: "test:circle" }, "react");
    expect(attrs.viewBox).toBe("0 0 24 24");
  });

  it("resolves an aliased icon name through its parent", () => {
    const { inner } = resolveIcon({ name: "test:circle-alias" }, "react");
    expect(inner).toContain("circle");
  });

  it("throws a clear error when the icon key is missing from a known set", () => {
    expect(() => resolveIcon({ name: "test:nope" }, "react")).toThrow(
      /Icon "nope" not found in set "test"/,
    );
  });
});

// ─── icon prop (import path) ──────────────────────────────────────────────────

describe("resolveIcon — icon prop", () => {
  it('exposes "astro-iconset:import" via the default data-icon attribute', () => {
    const { dataAttr } = resolveIcon({ icon: SIMPLE_ICON }, "react");
    expect(dataAttr).toEqual({ name: "data-icon", value: "astro-iconset:import" });
  });

  it("returns attrs with viewBox from iconToSVG", () => {
    const { attrs } = resolveIcon({ icon: SIMPLE_ICON }, "react");
    expect(attrs).toHaveProperty("viewBox");
  });

  it("includes the icon body in inner", () => {
    const { inner } = resolveIcon({ icon: SIMPLE_ICON }, "react");
    expect(inner).toContain("circle");
  });
});

// ─── size / width / height ────────────────────────────────────────────────────

describe("resolveIcon — sizing", () => {
  it("size sets both width and height when neither is explicit", () => {
    const { attrs } = resolveIcon({ icon: SIMPLE_ICON, size: 32 }, "react");
    expect(attrs.width).toBe("32");
    expect(attrs.height).toBe("32");
  });

  it("explicit width overrides size on the width axis", () => {
    const { attrs } = resolveIcon({ icon: SIMPLE_ICON, size: 32, width: 48 }, "react");
    expect(attrs.width).toBe("48");
    expect(attrs.height).toBe("32");
  });

  it("explicit height overrides size on the height axis", () => {
    const { attrs } = resolveIcon({ icon: SIMPLE_ICON, size: 32, height: 48 }, "react");
    expect(attrs.width).toBe("32");
    expect(attrs.height).toBe("48");
  });

  it("width and height together fully override size", () => {
    const { attrs } = resolveIcon({ icon: SIMPLE_ICON, size: 32, width: 40, height: 50 }, "react");
    expect(attrs.width).toBe("40");
    expect(attrs.height).toBe("50");
  });
});

// ─── title / desc ─────────────────────────────────────────────────────────────

describe("resolveIcon — title and desc", () => {
  it("prepends <title> when provided", () => {
    const { inner } = resolveIcon({ icon: SIMPLE_ICON, title: "My Icon" }, "react");
    expect(inner).toContain("<title>My Icon</title>");
  });

  it("prepends <desc> when provided", () => {
    const { inner } = resolveIcon({ icon: SIMPLE_ICON, desc: "A circle" }, "react");
    expect(inner).toContain("<desc>A circle</desc>");
  });

  it("HTML-escapes title content", () => {
    const { inner } = resolveIcon({ icon: SIMPLE_ICON, title: "<b>&</b>" }, "react");
    expect(inner).toContain("&lt;b&gt;&amp;&lt;/b&gt;");
    expect(inner).not.toContain("<b>");
  });

  it("HTML-escapes desc content", () => {
    const { inner } = resolveIcon({ icon: SIMPLE_ICON, desc: 'A > B & C < "D"' }, "react");
    expect(inner).toContain("&amp;");
    expect(inner).toContain("&lt;");
    expect(inner).toContain("&gt;");
  });

  it("title appears before desc in inner", () => {
    const { inner } = resolveIcon({ icon: SIMPLE_ICON, title: "T", desc: "D" }, "react");
    expect(inner.indexOf("<title>")).toBeLessThan(inner.indexOf("<desc>"));
  });
});
