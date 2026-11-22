"использовать клиент";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  FileType2,
  Files,
} from "lucide-react";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { useExtracted } from "next-intl";
import { cn } from "@/lib/utils";
export function Header({ children }: PropsWithChildren<{}>) {
  const t = useExtracted();
  const quickActions = [
    {
      type: "docx",
      icon: FileText,
      color:
        "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60",
    },
    {
      type: "xlsx",
      icon: FileSpreadsheet,
      color:
        "text-green-600 bg-green-50 dark:bg-green-900/40 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/60",
    },
    {
      type: "pptx",
      icon: Presentation,
      color:
        "text-orange-600 bg-orange-50 dark:bg-orange-900/40 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/60",
    },
    {
      type: "pdf",
      icon: FileType2,
      color:
        "text-red-600 bg-red-50 темный:bg-red-900/40 темный:text-red-400 при наведении:bg-red-100 темный:hover:bg-red-900/60",
    },
  ];
  return (
    <header className="h-16 flex items-center выравнивание-между px-6 z-20 w-полное сжатие-0">
      <div className="гибкие элементы-центральный зазор-3">
        <div className="Гибкий центр элементов, выравнивание центра">
          <img src="/logo.svg" className="w-10 h-10" alt="logo" />
        </div>
        <h1 className="text-lg шрифт-жирный трекинг-нормальный текст-передний план Leading-5 pt-1 text-justify [text-align-last:justify]">
          {"ЗИЗИЙИ Офис"}
          <span className="block text-xs font-normal opacity-85 scale-[1] origin-top-left">
            Docs Sheets Slides
          </span>
        </h1>
      </div>
      {children}
      <div className="скрытый md:flex items-center зазор-2">
        {quickActions.map((action) => (
          <Link
            key={action.type}
            href={`/editor?new=${action.type}`}
            className={cn(
              "p-2 округленный-LG переход-все длительность-200 гибкие элементы-центр выравнивания-центр",
              action.color,
            )}
            title={t("Новый {type}", { type: action.type })}
          >
            <action.icon className="ш-5 ч-5" />
          </Link>
        ))}
      </div>
    </header>
  );
}