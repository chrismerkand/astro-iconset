import { defineConfig } from "astro/config";
import icon from "astro-iconset";

// Local icon directory demos live on `/local-icons/` — see that page and `demo/src/pages/local-icons.astro`.
// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      iconDir: ["src/icons", "src/extra-icons"],
      iconDirs: {
        brand: "src/brand-icons",
        ui: "src/ui-icons",
      },
    }),
  ],
});
