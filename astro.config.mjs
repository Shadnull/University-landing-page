// astro.config.mjs
import { defineConfig } from 'astro/config';

// 1. Asegúrate de que estas líneas de importación existan
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // 2. Asegúrate de que las integraciones estén dentro del array
  integrations: [react(), vue(), tailwind()]
});