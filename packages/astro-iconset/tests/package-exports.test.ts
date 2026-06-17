import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const PKG_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(PKG_DIR, "package.json"), "utf-8"));

/** Collect every relative file path referenced inside the `exports` map. */
function collectTargets(node: unknown, out: string[] = []): string[] {
  if (typeof node === "string") {
    if (node.startsWith("./")) out.push(node);
  } else if (node && typeof node === "object") {
    for (const v of Object.values(node)) collectTargets(v, out);
  }
  return out;
}

const targets = collectTargets(pkg.exports);

describe("package.json exports map", () => {
  it("declares at least the documented entry points", () => {
    expect(Object.keys(pkg.exports)).toEqual(
      expect.arrayContaining([".", "./components", "./react", "./vue", "./svelte", "./preact", "./solid"]),
    );
  });

  it.each(targets.filter((t) => !t.startsWith("./dist")))(
    "source target %s exists on disk",
    (target) => {
      expect(existsSync(join(PKG_DIR, target))).toBe(true);
    },
  );

  it("every ./dist target is declared (built output, present after build)", () => {
    const distTargets = targets.filter((t) => t.startsWith("./dist"));
    // The package ships compiled output; ensure the map actually references it.
    expect(distTargets.length).toBeGreaterThan(0);
  });
});
