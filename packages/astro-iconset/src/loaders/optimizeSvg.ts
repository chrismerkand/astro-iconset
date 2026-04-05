import {
  cleanupSVG,
  isEmptyColor,
  parseColors,
  runSVGO,
  SVG,
} from "@iconify/tools";
import type { Color, SVGOOptions } from "../../typings/iconify";

/**
 * Shared pipeline for local SVGs: cleanup, currentColor for monotone icons, SVGO.
 * Used by directory import and `?icon` file imports.
 */
export async function optimizeSvg(
  svg: SVG,
  options: SVGOOptions = { plugins: ["preset-default"] },
): Promise<void> {
  cleanupSVG(svg, { keepTitles: true });

  if (await isMonochrome(svg)) {
    await convertToCurrentColor(svg);
  }

  runSVGO(svg, options);
}

async function convertToCurrentColor(svg: SVG): Promise<void> {
  await parseColors(svg, {
    defaultColor: "currentColor",
    callback: (_, colorStr, color) => {
      return color === null || isEmptyColor(color) || isWhite(color)
        ? colorStr
        : "currentColor";
    },
  });
}

async function isMonochrome(svg: SVG): Promise<boolean> {
  let monochrome = true;
  await parseColors(svg, {
    defaultColor: "currentColor",
    callback: (_, colorStr, color) => {
      if (!monochrome) return colorStr;
      monochrome =
        !color || isEmptyColor(color) || isWhite(color) || isBlack(color);
      return colorStr;
    },
  });

  return monochrome;
}

function isBlack(color: Color): boolean {
  switch (color.type) {
    case "rgb":
      return color.r === 0 && color.r === color.g && color.g === color.b;
  }
  return false;
}

function isWhite(color: Color): boolean {
  switch (color.type) {
    case "rgb":
      return color.r === 255 && color.r === color.g && color.g === color.b;
  }
  return false;
}
