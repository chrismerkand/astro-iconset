import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";
import preact from "@astrojs/preact";
import solid from "@astrojs/solid-js";
import icon from "astro-iconset";
import tailwindcss from "@tailwindcss/vite";

// Local icon directory demos live on `/local-icons/` — see that page and `playground/src/pages/local-icons.astro`.
// https://astro.build/config
export default defineConfig({
  integrations: [
    // JSX frameworks need include paths to avoid transformer conflicts with each other
    react({ include: ["**/react/**", "**/*.react.tsx"] }),
    preact({ include: ["**/preact/**", "**/*.preact.tsx"] }),
    solid({ include: ["**/solid/**", "**/*.solid.tsx"] }),
    // Vue and Svelte use their own file extensions — no include needed
    vue(),
    svelte(),
    icon({
      iconDir: ["src/icons", "src/extra-icons"],
      iconDirs: {
        brand: "src/brand-icons",
        ui: "src/ui-icons",
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});