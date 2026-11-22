import { ImageResponse } from "next/og";
import { OgImage } from "@/компоненты/изображение/og-изображение";
import { getOgFonts } from "@/utils/и";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt =
  "Web Office Suite от ZIZIYI — открывайте и редактируйте документы Office онлайн";
export default async function Image() {
  const image = await OgImage({});
  const fonts = await getOgFonts();
  return new ImageResponse(image, {
    ...size,
    fonts,
  });
}