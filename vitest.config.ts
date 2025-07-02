import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ["./tests/setupTests.tsx"],
    pool: "threads",
    poolOptions: {
      threads: {
        useAtomics: true,
      },
    },
    globals: true,
    environment: "jsdom",
    css: true,
    clearMocks: true,
    cache: false,
  },
});
