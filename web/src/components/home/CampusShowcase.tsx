"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types";

interface CampusShowcaseProps {
  currentLocale?: Locale;
  onOpenAdmissionModal?: () => void;
}

export function CampusShowcase({
  currentLocale = "uz",
  onOpenAdmissionModal,
}: CampusShowcaseProps) {
  const [activeCluster, setActiveCluster] = React.useState<number>(0);

  const clusters = React.useMemo(
    () => [
      {
        id: "med",
        title:
          currentLocale === "ru"
            ? "Симуляционный медицинский центр"
            : currentLocale === "en"
            ? "Medical Simulation & Clinical Center"
            : "Tibbiy Simulyatsiya va Klinika Markazi",
        tag: currentLocale === "ru" ? "Медицина" : currentLocale === "en" ? "Medicine" : "Tibbiyot klasteri",
        image: "/assets/banners/8y8a8213.jpg__1920x1080_q85_crop_subsampling-2.jpg",
        description:
          currentLocale === "ru"
            ? "Оснащен современными анатомическими тренажерами, интерактивными анатомическими столами Anatomage и реанимационными манекенами для отработки практических клинических навыков с 1-го курса."
            : currentLocale === "en"
            ? "Equipped with realistic Anatomage virtual dissection tables, automated patient mannequins, and clinical simulation rooms for early hands-on medical training."
            : "Birinchi bosqichdanoq talabalarga amaliy klinik ko'nikmalarni singdiruvchi zamonaviy Anatomage interaktiv stollari, robotlashtirilgan mulyajlar va jarrohlik simulyatorlari.",
        features: [
          currentLocale === "ru" ? "Интерактивная 3D-анатомия Anatomage" : currentLocale === "en" ? "Interactive 3D Anatomage tables" : "Anatomage interaktiv 3D anatomiya stollari",
          currentLocale === "ru" ? "Реалистичные симуляторы для хирургии" : currentLocale === "en" ? "Surgical and emergency simulators" : "Jarrohlik va reanimatsiya simulyatorlari",
          currentLocale === "ru" ? "Клиническая база в ведущих больницах" : currentLocale === "en" ? "Clinical rotations in top hospitals" : "Viloyat ko'p tarmoqli tibbiyot markazida amaliyot",
        ],
        statNumber: "12+",
        statLabel: currentLocale === "ru" ? "Специализированных лабораторий" : currentLocale === "en" ? "Specialized Clinical Labs" : "Ixtisoslashgan laboratoriyalar",
      },
      {
        id: "it",
        title:
          currentLocale === "ru"
            ? "IT-Хаб и Лаборатории Искусственного Интеллекта"
            : currentLocale === "en"
            ? "IT Innovation Hub & AI Laboratories"
            : "IT-Xab va Sun'iy Intellekt Laboratoriyalari",
        tag:
          currentLocale === "ru"
            ? "IT и Инженерия"
            : currentLocale === "en"
            ? "IT & Engineering"
            : "IT & Muhandislik",
        image: "/assets/banners/20261022125829.jpg__1920x1080_q85_crop_subsampling-2.jpg",
        description:
          currentLocale === "ru"
            ? "Высокопроизводительные рабочие станции, кластеры графических процессоров (GPU) для обучения нейросетей, лаборатории робототехники, схемотехники и 3D-печати."
            : currentLocale === "en"
            ? "High-performance GPU computing clusters, neural network training stations, robotics workshops, and dedicated prototyping 3D-printing labs."
            : "Neyron tarmoqlarni o'qitish uchun yuqori quvvatli GPU serverlar, robototexnika konstruktorlik ustaxonalari, IoT datchiklar va zamonaviy 3D printerlar majmuasi.",
        features: [
          currentLocale === "ru" ? "GPU-кластеры для машинного обучения" : currentLocale === "en" ? "GPU clusters for deep learning" : "Mashinaviy o'rganish uchun GPU klasterlari",
          currentLocale === "ru" ? "Лаборатория робототехники и IoT" : currentLocale === "en" ? "Robotics & IoT prototyping lab" : "Robototexnika va mikrokontrollerlar xonasi",
          currentLocale === "ru" ? "Инкубатор студенческих IT-стартапов" : currentLocale === "en" ? "Student tech startup incubator" : "Talabalar startap-inkubatori va kovorking",
        ],
        statNumber: "100+",
        statLabel: currentLocale === "ru" ? "Современных рабочих станций" : currentLocale === "en" ? "High-performance Workstations" : "Yuqori quvvatli ish stansiyalari",
      },
      {
        id: "campus",
        title:
          currentLocale === "ru"
            ? "Современный кампус на ул. Спитамен Шох"
            : currentLocale === "en"
            ? "Modern Urban Campus on Spitamen Avenue"
            : "Spitamen shoh ko'chasidagi zamonaviy bino",
        tag: currentLocale === "ru" ? "Инфраструктура" : currentLocale === "en" ? "Campus" : "Kampus binosi",
        image: "/assets/banners/20260808111028.jpg__1920x1080_q85_crop_subsampling-2.jpg",
        description:
          currentLocale === "ru"
            ? "Новое 5-этажное университетское здание, построенное по международным образовательным стандартам. Просторные мультимедийные аудитории, зоны отдыха и безбарьерная среда."
            : currentLocale === "en"
            ? "State-of-the-art multi-story academic facility built to international standards, featuring smart classrooms, green study zones, and full accessibility."
            : "Xalqaro ta'lim me'morchiligi asosida qad rostlagan zamonaviy bino: keng multimedia auditoriyalari, ekologik yashil dam olish hududlari va qulay transport infratuzilmasi.",
        features: [
          currentLocale === "ru" ? "Смарт-аудитории с интерактивными панелями" : currentLocale === "en" ? "Smart interactive classrooms" : "Smart interaktiv sensor panellar",
          currentLocale === "ru" ? "Электронный доступ и безопасность 24/7" : currentLocale === "en" ? "Biometric access & 24/7 security" : "Biometrik Face-ID va 24/7 xavfsizlik",
          currentLocale === "ru" ? "Удобная транспортная развязка в центре" : currentLocale === "en" ? "Central urban location" : "Samarqand shahrining qulay transport markazi",
        ],
        statNumber: "15 000+",
        statLabel: currentLocale === "ru" ? "кв.м общей площади кампуса" : currentLocale === "en" ? "sq.m Total Educational Area" : "kv.m o'quv va amaliyot maydoni",
      },
      {
        id: "hall",
        title:
          currentLocale === "ru"
            ? "Международный конференц-зал и библиотека"
            : currentLocale === "en"
            ? "Grand Auditorium & Digital Library"
            : "Xalqaro anjumanlar zali va axborot markazi",
        tag: currentLocale === "ru" ? "Академическая среда" : currentLocale === "en" ? "Academic Culture" : "Ilmiy fond",
        image: "/assets/banners/8y8a7608.jpg__1920x1080_q85_crop_subsampling-2.jpg",
        description:
          currentLocale === "ru"
            ? "Конференц-зал на 500+ мест с синхронным переводом для международных симпозиумов и электронная библиотека с доступом к Scopus, Web of Science и Springer."
            : currentLocale === "en"
            ? "500-seat auditorium equipped with simultaneous translation for global symposia, and digital library connected to Scopus and Springer databases."
            : "500 dan ortiq o'rinli, sinxron tarjima uskunalariga ega muhtasham anjumanlar zali hamda Scopus va ScienceDirect bazalariga ulangan boy axborot-kutubxona.",
        features: [
          currentLocale === "ru" ? "Синхронный перевод на 4 языка" : currentLocale === "en" ? "Simultaneous 4-language interpreting" : "4 ta tilda sinxron tarjima apparaturasi",
          currentLocale === "ru" ? "100 000+ книг и электронных ресурсов" : currentLocale === "en" ? "100,000+ print and digital titles" : "100 000+ bosma va elektron fond",
          currentLocale === "ru" ? "Прямые телемосты с зарубежными вузами" : currentLocale === "en" ? "Global university live teleconferences" : "Koreya va Yevropa bilan jonli telemuloqotlar",
        ],
        statNumber: "500+",
        statLabel: currentLocale === "ru" ? "Мест в главном амфитеатре" : currentLocale === "en" ? "Auditorium Seating Capacity" : "O'rinli bosh amfiteatr",
      },
    ],
    [currentLocale]
  );

  const current = clusters[activeCluster] || clusters[0];

  return (
    <section
      id="campus"
      aria-label={
        currentLocale === "ru"
          ? "Инфраструктура кампуса и лаборатории"
          : currentLocale === "en"
          ? "Campus Infrastructure and Laboratories"
          : "Kampus infratuzilmasi va laboratoriyalar"
      }
      className="py-16 sm:py-24 bg-white border-b border-slate-200 relative z-10"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-0.5 bg-accent rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-accent">
                {currentLocale === "ru"
                  ? "Инфраструктура мирового уровня"
                  : currentLocale === "en"
                  ? "World-Class Infrastructure"
                  : "Jahon Standartlaridagi Infratuzilma"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary tracking-tight">
              {currentLocale === "ru"
                ? "Лаборатории, кампус и интеллектуальная среда"
                : currentLocale === "en"
                ? "Advanced Laboratories & Urban Campus"
                : "Zamonaviy kampus va amaliy laboratoriyalar"}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            {currentLocale === "ru"
              ? "Ознакомьтесь с реальными учебными корпусами, клиниками и исследовательскими центрами филиала."
              : currentLocale === "en"
              ? "Explore cutting-edge medical simulation suites, high-tech GPU computing centers, and digital libraries."
              : "Amaliyotga yo'naltirilgan zamonaviy laboratoriyalar, klinik simulyatorlar va axborot-resurs markazi."}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" role="tablist">
          {clusters.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={activeCluster === idx}
              onClick={() => setActiveCluster(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCluster === idx
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              {c.tag}
            </button>
          ))}
        </div>

        {/* Active Cluster Showcase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-surface rounded-3xl border border-slate-200 p-6 sm:p-10">
          {/* Left Column: Details & Features (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-accent bg-white border border-slate-200 px-3 py-1 rounded-md">
                {current.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-primary tracking-tight mt-3">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {current.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-primary">{feat}</span>
                </div>
              ))}
            </div>

            {/* Metrics Callout & Action Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-primary block tabular-nums">
                  {current.statNumber}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {current.statLabel}
                </span>
              </div>

              <Button
                onClick={() => onOpenAdmissionModal?.()}
                variant="action"
                size="default"
                className="font-bold bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md"
              >
                <span>
                  {currentLocale === "ru"
                    ? "Записаться на кампус-тур"
                    : currentLocale === "en"
                    ? "Book a Campus Tour"
                    : "Kampusga sayohat buyurtma qilish"}
                </span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Right Column: High-Res Framed Photo (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl aspect-[16/11] bg-slate-900 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Caption on photo */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex items-center justify-between">
                <span className="text-xs font-bold text-white bg-primary px-3 py-1 rounded-md border border-white/10">
                  {current.title}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {currentLocale === "ru"
                    ? "ТМУК Самарканд"
                    : currentLocale === "en"
                    ? "KIUT Samarkand"
                    : "TKXU Samarqand"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
