import { readFile } from "node:fs/promises";
import { SVG } from "@iconify/tools";
import type { IconifyIcon } from "@iconify/types";
import type { SVGOOptions } from "../../typings/iconify";
import { optimizeSvg } from "./optimizeSvg.js";

/** Minimal placeholder used when an SVG cannot be turned into icon data at all. */
const EMPTY_ICON: IconifyIcon = { body: "", width: 16, height: 16 };

/**
 * Read a single SVG file and return Iconify icon data (same normalization as local dir icons).
 *
 * Optimization failures (e.g. SVGs that embed raster images like PNG/JPEG) are
 * non-fatal: we warn and return the un-optimized icon so the build is not broken.
 */
export default async function processSvgFile(
  filePath: string,
  options: SVGOOptions = { plugins: ["preset-default"] },
  onWarn: (msg: string) => void = console.warn,
): Promise<IconifyIcon> {
  const content = await readFile(filePath, "utf-8");
  const svg = new SVG(content);
  try {
    await optimizeSvg(svg, options);
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    onWarn(
      `[astro-iconset] Could not optimize "${filePath}" (${reason}); using it as-is. SVGs that embed raster images (PNG/JPEG) are not fully supported.`,
    );
  }
  try {
    return svg.getIcon();
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    onWarn(
      `[astro-iconset] Could not read icon data from "${filePath}" (${reason}); using an empty placeholder.`,
    );
    return EMPTY_ICON;
  }
}
