"use client";

import React from "react";
import { Navigation, Car, Bus } from "lucide-react";
import { useLocale } from "@/lib/i18n";

const MAP_LABELS = {
  uz: {
    badge: "Universitet Kampusi Manzili",
    title: "Samarqand Filiali Joylashuvi",
    address: "Spitamen shoh ko'chasi, 270-uy, Samarqand shahri (Xalqaro aeroport yo'nalishi)",
    carTitle: "Avtomobilda:",
    carDesc: "Samarqand markazidan Spitamen shoh ko'chasi bo'ylab 10 daqiqalik masofa. Qulay bepul avtoturargoh mavjud.",
    busTitle: "Jamoat transporti:",
    busDesc: "14, 22, 54-sonli avtobus va yo'nalishli taksilar to'g'ridan-to'g'ri universitet bekati oldiga keladi.",
  },
  ru: {
    badge: "Адрес университетского кампуса",
    title: "Расположение филиала в Самарканде",
    address: "проспект Спитамена, дом 270, город Самарканд (направление к международному аэропорту)",
    carTitle: "На автомобиле:",
    carDesc: "10 минут езды от центра Самарканда по проспекту Спитамена. Имеется удобная бесплатная парковка.",
    busTitle: "Общественный транспорт:",
    busDesc: "Автобусы № 14, 22, 54 и маршрутные такси останавливаются прямо напротив кампуса университета.",
  },
  en: {
    badge: "University Campus Location",
    title: "Samarkand Campus Map & Directions",
    address: "270 Spitamen Avenue, Samarkand City (International Airport Road)",
    carTitle: "By Car:",
    carDesc: "10-minute drive from Samarkand city center along Spitamen Avenue. Convenient free parking is available.",
    busTitle: "Public Transit:",
    busDesc: "Bus routes 14, 22, 54 and city route taxis stop directly outside the university campus station.",
  },
};

export function CampusMapCard() {
  const { locale } = useLocale();
  const labels = MAP_LABELS[locale] || MAP_LABELS.uz;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0096DB] mb-1">
          <Navigation className="w-4 h-4" />
          <span>{labels.badge}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {labels.title}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {labels.address}
        </p>
      </div>

      {/* Map Interactive / Preview Frame */}
      <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100 shadow-inner">
        <iframe
          title="KIUT Samarkand Campus Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3071.8!2d66.97!3d39.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM5JzAwLjAiTiA2NsKwNTgnMTIuMCJF!5e0!3m2!1sen!2suz!4v1620000000000!5m2!1sen!2suz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>

      {/* Transport & Directions info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
          <Car className="w-5 h-5 text-[#0096DB] shrink-0 mt-0.5" />
          <div>
            <strong className="text-xs font-bold text-slate-800 block">{labels.carTitle}</strong>
            <span className="text-xs text-slate-600">
              {labels.carDesc}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
          <Bus className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-xs font-bold text-slate-800 block">{labels.busTitle}</strong>
            <span className="text-xs text-slate-600">
              {labels.busDesc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
