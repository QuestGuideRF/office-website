import type { Metadata } from "next";
import { OpenView } from "@/компоненты/основной/открытый просмотр";
export const metadata: Metadata = {
  title: "Открывайте и редактируйте документы Office онлайн — ZIZIYI Office",
  description:
    "A serverless, privacy-first web office application. Open, view, and edit Word (.docx), Excel (.xlsx), and PowerPoint (.pptx) documents directly in your browser — no upload, no server, fully local.",
  keywords: [
    "веб-офис",
    "онлайн-редактор документов",
    "открыть документ в браузере",
    "Слово онлайн",
    "Excel онлайн",
    "PowerPoint онлайн",
    "Просмотрщик DOCX",
    "XLSX-редактор",
    "редактор PPTX",
    "бессерверный офис",
    "privacy-first",
    "ZIZIYI",
    "OnlyOffice",
  ],
  alternates: {
    canonical: "https://office.ziziyi.com",
  },
  openGraph: {
    title: "Открывайте и редактируйте документы Office онлайн — ZIZIYI Office",
    description:
      "Открывайте, просматривайте и редактируйте документы Word, Excel и PowerPoint полностью в браузере. Никакой загрузки, никакого сервера — ваши файлы остаются конфиденциальными.",
    url: "https://office.ziziyi.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Открывайте и редактируйте документы Office онлайн — ZIZIYI Office",
    description:
      "Открывайте, просматривайте и редактируйте документы Word, Excel и PowerPoint полностью в браузере. Никакой загрузки, никакого сервера — ваши файлы остаются конфиденциальными.",
  },
};
export default function HomePage() {
  return <OpenView />;
}