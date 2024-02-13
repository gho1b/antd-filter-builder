import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    force: true,
  },
  build: {
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "Ant Design Filter Builder",
      // the proper extensions will be added
      fileName: "antd-filter-builder",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        preserveModules: true,
        preserveModulesRoot: "src",
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [react()],
});
