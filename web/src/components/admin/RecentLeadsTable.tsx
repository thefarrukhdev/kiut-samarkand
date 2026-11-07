import React from "react";
import Link from "next/link";
import type { AdmissionLead, LeadStatus } from "@/lib/db/types";

interface RecentLeadsTableProps {
  leads: AdmissionLead[];
  totalLeads: number;
}

const STATUS_BADGES: Record<LeadStatus, { label: string; bg: string; text: string }> = {
  new: { label: "Yangi", bg: "bg-amber-100", text: "text-amber-800" },
  contacted: { label: "Bog'lanildi", bg: "bg-blue-100", text: "text-blue-800" },
  enrolled: { label: "Qabul qilindi", bg: "bg-emerald-100", text: "text-emerald-800" },
  rejected: { label: "Rad etildi", bg: "bg-slate-100", text: "text-slate-700" },
};

export function RecentLeadsTable({ leads, totalLeads }: RecentLeadsTableProps) {
  return (
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
          Hammasini ko&apos;rish ({totalLeads}) →
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
            {leads.map((lead) => {
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
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text}`}
                    >
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
  );
}
