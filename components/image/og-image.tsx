import React from "react";
import { promises as fs } from "fs";
import path from "path";
interface OgImageProps {
  title?: string;
  subtitle?: string;
  brandName?: string;
}
const ORANGE = "#FF5900";
const LOGO_PATH = path.join(process.cwd(), "public", "logo.png");
const CARD_STYLE = {
  border: "1 пиксель сплошной rgba(255,255,255,0,3)",
  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
} as const;
let logoDataUri = "";
let logoLoaded = false;
async function getLogoDataUri() {
  if (logoLoaded) {
    return logoDataUri;
  }
  logoLoaded = true;
  try {
    const logoData = await fs.readFile(LOGO_PATH);
    logoDataUri = `данные:изображение/png;base64,${logoData.toString("base64")}`;
  } catch (error) {
    console.error("Не удалось прочитать logo.png:", error);
  }
  return logoDataUri;
}
function splitBrandName(brandName: string) {
  const parts = brandName.trim().split(/\s+/).filter(Boolean);
  return {
    primary: parts[0] ?? "",
    secondary: parts.slice(1).join(" "),
  };
}
export const OgImage = async ({
  title = "Открытие и редактирование документов Office",
  subtitle = "Нет загрузки | Нет сервера | Полностью приватный",
}: OgImageProps) => {
  const logoBase64 = await getLogoDataUri();
  return (
    <div
      tw="гибкий w-полный h-полный относительный"
      style={{
        background: "#080808",
        fontFamily: "Интер, Смайлик без засечек, без засечек",
        display: "flex",
      }}
    >
      <div
        tw="absolute top-[-20%] right-[-10%] w-[70%] h-[90%] rounded-full"
        style={{
          background:
            "радиальный градиент (круг, rgba(255, 89, 0, 0,18) 0%, rgba(255, 89, 0, 0) 70%)",
        }}
      />
      <div
        tw="absolute bottom-[-20%] left-[-10%] w-[50%] h-[70%] rounded-full"
        style={{
          background:
            "радиальный градиент (круг, rgba(255, 255, 255, 0,05) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
      />
      <div
        tw="абсолютная вставка-0 w-full h-full"
        style={{
          backgroundImage:
            "радиальный градиент (rgba(255,255,255,0.08) 1 пиксель, прозрачный 1 пиксель)",
          backgroundSize: "40 пикселей 40 пикселей",
        }}
      />
      <div tw="абсолютный топ-20 слева-24 гибкие элементы-центр z-10">
        {logoBase64 ? (
          <img
            src={logoBase64}
            width="64"
            height="64"
            style={{ borderRadius: "16px" }}
          />
        ) : (
          <div
            tw="w-16 h-16 округлый-2xl гибкий центр элементов по центру выравнивания по центру"
            style={{
              background: `линейный градиент (135 градусов, ${ORANGE} 0%, #FF8C40 100%)`,
              boxShadow: "0 8px 16px rgba(255, 89, 0, 0.25)",
            }}
          >
            <span tw="текст-белый текст-4xl, шрифт-черный">Z</span>
          </div>
        )}
        <div tw="гибкий флекс-кол мл-6">
          <span tw="text-[42px] шрифт-черный text-white ведущий-нет отслеживания-плотный">
            Office Suite
          </span>
        </div>
      </div>
      <div
        tw="абсолютный верх-40 левый-0 нижний-40 w-3 округлый-r-полный"
        style={{ background: ORANGE, boxShadow: `0 0 30 пикселей ${ORANGE}` }}
      />
      <div tw="flex flex-1 flex-col justify-center p-24 z-10 mt-12">
        <div tw="гибкий гибкий кол">
          <div
            tw="текст-[84px] шрифт-черный ведущий-нет mb-2"
            style={{
              color: "white",
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>
          <div
            tw="текст-7xl шрифт-черный mb-10"
            style={{
              color: ORANGE,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            in Your Browser
          </div>
          <div tw="гибкий центр элементов">
            <div tw="w-12 h-1 bg-белый/20 мр-6" />
            <div tw="текст-3xl шрифт-средний текст-белый/60">{subtitle}</div>
          </div>
        </div>
      </div>
      <div tw="flex flex-col justify-center pr-24 z-10">
        <div tw="flex-col элементы-центр">
          <div
            tw="flex flex-col items-center justify-center w-40 h-40 rounded-3xl mb-[-50px] z-20"
            style={{
              ...CARD_STYLE,
              background: "линейный градиент (135 градусов, #2b579a 0%, #3b79d6 100%)",
              transform: "поворот (-6 градусов) перевод X (-30 пикселей)",
            }}
          >
            <span tw="текст-белый текст-7xl, шрифт-черный">W</span>
          </div>
          <div
            tw="flex flex-col items-center justify-center w-40 h-40 rounded-3xl mb-[-50px] z-30"
            style={{
              ...CARD_STYLE,
              background: "линейный градиент (135 градусов, #217346 0%, #2ba362 100%)",
              transform: "повернуть (2 градуса)",
            }}
          >
            <span tw="текст-белый текст-7xl, шрифт-черный">X</span>
          </div>
          <div
            tw="flex flex-col items-center justify-center w-40 h-40 округлый-3xl z-40"
            style={{
              ...CARD_STYLE,
              background: "линейный градиент (135 градусов, #c43e1c 0%, #f05228 100%)",
              transform: "поворот (10 градусов) перевод X (30 пикселей)",
            }}
          >
            <span tw="текст-белый текст-7xl, шрифт-черный">P</span>
          </div>
        </div>
      </div>
    </div>
  );
};