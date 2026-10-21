import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

// Tool routes (no trailing slash, matches React Router paths)
const toolRoutes = [
  // Text tools
  "/case-converter",
  "/remove-duplicates",
  "/sort-text",
  "/word-counter",
  "/reverse-text",
  "/remove-spaces",
  "/extract-emails-urls",
  "/text-to-slug",
  "/find-replace",
  // Encoding tools
  "/base64",
  "/url-encoder",
  "/html-encoder",
  "/json-escape",
  "/binary-text",
  "/hex-text",
  "/unicode-converter",
  // Technical tools
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
];

const staticPages = ["/about", "/privacy", "/contact"];

// Build per-route priority map
const priorityMap: Record<string, number> = {
  "/": 1.0,
  "/json-formatter": 0.9, // highest-traffic tool
};
[...toolRoutes].forEach(r => {
  if (!priorityMap[r]) priorityMap[r] = 0.8;
});
staticPages.forEach(r => {
  priorityMap[r] = r === "/about" ? 0.5 : 0.4;
});

// Build per-route changefreq map
const changefreqMap: Record<string, string> = { "/": "weekly" };
[...toolRoutes].forEach(r => { changefreqMap[r] = "monthly"; });
staticPages.forEach(r => { changefreqMap[r] = "yearly"; });

export default defineConfig(({ mode }) => ({
  base: "/",

  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),

    /**
     * Generates dist/sitemap.xml at build time.
     * hostname = www primary domain (no redirect chain in <loc> entries).
     * Per-route priority and changefreq via RoutesOptionMap.
     */
    Sitemap({
      hostname: "https://www.toolifyhub.net",
      dynamicRoutes: [...toolRoutes, ...staticPages],
      priority: priorityMap as any,
      changefreq: changefreqMap as any,
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));
