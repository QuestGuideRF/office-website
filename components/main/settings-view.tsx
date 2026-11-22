"использовать клиент";
import { useAppStore } from "@/магазин";
import {
  Globe,
  Palette,
  Check,
  Puzzle,
  Star,
  Layers,
  ShieldOff,
} from "lucide-react";
import * as Illustration from "@/компоненты/svg";
import { useExtracted } from "next-intl";
import { cn } from "@/lib/utils";
import { languages, LocaleName, LocaleExtend, Language } from "@ziziyi/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/компоненты/ui/выбрать";
import { OfficeTheme } from "@/utils/editor/types";
import { isDarkTheme } from "@/утилиты/утилиты";
function getLanguageLabel(code: Language): string {
  if (code === LocaleExtend.Auto) {
    return "Авто (Определение языка браузера)";
  }
  return LocaleName[code as keyof typeof LocaleName] || code;
}
const sortedLanguages = [
  LocaleExtend.Auto,
  ...languages
    .filter((code) => code !== LocaleExtend.Auto)
    .sort((a, b) => getLanguageLabel(a).localeCompare(getLanguageLabel(b))),
];
export function SettingsView() {
  const t = useExtracted();
  const { language, theme, plugins, setState } = useAppStore();
  const themes: {
    id: OfficeTheme;
    label: string;
    Illustration: React.ComponentType<any>;
  }[] = [
    {
      id: "theme-white",
      label: t("Современный свет"),
      Illustration: Illustration.ModernLight,
    },
    {
      id: "theme-light",
      label: t("Light"),
      Illustration: Illustration.Light,
    },
    {
      id: "theme-classic-light",
      label: t("Классический свет"),
      Illustration: Illustration.ClassicLight,
    },
    {
      id: "theme-night",
      label: t("Современный Темный"),
      Illustration: Illustration.ModernDark,
    },
    {
      id: "theme-dark",
      label: t("Dark"),
      Illustration: Illustration.Dark,
    },
    {
      id: "theme-contrast-dark",
      label: t("Высокая контрастность"),
      Illustration: Illustration.ContrastDark,
    },
  ];
  const handleThemeChange = (newTheme: OfficeTheme) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ui-theme");
      localStorage.removeItem("ui-theme-id");
      const themeValue = isDarkTheme(newTheme) ? "dark" : "light";
      document.cookie = `тема=${themeValue}; путь=/`;
    }
    setState({ theme: newTheme });
  };
  return (
    <div className="max-w-4xl mx-auto space-y-12 анимация плавное появление слайд-вниз-4 продолжительность-500">
      <div className="space-y-2">
        <h1 className="шрифт text-3xl-жирный, трекинг-плотный">{t("Settings")}</h1>
        <p className="text-text-secondary">
          {t("Настройте предпочитаемый язык и тему редактора.")}
        </p>
      </div>
      <div className="space-y-8">
        {}
        <section className="space-y-4">
          <div className="Flex Items-Center Gap-2 Text-LG Шрифт-Полужирный">
            <Globe className="w-5 h-5 текстовый-первичный" />
            <h2>{t("Language")}</h2>
          </div>
          <Select
            value={language}
            onValueChange={(value) => setState({ language: value as Language })}
          >
            <SelectTrigger className="w-80">
              <SelectValue placeholder={t("Выберите язык")}>
                {getLanguageLabel(language)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {sortedLanguages.map((code) => (
                <SelectItem
                  key={code}
                  value={code}
                  textValue={`${code} ${getLanguageLabel(code)}`}
                >
                  <span className="гибкий гибкий кол">
                    <span className="font-semibold">
                      {getLanguageLabel(code)}
                    </span>
                    <span className="текст-приглушенный-передний план">
                      {code === LocaleExtend.Auto ? "auto" : code}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
        {}
        <section className="space-y-4">
          <div className="Flex Items-Center Gap-2 Text-LG Шрифт-Полужирный">
            <Palette className="w-5 h-5 текстовый-первичный" />
            <h2>{t("Редактор темы")}</h2>
          </div>
          <div className="сетка Grid-cols-2 мин-[450px]:grid-cols-3 пробел-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={cn(
                  "flex flex-col gap-3 p-3 rounded-xl border transition-all text-left group",
                  theme === t.id
                    ? "border-primary bg-primary/5 кольцо-1 кольцо-первичный/20 тень-md"
                    : "border-border hover:border-primary/30 hover:bg-sidebar-hover",
                )}
              >
                <div
                  className={cn(
                    "w-полный аспект-5/3 округлый-LG граница граница-граница/50 тень-внутреннее переполнение-скрытые гибкие элементы-центр выравнивания-центр p-0 bg-вторичный/10",
                  )}
                >
                  <div className="w-full h-full длительность перехода-преобразования-500 group-hover:scale-105">
                    <t.Illustration className="w-полное h-полное покрытие объекта" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-xs шрифт-жирный верхний регистр отслеживание-шире текст-текст-вторичный">
                    {t.label}
                  </span>
                  {theme === t.id && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center тень-lg тень-первичная/20 сжатие-0">
                      <Check className="w-3 h-3 текст-белый" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <div className="Flex Items-Center Gap-2 Text-LG Шрифт-Полужирный">
            <Puzzle className="w-5 h-5 текстовый-первичный" />
            <h2>{t("Plugins")}</h2>
          </div>
          <div className="сетка Grid-cols-1 md:grid-cols-3 зазор-3">
            {[
              { id: "featured", label: t("Загрузить избранные плагины"), icon: Star },
              { id: "all", label: t("Загрузить все плагины"), icon: Layers },
              { id: "none", label: t("Отключить плагины"), icon: ShieldOff },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setState({ plugins: mode.id as any })}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative",
                  plugins === mode.id
                    ? "граница-первичный bg-первичный/5 кольцо-1 кольцо-первичный/15 тень-см"
                    : "border-border hover:border-primary/20 hover:bg-sidebar-hover",
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center переходные цвета сжать-0",
                    plugins === mode.id
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-text-secondary group-hover:bg-primary/10 group-hover:text-primary",
                  )}
                >
                  <mode.icon className="ш-[18 пикселей] ч-[18 пикселей]" />
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0 pr-1">
                  <span className="text-xs, шрифт-жирный, без ведущего, усечь pr-2">
                    {mode.label}
                  </span>
                  {plugins === mode.id && (
                    <Check
                      className="w-3.5 h-3.5 текст-первичный сжатие-0"
                      strokeWidth={3}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
      <div className="p-6 bg-yellow-50/50 темный:bg-yellow-900/10 бордюрный border-yellow-100 темный:bg-yellow-900/30 округлый-2xl">
        <p className="text-sm text-yellow-800 темный:text-yellow-200/80 ведущий-расслабленный">
          {t(
            "Изменение этих настроек повлияет на интерфейс редактора OnlyOffice. Для вступления некоторых изменений в силу может потребоваться перезагрузка редактора.",
          )}
        </p>
      </div>
    </div>
  );
}