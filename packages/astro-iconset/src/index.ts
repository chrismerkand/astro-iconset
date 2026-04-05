import type { IntegrationOptions } from "../typings/integration";
import { createPlugin } from "./vite-plugin-astro-icon.js";
import type { AstroIntegration } from "astro";

/** Icon data from `import icon from "./file.svg?icon"` for `<Icon icon={icon} />`. */
export type { AstroIconImport } from "../typings/astro-icon-import";

export default function createIntegration(
  opts: IntegrationOptions = {},
): AstroIntegration {
  return {
    name: "astro-iconset",
    hooks: {
      "astro:config:setup"({ updateConfig, config, logger }) {
        const external =
          config.output === "static" ? ["@iconify-json/*"] : undefined;
        const { root, output } = config;
        updateConfig({
          vite: {
            plugins: [createPlugin(opts, { root, output, logger })],
            ssr: {
              external,
            },
          },
        });
      },
    },
  };
}
