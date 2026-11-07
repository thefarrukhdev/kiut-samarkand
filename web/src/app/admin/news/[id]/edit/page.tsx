import { notFound, redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { db } from "@/lib/db/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsEditorForm } from "@/components/admin/NewsEditorForm";

interface EditNewsPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Maqolani Tahrirlash — KIUT Samarqand Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminEditArticlePage({ params }: EditNewsPageProps) {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const article = db.getNewsBySlug(id);

  if (!article) {
    notFound();
  }

  const stats = db.getDashboardStats();

  return (
    <AdminShell userEmail={session.email} newLeadsCount={stats.newLeads}>
      <NewsEditorForm initialData={article} isEdit />
    </AdminShell>
  );
}
