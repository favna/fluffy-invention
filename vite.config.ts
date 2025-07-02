import { tanstackRouter } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((configEnv) => {
  const env = loadEnv(configEnv.mode, process.cwd(), "");

  return {
    plugins: [tanstackRouter(), react(), tsconfigPaths()],
    define: {
      "process.env": JSON.stringify(env),
    },
    build: {
      target: "es2022",
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes("@mui")) {
              return id.toString().split("@mui/")[1].split("/")[0].toString();
            } else if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  };
});
