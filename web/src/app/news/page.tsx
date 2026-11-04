import type { Metadata } from "next";
import { NewsPortalClient } from "@/components/news/NewsPortalClient";

export const metadata: Metadata = {
  title: "Universitet Yangiliklari va Voqealar — KIUT Samarkand",
  description:
    "Toshkent Kimyo xalqaro universiteti Samarqand filiali so'nggi yangiliklari, ilmiy anjumanlar, xalqaro hamkorlik memorandumlari, talabalar hayoti va sport tadbirlari.",
  openGraph: {
    title: "Universitet Yangiliklari va Voqealar — KIUT Samarkand",
    description:
      "KIUT Samarqand filiali rasmiy yangiliklar va matbuot portali. Barcha muhim voqealar va yangiliklar.",
    type: "website",
    locale: "uz_UZ",
  },
};

export default function NewsPage() {
  return <NewsPortalClient />;
}
