"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface ProgramsFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFaculty: string;
  onFacultyChange: (faculty: string) => void;
  selectedDegree: string;
  onDegreeChange: (degree: string) => void;
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  faculties: Array<{ id: string; name: string }>;
  degrees: Array<{ id: string; label: string }>;
  formats: Array<{ id: string; label: string }>;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function ProgramsFilterBar({
  searchQuery,
  onSearchChange,
  selectedFaculty,
  onFacultyChange,
  selectedDegree,
  onDegreeChange,
  selectedFormat,
  onFormatChange,
  faculties,
  degrees,
  formats,
  hasActiveFilters,
  onReset,
}: ProgramsFilterBarProps) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
      {/* Top Search & Reset Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ta'lim yo'nalishi yoki mutaxassislik nomini qidiring..."
            icon={<Search className="w-4 h-4 text-slate-400" />}
            className="w-full"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-rose-600 hover:underline font-semibold whitespace-nowrap px-2"
          >
            Filtrlarni tozalash
          </button>
        )}
      </div>

      {/* Degree Tabs & Faculty Select Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Degree Selector */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Ta&apos;lim Bosqichi
          </label>
          <Select
            value={selectedDegree}
            onChange={(e) => onDegreeChange(e.target.value)}
          >
            {degrees.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Faculty Selector */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Fakultet / Maktab
          </label>
          <Select
            value={selectedFaculty}
            onChange={(e) => onFacultyChange(e.target.value)}
          >
            <option value="all">Barcha Fakultetlar</option>
            {faculties.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Study Format Selector */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Ta&apos;lim Shakli
          </label>
          <Select
            value={selectedFormat}
            onChange={(e) => onFormatChange(e.target.value)}
          >
            {formats.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
