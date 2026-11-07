import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata = {
  title: "Admin Kirish — KIUT Samarqand Filiali",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getCurrentAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0096DB]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#172D50]/60 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Suspense fallback={<div className="h-96 rounded-2xl bg-slate-800/50 animate-pulse" />}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
