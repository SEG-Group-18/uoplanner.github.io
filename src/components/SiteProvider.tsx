"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { messages, type Locale } from "@/lib/messages";

type Theme = "light" | "dark";
type SiteContextValue = {
  locale: Locale;
  theme: Theme;
  message: (typeof messages)[Locale];
  toggleLocale: () => void;
  toggleTheme: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);
const defaultPreferences = "en:light";
let cachedPreferences: string | null = null;
const preferenceListeners = new Set<() => void>();

function readPreferences() {
  let locale: Locale =
    typeof navigator !== "undefined" &&
    navigator.language.toLowerCase().startsWith("fr")
      ? "fr"
      : "en";
  let theme: Theme =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  try {
    const savedLocale = localStorage.getItem("uop-lang");
    const savedTheme = localStorage.getItem("uop-theme");
    if (savedLocale === "fr" || savedLocale === "en") locale = savedLocale;
    if (savedTheme === "dark" || savedTheme === "light") theme = savedTheme;
  } catch {
    // Browser preferences remain available when storage is disabled.
  }

  return `${locale}:${theme}`;
}

function getPreferencesSnapshot() {
  if (typeof window === "undefined") return defaultPreferences;
  cachedPreferences ??= readPreferences();
  return cachedPreferences;
}

function subscribeToPreferences(listener: () => void) {
  preferenceListeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== "uop-lang" && event.key !== "uop-theme") {
      return;
    }
    cachedPreferences = null;
    preferenceListeners.forEach((notify) => notify());
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    preferenceListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function updatePreferences(update: (locale: Locale, theme: Theme) => [Locale, Theme]) {
  const snapshot = getPreferencesSnapshot();
  const currentLocale: Locale = snapshot.startsWith("fr:") ? "fr" : "en";
  const currentTheme: Theme = snapshot.endsWith(":dark") ? "dark" : "light";
  const [locale, theme] = update(currentLocale, currentTheme);
  cachedPreferences = `${locale}:${theme}`;
  try {
    localStorage.setItem("uop-lang", locale);
    localStorage.setItem("uop-theme", theme);
  } catch {
    // In-memory preferences still apply when storage is unavailable.
  }
  preferenceListeners.forEach((notify) => notify());
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeToPreferences,
    getPreferencesSnapshot,
    () => defaultPreferences,
  );
  const locale: Locale = snapshot.startsWith("fr:") ? "fr" : "en";
  const theme: Theme = snapshot.endsWith(":dark") ? "dark" : "light";

  const value = useMemo<SiteContextValue>(
    () => ({
      locale,
      theme,
      message: messages[locale],
      toggleLocale: () =>
        updatePreferences((currentLocale, currentTheme) => [
          currentLocale === "en" ? "fr" : "en",
          currentTheme,
        ]),
      toggleTheme: () =>
        updatePreferences((currentLocale, currentTheme) => [
          currentLocale,
          currentTheme === "light" ? "dark" : "light",
        ]),
    }),
    [locale, theme],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = theme;
  }, [locale, theme]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within a SiteProvider.");
  }
  return context;
}
