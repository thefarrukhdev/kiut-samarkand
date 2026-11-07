"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatUzbekPhone, isUzbekPhoneValid } from "@/lib/phone";
import { FACULTIES_BY_LOCALE, resolveFacultyName } from "@/lib/admissions";

export function AdmissionDirectForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [selectedFaculty, setSelectedFaculty] = useState(FACULTIES_BY_LOCALE.uz[0].name);
  const [degree, setDegree] = useState("Bakalavriat");
  const [studyType, setStudyType] = useState("Kunduzgi");
  const [language, setLanguage] = useState("O'zbek");
  const [submitting, setSubmitting] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzbekPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (fullName.trim().length < 3) {
      setError("Iltimos, to'liq ism-familiyangizni kiriting.");
      return;
    }

    if (!isUzbekPhoneValid(phone)) {
      setError("Iltimos, to'g'ri telefon raqamingizni kiriting (+998 XX XXX-XX-XX).");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          selectedFaculty: resolveFacultyName(selectedFaculty, "uz"),
          degree,
          studyType,
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.confirmationId) {
        setConfirmationCode(data.confirmationId);
      } else {
        setError(data.error || "Arizani yuborishda xatolik yuz berdi.");
      }
    } catch {
      setError("Server bilan aloqa uzildi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#0096DB]">
          Onlayn Ariza
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-1">
          Abituriyent Anketasi
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Arizangiz qabul qilingandan so&apos;ng sizga shaxsiy tasdiqlash kodi beriladi.
        </p>
      </div>

      {confirmationCode ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-emerald-900">
            Arizangiz Muvaffaqiyatli Qabul Qilindi!
          </h4>
          <p className="text-xs text-emerald-700">
            Sizning maxsus tasdiqlash kodingiz:
          </p>
          <div className="py-2 px-4 rounded-xl bg-white border border-emerald-300 font-mono font-extrabold text-xl text-emerald-900 inline-block shadow-sm">
            {confirmationCode}
          </div>
          <p className="text-[11px] text-emerald-600/90 pt-1">
            Qabul komissiyasi mutaxassisi tez orada siz bilan bog&apos;lanadi.
          </p>
          <Button
            onClick={() => {
              setConfirmationCode(null);
              setFullName("");
              setPhone("+998 ");
            }}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Yangi ariza topshirish
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              To&apos;liq Ism-Familiyangiz *
            </label>
            <Input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masalan: Jasur Mirzayev"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Telefon Raqamingiz *
            </label>
            <Input
              required
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+998 (90) 123-45-67"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tanlangan Fakultet *
            </label>
            <Select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              {FACULTIES_BY_LOCALE.uz.map((fac) => (
                <option key={fac.id} value={fac.name}>
                  {fac.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Bosqich
              </label>
              <Select value={degree} onChange={(e) => setDegree(e.target.value)}>
                <option value="Bakalavriat">Bakalavriat</option>
                <option value="Magistratura">Magistratura</option>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Shakli
              </label>
              <Select value={studyType} onChange={(e) => setStudyType(e.target.value)}>
                <option value="Kunduzgi">Kunduzgi</option>
                <option value="Kechki">Kechki</option>
                <option value="Masofaviy">Masofaviy</option>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tili
              </label>
              <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="O'zbek">O&apos;zbek</option>
                <option value="Rus">Rus</option>
                <option value="Ingliz">Ingliz</option>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0096DB] hover:bg-[#0085c4] text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-[#0096DB]/20 flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? (
              <span>Yuborilmoqda...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Arizani Topshirish</span>
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
