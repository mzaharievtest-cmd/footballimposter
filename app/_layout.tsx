import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAvailablePurchases, hasActiveSubscriptions, initConnection, endConnection } from "expo-iap";
import "react-native-reanimated";
import "react-native-gesture-handler";

import { GameSettingsProvider } from "../store/gameSettings";
import { PRODUCT_LIFETIME, PRODUCT_WEEKLY, usePurchaseStore } from "../store/purchaseStore";

// Use require() for JSON to avoid Metro/Hermes parsing edge-cases with non-ASCII chars.
const en = require("../components/i18n/en.json");
const es = require("../components/i18n/es.json");
const fr = require("../components/i18n/fr.json");
const de = require("../components/i18n/de.json");
const it = require("../components/i18n/it.json");
const pt = require("../components/i18n/pt.json");
const nl = require("../components/i18n/nl.json");
const pl = require("../components/i18n/pl.json");
const tr = require("../components/i18n/tr.json");
const ar = require("../components/i18n/ar.json");
const sr = require("../components/i18n/sr.json");
const sl = require("../components/i18n/sl.json");

const BG = "#06110a";
const LANG_STORAGE_KEY = "settings.language";

// -------- i18n / Language Context --------
export type Language =
  | "en"
  | "de"
  | "es"
  | "fr"
  | "it"
  | "pt"
  | "nl"
  | "pl"
  | "tr"
  | "ar"
  | "sr"
  | "sl";

type LanguageContextType = {
  language: Language;
  setLanguage: (l: Language) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// Keep old name for backwards compatibility
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

// Translations registry.
// Each language file lives in `components/i18n/<code>.json`.
// If a key is missing in the selected language, we fall back to English.
type Dict = Record<string, any>;
const TRANSLATIONS: Record<Language, Dict> = {
  en: (en ?? {}) as Dict,
  de: (de ?? {}) as Dict,
  es: (es ?? {}) as Dict,
  fr: (fr ?? {}) as Dict,
  it: (it ?? {}) as Dict,
  pt: (pt ?? {}) as Dict,
  nl: (nl ?? {}) as Dict,
  pl: (pl ?? {}) as Dict,
  tr: (tr ?? {}) as Dict,
  ar: (ar ?? {}) as Dict,
  sr: (sr ?? {}) as Dict,
  sl: (sl ?? {}) as Dict,
};

function getByPath(dict: any, key: string): any {
  if (!dict) return undefined;
  return key
    .split(".")
    .reduce((acc: any, part) => (acc ? acc[part] : undefined), dict);
}

function interpolate(text: string, vars?: Record<string, any>) {
  if (!vars) return text;
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => {
    const v = vars[k];
    return v === undefined || v === null ? "" : String(v);
  });
}

function getTranslation(lang: Language, key: string, vars?: Record<string, any>) {
  const primary = getByPath(TRANSLATIONS[lang], key);
  const fallback = getByPath(TRANSLATIONS.en, key);
  const value = (primary ?? fallback) as any;

  if (typeof value === "string") return interpolate(value, vars);
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  // If missing in both selected language and English, show the key (helps spot gaps)
  return key;
}

// ✅ This is what Settings expects.
export function useI18n() {
  const { language, setLanguage } = useLanguage();

  const t = useMemo(() => {
    return (key: string, vars?: Record<string, any>) => {
      return getTranslation(language, key, vars);
    };
  }, [language]);

  return { language, setLanguage, t };
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    let mounted = true;

    AsyncStorage.getItem(LANG_STORAGE_KEY)
      .then((stored) => {
        if (!mounted || !stored) return;
        // Guard against invalid/old stored values
        const supported: Language[] = [
          "en",
          "es",
          "fr",
          "de",
          "it",
          "pt",
          "nl",
          "pl",
          "tr",
          "ar",
          "sr",
          "sl",
        ];
        if (supported.includes(stored as Language)) setLanguageState(stored as Language);
      })
      .catch(() => {
        // ignore
      });

    return () => {
      mounted = false;
    };
  }, []);

  const setLanguage = async (l: Language) => {
    setLanguageState(l);
    try {
      await AsyncStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default function RootLayout() {
  const setPurchase = usePurchaseStore((s) => s.setPurchase);

  // Check for an existing weekly/lifetime purchase on launch and restore entitlement.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      let connected = false;
      try {
        connected = await initConnection();
        if (!connected || cancelled) return;

        const hasWeekly = await hasActiveSubscriptions([PRODUCT_WEEKLY]).catch(() => false);
        if (hasWeekly) {
          if (!cancelled) setPurchase("weekly");
          return;
        }

        const purchases = await getAvailablePurchases().catch(() => []);
        const ownsLifetime = purchases?.some(
          (p: any) => p?.productId === PRODUCT_LIFETIME || p?.id === PRODUCT_LIFETIME
        );
        if (ownsLifetime && !cancelled) setPurchase("lifetime");
      } catch {
        // Offline or store unavailable at launch — entitlement stays whatever was persisted.
      } finally {
        if (connected) await endConnection().catch(() => {});
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [setPurchase]);

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <GameSettingsProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: BG },
            }}
          >
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen name="paywall" options={{ presentation: "modal" }} />
          </Stack>

          <StatusBar style="light" />
        </GameSettingsProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}