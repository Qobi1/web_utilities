import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, "..", "public");
const svgPath = path.join(pub, "favicon.svg");

async function main() {
  const svg = fs.readFileSync(svgPath);
  const favicon32Path = path.join(pub, "favicon-32.png");
  await sharp(svg).resize(32, 32).png().toFile(favicon32Path);
  await sharp(svg).resize(48, 48).png().toFile(path.join(pub, "favicon-48.png"));
  await sharp(svg).resize(180, 180).png().toFile(path.join(pub, "apple-touch-icon.png"));

  const png32 = fs.readFileSync(favicon32Path);
  const ico = await toIco([png32]);
  fs.writeFileSync(path.join(pub, "favicon.ico"), ico);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
