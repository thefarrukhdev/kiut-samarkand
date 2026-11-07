"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { DbNewsItem } from "@/lib/db/types";

interface NewsEditorFormProps {
  initialData?: DbNewsItem;
  isEdit?: boolean;
}

type LangTab = "uz" | "ru" | "en";

export function NewsEditorForm({ initialData, isEdit = false }: NewsEditorFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LangTab>("uz");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Multilingual fields
  const [title, setTitle] = useState({
    uz: initialData?.title.uz || "",
    ru: initialData?.title.ru || "",
    en: initialData?.title.en || "",
  });

  const [summary, setSummary] = useState({
    uz: initialData?.summary.uz || "",
    ru: initialData?.summary.ru || "",
    en: initialData?.summary.en || "",
  });

  const [content, setContent] = useState({
    uz: initialData?.content.uz || "",
    ru: initialData?.content.ru || "",
    en: initialData?.content.en || "",
  });

  // Shared metadata
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState<"academic" | "events" | "campus" | "sports">(
    initialData?.category || "academic"
  );
  const [image, setImage] = useState(
    initialData?.image ||
      "/assets/banners/photo_2026-08-03_10-09-43.jpg__1920x1080_q85_crop_subsampling-2.jpg"
  );
  const [published, setPublished] = useState(initialData?.published ?? true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!title.uz.trim() || !summary.uz.trim()) {
      setError("O'zbek tilidagi sarlavha va qisqacha tavsif kiritilishi shart.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title,
        summary,
        content,
        category,
        image,
        published,
        slug: slug.trim() || undefined,
      };

      const url = isEdit
        ? `/api/admin/news/${initialData?.id}`
        : "/api/admin/news";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Yangilikni saqlashda xatolik yuz berdi.");
        setLoading(false);
        return;
      }

      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      console.error("News submit error:", err);
      setError("Server bilan aloqada xatolik yuz berdi.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/news" className="hover:text-slate-800">
              Yangiliklar
            </Link>
            <span>/</span>
            <span>{isEdit ? "Tahrirlash" : "Yangi Maqola"}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEdit ? "Maqolani Tahrirlash" : "Yangi Yangilik Yaratish"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Bekor qilish
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-[#0096DB] hover:bg-[#0085c4] text-white text-xs font-semibold shadow-sm shadow-[#0096DB]/20 transition-all disabled:opacity-50"
          >
            {loading ? "Saqlanmoqda..." : isEdit ? "O'zgarishlarni Saqlash" : "Chop Etish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Multilingual Content Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {/* Language Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50/60 px-4 pt-3 gap-2">
              {(
                [
                  { id: "uz", label: "🇺🇿 O'zbekcha (Asosiy)" },
                  { id: "ru", label: "🇷🇺 Русский" },
                  { id: "en", label: "🇬🇧 English" },
                ] as const
              ).map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
                      active
                        ? "bg-white text-slate-900 border-[#0096DB] shadow-sm"
                        : "text-slate-500 hover:text-slate-800 border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Maqola Sarlavhasi ({activeTab.toUpperCase()}) *
                </label>
                <input
                  type="text"
                  required={activeTab === "uz"}
                  value={title[activeTab]}
                  onChange={(e) => setTitle({ ...title, [activeTab]: e.target.value })}
                  placeholder={`Maqola sarlavhasini ${activeTab} tilida kiriting...`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Qisqacha Mazmuni / Anons ({activeTab.toUpperCase()}) *
                </label>
                <textarea
                  rows={3}
                  required={activeTab === "uz"}
                  value={summary[activeTab]}
                  onChange={(e) => setSummary({ ...summary, [activeTab]: e.target.value })}
                  placeholder={`Katalog va kartochkalarda ko'rinadigan qisqacha anons (${activeTab})...`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  To&apos;liq Maqola Matni ({activeTab.toUpperCase()})
                </label>
                <textarea
                  rows={8}
                  value={content[activeTab]}
                  onChange={(e) => setContent({ ...content, [activeTab]: e.target.value })}
                  placeholder={`To'liq maqola paragraflarini kiriting... (${activeTab})`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Xatboshilar avtomatik ravishda ajratiladi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Taxonomy, Metadata & Image */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900">
              Parametrlar & Chop Etish
            </h2>

            {/* Published Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Saytda Ko&apos;rsatish</span>
                <span className="text-[11px] text-slate-500">
                  {published ? "Foydalanuvchilarga ko'rinadi" : "Faqat qoralama"}
                </span>
              </div>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded text-[#0096DB] focus:ring-[#0096DB] cursor-pointer"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategoriya
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all"
              >
                <option value="academic">Akademik</option>
                <option value="events">Tadbirlar</option>
                <option value="campus">Kampus</option>
                <option value="sports">Sport</option>
              </select>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                URL Manzili (Slug)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Avtomatik yaratiladi yoki maxsus kiriting"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all"
              />
              <p className="text-[10px] text-slate-400 mt-1 font-mono">
                Misol: student-parliament-selection
              </p>
            </div>

            {/* Image Preview & URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Asosiy Rasm URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/assets/banners/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all mb-2"
              />

              {image && (
                <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-100 relative border border-slate-200">
                  <Image
                    src={image}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
