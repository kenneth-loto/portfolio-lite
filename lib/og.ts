async function loadFont(filename: string) {
  const response = await fetch(
    new URL(`../public/fonts/${filename}`, import.meta.url),
  );

  if (!response.ok) {
    throw new Error(`Failed to load font: ${filename}`);
  }

  return await response.arrayBuffer();
}

async function loadFonts() {
  const [fontRegular, fontMedium] = await Promise.all([
    loadFont("GeistMono-Regular.ttf"),
    loadFont("GeistMono-Medium.ttf"),
  ]);

  return { fontRegular, fontMedium };
}

let fontsPromise: ReturnType<typeof loadFonts> | null = null;

export function getFonts() {
  if (!fontsPromise) {
    fontsPromise = loadFonts();
  }

  return fontsPromise;
}
