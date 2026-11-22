import type { Metadata } from "next";
import { SettingsView } from "@/comComponents/main/settings-view";
export const metadata: Metadata = {
  title: "Настройки - Web Office Suite от ZIZIYI",
  description:
    "Настройте свой веб-офис: управляйте темами, языковыми настройками и настройками приложений.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function SettingsPage() {
  return <SettingsView />;
}