import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Builds a single ES module straight into the integration's frontend folder,
// so the committed bundle is what the Marketplace (formerly HACS) ships.
export default defineConfig({
  plugins: [react()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: "../custom_components/zha_scenes/frontend",
    emptyOutDir: true,
    lib: {
      entry: "src/main.tsx",
      formats: ["es"],
      fileName: () => "zha-scenes-panel.js",
    },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
