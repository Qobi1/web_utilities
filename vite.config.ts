import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap"; // 1. Import the plugin

export default defineConfig(({ mode }) => ({
  base: "/", 
  
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    // 2. Add the Sitemap configuration here
    Sitemap({
      hostname: "https://devutils.app",
      dynamicRoutes: [
        "/case-converter",
        "/remove-duplicates",
        "/sort-text",
        "/word-counter",
        "/reverse-text",
        "/remove-spaces",
        "/extract-emails-urls",
        "/text-to-slug",
        "/find-replace",
        "/base64",
        "/url-encoder",
        "/html-encoder",
        "/json-escape",
        "/binary-text",
        "/hex-text",
        "/unicode-converter",
        "/json-formatter",
        "/json-xml",
        "/yaml-json",
        "/sql-formatter",
        "/regex-tester",
        "/uuid-generator",
        "/code-minifier",
        "/http-headers",
        "/api-tester",
        "/cron-parser",
        "/diff-checker",
        "/jwt-decoder",
        "/password-generator",
      ],
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));