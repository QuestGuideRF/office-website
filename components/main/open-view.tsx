"использовать клиент";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FolderOpen, Clock, X, Loader2 } from "lucide-react";
import { useExtracted } from "next-intl";
import { cn } from "@/lib/utils";
import { getNewUrl } from "@/utils/editor/utils";
import { FilePickerCard } from "@/компоненты/карта-выбора файлов";
import { DocumentIcon } from "@/компоненты/значок документа";
import { getDocConfig } from "@/lib/типы документов";
import { useAppStore } from "@/магазин";
import {
  getRecentFiles,
  openRecentFile,
  removeRecentFile,
  addRecentFile,
  formatRelativeTime,
  type RecentFileRecord,
} from "@/utils/последние файлы";
export function OpenView() {
  const t = useExtracted();
  const [recentFiles, setRecentFiles] = useState<RecentFileRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);
  const router = useRouter();
  const server = useAppStore((state) => state.server);
  useEffect(() => {
    loadRecentFiles();
    loadTemplates();
  }, []);
  const loadRecentFiles = async () => {
    try {
      setIsLoading(true);
      const files = await getRecentFiles();
      setRecentFiles(files);
    } catch (error) {
      console.error("Не удалось загрузить последние файлы:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadTemplates = async () => {
    try {
      const res = await fetch("/files/templates.json");
      const data = await res.json();
      setTemplates(data.slice(0, 5));
    } catch (err) {
      console.error("Не удалось загрузить шаблоны:", err);
    }
  };
  const handleRecentFileClick = async (record: RecentFileRecord) => {
    try {
      const file = await openRecentFile(record);
      if (file) {
        await handleFileSelectWithHandle(file, record.handle);
      } else {
        await loadRecentFiles();
      }
    } catch (error) {
      console.error("Не удалось открыть последний файл:", error);
      await loadRecentFiles();
    }
  };
  const handleTemplateClick = async (tpl: any) => {
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
  const handleRemoveRecentFile = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await removeRecentFile(id);
      await loadRecentFiles();
    } catch (error) {
      console.error("Не удалось удалить последний файл:", error);
    }
  };
  const handleFileSelectWithHandle = async (
    file: File,
    handle?: FileSystemFileHandle,
  ) => {
    if (handle) {
      try {
        await addRecentFile(handle);
        await loadRecentFiles();
      } catch (error) {
        console.error("Не удалось добавить к последним файлам:", error);
      }
    }
    await server.open(file);
    router.push("/editor");
  };
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
  return (
    <div className="space-y-10 анимация плавное появление слайд-вниз-4 длительность-500">
      <section>
        {}
        <FilePickerCard onFileSelectWithHandle={handleFileSelectWithHandle} />
      </section>
      {}
      <section>
        <div className="Гибкий центр элементов, выравнивание между mb-4">
          <h2 className="текст-LG шрифт-жирный">{t("New")}</h2>
        </div>
        <div className="сетка Grid-cols-2 md:flex md:flex-nowrap items-stretch-gap-3 mb-4">
          {newDocTypes.map(({ type, label }) => {
            const doc = getDocConfig(type);
            return (
              <Link
                key={type}
                href={getNewUrl(type)}
                className="flex flex-col items-center justify-center разрыв-2 p-4 bg-muted/40 dark:bg-white/5 border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 переход-все переполнение группы скрыто md:flex-1 md:min-w-0"
              >
                <DocumentIcon
                  type={type}
                  className={cn(
                    "переход-все продолжительность-300",
                    doc.hoverBgColor,
                  )}
                  iconClassName="group-hover:text-white"
                />
                <span className="text-xs шрифт-полужирный цвет перехода">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      {}
      <section>
        <div className="Гибкий центр элементов, выравнивание между mb-4">
          <h2 className="текст-LG шрифт-жирный">{t("Recommended")}</h2>
          <button
            onClick={() => router.push("/template")}
            className="text-xs text-primary font-medium при наведении: подчеркивание"
          >
            {t("Больше шаблонов")}
          </button>
        </div>
        <div className="сеткаgrid-cols-2 md:grid-cols-3 lg:grid-cols-5 зазор-5">
          {templates.map((tpl, i) => (
            <button
              key={i}
              className="flex flex-col gap-2 group text-left focus:outline-none"
              onClick={() => handleTemplateClick(tpl)}
              disabled={!!loadingTemplate}
            >
              <div
                className={cn(
                  "аспект-16/10 округлый-LG граница граница-граница темная: граница-белый/5 тень-см группа-наведение: тень-md группа-наведение: граница-первичный/30 переход-все относительное переполнение-скрыто bg-белый темно: bg-цинк-900",
                )}
              >
                <img
                  src={`/files/${encodeURIComponent(tpl.preview)}`}
                  alt={tpl.name}
                  className="w-full h-full объект-покрытие group-hover:scale-105 переход-преобразование длительность-500 непрозрачность-90 group-hover:opacity-100"
                />
                {loadingTemplate === tpl.name && (
                  <div className="абсолютная вставка-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-20">
                    <Loader2 className="w-6 h-6 текстовый белый анимация-спин" />
                  </div>
                )}
                <div
                  className={cn(
                    "absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase z-10",
                    getDocConfig(tpl.type).color,
                    "dark:text-white dark:bg-primary/80",
                    getDocConfig(tpl.type).lightBgColor,
                  )}
                >
                  {tpl.type}
                </div>
              </div>
              <span className="text-xs font-semibold truncate group-hover:text-primary transition-colors">
                {tpl.name}
              </span>
            </button>
          ))}
        </div>
      </section>
      {}
      <section>
        <div className="Гибкий центр элементов, выравнивание между mb-4">
          <h2 className="текст-LG шрифт-жирный">{t("Recent")}</h2>
        </div>
        {isLoading ? (
          <div className="bg-card/50 border border-border rounded-xl overflow-hiddenshadow-sm p-12 flex items-center justify-center">
            <div className="текстовый центр">
              <Clock className="w-8 h-8 mx-auto mb-2 анимация-пульс" />
              <p className="text-sm">{t("Загрузка последних файлов...")}</p>
            </div>
          </div>
        ) : recentFiles.length === 0 ? (
          <div className="bg-card/50 border border-border rounded-xl overflow-hiddenshadow-sm p-12 flex items-center justify-center">
            <div className="текстовый центр">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 непрозрачность-40" />
              <p className="текст-см шрифт-средний мб-1">{t("Нет последних файлов")}</p>
              <p className="text-xs">
                {t("Открытые вами файлы будут отображаться здесь для быстрого доступа.")}
              </p>
            </div>
          </div>
        ) : (
          <div className="">
            {recentFiles.map((file) => (
              <div
                key={file.path}
                onClick={() => handleRecentFileClick(file)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-sidebar-hover border-b border-border Last:border-0 группа переходных цветов"
                title={t("Нажмите, чтобы снова открыть этот файл")}
              >
                <div className="гибкие элементы-центральный зазор-4">
                  <DocumentIcon type={file.type} size="sm" />
                  <div className="text-left">
                    <p className="шрифт-полужирный текст-см">{file.name}</p>
                    <p className="text-[10px] text-text-вторичный">
                      {formatRelativeTime(file.updatedAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => handleRemoveRecentFile(e, file.path)}
                  className="opacity-0 group-hover:opacity-100 переход-непрозрачность p-1 hover:bg-border/50 округленный"
                  title={t("Удалить из недавних")}
                >
                  <X className="w-4 h-4 текст-текст-вторичный" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}