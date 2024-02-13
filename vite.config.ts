import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    minify: true,
    cssCodeSplit: true,
    cssMinify: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "lib/index.ts"),
      name: "Ant Design Filter Builder",
      // the proper extensions will be added
      fileName: "antd-filter-builder",
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // preserveModules: true,
        // preserveModulesRoot: "src",
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [react(), dts({ include: ["lib"], copyDtsFiles: true })],
});
