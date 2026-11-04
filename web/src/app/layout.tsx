import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KIUT Samarkand — Toshkent Kimyo Xalqaro Universiteti Samarqand Filiali",
  description: "Toshkent Kimyo Xalqaro Universiteti Samarqand filiali rasmiy axborot va qabul portali.",
  icons: {
    icon: "/assets/icons_and_logos/logo.f177ff7dfd83.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${jakarta.variable} font-sans scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#F4F7FC] text-[#334155] antialiased selection:bg-[#0096DB] selection:text-white">
        {children}
      </body>
    </html>
  );
}
