import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth/admin";

export default async function AdminPage() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  redirect("/admin/dashboard");
}
