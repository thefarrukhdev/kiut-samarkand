"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { DbNewsItem } from "@/lib/db/types";

interface NewsCatalogProps {
  initialNews: DbNewsItem[];
}

export function NewsCatalog({ initialNews }: NewsCatalogProps) {
  const [articles, setArticles] = useState<DbNewsItem[]>(initialNews);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (categoryFilter !== "all" && a.category !== categoryFilter) {
        return false;
      }
      if (search.trim() !== "") {
        const q = search.toLowerCase().trim();
        const matchesUz = a.title.uz.toLowerCase().includes(q) || a.summary.uz.toLowerCase().includes(q);
        const matchesRu = a.title.ru.toLowerCase().includes(q);
        const matchesEn = a.title.en.toLowerCase().includes(q);
        if (!matchesUz && !matchesRu && !matchesEn) return false;
      }
      return true;
    });
  }, [articles, categoryFilter, search]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`"${title}" sarlavhali maqolani o'chirmoqchimisiz?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setArticles((prev) =>
          prev.map((a) => (a.id === id ? { ...a, published: !currentStatus } : a))
        );
      }
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Yangiliklar Portali Boshqaruvi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Universitet rasmiy yangiliklari, e&apos;lonlari va ilmiy tadbirlari nazorati (Jami: {articles.length} ta maqola)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0096DB] hover:bg-[#0085c4] text-white text-xs font-semibold shadow-sm shadow-[#0096DB]/20 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Yangi Maqola Qo&apos;shish</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-3">
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
            placeholder="Yangilik sarlavhasi yoki mazmuni bo'yicha qidirish..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all"
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all"
          >
            <option value="all">Barcha Kategoriyalar</option>
            <option value="academic">Akademik</option>
            <option value="events">Tadbirlar</option>
            <option value="campus">Kampus</option>
            <option value="sports">Sport</option>
          </select>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5 w-16">Rasm</th>
                <th className="px-5 py-3.5">Sarlavha & Mazmun</th>
                <th className="px-5 py-3.5">Kategoriya</th>
                <th className="px-5 py-3.5">Sana</th>
                <th className="px-5 py-3.5">Holati</th>
                <th className="px-5 py-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Maqola topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-5 py-3.5 align-middle">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 relative border border-slate-200 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title.uz}
                          fill
                          className="object-cover"
                          sizes="60px"
                        />
                      </div>
                    </td>

                    {/* Title & Languages */}
                    <td className="px-5 py-3.5 align-middle max-w-md">
                      <Link
                        href={`/admin/news/${item.id}/edit`}
                        className="font-bold text-slate-900 hover:text-[#0096DB] transition-colors block text-sm line-clamp-1"
                      >
                        {item.title.uz}
                      </Link>
                      <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                        {item.summary.uz}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <span className="font-mono">slug: {item.slug}</span>
                        <span>•</span>
                        <span>{item.views} ko&apos;rish</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5 align-middle">
                      <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {item.categoryLabel?.uz || item.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 align-middle text-slate-500 whitespace-nowrap">
                      {item.date.uz}
                    </td>

                    {/* Published Status Switch */}
                    <td className="px-5 py-3.5 align-middle whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(item.id, item.published)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                          item.published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.published ? "bg-emerald-500" : "bg-slate-400"}`} />
                        <span>{item.published ? "Faol (Chop etilgan)" : "Qoralama"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 align-middle text-right whitespace-nowrap space-x-1">
                      <Link
                        href={`/news/${item.slug}`}
                        target="_blank"
                        title="Saytda ko'rish"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 inline-block transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/news/${item.id}/edit`}
                        title="Tahrirlash"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#0096DB] hover:bg-blue-50 inline-block transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.title.uz)}
                        title="O'chirish"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
