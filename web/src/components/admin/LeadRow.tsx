"use client";

import React, { useState } from "react";
import type { AdmissionLead, LeadStatus } from "@/lib/db/types";

interface LeadRowProps {
  lead: AdmissionLead;
  isUpdating: boolean;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onSaveNotes: (id: string, notes: string) => void;
  onDelete: (id: string, name: string) => void;
}

const STATUS_CONFIG: Record<LeadStatus, { bg: string; text: string }> = {
  new: { bg: "bg-amber-50", text: "text-amber-800 border-amber-200" },
  contacted: { bg: "bg-blue-50", text: "text-blue-800 border-blue-200" },
  enrolled: { bg: "bg-emerald-50", text: "text-emerald-800 border-emerald-200" },
  rejected: { bg: "bg-slate-50", text: "text-slate-700 border-slate-200" },
};

export function LeadRow({
  lead,
  isUpdating,
  onStatusChange,
  onSaveNotes,
  onDelete,
}: LeadRowProps) {
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesText, setNotesText] = useState(lead.notes || "");

  const statusConf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;

  const handleNotesSubmit = () => {
    onSaveNotes(lead.id, notesText);
    setEditingNotes(false);
  };

  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
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
          onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
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
        {editingNotes ? (
          <div className="space-y-1.5">
            <textarea
              rows={2}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#0096DB] focus:outline-none"
              placeholder="Ariza bo'yicha izoh yozing..."
            />
            <div className="flex gap-1.5">
              <button
                onClick={handleNotesSubmit}
                disabled={isUpdating}
                className="px-2 py-1 bg-[#172D50] text-white rounded text-[11px] font-medium"
              >
                Saqlash
              </button>
              <button
                onClick={() => setEditingNotes(false)}
                className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px]"
              >
                Bekor
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setEditingNotes(true);
              setNotesText(lead.notes || "");
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
          onClick={() => onDelete(lead.id, lead.fullName)}
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
}
