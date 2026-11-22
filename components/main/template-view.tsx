"использовать клиент";
import { useState, useEffect } from "react";
import {
  Search,
  Files,
  FileText,
  Table,
  Presentation,
  Loader2,
} from "lucide-react";
import { useExtracted } from "next-intl";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/магазин";
interface Template {
  name: string;
  filename: string;
  preview: string;
  type: "pptx" | "docx" | "xlsx";
  category: string;
}
export function TemplateView() {
  const t = useExtracted();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);
  const router = useRouter();
  const server = useAppStore((state) => state.server);
  useEffect(() => {
    fetch("/files/templates.json")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error("Не удалось загрузить шаблоны:", err));
  }, []);
  const handleTemplateClick = async (tpl: Template) => {
    if (loadingTemplate) return;
    setLoadingTemplate(tpl.name);
    try {
      const url = `/files/${encodeURIComponent(tpl.filename)}`;
      await server.openUrl(url, { fileType: tpl.type, fileName: tpl.filename });
      router.push("/editor");
    } catch (err) {
      console.error("Не удалось открыть шаблон:", err);
    } finally {
      setLoadingTemplate(null);
    }
  };
  const types = [
    { name: t("All"), icon: Files, key: "All" },
    { name: t("Word"), icon: FileText, key: "Word" },
    { name: t("Excel"), icon: Table, key: "Excel" },
    { name: t("PowerPoint"), icon: Presentation, key: "PowerPoint" },
  ];
  const categories = [
    "All",
    ...Array.from(new Set(templates.map((t) => t.category))),
  ];
  const getTypeColor = (type: string) => {
    switch (type) {
      case "pptx":
        return "text-orange-600 bg-orange-50 border-orange-200 темный:bg-orange-950/30 темный:bg-orange-900/50 темный:text-orange-400";
      case "docx":
        return "text-blue-600 bg-blue-50 border-blue-200 темный:bg-blue-950/30 темный:bg-blue-900/50 темный:text-blue-400";
      case "xlsx":
        return "text-green-600 bg-green-50 border-green-200 dark:bg-green-950/30 dark:bg-green-900/50 dark:text-green-400";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
  };
  const filteredTemplates = templates.filter((tpl) => {
    const matchesSearch = tpl.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      activeType === "All" ||
      (activeType === "Word" && tpl.type === "docx") ||
      (activeType === "Excel" && tpl.type === "xlsx") ||
      (activeType === "PowerPoint" && tpl.type === "pptx");
    const matchesCategory =
      activeCategory === "All" || tpl.category === activeCategory;
    return matchesSearch && matchesType && matchesCategory;
  });
  return (
    <div className="space-y-8 анимация плавное появление слайд-вниз-4 длительность-500">
      <section className="flex-col элементы-центр">
        <div className="flex flex-col зазор-2 mb-8 текстовый центр max-w-2xl mx-auto">
          <h2 className="шрифт text-3xl-жирный, трекинг-плотный">
            {t("Библиотека шаблонов")}
          </h2>
          <p className="text-text-secondary">
            {t("Профессиональный дизайн, адаптированный к вашим потребностям в производительности.")}
          </p>
        </div>
        {}
        <div className="относительная w-полная макс-w-xl mb-12">
          <Search className="абсолютный левый-4 сверху-1/2 -translate-y-1/2 w-5 h-5 text-text-вторичный" />
          <input
            type="text"
            placeholder={t(
              "Search for templates (e.g. 'Resume', 'Report', 'Pitch')...",
            )}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-card border border-border rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-base"
          />
        </div>
        {}
        <div className="ж-полное пространство-у-4 мб-10">
          <div className="flex flex-wrap разрыв-4 выравнивание по центру">
            {types.map((type) => (
              <button
                key={type.key}
                onClick={() => setActiveType(type.key)}
                className={cn(
                  "flex items-centergap-2 px-6 py-3 rounded-xl bordertransition-all шрифт-полужирный",
                  activeType === type.key
                    ? "bg-primary border-primary text-primary-foreground тень-lg тень-первичный/20 масштаб-105"
                    : "bg-card border-border text-foreground hover:border-primary/50 hover:bg-sidebar-hover",
                )}
              >
                <type.icon className="ш-5 ч-5" />
                {type.name}
              </button>
            ))}
          </div>
        </div>
        <div className="ж-полное пространство-у-4 мб-12">
          <div className="flex flex-wrap разрыв-2 выравнивание по центру">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 закругленная полная граница text-sm шрифт-средний переход-все фокус: контур-нет",
                  activeCategory === cat
                    ? "bg-передний план граница переднего плана текстовый фон тень-MD"
                    : "bg-card border-border text-text-вторичный hover:border-foreground hover:text-foreground",
                )}
              >
                {cat === "All" ? t("All") : cat}
              </button>
            ))}
          </div>
        </div>
        {}
        <div className="сетка Grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 зазор-8 w-full">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((tpl, i) => (
              <button
                key={i}
                onClick={() => handleTemplateClick(tpl)}
                disabled={!!loadingTemplate}
                className="flex flex-col gap-4 group text-left focus:outline-none"
              >
                <div className="аспект-видео округленный-2xl граница граница-граница bg-card group-hover:border-primary/50 group-hover:shadow-xl переход-все относительное переполнение-скрыто flex flex-col items-center justify-center">
                  <img
                    src={`/files/${encodeURIComponent(tpl.preview)}`}
                    alt={tpl.name}
                    className="w-full h-full объект-покрытие объекта-верхняя группа-наведение: масштаб-110 длительность перехода-трансформации-700 облегчение"
                  />
                  {loadingTemplate === tpl.name && (
                    <div className="абсолютная вставка-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20">
                      <Loader2 className="w-10 h-10 текстовый белый анимация-спин" />
                    </div>
                  )}
                  <div className="абсолютный топ-3 правый-3 z-10">
                    <div
                      className={cn(
                        "px-2.5 py-1 округлый-lg text-[10px] шрифт-черная прописная граница тень-sm",
                        getTypeColor(tpl.type),
                      )}
                    >
                      {tpl.type}
                    </div>
                  </div>
                  <div className="абсолютная вставка-0 bg-linear-to-t от черного/60 через прозрачность до прозрачности непрозрачности-0 group-hover:opacity-100 длительность перехода-непрозрачности-300" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white text-xs шрифт-жирный px-3 py-1.5 bg-primary rounded-lg тень-lg">
                      {t("Использовать шаблон")}
                    </span>
                  </div>
                </div>
                <div className="px-1">
                  <p className="font-bold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {tpl.name}
                  </p>
                  <div className="гибкие элементы-центральный зазор-2">
                    <span
                      className={cn(
                        "text-[10px] шрифт-черный верхний регистр Tracking-Tight",
                        getTypeColor(tpl.type).split(" ")[0],
                      )}
                    >
                      {tpl.type}
                    </span>
                    <span className="text-[10px] text-text-вторичный">•</span>
                    <span className="text-[10px] text-text-вторичный средний шрифт">
                      {tpl.category}
                    </span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-full py-20 текстовый центр space-y-4">
              <div className="w-16 h-16 bg-sidebar-hover rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 текст-текст-вторичный" />
              </div>
              <p className="текст-текст-вторичный шрифт-средний">
                {t("Не найдено шаблонов, соответствующих вашим критериям.")}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveType("All");
                  setActiveCategory("All");
                }}
                className="text-primary text-sm шрифт-жирный при наведении: подчеркивание"
              >
                {t("Очистить все фильтры")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}