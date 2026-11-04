"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  ArrowRight,
  Globe,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslation, translations } from "@/lib/i18n";
import { getFacultySummaries } from "@/data/schools";
import type { Locale } from "@/types";

interface NavbarProps {
  currentLocale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
  onOpenAdmissionModal?: () => void;
}

export function Navbar({
  currentLocale: propLocale,
  onLocaleChange,
  onOpenAdmissionModal,
}: NavbarProps) {
  const { locale: contextLocale, setLocale } = useLocale();
  const { t: contextT } = useTranslation("nav");
  const currentLocale = propLocale || contextLocale;
  const t = propLocale ? (translations[propLocale]?.nav || contextT) : contextT;

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [facultiesDropdownOpen, setFacultiesDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFacultiesDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFacultiesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleAdmissionClick = React.useCallback(() => {
    setMobileMenuOpen(false);
    if (onOpenAdmissionModal) {
      onOpenAdmissionModal();
    } else {
      const el = document.getElementById("admission");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [onOpenAdmissionModal]);

  const navLinks = React.useMemo(
    () => [
      {
        label: t.programs || (currentLocale === "ru" ? "Программы" : currentLocale === "en" ? "Programs" : "Dasturlar"),
        href: "/programs",
        badge: "48+",
        hasDropdown: false,
      },
      {
        label: t.faculties,
        href: "/programs",
        hasDropdown: true,
      },
      {
        label: t.admission || (currentLocale === "ru" ? "Приём 2026" : currentLocale === "en" ? "Admission 2026" : "Qabul 2026"),
        href: "/admission",
        hasDropdown: false,
      },
      {
        label: t.university,
        href: "/about",
        hasDropdown: false,
      },
      {
        label: t.news,
        href: "/news",
        hasDropdown: false,
      },
      {
        label: t.contact || (currentLocale === "ru" ? "Контакты" : currentLocale === "en" ? "Contacts" : "Aloqa"),
        href: "/contact",
        hasDropdown: false,
      },
    ],
    [currentLocale, t]
  );

  const facultyList = React.useMemo(() => {
    return getFacultySummaries(currentLocale);
  }, [currentLocale]);

  const dropdownHeading =
    currentLocale === "ru"
      ? "5 основных факультетов"
      : currentLocale === "en"
      ? "5 Core Faculties"
      : "5 asosiy fakultet";

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 border-b border-slate-200 ${
        isScrolled ? "shadow-sm py-2.5" : "py-3.5"
      }`}
    >
      <Container className="flex items-center justify-between gap-4">
        {/* KIUT Brand Logo & Academic Label */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          aria-label={
            currentLocale === "ru"
              ? "ТМУК Самарканд Главная страница"
              : currentLocale === "en"
              ? "KIUT Samarkand Home"
              : "KIUT Samarqand Bosh Sahifa"
          }
        >
          <div className="relative h-10 w-36 sm:h-11 sm:w-44 flex items-center">
            <Image
              src="/assets/icons_and_logos/logo.f177ff7dfd83.png"
              alt="KIUT Samarkand"
              fill
              priority
              sizes="(max-width: 640px) 144px, 176px"
              className="object-contain object-left group-hover:scale-[1.02] transition-transform duration-200"
            />
          </div>
          <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-primary">
              {t.branchLabel}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {t.branchSub}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2"
          aria-label={
            currentLocale === "ru"
              ? "Главное меню"
              : currentLocale === "en"
              ? "Main navigation"
              : "Asosiy menyu"
          }
        >
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setFacultiesDropdownOpen(true)}
                  onMouseLeave={() => setFacultiesDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setFacultiesDropdownOpen((prev) => !prev)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setFacultiesDropdownOpen((prev) => !prev);
                      }
                    }}
                    aria-expanded={facultiesDropdownOpen}
                    aria-haspopup="menu"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-primary hover:text-accent transition-colors rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        facultiesDropdownOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>

                  {/* Mega dropdown */}
                  <AnimatePresence>
                    {facultiesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-2 w-80 z-50"
                        role="menu"
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 overflow-hidden">
                          <div className="px-3.5 py-2 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            <span>{dropdownHeading}</span>
                            <span className="text-[11px] font-semibold text-accent bg-accent-light px-2 py-0.5 rounded-md">
                              {t.facultiesCount}
                            </span>
                          </div>
                          <div className="py-1">
                            {facultyList.map((faculty) => (
                              <Link
                                key={faculty.id}
                                href={`/programs?faculty=${faculty.id}`}
                                role="menuitem"
                                onClick={() => setFacultiesDropdownOpen(false)}
                                className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:text-accent hover:bg-surface rounded-xl transition-colors group"
                              >
                                <span className="font-semibold text-primary group-hover:text-accent">
                                  {faculty.name}
                                </span>
                                <span className="text-[11px] text-slate-400 group-hover:text-slate-600 font-medium">
                                  {faculty.count}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="p-2 border-t border-slate-100 bg-surface rounded-xl mt-1">
                            <Link
                              href="/programs"
                              role="menuitem"
                              onClick={() => setFacultiesDropdownOpen(false)}
                              className="flex items-center justify-between px-2 py-1 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
                            >
                              <span>{t.facultiesAll}</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-primary hover:text-accent transition-colors rounded-lg hover:bg-slate-50"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-black bg-accent-light text-accent border border-accent/20 px-1.5 py-0.5 rounded-md leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Single Unified Language Selector */}
          <div
            className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-1 border border-slate-200"
            role="group"
            aria-label={
              currentLocale === "ru"
                ? "Выбор языка"
                : currentLocale === "en"
                ? "Language selection"
                : "Tilni tanlash"
            }
          >
            <Globe className="h-3.5 w-3.5 ml-1 mr-0.5 text-slate-500 hidden sm:block" />
            {(["uz", "ru", "en"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  setLocale(lang);
                  onLocaleChange?.(lang);
                }}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase transition-all cursor-pointer ${
                  currentLocale === lang
                    ? "bg-primary text-white shadow-xs"
                    : "text-slate-600 hover:text-primary"
                }`}
                aria-pressed={currentLocale === lang}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* High-contrast Admission CTA */}
          <Button
            onClick={handleAdmissionClick}
            variant="action"
            size="default"
            className="hidden sm:inline-flex items-center gap-2 font-bold bg-accent hover:bg-accent-hover text-white shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/35 px-4.5 py-2 rounded-xl text-sm transition-all"
          >
            <span>{t.cta}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-primary hover:text-accent hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen
                ? currentLocale === "ru"
                  ? "Закрыть меню"
                  : currentLocale === "en"
                  ? "Close menu"
                  : "Menyuni yopish"
                : currentLocale === "ru"
                ? "Открыть меню"
                : currentLocale === "en"
                ? "Open menu"
                : "Menyuni ochish"
            }
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-slate-200 bg-white shadow-xl"
          >
            <Container className="py-5 space-y-4">
              <nav
                className="flex flex-col space-y-1"
                aria-label={
                  currentLocale === "ru"
                    ? "Мобильное меню"
                    : currentLocale === "en"
                    ? "Mobile navigation"
                    : "Mobil menyu"
                }
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-semibold text-primary hover:bg-surface hover:text-accent transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="pt-2">
                <Button
                  onClick={handleAdmissionClick}
                  variant="action"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 font-bold bg-accent hover:bg-accent-hover text-white shadow-md shadow-accent/25 rounded-xl py-3"
                >
                  <span>{t.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Direct Contact */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                <a
                  href="tel:+998557024040"
                  className="flex items-center gap-2 font-semibold text-primary hover:text-accent"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  <span>{t.hotline}</span>
                </a>
                <p className="text-slate-500 text-[11px]">
                  {translations[currentLocale].topbar.address}
                </p>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
