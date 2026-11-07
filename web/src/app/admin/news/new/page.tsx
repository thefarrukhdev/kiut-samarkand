import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { db } from "@/lib/db/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsEditorForm } from "@/components/admin/NewsEditorForm";

export const metadata = {
  title: "Yangi Yangilik Yaratish — KIUT Samarqand Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminNewArticlePage() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = db.getDashboardStats();

  return (
    <AdminShell userEmail={session.email} newLeadsCount={stats.newLeads}>
      <NewsEditorForm />
    </AdminShell>
  );
}
