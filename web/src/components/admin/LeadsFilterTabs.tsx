"use client";

import React from "react";
import type { LeadStatus } from "@/lib/db/types";

interface LeadsFilterTabsProps {
  statusFilter: LeadStatus | "all";
  onStatusChange: (status: LeadStatus | "all") => void;
  counts: Record<string, number>;
}

export function LeadsFilterTabs({
  statusFilter,
  onStatusChange,
  counts,
}: LeadsFilterTabsProps) {
  const tabs = [
    { id: "all", label: "Barchasi", count: counts.all || 0 },
    { id: "new", label: "Yangi", count: counts.new || 0 },
    { id: "contacted", label: "Bog'lanildi", count: counts.contacted || 0 },
    { id: "enrolled", label: "Qabul qilindi", count: counts.enrolled || 0 },
    { id: "rejected", label: "Rad etildi", count: counts.rejected || 0 },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
      {tabs.map((tab) => {
        const active = statusFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onStatusChange(tab.id)}
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
  );
}
