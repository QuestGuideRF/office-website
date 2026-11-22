import type { Metadata } from "next";
import { TemplateView } from "@/компоненты/основной/шаблон-представление";
export const metadata: Metadata = {
  title: "Бесплатные шаблоны Office – Word, Excel и PowerPoint | ЗИЗИЙИ Офис",
  description:
    "Просмотрите бесплатные готовые шаблоны для документов Word, электронных таблиц Excel и презентаций PowerPoint. Вход в систему не требуется — открывайте и редактируйте прямо в браузере.",
  keywords: [
    "бесплатные шаблоны офисов",
    "Шаблон слова",
    "Шаблон Excel",
    "Шаблон PowerPoint",
    "бесплатный шаблон документа",
    "шаблон резюме онлайн",
    "шаблон электронной таблицы",
    "шаблон презентации",
    "веб-офис",
    "ZIZIYI",
  ],
  alternates: {
    canonical: "https://office.ziziyi.com/template",
  },
  openGraph: {
    title: "Бесплатные шаблоны Office – Word, Excel и PowerPoint | ЗИЗИЙИ Офис",
    description:
      "Просмотрите бесплатные готовые шаблоны для документов Word, электронных таблиц Excel и презентаций PowerPoint. Вход в систему не требуется — открывайте и редактируйте прямо в браузере.",
    url: "https://office.ziziyi.com/template",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Бесплатные шаблоны Office – Word, Excel и PowerPoint | ЗИЗИЙИ Офис",
    description:
      "Просмотрите бесплатные готовые шаблоны для Word, Excel и PowerPoint. Вход в систему не требуется — редактируйте прямо в браузере.",
  },
};
export default function TemplatePage() {
  return <TemplateView />;
}