import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                // This tells Sass to ignore the specific deprecation warnings caused by Bootstrap
                silenceDeprecations: [
                    "import",
                    "global-builtin",
                    "color-functions",
                    "if-function",
                    //'mixed-decls'
                ],
            },
        },
    },
});
