"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useLocale } from "@/lib/i18n";

const CONTACT_DATA = {
  uz: [
    {
      title: "Telefon Raqamlar",
      value: "+998 (78) 129-40-40",
      secondary: "+998 (55) 702-40-40 (Qabul markazi)",
      href: "tel:+998781294040",
      icon: Phone,
      color: "text-[#0096DB] bg-blue-50 border-blue-100",
    },
    {
      title: "Qabul Komissiyasi Manzili",
      value: "Samarqand shahri, Spitamen shoh ko'chasi, 270-uy",
      secondary: "Mo'ljal: Samarqand xalqaro aeroporti yaqinida",
      href: "https://maps.google.com/?q=Samarkand+Spitamen+270",
      icon: MapPin,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      title: "Elektron Pochta",
      value: "samarkand@kiut.uz",
      secondary: "info@kiut.uz",
      href: "mailto:samarkand@kiut.uz",
      icon: Mail,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Ish Vaqti",
      value: "Dushanba — Shanba: 09:00 - 18:00",
      secondary: "Yakshanba: Dam olish kuni",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Rasmiy Telegram Kanal",
      value: "@kiut_samarkand",
      secondary: "Barcha yangiliklar va e'lonlar",
      href: "https://t.me/kiut_samarkand",
      icon: Send,
      color: "text-sky-600 bg-sky-50 border-sky-100",
    },
  ],
  ru: [
    {
      title: "Номера телефонов",
      value: "+998 (78) 129-40-40",
      secondary: "+998 (55) 702-40-40 (Колл-центр)",
      href: "tel:+998781294040",
      icon: Phone,
      color: "text-[#0096DB] bg-blue-50 border-blue-100",
    },
    {
      title: "Адрес приемной комиссии",
      value: "г. Самарканд, проспект Спитамена, дом 270",
      secondary: "Ориентир: рядом с Международным аэропортом",
      href: "https://maps.google.com/?q=Samarkand+Spitamen+270",
      icon: MapPin,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      title: "Электронная почта",
      value: "samarkand@kiut.uz",
      secondary: "info@kiut.uz",
      href: "mailto:samarkand@kiut.uz",
      icon: Mail,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Часы работы",
      value: "Понедельник — Суббота: 09:00 - 18:00",
      secondary: "Воскресенье: Выходной",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Официальный Telegram-канал",
      value: "@kiut_samarkand",
      secondary: "Все новости и объявления университета",
      href: "https://t.me/kiut_samarkand",
      icon: Send,
      color: "text-sky-600 bg-sky-50 border-sky-100",
    },
  ],
  en: [
    {
      title: "Phone Numbers",
      value: "+998 (78) 129-40-40",
      secondary: "+998 (55) 702-40-40 (Admissions Center)",
      href: "tel:+998781294040",
      icon: Phone,
      color: "text-[#0096DB] bg-blue-50 border-blue-100",
    },
    {
      title: "Admissions Office Address",
      value: "270 Spitamen Avenue, Samarkand City",
      secondary: "Landmark: Near Samarkand International Airport",
      href: "https://maps.google.com/?q=Samarkand+Spitamen+270",
      icon: MapPin,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      title: "Email Address",
      value: "samarkand@kiut.uz",
      secondary: "info@kiut.uz",
      href: "mailto:samarkand@kiut.uz",
      icon: Mail,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Working Hours",
      value: "Monday — Saturday: 09:00 - 18:00",
      secondary: "Sunday: Closed",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Official Telegram Channel",
      value: "@kiut_samarkand",
      secondary: "Official announcements and news updates",
      href: "https://t.me/kiut_samarkand",
      icon: Send,
      color: "text-sky-600 bg-sky-50 border-sky-100",
    },
  ],
};

export function ContactInfoGrid() {
  const { locale } = useLocale();
  const contacts = CONTACT_DATA[locale] || CONTACT_DATA.uz;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((c) => {
        const Icon = c.icon;
        const content = (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-[#0096DB]/30 transition-all flex items-start gap-4 h-full">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${c.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                {c.title}
              </span>
              <span className="text-sm font-bold text-slate-900 block leading-snug">
                {c.value}
              </span>
              {c.secondary && (
                <span className="text-xs text-slate-500 block">
                  {c.secondary}
                </span>
              )}
            </div>
          </div>
        );

        return c.href ? (
          <a
            key={c.title}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block"
          >
            {content}
          </a>
        ) : (
          <div key={c.title}>{content}</div>
        );
      })}
    </div>
  );
}
