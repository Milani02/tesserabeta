import fs from "node:fs";
import path from "node:path";

export function getPropertyGallery(code: string): string[] {
  const dir = path.join(process.cwd(), "public", "imoveis", code);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file) => `/imoveis/${code}/${file}`);
}
