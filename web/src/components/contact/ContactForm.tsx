"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatUzbekPhone, isUzbekPhoneValid } from "@/lib/phone";

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
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
      setError("Iltimos, to'liq telefon raqamingizni kiriting (+998 XX XXX-XX-XX).");
      return;
    }

    if (message.trim().length < 5) {
      setError("Xabar matni kamida 5 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    setSubmitting(true);

    try {
      // Also register as a contact lead in database store!
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          selectedFaculty: subject || "Umumiy murojaat",
          degree: "Aloqa formasi",
          studyType: "Onlayn xabar",
          language: "O'zbek",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFullName("");
        setPhone("+998 ");
        setSubject("");
        setMessage("");
      } else {
        setError(data.error || "Xabar yuborishda xatolik yuz berdi.");
      }
    } catch {
      setError("Server bilan aloqa o'rnatib bo'lmadi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Savol yoki Murojaat Qoldiring
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Mutaxassislarimiz 24 soat ichida siz bilan telefon yoki Telegram orqali bog&apos;lanishadi.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <strong className="block font-bold">Xabaringiz muvaffaqiyatli qabul qilindi!</strong>
            <span>Qabul komissiyasi tez orada siz bilan bog&apos;lanadi.</span>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            To&apos;liq Ism-Familiyangiz *
          </label>
          <Input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Masalan: Sardor Rustamov"
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
            Mavzu yoki Qiziqtirgan Fakultet
          </label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Masalan: Tibbiyot fakultetiga o'qishni ko'chirish"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Xabar Matni *
          </label>
          <Textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Savolingiz yoki murojaatingiz tafsilotlarini yozing..."
          />
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#0096DB] hover:bg-[#0085c4] text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-[#0096DB]/20 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <span>Yuborilmoqda...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Xabarni Yuborish</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
