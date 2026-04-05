import { readFile } from "node:fs/promises";
import { SVG } from "@iconify/tools";
import type { IconifyIcon } from "@iconify/types";
import type { SVGOOptions } from "../../typings/iconify";
import { optimizeSvg } from "./optimizeSvg.js";

/**
 * Read a single SVG file and return Iconify icon data (same normalization as local dir icons).
 */
export default async function processSvgFile(
  filePath: string,
  options: SVGOOptions = { plugins: ["preset-default"] },
): Promise<IconifyIcon> {
  const content = await readFile(filePath, "utf-8");
  const svg = new SVG(content);
  try {
    await optimizeSvg(svg, options);
  } catch (err) {
    console.error(`[astro-iconset] Error processing ${filePath}:`, err);
    throw err;
  }
  return svg.getIcon();
}
