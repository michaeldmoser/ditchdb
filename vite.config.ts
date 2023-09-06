/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { env } from "process";

const PORT: number = parseInt(env.VITE_DEV_PORT ?? "5173") || 5173;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "/static",
  publicDir: "./frontend/public",
  root: "./frontend",
  build: {
    manifest: true,
    outDir: "dist",
    rollupOptions: {
      input: "./frontend/src/main.tsx",
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    passWithNoTests: false,
    setupFiles: "./frontend/src/testing/setup.ts",
  },
  server: {
    host: "0.0.0.0",
    port: PORT,
    strictPort: true,
    origin: `http://localhost:${PORT}`,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./frontend/src"),
    },
  },
});
