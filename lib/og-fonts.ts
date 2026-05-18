import { readFileSync } from "node:fs";
import path from "node:path";

export const fontRegular = readFileSync(
  path.join(process.cwd(), "public/fonts/JetBrainsMono-Regular.ttf"),
);

export const fontSemiBold = readFileSync(
  path.join(process.cwd(), "public/fonts/JetBrainsMono-SemiBold.ttf"),
);
