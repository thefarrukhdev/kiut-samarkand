"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types";

interface HeroQuickFinderProps {
  currentLocale: Locale;
  popularTags: string[];
}

export function HeroQuickFinder({ currentLocale, popularTags }: HeroQuickFinderProps) {
  const handleTagClick = (tag: string) => {
    const target = document.getElementById("programs");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      const searchInput = target.querySelector<HTMLInputElement>("input[type='text']");
      if (searchInput) {
        searchInput.value = tag;
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = (form.elements.namedItem("search") as HTMLInputElement)?.value;
    const target = document.getElementById("programs");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      const searchInput = target.querySelector<HTMLInputElement>("input[type='text']");
      if (searchInput && input) {
        searchInput.value = input;
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  };

  const placeholderText =
    currentLocale === "ru"
      ? "Лечебное дело, Программная инженерия, Архитектура..."
      : currentLocale === "en"
      ? "Medicine, Software Engineering, Architecture..."
      : "Davolash ishi, Dasturiy injiniring, Arxitektura...";

  const labelText =
    currentLocale === "ru"
      ? "Быстрый поиск направления:"
      : currentLocale === "en"
      ? "Quick Degree Explorer:"
      : "Yo'nalishni tezkor qidirish:";

  const buttonText =
    currentLocale === "ru" ? "Найти" : currentLocale === "en" ? "Search" : "Qidirish";

  const popularText =
    currentLocale === "ru" ? "Популярные:" : currentLocale === "en" ? "Popular:" : "Ommabop:";

  return (
    <div className="pt-5 border-t border-slate-200/90 space-y-2.5">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        <Search className="h-3.5 w-3.5 text-[#0096DB]" />
        <span>{labelText}</span>
      </div>

      <form onSubmit={handleFormSubmit} className="flex items-center gap-2 max-w-xl">
        <div className="relative flex-1">
          <input
            name="search"
            type="text"
            placeholder={placeholderText}
            aria-label="Qidiruv so'zi"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:border-transparent transition-all shadow-sm"
          />
        </div>
        <Button
          type="submit"
          variant="action"
          size="sm"
          className="shrink-0 bg-[#172D50] hover:bg-[#12223c] text-white font-bold rounded-xl px-4 py-2.5 text-xs sm:text-sm"
        >
          <Search className="h-3.5 w-3.5 mr-1" />
          <span>{buttonText}</span>
        </Button>
      </form>

      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        <span className="text-[11px] text-slate-400 font-medium">{popularText}</span>
        {popularTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className="text-[11px] font-semibold text-[#172D50] bg-white border border-slate-200 hover:border-[#0096DB] hover:text-[#0096DB] px-2.5 py-1 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
