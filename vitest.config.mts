import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    pool: "forks",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: {
        functions: 80,
        lines: 80,
      },
      include: ["hooks/**/*.ts", "lib/**/*.ts"],
      exclude: [
        "**/node_modules/**",
        "**/__tests__/**",
        "**/*.test.ts",
        "**/*.d.ts",
        "**/*.tsx",
        "lib/types.ts",
        "lib/data/**",
        "hooks/use-scroll-to-top.ts",
        "hooks/use-scroll-to.ts",
        "hooks/use-share.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "content-collections": path.resolve(
        __dirname,
        "./.content-collections/generated",
      ),
    },
  },
});
