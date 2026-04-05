import { importDirectory } from "@iconify/tools";
import type { IconifyAliases, IconifyIcon } from "@iconify/types";
import type { IconCollection } from "../../typings/integration";
import type { SVGOOptions } from "../../typings/iconify";
import { optimizeSvg } from "./optimizeSvg.js";

const keyword = (file: { subdir: string; file: string }) => file.subdir + file.file;

/**
 * Load one filesystem directory into an Iconify collection with the given prefix.
 */
export async function loadLocalCollectionFromDir(
  dir: string,
  prefix: string,
  options: SVGOOptions = { plugins: ["preset-default"] },
): Promise<IconCollection> {
  const local = await importDirectory(dir, {
    prefix,
    keepTitles: true,
    includeSubDirs: true,
    ignoreImportErrors: "warn",
    keyword,
  });

  await local.forEach(async (name, type) => {
    if (type !== "icon") {
      return;
    }

    const svg = local.toSVG(name);
    if (svg === null) {
      local.remove(name);
      return;
    }

    try {
      await optimizeSvg(svg, options);
    } catch (err) {
      console.error(`Error parsing ${name}:`, err);
      local.remove(name);
      return;
    }

    local.fromSVG(name, svg);
  });

  return local.export(true);
}

/**
 * Merge several directories into one **`local`** collection. Duplicate icon or alias keys throw.
 */
export async function loadMergedLocalIconDirs(
  absoluteDirs: string[],
  options: SVGOOptions = { plugins: ["preset-default"] },
): Promise<IconCollection> {
  if (absoluteDirs.length === 0) {
    throw new Error(
      "[astro-iconset] No local icon directories to load (iconDir / iconDirs.local).",
    );
  }
  if (absoluteDirs.length === 1) {
    return loadLocalCollectionFromDir(absoluteDirs[0]!, "local", options);
  }

  const parts: { root: string; data: IconCollection }[] = [];
  for (const root of absoluteDirs) {
    const data = await loadLocalCollectionFromDir(root, "local", options);
    parts.push({ root, data });
  }

  return mergeIconifyCollections(parts, "local");
}

function mergeIconifyCollections(
  parts: { root: string; data: IconCollection }[],
  prefix: string,
): IconCollection {
  const icons: Record<string, IconifyIcon> = {};
  const aliases: IconifyAliases = {};
  const iconSource = new Map<string, string>();

  for (const { root, data } of parts) {
    for (const name of Object.keys(data.icons ?? {})) {
      const icon = data.icons![name];
      if (icons[name] !== undefined) {
        const first = iconSource.get(name);
        throw new Error(
          `[astro-iconset] Duplicate icon key "${name}" when merging iconDir paths "${first}" and "${root}".`,
        );
      }
      iconSource.set(name, root);
      icons[name] = icon;
    }
    for (const aliasName of Object.keys(data.aliases ?? {})) {
      const target = data.aliases![aliasName]!;
      if (aliases[aliasName] !== undefined) {
        throw new Error(
          `[astro-iconset] Duplicate alias "${aliasName}" when merging iconDir paths.`,
        );
      }
      aliases[aliasName] = target;
    }
  }

  const out: IconCollection = {
    prefix,
    icons,
  };
  if (Object.keys(aliases).length > 0) {
    out.aliases = aliases;
  }
  return out;
}
