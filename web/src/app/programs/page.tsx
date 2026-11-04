import type { Metadata } from "next";
import { ProgramsDirectoryClient } from "@/components/programs/ProgramsDirectoryClient";

export const metadata: Metadata = {
  title: "48+ Ta'lim Yo'nalishlari va Fakultetlar — KIUT Samarqand",
  description:
    "Toshkent Kimyo Xalqaro Universiteti Samarqand filiali ta'lim yo'nalishlari va fakultetlari katalogi. Tibbiyot, IT va Muhandislik, Iqtisodiyot, Pedagogika hamda Filologiya sohalari bo'yicha akkreditatsiyalangan ta'lim dasturlari.",
  keywords: [
    "KIUT Samarqand dasturlari",
    "KIUT Samarqand fakultetlar",
    "Toshkent Kimyo Xalqaro Universiteti Samarqand",
    "Bakalavriat Samarqand",
    "Magistratura Samarqand",
    "Tibbiyot fakulteti Samarqand",
    "Dasturiy injiniring Samarqand",
  ],
};

export default function ProgramsPage() {
  return <ProgramsDirectoryClient />;
}
