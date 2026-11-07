import React from "react";
import Link from "next/link";
import type { AdmissionLead, LeadStatus } from "@/lib/db/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tasdiq Kodi</TableHead>
            <TableHead>Abituriyent (F.I.SH)</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Fakultet</TableHead>
            <TableHead>Holati</TableHead>
            <TableHead className="text-right">Vaqt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.new;
            return (
              <TableRow key={lead.id}>
                <TableCell className="font-mono font-medium text-slate-600">
                  {lead.confirmationId}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {lead.fullName}
                </TableCell>
                <TableCell className="text-slate-600">
                  {lead.phone}
                </TableCell>
                <TableCell className="text-slate-600">
                  {lead.selectedFaculty}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text}`}
                  >
                    {badge.label}
                  </span>
                </TableCell>
                <TableCell className="text-right text-slate-400">
                  {new Date(lead.submittedAt).toLocaleDateString("uz-UZ", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
