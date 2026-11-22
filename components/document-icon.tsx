"использовать клиент";
import { cn } from "@/lib/utils";
import { getDocConfig } from "@/lib/типы документов";
interface DocumentIconProps {
  type: string;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
  variant?: "soft" | "bold";
}
export function DocumentIcon({
  type,
  className,
  iconClassName,
  size = "md",
  variant = "soft",
}: DocumentIconProps) {
  const config = getDocConfig(type);
  const Icon = config.icon;
  const sizeClasses = {
    sm: "w-8 h-8 округлый-LG",
    md: "w-10 h-10 округлый-xl",
    lg: "w-12 h-12 закругленный-2xl",
  };
  const iconSizes = {
    sm: "ш-4 ч-4",
    md: "ш-5 ч-5",
    lg: "ш-6 ч-6",
  };
  return (
    <div
      className={cn(
        "flex items-center justify-center переход-все длительность-300",
        sizeClasses[size],
        variant === "soft"
          ? config.bgColor
          : config.color.replace("text-", "bg-"),
        className
      )}
    >
      <Icon
        className={cn(
          iconSizes[size],
          variant === "soft" ? config.color : "text-white",
          iconClassName
        )}
      />
    </div>
  );
}