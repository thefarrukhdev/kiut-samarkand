"use client";

import React from "react";
import type { NewsCategory } from "@/lib/news";

export interface CategoryTabItem {
  id: NewsCategory;
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface NewsCategoryTabsProps {
  tabs: CategoryTabItem[];
  activeCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
}

export function NewsCategoryTabs({
  tabs,
  activeCategory,
  onSelectCategory,
}: NewsCategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectCategory(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              isActive
                ? "bg-[#172D50] text-white shadow-sm shadow-[#172D50]/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            <IconComponent className="w-4 h-4" />
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
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
