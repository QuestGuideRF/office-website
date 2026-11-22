"использовать клиент";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useExtracted } from "next-intl";
import { Header } from "@/компоненты/основной/заголовок";
import { Sidebar } from "@/компоненты/главная/боковая панель";
import { DragDropOverlay } from "@/компоненты/перетаскивание-оверлей";
import { useAppStore } from "@/магазин";
import { addRecentFile } from "@/utils/последние файлы";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/comComponents/main/mobile-nav";
import { isDarkTheme } from "@/утилиты/утилиты";
import { APP_ROOT, PRELOAD_HTML } from "@/utils/editor/utils";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useExtracted();
  const { server, theme } = useAppStore();
  const [preloadEditor, setPreloadEditor] = useState(false);
  useEffect(() => {
    const isDark = isDarkTheme(theme);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  useEffect(() => {
    setPreloadEditor(true);
  }, []);
  return (
    <div
      className={cn(
        "flex flex-col h-screen overflow-hidden шрифт-без переходных цветов длительность-500 относительная",
        "bg-muted text-slate-900 dark:bg-[#0b0b0b] dark:text-white",
      )}
    >
      {}
      <div className="скрытый темный: блокировать абсолютную вставку-0, переполнение, скрытый указатель-события-нет z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/8 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/6 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-primary/3 rounded-full blur-[100px]"></div>
      </div>
      <Header></Header>
      <div className="flex flex-1 скрытое переполнение flex-col md:flex-row относительно z-10">
        <div className="скрытый md:flex">
          <Sidebar pathname={pathname} />
        </div>
        {}
        <main
          className={cn(
            "flex-1 md:mb-3 rounded-none md:rounded-2xl overflow-hidden flex flex-col переходных цветов длительность-500 тень-нет md:shadow-xl относительный",
            "backdrop-blur-3xl bg-white dark:bg-[#141414]/60 dark:md:border dark:md:border-white/10",
          )}
        >
          <div className="flex-1 overflow-y-auto пользовательская полоса прокрутки">
            <div className="p-4 md:p-8 max-w-6xl mx-auto w-full pb-24 md:pb-8">
              {children}
            </div>
          </div>
        </main>
        <div className="скрытый md:block w-3"></div>
      </div>
      <div className="md:скрытый фиксированный нижний-0 левый-0 правый-0 z-50">
        <MobileNav pathname={pathname} />
      </div>
      {}
      <DragDropOverlay
        onFileDrop={async (file, handle) => {
          if (handle) {
            try {
              await addRecentFile(handle);
            } catch (err) {
              console.error("Не удалось сохранить удаленный файл в недавнем:", err);
            }
          }
          await server.open(file);
          router.push("/editor");
        }}
      />
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--text-secondary);
        }
      `}</style>
      {preloadEditor && (
        <iframe
          className="w-0 h-0 скрытый абсолют -z-10"
          src={APP_ROOT + PRELOAD_HTML}
        />
      )}
    </div>
  );
}