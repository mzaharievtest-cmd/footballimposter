// app/settings/language.tsx
import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import AppText from "@/components/ui/AppText";
import Chevron from "@/components/ui/Chevron";

import { useI18n } from "../_layout";

type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "nl"
  | "pl"
  | "tr"
  | "ar"
  | "sr"
  | "sl";

const LANGUAGES = [
  { code: "en" as LanguageCode, autonym: "English", labelKey: "languages.english" },
  { code: "es" as LanguageCode, autonym: "Español", labelKey: "languages.spanish" },
  { code: "fr" as LanguageCode, autonym: "Français", labelKey: "languages.french" },
  { code: "de" as LanguageCode, autonym: "Deutsch", labelKey: "languages.german" },
  { code: "it" as LanguageCode, autonym: "Italiano", labelKey: "languages.italian" },
  { code: "pt" as LanguageCode, autonym: "Português", labelKey: "languages.portuguese" },
  { code: "nl" as LanguageCode, autonym: "Nederlands", labelKey: "languages.dutch" },
  { code: "pl" as LanguageCode, autonym: "Polski", labelKey: "languages.polish" },
  { code: "tr" as LanguageCode, autonym: "Türkçe", labelKey: "languages.turkish" },
  { code: "ar" as LanguageCode, autonym: "العربية", labelKey: "languages.arabic" },
  { code: "sr" as LanguageCode, autonym: "Srpski", labelKey: "languages.serbian" },
  { code: "sl" as LanguageCode, autonym: "Slovenščina", labelKey: "languages.slovenian" },
] as const;

export default function LanguageScreen() {
  const { t, language, setLanguage } = useI18n();

  const tt = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const onPick = async (code: LanguageCode) => {
    await setLanguage(code);
    router.back(); // close language page after selecting
  };

  return (
    <Screen>
      <Header title={tt("settings.language", "Language")} onLeft={() => router.back()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        <AppText variant="muted" style={styles.subtitle}>
          {tt("settings.chooseLanguage", "Choose a language")}
        </AppText>

        <View style={styles.list}>
          {LANGUAGES.map((l) => {
            const selected = l.code === language;

            return (
              <Pressable key={l.code} onPress={() => onPick(l.code as LanguageCode)}>
                <Card>
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <View style={styles.iconWrap}>
                        <SymbolView
                          name="globe"
                          size={18}
                          tintColor="rgba(255,255,255,0.85)"
                        />
                      </View>

                      <View>
                        <AppText variant="label" style={styles.title}>
                          {tt(l.labelKey, l.autonym)}
                        </AppText>
                        <AppText variant="muted" style={styles.code}>
                          {l.code.toUpperCase()}
                        </AppText>
                      </View>
                    </View>

                    {selected ? (
                      <View style={styles.checkWrap}>
                        <SymbolView
                          name="checkmark"
                          size={16}
                          tintColor="#00e06a"
                        />
                      </View>
                    ) : (
                      <Chevron />
                    )}
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 18,
    flexGrow: 1,
  },
  subtitle: {
    paddingHorizontal: 18,
    fontSize: 14,
    opacity: 0.75,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  title: { fontSize: 18 },
  code: { marginTop: 4, fontSize: 12, opacity: 0.55, fontWeight: "700" },
  checkWrap: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,224,106,0.18)",
    borderWidth: 1,
    borderColor: "rgba(0,224,106,0.35)",
  },
  list: { marginTop: 12, gap: 12 },
});