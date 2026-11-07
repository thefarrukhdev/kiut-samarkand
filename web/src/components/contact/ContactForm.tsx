"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatUzbekPhone, isUzbekPhoneValid } from "@/lib/phone";
import { useLocale } from "@/lib/i18n";

const FORM_LABELS = {
  uz: {
    heading: "Savol yoki Murojaat Qoldiring",
    subheading: "Mutaxassislarimiz 24 soat ichida siz bilan telefon yoki Telegram orqali bog'lanishadi.",
    nameLabel: "To'liq Ism-Familiyangiz *",
    namePlaceholder: "Masalan: Sardor Rustamov",
    phoneLabel: "Telefon Raqamingiz *",
    phonePlaceholder: "+998 (90) 123-45-67",
    subjectLabel: "Mavzu yoki Qiziqtirgan Fakultet",
    subjectPlaceholder: "Masalan: Tibbiyot fakultetiga o'qishni ko'chirish",
    messageLabel: "Xabar Matni *",
    messagePlaceholder: "Savolingiz yoki murojaatingiz tafsilotlarini yozing...",
    submitBtn: "Xabarni Yuborish",
    submittingBtn: "Yuborilmoqda...",
    successTitle: "Xabaringiz muvaffaqiyatli qabul qilindi!",
    successDesc: "Qabul komissiyasi tez orada siz bilan bog'lanadi.",
    errorName: "Iltimos, to'liq ism-familiyangizni kiriting.",
    errorPhone: "Iltimos, to'liq telefon raqamingizni kiriting (+998 XX XXX-XX-XX).",
    errorMessage: "Xabar matni kamida 5 ta belgidan iborat bo'lishi kerak.",
    errorServer: "Server bilan aloqa o'rnatib bo'lmadi. Iltimos qaytadan urinib ko'ring.",
  },
  ru: {
    heading: "Задайте вопрос или оставьте обращение",
    subheading: "Наши специалисты свяжутся с вами в течение 24 часов по телефону или Telegram.",
    nameLabel: "Ваше полное имя *",
    namePlaceholder: "Например: Сардор Рустамов",
    phoneLabel: "Номер телефона *",
    phonePlaceholder: "+998 (90) 123-45-67",
    subjectLabel: "Тема или интересующий факультет",
    subjectPlaceholder: "Например: Перевод на медицинский факультет",
    messageLabel: "Текст сообщения *",
    messagePlaceholder: "Напишите подробности вашего вопроса или обращения...",
    submitBtn: "Отправить сообщение",
    submittingBtn: "Отправка...",
    successTitle: "Ваше сообщение успешно принято!",
    successDesc: "Приемная комиссия свяжется с вами в ближайшее время.",
    errorName: "Пожалуйста, введите ваше полное имя.",
    errorPhone: "Пожалуйста, введите корректный номер телефона (+998 XX XXX-XX-XX).",
    errorMessage: "Текст сообщения должен содержать минимум 5 символов.",
    errorServer: "Не удалось связаться с сервером. Пожалуйста, попробуйте снова.",
  },
  en: {
    heading: "Ask a Question or Send an Inquiry",
    subheading: "Our admissions specialists will contact you within 24 hours via phone or Telegram.",
    nameLabel: "Your Full Name *",
    namePlaceholder: "E.g. Sardor Rustamov",
    phoneLabel: "Phone Number *",
    phonePlaceholder: "+998 (90) 123-45-67",
    subjectLabel: "Subject or Interested Faculty",
    subjectPlaceholder: "E.g. Transfer to Medicine Faculty",
    messageLabel: "Message *",
    messagePlaceholder: "Write the details of your inquiry or question...",
    submitBtn: "Send Message",
    submittingBtn: "Sending...",
    successTitle: "Your message has been received successfully!",
    successDesc: "The admissions team will contact you shortly.",
    errorName: "Please enter your full name.",
    errorPhone: "Please enter a valid phone number (+998 XX XXX-XX-XX).",
    errorMessage: "Message must contain at least 5 characters.",
    errorServer: "Could not connect to the server. Please try again.",
  },
};

export function ContactForm() {
  const { locale } = useLocale();
  const labels = FORM_LABELS[locale] || FORM_LABELS.uz;

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
      setError(labels.errorName);
      return;
    }

    if (!isUzbekPhoneValid(phone)) {
      setError(labels.errorPhone);
      return;
    }

    if (message.trim().length < 5) {
      setError(labels.errorMessage);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          subject,
          message,
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
        setError(data.error || labels.errorServer);
      }
    } catch {
      setError(labels.errorServer);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {labels.heading}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {labels.subheading}
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <strong className="block font-bold">{labels.successTitle}</strong>
            <span>{labels.successDesc}</span>
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
            {labels.nameLabel}
          </label>
          <Input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={labels.namePlaceholder}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {labels.phoneLabel}
          </label>
          <Input
            required
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder={labels.phonePlaceholder}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {labels.subjectLabel}
          </label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={labels.subjectPlaceholder}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {labels.messageLabel}
          </label>
          <Textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={labels.messagePlaceholder}
          />
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#0096DB] hover:bg-[#0085c4] text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-[#0096DB]/20 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <span>{labels.submittingBtn}</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>{labels.submitBtn}</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
