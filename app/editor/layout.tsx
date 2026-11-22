import type { Metadata } from "next";
import { PropsWithChildren } from "react";
export const metadata: Metadata = {
  title: "Онлайн-редактор документов — редактируйте файлы Word, Excel и PowerPoint",
  description:
    "Edit Word (.docx), Excel (.xlsx), and PowerPoint (.pptx) files directly in your browser — no upload required. A fast, private, serverless office editor powered by ZIZIYI.",
  keywords: [
    "онлайн-редактор документов",
    "редактировать Word онлайн",
    "редактировать Excel онлайн",
    "редактировать PowerPoint онлайн",
    "редактор DOCX",
    "XLSX-редактор",
    "редактор PPTX",
    "офисный редактор браузера",
    "бессерверный редактор документов",
    "локальный редактор файлов",
    "нет загрузки офисного редактора",
    "ЗИЗИЙИ офис",
  ],
  openGraph: {
    title: "Онлайн-редактор документов — редактируйте файлы Word, Excel и PowerPoint",
    description:
      "Редактируйте файлы Word, Excel и PowerPoint прямо в браузере. Никакой загрузки, никакого сервера — полностью конфиденциально и без сервера.",
    type: "website",
    siteName: "Веб-офисный пакет от ZIZIYI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Онлайн-редактор документов — редактируйте файлы Word, Excel и PowerPoint",
    description:
      "Редактируйте файлы Word, Excel и PowerPoint прямо в браузере. Никакой загрузки, никакого сервера — полностью конфиденциально и без сервера.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://office.ziziyi.com/editor",
  },
};
export default function Layout({ children }: PropsWithChildren<{}>) {
  return <>{children}</>;
}