import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");
const indexHtml = path.join(dist, "index.html");
const out404 = path.join(dist, "404.html");
const sitemapPath = path.join(dist, "sitemap.xml");

// ── 1. SPA 404 fallback ──────────────────────────────────────────────────────
if (!fs.existsSync(indexHtml)) {
  console.warn("postbuild-spa: dist/index.html missing, skipping 404.html copy");
  process.exit(0);
}
fs.copyFileSync(indexHtml, out404);
console.log("postbuild-spa: copied dist/index.html → dist/404.html");

// ── 2. Stamp <lastmod> in generated sitemap ──────────────────────────────────
// vite-plugin-sitemap does not add <lastmod>. We inject today's ISO date
// (YYYY-MM-DD) into every <url> block so Google sees accurate freshness signals.
if (fs.existsSync(sitemapPath)) {
  const today = new Date().toISOString().slice(0, 10); // e.g. "2025-03-21"
  let xml = fs.readFileSync(sitemapPath, "utf8");

  // Insert <lastmod> after each <loc>...</loc> if not already present.
  xml = xml.replace(
    /(<loc>[^<]+<\/loc>)(?!\s*<lastmod>)/g,
    `$1<lastmod>${today}</lastmod>`
  );

  fs.writeFileSync(sitemapPath, xml, "utf8");
  console.log(`postbuild-spa: stamped <lastmod>${today}</lastmod> in dist/sitemap.xml`);
} else {
  console.warn("postbuild-spa: dist/sitemap.xml not found, skipping lastmod stamp");
}
