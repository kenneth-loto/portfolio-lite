import { readFile } from "node:fs/promises";
import { join } from "node:path";

const FONTS_DIR = join(process.cwd(), "public/fonts");

async function loadFont(filename: string) {
  const buffer = await readFile(join(FONTS_DIR, filename));

  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );
}

async function loadFonts() {
  const [fontRegular] = await Promise.all([loadFont("SpaceMono-Regular.ttf")]);

  return { fontRegular };
}

let fontsPromise: ReturnType<typeof loadFonts> | null = null;

export function getFonts() {
  if (!fontsPromise) {
    fontsPromise = loadFonts();
  }

  return fontsPromise;
}
