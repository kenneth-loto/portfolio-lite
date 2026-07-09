export async function getFonts() {
  const [fontRegular, fontMedium] = await Promise.all([
    fetch(
      new URL("../public/fonts/GeistMono-Regular.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer()),

    fetch(
      new URL("../public/fonts/GeistMono-Medium.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer()),
  ]);

  return { fontRegular, fontMedium };
}
