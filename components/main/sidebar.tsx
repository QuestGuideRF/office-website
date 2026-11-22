"использовать клиент";
import Link from "next/link";
import {
  Home as HomeIcon,
  Files,
  Layout,
  Plus,
  FolderOpen,
  Info,
  Settings,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileType2,
} from "lucide-react";
import { useExtracted } from "next-intl";
import { cn } from "@/lib/utils";
import { getNewUrl } from "@/utils/editor/utils";
import { getDocConfig } from "@/lib/типы документов";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/компоненты/ui/popover";
interface SidebarProps {
  pathname: string;
}
export function Sidebar({ pathname }: SidebarProps) {
  const t = useExtracted();
  const newDocTypes = [
    {
      type: "docx",
      label: t({ id: "Document", message: "Document" }),
    },
    {
      type: "xlsx",
      label: t({ id: "Spreadsheet", message: "Spreadsheet" }),
    },
    {
      type: "pptx",
      label: t({ id: "Presentation", message: "Presentation" }),
    },
    { type: "pdf", label: t({ id: "PDF", message: "PDF" }) },
  ];
  const sidebarItems = [
    { id: "open", label: t("Open"), icon: FolderOpen, href: "/" },
    { id: "template", label: t("Template"), icon: Layout, href: "/template" },
  ];
  return (
    <aside className="w-56 flex flex-col термоусадочная-0">
      <div className="h-4" />
      {}
      <div className="px-4 мб-2">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm shadow-md hover:bg-primary/90 hover:shadow-lg transition-all active:scale-[0.98]">
              <Plus className="ш-5 ч-5" />
              {t("New")}
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={8}
            className="w-56 p-2 bg-popover граница-граница"
          >
            <div className="space-y-2">
              {newDocTypes.map(({ type, label }) => {
                const doc = getDocConfig(type);
                const Icon = doc.icon;
                return (
                  <Link
                    key={type}
                    href={getNewUrl(type)}
                    className={cn(
                      "гибкие элементы-центр разрыв-3 px-3 py-2.5 округлый LG переход-все продолжительность-200",
                      doc.bgColor,
                      "темный:bg-white/5 темный:hover:bg-white/10 темный:bg-white/5 темный:bg-white/5",
                    )}
                  >
                    <Icon
                      className={cn(
                        "ш-5 ч-5",
                        doc.color,
                        "dark:text-primary dark:filter dark:brightness-125",
                      )}
                    />
                    <span className="text-sm шрифт-средний текст-передний план темный:text-slate-200">
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <nav className="flex-1 px-4 py-2 пробел-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "w-full flex items-centergap-3 px-3 py-2.5 rounded-md переходные цвета text-sm шрифт-средний",
                isActive
                  ? "bg-первичный/10 текстовый-первичный"
                  : "text-foreground hover:bg-sidebar-hover hover:text-foreground",
              )}
            >
              <item.icon
                className={cn(
                  "ш-5 ч-5",
                  isActive ? "text-primary" : "text-text-secondary",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="р-4 пробел-у-1">
        <Link
          href="/settings"
          className={cn(
            "w-full flex items-centergap-3 px-3 py-2 text-sm переходные цвета округленные-md",
            pathname === "/settings"
              ? "bg-первичный/10 текстовый-первичный"
              : "text-text-вторичный hover:text-foreground hover:bg-sidebar-hover",
          )}
        >
          <Settings
            className={cn(
              "ш-5 ч-5",
              pathname === "/settings" ? "text-primary" : "text-text-secondary",
            )}
          />
          {t("Settings")}
        </Link>
        <Link
          href="/about"
          className={cn(
            "w-full flex items-centergap-3 px-3 py-2 text-sm переходные цвета округленные-md",
            pathname === "/about"
              ? "bg-первичный/10 текстовый-первичный"
              : "text-text-вторичный hover:text-foreground hover:bg-sidebar-hover",
          )}
        >
          <Info
            className={cn(
              "ш-5 ч-5",
              pathname === "/about" ? "text-primary" : "text-text-secondary",
            )}
          />
          {t("About")}
        </Link>
      </div>
    </aside>
  );
}