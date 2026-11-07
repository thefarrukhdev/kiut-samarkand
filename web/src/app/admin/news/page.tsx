import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { db } from "@/lib/db/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsCatalog } from "./NewsCatalog";

export const metadata = {
  title: "Yangiliklar Boshqaruvi — KIUT Samarqand Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminNewsPage() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const newsList = db.getNews();
  const stats = db.getDashboardStats();

  return (
    <AdminShell userEmail={session.email} newLeadsCount={stats.newLeads}>
      <NewsCatalog initialNews={newsList} />
    </AdminShell>
  );
}
