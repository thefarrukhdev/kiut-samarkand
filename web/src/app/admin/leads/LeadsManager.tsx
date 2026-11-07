"use client";

import React, { useState, useMemo } from "react";
import type { AdmissionLead, LeadStatus } from "@/lib/db/types";
import { LeadsFilterTabs } from "@/components/admin/LeadsFilterTabs";
import { LeadRow } from "@/components/admin/LeadRow";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Search } from "lucide-react";

interface LeadsManagerProps {
  initialLeads: AdmissionLead[];
}

export function LeadsManager({ initialLeads }: LeadsManagerProps) {
  const [leads, setLeads] = useState<AdmissionLead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [facultyFilter, setFacultyFilter] = useState("all");
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
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (facultyFilter !== "all" && lead.selectedFaculty !== facultyFilter) return false;

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
  const handleSaveNotes = async (id: string, notesValue: string) => {
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
    const c: Record<string, number> = { all: leads.length, new: 0, contacted: 0, enrolled: 0, rejected: 0 };
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
        <LeadsFilterTabs
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          counts={counts}
        />

        {/* Search & Faculty Dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="F.I.SH, telefon raqam yoki tasdiqlash kodi bo'yicha qidirish..."
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="w-full sm:w-64">
            <Select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
            >
              <option value="all">Barcha Fakultetlar</option>
              {faculties.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kod & Sana</TableHead>
              <TableHead>Abituriyent</TableHead>
              <TableHead>Fakultet & Ta&apos;lim</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead>Qayd / Izoh</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12">
                  <EmptyState
                    title="Ariza topilmadi"
                    description="Qidiruv mezonlari bo'yicha hech qanday abituriyent arizasi mavjud emas."
                  />
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <LeadRow
                  key={lead.id}
                  lead={lead}
                  isUpdating={isUpdating}
                  onStatusChange={handleStatusChange}
                  onSaveNotes={handleSaveNotes}
                  onDelete={handleDeleteLead}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
