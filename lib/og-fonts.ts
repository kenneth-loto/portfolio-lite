import { baseUrl } from "@/app/sitemap";

export async function getFonts() {
  const [regularRes, semiBoldRes] = await Promise.all([
    fetch(`${baseUrl}/fonts/JetBrainsMono-Regular.ttf`),
    fetch(`${baseUrl}/fonts/JetBrainsMono-SemiBold.ttf`),
  ]);

  const [fontRegular, fontSemiBold] = await Promise.all([
    regularRes.arrayBuffer(),
    semiBoldRes.arrayBuffer(),
  ]);

  return { fontRegular, fontSemiBold };
}
