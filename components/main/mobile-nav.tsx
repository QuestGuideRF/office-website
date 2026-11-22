"использовать клиент";
import Link from "next/link";
import { useExtracted } from "next-intl";
import { FolderOpen, Layout, Settings, Info } from "lucide-react";
import { cn } from "@/lib/utils";
interface MobileNavProps {
  pathname: string;
  className?: string;
}
export function MobileNav({ pathname, className }: MobileNavProps) {
  const t = useExtracted();
  const navItems = [
    { id: "open", label: t("Open"), icon: FolderOpen, href: "/" },
    {
      id: "template",
      label: t("Template"),
      icon: Layout,
      href: "/template",
    },
    {
      id: "settings",
      label: t("Settings"),
      icon: Settings,
      href: "/settings",
    },
  ];
  return (
    <div
      className={cn(
        "flex items-center justify-around bg-card border-t border-border p-2 pb-safe",
        className,
      )}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center разрыв-1,5 px-4 py-2 округлый-lg переходные цвета мин-w-[64px]",
              isActive
                ? "text-primary bg-primary/10"
                : "text-text-вторичный hover: text-foreground active: bg-muted",
            )}
          >
            <item.icon
              className={cn(
                "ш-6 ч-6",
                isActive ? "text-primary" : "text-text-secondary",
              )}
              strokeWidth={2}
            />
            <span className="текст-[10px] шрифт-средний ведущий-нет">
              {item.label}
            </span>
          </Link>
        );
      })}
      <Link
        href="/about"
        className={cn(
          "flex flex-col items-center justify-center разрыв-1,5 px-4 py-2 округлый-lg переходные цвета мин-w-[64px]",
          pathname === "/about"
            ? "text-primary bg-primary/10"
            : "text-text-вторичный hover: text-foreground active: bg-muted",
        )}
      >
        <Info
          className={cn(
            "ш-6 ч-6",
            pathname === "/about" ? "text-primary" : "text-text-secondary",
          )}
          strokeWidth={2}
        />
        <span className="текст-[10px] шрифт-средний ведущий-нет">
          {t("About")}
        </span>
      </Link>
    </div>
  );
}