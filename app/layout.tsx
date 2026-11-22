import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { I18nProvider } from "@/компоненты/i18n-провайдер";
import { ProgressProvider } from "@/компоненты/прогресс-провайдер";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://office.ziziyi.com"),
  title: {
    default: "Web Office Suite от ZIZIYI — открывайте и редактируйте документы Office онлайн",
    template: "%s | Веб-офисный пакет от ZIZIYI",
  },
  description:
    "Локальное приложение для предварительного просмотра и редактирования файлов Office. Открывайте, просматривайте и редактируйте документы Word, Excel и PowerPoint прямо в браузере.",
  keywords: [
    "веб-офис",
    "онлайн-офисный пакет",
    "Слово онлайн",
    "Excel онлайн",
    "PowerPoint онлайн",
    "Просмотрщик DOCX",
    "XLSX-редактор",
    "бессерверный офис",
    "ZIZIYI",
    "OnlyOffice",
  ],
  openGraph: {
    siteName: "Веб-офисный пакет от ZIZIYI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const preload = () => {
    const theme = document.cookie.match(/theme=([^;]+)/)?.[1] || "";
    const dark = window.matchMedia("(предпочитает цветовую схему: темную)").matches;
    const isDark = theme == "dark" || (dark && theme != "light");
    document.documentElement.classList.toggle("dark", isDark);
  };
  return (
    <html suppressHydrationWarning>
      <head>
        <script>{`(${preload.toString()})()()`}</script>
      </head>
      <body>
        <ProgressProvider>
          <I18nProvider initialMessages={messages}>{children}</I18nProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}