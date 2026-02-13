"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Locale = "en" | "it";
type Dict = Record<string, any>;

type I18nContextValue = {
  locale: Locale;
  availableLocales: Locale[];
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  ready: boolean;
};

const STORAGE_KEY = "locale";
const DEFAULT_LOCALE: Locale = "en";
const AVAILABLE: Locale[] = ["en", "it"];

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function lookup(obj: any, key: string): string | undefined {
  const parts = key.split(".");
  let cur: any = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else return undefined;
  }
  return typeof cur === "string" ? cur : undefined;
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/{{\s*([^}]+)\s*}}/g, (_, name) => {
    const k = String(name).trim();
    const v = vars[k];
    return v === undefined || v === null ? "" : String(v);
  });
}

function getStoredLocale(): Locale | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "en" || v === "it") return v;
    return null;
  } catch {
    return null;
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [messages, setMessages] = useState<Dict>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getStoredLocale();
    if (stored) setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    setReady(false);

    fetch(`/content/${locale}.json`, { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        setMessages(json);
        setReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        setMessages({});
        setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const setLocale = (l: Locale) => {
    if (!AVAILABLE.includes(l)) return;
    setLocaleState(l);
  };

  const t = useMemo(() => {
    return (key: string, vars?: Record<string, string | number>) => {
      const raw = lookup(messages, key) ?? key;
      return interpolate(raw, vars);
    };
  }, [messages]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, availableLocales: AVAILABLE, setLocale, t, ready }),
    [locale, t, ready]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
