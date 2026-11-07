"use client";

import React, { useState, useMemo } from "react";
import type { AdmissionLead, LeadStatus } from "@/lib/db/types";

interface LeadsManagerProps {
  initialLeads: AdmissionLead[];
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; bg: string; text: string; dot: string }> = {
  new: { label: "Yangi", bg: "bg-amber-50", text: "text-amber-800 border-amber-200", dot: "bg-amber-500" },
  contacted: { label: "Bog'lanildi", bg: "bg-blue-50", text: "text-blue-800 border-blue-200", dot: "bg-blue-500" },
  enrolled: { label: "Qabul qilindi", bg: "bg-emerald-50", text: "text-emerald-800 border-emerald-200", dot: "bg-emerald-500" },
  rejected: { label: "Rad etildi", bg: "bg-slate-50", text: "text-slate-700 border-slate-200", dot: "bg-slate-400" },
};

export function LeadsManager({ initialLeads }: LeadsManagerProps) {
  const [leads, setLeads] = useState<AdmissionLead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Derive unique faculties
  const faculties = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.selectedFaculty) set.add(l.selectedFaculty);
    });
    return Array.from(set);
  }, [leads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) {
        return false;
      }
      if (facultyFilter !== "all" && lead.selectedFaculty !== facultyFilter) {
        return false;
      }
      if (search.trim() !== "") {
        const q = search.toLowerCase().trim();
        const matchesName = lead.fullName.toLowerCase().includes(q);
        const matchesPhone = lead.phone.includes(q);
        const matchesCode = lead.confirmationId.toLowerCase().includes(q);
        const matchesNotes = lead.notes.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesCode && !matchesNotes) {
          return false;
        }
      }
      return true;
    });
  }, [leads, statusFilter, facultyFilter, search]);

  // Update lead status
  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus, updatedAt: data.lead.updatedAt } : l))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Save notes
  const handleSaveNotes = async (id: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: notesValue }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, notes: notesValue, updatedAt: data.lead.updatedAt } : l))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error("Failed to update notes:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string, name: string) => {
    if (!window.confirm(`${name} abituriyentning arizasini o'chirmoqchimisiz?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Counts by status
  const counts = useMemo(() => {
    const c = { all: leads.length, new: 0, contacted: 0, enrolled: 0, rejected: 0 };
    leads.forEach((l) => {
      if (l.status in c) {
        c[l.status]++;
      }
    });
    return c;
  }, [leads]);

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Qabul Arizalari Boshqaruvi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Portal orqali kelib tushgan barcha abituriyent arizalari (Jami: {leads.length} ta)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/admin/leads/export"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm shadow-emerald-600/20 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Excel (CSV) Yuklab Olish</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
          {(
            [
              { id: "all", label: "Barchasi", count: counts.all },
              { id: "new", label: "Yangi", count: counts.new },
              { id: "contacted", label: "Bog'lanildi", count: counts.contacted },
              { id: "enrolled", label: "Qabul qilindi", count: counts.enrolled },
              { id: "rejected", label: "Rad etildi", count: counts.rejected },
            ] as const
          ).map((tab) => {
            const active = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#172D50] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Faculty Dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="F.I.SH, telefon raqam yoki tasdiqlash kodi bo'yicha qidirish..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all"
            >
              <option value="all">Barcha Fakultetlar</option>
              {faculties.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Kod & Sana</th>
                <th className="px-5 py-3.5">Abituriyent</th>
                <th className="px-5 py-3.5">Fakultet & Ta&apos;lim</th>
                <th className="px-5 py-3.5">Holati</th>
                <th className="px-5 py-3.5">Qayd / Izoh</th>
                <th className="px-5 py-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Hech qanday ariza topilmadi.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const statusConf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                  const isEditingThis = editingNotesId === lead.id;

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Confirmation Code & Date */}
                      <td className="px-5 py-3.5 align-top">
                        <span className="font-mono font-bold text-slate-800 block">
                          {lead.confirmationId}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {new Date(lead.submittedAt).toLocaleDateString("uz-UZ", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>

                      {/* Name & Phone */}
                      <td className="px-5 py-3.5 align-top">
                        <span className="font-semibold text-slate-900 block text-sm">
                          {lead.fullName}
                        </span>
                        <a
                          href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                          className="text-[#0096DB] hover:underline font-mono text-xs inline-block mt-0.5"
                        >
                          {lead.phone}
                        </a>
                      </td>

                      {/* Faculty & Degree Details */}
                      <td className="px-5 py-3.5 align-top">
                        <span className="font-medium text-slate-800 block">
                          {lead.selectedFaculty}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                          <span className="px-1.5 py-0.2 bg-slate-100 rounded text-slate-700">
                            {lead.degree}
                          </span>
                          <span>•</span>
                          <span>{lead.studyType}</span>
                          <span>•</span>
                          <span>{lead.language}</span>
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="px-5 py-3.5 align-top">
                        <select
                          value={lead.status}
                          disabled={isUpdating}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className={`text-xs font-semibold py-1 px-2.5 rounded-lg border focus:outline-none transition-all cursor-pointer ${statusConf.bg} ${statusConf.text}`}
                        >
                          <option value="new">🟡 Yangi</option>
                          <option value="contacted">🔵 Bog&apos;lanildi</option>
                          <option value="enrolled">🟢 Qabul qilindi</option>
                          <option value="rejected">⚪ Rad etildi</option>
                        </select>
                      </td>

                      {/* Notes / Comments */}
                      <td className="px-5 py-3.5 align-top max-w-xs">
                        {isEditingThis ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={2}
                              value={notesValue}
                              onChange={(e) => setNotesValue(e.target.value)}
                              className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#0096DB] focus:outline-none"
                              placeholder="Ariza bo'yicha izoh yozing..."
                            />
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => handleSaveNotes(lead.id)}
                                disabled={isUpdating}
                                className="px-2 py-1 bg-[#172D50] text-white rounded text-[11px] font-medium"
                              >
                                Saqlash
                              </button>
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px]"
                              >
                                Bekor
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingNotesId(lead.id);
                              setNotesValue(lead.notes || "");
                            }}
                            className="cursor-pointer group"
                          >
                            {lead.notes ? (
                              <p className="text-slate-600 italic group-hover:text-slate-900 line-clamp-2">
                                &ldquo;{lead.notes}&rdquo;
                              </p>
                            ) : (
                              <span className="text-slate-400 group-hover:text-[#0096DB] flex items-center gap-1">
                                <span>+ Izoh qo&apos;shish</span>
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 align-top text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id, lead.fullName)}
                          title="Arizani o'chirish"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
