import { resolve, relative, extname } from "path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { glob } from "glob";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    minify: true,
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "lib/index.ts"),
      name: "Ant Design Filter Builder",
      // the proper extensions will be added
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react/jsx-runtime"],
      input: Object.fromEntries(
        glob
          .sync("./lib/**/*.{ts,tsx}")
          .map((file) => [
            relative("lib", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // preserveModules: true,
        // preserveModulesRoot: "src",
        globals: {
          react: "React",
        },
        assetFileNames: "asset/[name][extname]",
        entryFileNames: "[name].js",
        inlineDynamicImports: false,
      },
    },
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ["lib"],
      copyDtsFiles: true,
    }),
  ],
});
