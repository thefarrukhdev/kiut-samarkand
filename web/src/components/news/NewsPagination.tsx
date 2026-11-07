"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
}

export function NewsPagination({
  currentPage,
  totalPages,
  onPageChange,
  prevLabel = "Oldingi",
  nextLabel = "Keyingi",
}: NewsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">{prevLabel}</span>
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#0096DB] text-white shadow-sm shadow-[#0096DB]/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1.5"
      >
        <span className="hidden sm:inline">{nextLabel}</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
