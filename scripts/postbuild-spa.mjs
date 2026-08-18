import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");
const indexHtml = path.join(dist, "index.html");
const out404 = path.join(dist, "404.html");

if (!fs.existsSync(indexHtml)) {
  console.warn("postbuild-spa: dist/index.html missing, skip 404.html copy");
  process.exit(0);
}
fs.copyFileSync(indexHtml, out404);
console.log("postbuild-spa: copied dist/index.html → dist/404.html (GitHub Pages SPA fallback)");
