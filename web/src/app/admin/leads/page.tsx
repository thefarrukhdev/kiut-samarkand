import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { db } from "@/lib/db/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { LeadsManager } from "./LeadsManager";

export const metadata = {
  title: "Qabul Arizalari Boshqaruvi — KIUT Samarqand Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLeadsPage() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const initialLeads = db.getLeads();
  const stats = db.getDashboardStats();

  return (
    <AdminShell userEmail={session.email} newLeadsCount={stats.newLeads}>
      <LeadsManager initialLeads={initialLeads} />
    </AdminShell>
  );
}
