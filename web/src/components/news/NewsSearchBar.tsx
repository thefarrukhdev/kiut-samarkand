"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NewsSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export function NewsSearchBar({
  value,
  onChange,
  placeholder = "Yangiliklar orasidan qidirish...",
  onClear,
}: NewsSearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        icon={<Search className="w-4 h-4" />}
        className="pr-10"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            if (onClear) onClear();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/50 transition-colors"
          aria-label="Qidiruvni tozalash"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
