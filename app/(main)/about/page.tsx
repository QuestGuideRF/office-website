import type { Metadata } from "next";
import { AboutView } from "@/comComponents/main/about-view";
export const metadata: Metadata = {
  title: "О программе - Web Office Suite от ZIZIYI",
  description:
    "Узнайте о Web Office Suite от ZIZIYI: бессерверном веб-офисном приложении с открытым исходным кодом, обеспечивающем конфиденциальность, созданном на основе технологии OnlyOffice WebAssembly.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function AboutPage() {
  return <AboutView />;
}