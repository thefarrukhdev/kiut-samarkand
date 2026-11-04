"use client";

import * as React from "react";
import type { Locale, TranslationDictionary } from "./types";
import { getDictionary } from "./locales";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  t: TranslationDictionary;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "kiut_locale";
const COOKIE_KEY = "NEXT_LOCALE";
const VALID_LOCALES: Locale[] = ["uz", "ru", "en"];

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getClientSnapshot(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && VALID_LOCALES.includes(saved)) return saved;
  } catch {
    // Restricted environment fallback
  }
  return "uz";
}

function getServerSnapshot(): Locale {
  return "uz";
}

interface LocaleProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function LocaleProvider({
  children,
  initialLocale = "uz",
}: LocaleProviderProps) {
  const storeLocale = React.useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const [activeLocale, setActiveLocale] = React.useState<Locale>(initialLocale);

  const setLocale = React.useCallback((newLocale: Locale) => {
    if (!VALID_LOCALES.includes(newLocale)) return;
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${COOKIE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Storage access restricted
    }
    setActiveLocale(newLocale);
    listeners.forEach((listener) => listener());
  }, []);

  const effectiveLocale = storeLocale || activeLocale || initialLocale;

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = effectiveLocale;
    }
  }, [effectiveLocale]);

  const contextValue = React.useMemo<LocaleContextValue>(() => {
    return {
      locale: effectiveLocale,
      setLocale,
      t: getDictionary(effectiveLocale),
    };
  }, [effectiveLocale, setLocale]);

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
} {
  const context = React.useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a <LocaleProvider>");
  }
  return {
    locale: context.locale,
    setLocale: context.setLocale,
  };
}

export function useTranslation<K extends keyof TranslationDictionary>(
  section: K
): {
  t: TranslationDictionary[K];
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
};
export function useTranslation(): {
  t: TranslationDictionary;
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
};
export function useTranslation<K extends keyof TranslationDictionary>(
  section?: K
) {
  const context = React.useContext(LocaleContext);
  if (!context) {
    throw new Error("useTranslation must be used within a <LocaleProvider>");
  }

  if (section) {
    return {
      t: context.t[section],
      locale: context.locale,
      setLocale: context.setLocale,
    };
  }

  return {
    t: context.t,
    locale: context.locale,
    setLocale: context.setLocale,
  };
}
