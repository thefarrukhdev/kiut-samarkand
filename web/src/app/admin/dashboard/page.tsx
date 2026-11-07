import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { db } from "@/lib/db/store";
import { AdminShell } from "@/components/admin/AdminShell";
import type { LeadStatus } from "@/lib/db/types";

export const metadata = {
  title: "Admin Boshqaruv Paneli — KIUT Samarqand",
  robots: {
    index: false,
    follow: false,
  },
};

const STATUS_BADGES: Record<LeadStatus, { label: string; bg: string; text: string }> = {
  new: { label: "Yangi", bg: "bg-amber-100", text: "text-amber-800" },
  contacted: { label: "Bog'lanildi", bg: "bg-blue-100", text: "text-blue-800" },
  enrolled: { label: "Qabul qilindi", bg: "bg-emerald-100", text: "text-emerald-800" },
  rejected: { label: "Rad etildi", bg: "bg-slate-100", text: "text-slate-700" },
};

export default async function AdminDashboardPage() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = db.getDashboardStats();
  const recentLeads = db.getLeads({ limit: 5 });

  return (
    <AdminShell userEmail={session.email} newLeadsCount={stats.newLeads}>
      <div className="space-y-6">
        {/* Top Greeting & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Boshqaruv Paneli
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              KIUT Samarqand filiali qabul statistikasi va portali ma&apos;lumotlari nazorati
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/leads/export"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
            >
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Excel (CSV) Yuklash</span>
            </a>
            <Link
              href="/admin/news/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0096DB] text-white text-xs font-semibold hover:bg-[#0085c4] shadow-sm shadow-[#0096DB]/20 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Yangi Yangilik</span>
            </Link>
          </div>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Leads */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Jami Arizalar
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0096DB] flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-slate-900">{stats.totalLeads}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Portal orqali yuborilgan</p>
          </div>

          {/* Card 2: Today Leads */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Bugun Tushgan
              </span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-slate-900">{stats.todayLeads}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">So&apos;nggi 24 soat ichida</p>
          </div>

          {/* Card 3: New / Pending */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Yangi (Kutilmoqda)
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-amber-700">{stats.newLeads}</span>
            </div>
            <p className="text-xs text-amber-600/80 mt-1">Ko&apos;rib chiqish talab etiladi</p>
          </div>

          {/* Card 4: Enrolled */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Qabul Qilingan
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-emerald-700">{stats.enrolledLeads}</span>
            </div>
            <p className="text-xs text-emerald-600/80 mt-1">Hujjatlari rasmiylashtirilgan</p>
          </div>

          {/* Card 5: Total News */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Yangiliklar
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-slate-900">{stats.totalNews}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Maqola va hisobotlar</p>
          </div>
        </div>

        {/* Breakdown & Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Faculty Distribution */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Fakultetlar Bo&apos;yicha Taqsimot
              </h2>
              <span className="text-xs text-slate-500">Arizalar soni</span>
            </div>
            <div className="space-y-3.5">
              {Object.entries(stats.leadsByFaculty).length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">Ma&apos;lumot mavjud emas</p>
              ) : (
                Object.entries(stats.leadsByFaculty).map(([faculty, count]) => {
                  const percentage = stats.totalLeads > 0 ? Math.round((count / stats.totalLeads) * 100) : 0;
                  return (
                    <div key={faculty} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{faculty}</span>
                        <span className="text-slate-500">{count} ta ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0096DB] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Actions & Degree breakdown */}
          <div className="space-y-6">
            {/* Degree Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-3">
                Ta&apos;lim Bosqichlari
              </h2>
              <div className="space-y-3">
                {Object.entries(stats.leadsByDegree).map(([degree, count]) => (
                  <div key={degree} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-medium text-slate-700">{degree}</span>
                    <span className="text-xs font-bold text-[#172D50] px-2 py-0.5 rounded-md bg-white border border-slate-200">
                      {count} ariza
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#172D50] text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-sm font-bold text-white mb-2">
                Tezkor Operatsiyalar
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Yangi arizalarni tekshiring yoki universitet yangiliklarini tahrirlang.
              </p>
              <div className="space-y-2">
                <Link
                  href="/admin/leads"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
                >
                  <span>Barcha arizalar jadvali</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/admin/news"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
                >
                  <span>Yangiliklar katalogi</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent 5 Leads Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                So&apos;nggi Arizalar
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Portal orqali eng oxirgi kelib tushgan 5 ta murojaat
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-[#0096DB] hover:underline"
            >
              Hammasini ko&apos;rish ({stats.totalLeads}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Tasdiq Kodi</th>
                  <th className="px-6 py-3">Abituriyent (F.I.SH)</th>
                  <th className="px-6 py-3">Telefon</th>
                  <th className="px-6 py-3">Fakultet</th>
                  <th className="px-6 py-3">Holati</th>
                  <th className="px-6 py-3 text-right">Vaqt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => {
                  const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.new;
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-3.5 font-mono font-medium text-slate-600">
                        {lead.confirmationId}
                      </td>
                      <td className="px-6 py-3.5 font-semibold text-slate-900">
                        {lead.fullName}
                      </td>
                      <td className="px-6 py-3.5 text-slate-600">
                        {lead.phone}
                      </td>
                      <td className="px-6 py-3.5 text-slate-600">
                        {lead.selectedFaculty}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right text-slate-400">
                        {new Date(lead.submittedAt).toLocaleDateString("uz-UZ", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
