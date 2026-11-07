"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sam.kiut.uz");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Login yoki parol noto'g'ri.");
        setLoading(false);
        return;
      }

      // Success
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Server bilan bog'lanishda xatolik yuz berdi.");
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@sam.kiut.uz");
    setPassword("KiutSam2026!Admin");
    setError(null);
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 p-2 mb-3 border border-white/10 shadow-inner">
          <Image
            src="/assets/icons_and_logos/logo.f177ff7dfd83.png"
            alt="KIUT Samarkand"
            width={44}
            height={44}
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          KIUT Samarqand Admin
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Boshqaruv paneli va qabul arizalari tizimiga kirish
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Admin Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:border-transparent transition-all placeholder-slate-500"
            placeholder="admin@sam.kiut.uz"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Maxfiy Parol
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[11px] text-[#0096DB] hover:underline"
            >
              {showPassword ? "Yashirish" : "Ko'rsatish"}
            </button>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:border-transparent transition-all placeholder-slate-500"
            placeholder="••••••••••••"
          />
        </div>

        {/* Quick Demo Helper */}
        <div className="pt-1">
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full text-[11px] text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10 py-1.5 px-3 rounded-lg border border-white/5 transition-colors text-left flex items-center justify-between"
          >
            <span>💡 Sinov parolini to&apos;ldirish</span>
            <span className="font-mono text-emerald-400">KiutSam2026!Admin</span>
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0096DB] hover:bg-[#0085c4] text-white font-semibold text-sm shadow-lg shadow-[#0096DB]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Kirilmoqda...</span>
            </>
          ) : (
            <span>Tizimga Kirish</span>
          )}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-700/60 text-center">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Asosiy Portalga Qaytish</span>
        </Link>
      </div>
    </div>
  );
}
