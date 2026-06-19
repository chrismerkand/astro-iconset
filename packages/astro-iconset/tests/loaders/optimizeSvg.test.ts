import { describe, it, expect } from "vitest";
import { SVG } from "@iconify/tools";
import { optimizeSvg } from "../../src/loaders/optimizeSvg.js";

/** Run the optimize pipeline on raw SVG markup and return the resulting body. */
async function optimizeBody(markup: string): Promise<string> {
  const svg = new SVG(markup);
  await optimizeSvg(svg);
  return svg.getIcon().body;
}

// ─── monochrome → currentColor ────────────────────────────────────────────────

describe("optimizeSvg — monochrome handling", () => {
  it("converts a single black fill to currentColor", async () => {
    const body = await optimizeBody(
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#000000"/></svg>',
    );
    expect(body).toContain("currentColor");
    expect(body).not.toContain("#000000");
  });

  it("treats an icon with no explicit color as monochrome (no crash)", async () => {
    const body = await optimizeBody(
      '<svg viewBox="0 0 24 24"><path d="M3 12L12 3L21 12L12 21Z"/></svg>',
    );
    expect(typeof body).toBe("string");
    expect(body.length).toBeGreaterThan(0);
  });
});

// ─── multicolor preservation ──────────────────────────────────────────────────

describe("optimizeSvg — multicolor handling", () => {
  it("preserves distinct colors on a multicolor icon (no currentColor coercion)", async () => {
    const body = await optimizeBody(
      '<svg viewBox="0 0 24 24">' +
        '<rect x="0" y="0" width="12" height="24" fill="#ff0000"/>' +
        '<rect x="12" y="0" width="12" height="24" fill="#0000ff"/>' +
        "</svg>",
    );
    // A genuinely multicolor icon must NOT be flattened to currentColor.
    expect(body).not.toContain("currentColor");
    expect(body.toLowerCase()).toContain("red");
  });
});
