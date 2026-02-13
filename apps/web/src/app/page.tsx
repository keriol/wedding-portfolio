"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function HomePage() {
    const { locale, setLocale, t, ready } = useI18n();
    const nextLocale = locale === "en" ? "it" : "en";

    if (!ready) return <main style={{ padding: 24 }}>Loading…</main>;

    return (
        <main style={{ padding: 24 }}>
            <button
                onClick={() => setLocale(nextLocale)}
                style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 8 }}
            >
                {nextLocale.toUpperCase()}
            </button>
            <h1 style={{ marginTop: 16 }}>{t("home.title")}</h1>
            <p>{t("home.subtitle")}</p>
        </main>
    );
}
