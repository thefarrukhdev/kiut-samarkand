"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUp,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/shared/SocialIcons";
import { Container } from "@/components/ui/container";
import { useTranslation, useLocale, translations } from "@/lib/i18n";
import { getFacultySummaries } from "@/data/schools";
import type { Locale } from "@/types";

interface FooterProps {
  currentLocale?: Locale;
}

export function Footer({ currentLocale: propLocale }: FooterProps = {}) {
  const { locale: contextLocale } = useLocale();
  const { t: contextT } = useTranslation("footer");
  const currentLocale = propLocale || contextLocale;
  const t = propLocale ? (translations[propLocale]?.footer || contextT) : contextT;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const graduateLabel =
    currentLocale === "ru"
      ? "Отделение магистратуры"
      : currentLocale === "en"
      ? "Graduate Studies"
      : "Magistratura bo'limi";

  const faculties = React.useMemo(() => {
    const list = getFacultySummaries(currentLocale).map((f) => ({
      name: f.name,
      href: `/programs?faculty=${f.id}`,
    }));
    list.push({ name: graduateLabel, href: "/programs?degree=master" });
    return list;
  }, [currentLocale, graduateLabel]);

  const quickLinks = React.useMemo(
    () => [
      {
        name:
          currentLocale === "ru"
            ? "История и устав университета"
            : currentLocale === "en"
            ? "University Charter & History"
            : "Universitet tarixi va nizomi",
        href: "/about",
      },
      {
        name:
          currentLocale === "ru"
            ? "Процесс приема 2026/2027"
            : currentLocale === "en"
            ? "Admissions 2026/2027"
            : "Qabul 2026/2027 jarayoni",
        href: "/admission",
      },
      {
        name:
          currentLocale === "ru"
            ? "Все 48+ направлений"
            : currentLocale === "en"
            ? "All 48+ Programs"
            : "Barcha 48+ yo'nalishlar",
        href: "/programs",
      },
      {
        name:
          currentLocale === "ru"
            ? "Новости университета"
            : currentLocale === "en"
            ? "University News"
            : "Universitet yangiliklari",
        href: "/news",
      },
      {
        name:
          currentLocale === "ru"
            ? "Контакты и схема проезда"
            : currentLocale === "en"
            ? "Campus Contacts & Directions"
            : "Aloqa va manzil",
        href: "/contact",
      },
      {
        name:
          currentLocale === "ru"
            ? "Информационная система HEMIS"
            : currentLocale === "en"
            ? "HEMIS Academic Information System"
            : "HEMIS elektron tizimi",
        href: "https://hemis.kiut.uz",
        external: true,
      },
    ],
    [currentLocale]
  );

  return (
    <footer
      id="contact"
      className="bg-primary text-slate-300 relative overflow-hidden border-t border-slate-800"
    >
      {/* Main Footer Content */}
      <div className="pt-16 pb-12 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Col 1: Institutional Identity & Accreditation (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="relative h-12 w-52">
                <Image
                  src="/assets/icons_and_logos/logo-white.a8d7f4ba79da.png"
                  alt="KIUT Samarkand Logo"
                  fill
                  sizes="208px"
                  className="object-contain object-left"
                />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {t.desc}
              </p>

              {/* Accreditation Badge */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-accent/20 text-accent shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {t.accreditationTitle}
                  </h4>
                  <p className="text-[12px] text-slate-400 mt-0.5 leading-snug">
                    {t.accreditationText}
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                  {t.socialLabel}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://t.me/kiut_samarkand"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="h-10 w-10 rounded-xl bg-white/5 hover:bg-accent hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200"
                  >
                    <TelegramIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://instagram.com/kiut_samarkand"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="h-10 w-10 rounded-xl bg-white/5 hover:bg-primary-royal hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://facebook.com/kiut.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="h-10 w-10 rounded-xl bg-white/5 hover:bg-primary-royal hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://youtube.com/@kiutofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="h-10 w-10 rounded-xl bg-white/5 hover:bg-red-600 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200"
                  >
                    <YoutubeIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Col 2: Faculties (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2.5">
                {t.facultiesTitle}
              </h3>
              <ul className="space-y-2.5">
                {faculties.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white hover:translate-x-1 transition-all group"
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-accent transition-colors" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2.5">
                {t.portalTitle}
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-accent transition-colors"
                      >
                        <span>{item.name}</span>
                        <ExternalLink className="h-3 w-3 text-slate-500" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-accent transition-colors"
                      >
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Campus Contacts (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2.5">
                {t.contactTitle}
              </h3>
              <div className="space-y-3.5 text-sm">
                <a
                  href="https://maps.google.com/?q=Samarqand+Spitamen+shoh+ko%27chasi+270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors group"
                >
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {t.address}
                  </span>
                </a>

                <div className="space-y-1.5">
                  <a
                    href="tel:+998557024040"
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4 text-accent shrink-0" />
                    <span>+998 (55) 702-40-40</span>
                  </a>
                  <a
                    href="tel:+998781294040"
                    className="flex items-center gap-3 hover:text-white transition-colors text-slate-400"
                  >
                    <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                    <span>+998 (78) 129-40-40</span>
                  </a>
                </div>

                <a
                  href="mailto:info@kiut.uz"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <span>info@kiut.uz</span>
                </a>

                <div className="flex items-start gap-3 text-xs text-slate-400 pt-1">
                  <Clock className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                  <span>
                    {t.days}
                    <br />
                    {t.sunday}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-white/10 py-6 bg-black/20">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.copyright}</p>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition-colors">
              {t.privacy}
            </a>
            <a href="#admission" className="hover:text-white transition-colors">
              {t.terms}
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10 cursor-pointer"
              aria-label={t.backToTop}
            >
              <span>{t.backToTop}</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </Container>
      </div>
    </footer>
  );
}
