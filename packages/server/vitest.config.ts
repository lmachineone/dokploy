import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
        test: {
                environment: "node",
                include: ["__test__/**/*.test.ts"],
        },
        resolve: {
                alias: {
                        "@dokploy/server": resolve(__dirname, "./src"),
                },
        },
});
