import React, { useCallback, useMemo } from "react";
import { View, Pressable, ScrollView, Linking, Platform, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import AppText from "@/components/ui/AppText";
import { useI18n } from "../_layout";
import { C, R, shadow } from "@/components/ui/theme";

type RowProps = {
  icon: React.ReactNode;
  iconColor?: string;
  title: string;
  value?: string;
  onPress?: () => void;
  right?: React.ReactNode;
  last?: boolean;
};

function Row({ icon, iconColor = "rgba(0,224,106,0.10)", title, value, onPress, right, last }: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, !last && styles.rowBorder, pressed && onPress && { opacity: 0.6 }]}
    >
      <View style={[styles.iconBadge, { backgroundColor: iconColor }]}>{icon}</View>
      <View style={styles.rowText}>
        <AppText style={styles.rowTitle}>{title}</AppText>
        {value ? <AppText style={styles.rowValue}>{value}</AppText> : null}
      </View>
      {right ? <View style={styles.rowRight}>{right}</View> : null}
      {onPress && !right ? <AppText style={styles.rowChevron}>›</AppText> : null}
    </Pressable>
  );
}

export default function SettingsScreen() {
  let appJson: any = null;
  try { appJson = require("../../app.json"); } catch {}
  const expoConfig = appJson?.expo ?? {};
  const version = expoConfig?.version ?? "—";
  const build = Platform.OS === "ios"
    ? (expoConfig?.ios?.buildNumber ?? "—")
    : (typeof expoConfig?.android?.versionCode === "number" ? String(expoConfig.android.versionCode) : "—");

  const { t, language } = useI18n();

  const languageLabel = useMemo(() => {
    const map: Record<string, { key: string; fallback: string }> = {
      en: { key: "languages.english", fallback: "English" },
      es: { key: "languages.spanish", fallback: "Español" },
      fr: { key: "languages.french", fallback: "Français" },
      de: { key: "languages.german", fallback: "Deutsch" },
      it: { key: "languages.italian", fallback: "Italiano" },
      pt: { key: "languages.portuguese", fallback: "Português" },
      nl: { key: "languages.dutch", fallback: "Nederlands" },
      pl: { key: "languages.polish", fallback: "Polski" },
      tr: { key: "languages.turkish", fallback: "Türkçe" },
      ar: { key: "languages.arabic", fallback: "العربية" },
      sr: { key: "languages.serbian", fallback: "Srpski" },
      sl: { key: "languages.slovenian", fallback: "Slovenščina" },
    };
    const entry = map[String(language)] ?? null;
    if (!entry) return String(language).toUpperCase();
    const v = t(entry.key);
    return v === entry.key ? entry.fallback : v;
  }, [language, t]);

  const onRate = useCallback(async () => {
    const IOS_APP_ID = "YOUR_APP_ID"; // REPLACE THIS with your real App Store app ID from appstoreconnect.apple.com
    const ANDROID_PACKAGE = "com.mzahariev.footballimposter";
    const url = Platform.select({
      ios: `itms-apps://apps.apple.com/app/id${IOS_APP_ID}?action=write-review`,
      android: `market://details?id=${ANDROID_PACKAGE}`,
      default: "",
    });
    if (url) { try { await Linking.openURL(url); return; } catch {} }
    const webUrl = Platform.select({
      ios: `https://apps.apple.com/app/id${IOS_APP_ID}`,
      android: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`,
      default: "",
    });
    if (webUrl) await Linking.openURL(webUrl);
  }, []);

  const onFeedback = useCallback(() => {
    const email = "support@yourdomain.com"; // REPLACE THIS with your real support email address
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent("Football Imposter Feedback")}&body=${encodeURIComponent("Hey! I have some feedback:\n\n")}`);
  }, []);

  return (
    <Screen edges={["top"]} padded paddingHorizontal={18} paddingTop={8}>
      <Header title={t("settings.title")} onLeft={() => router.back()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Main group */}
        <View style={styles.group}>
          <Row
            icon={<SymbolView name="globe" size={15} tintColor="#00e06a" />}
            title={t("settings.language")}
            value={languageLabel}
            onPress={() => router.push("/settings/language")}
          />
          <Row
            icon={<SymbolView name="questionmark.circle" size={15} tintColor="#00e06a" />}
            title={t("settings.howToPlay")}
            value={t("settings.learnRules")}
            onPress={() => router.push("/onboarding")}
            last
          />
        </View>

        {/* Upgrade */}
        <View style={[styles.group, styles.upgradeGroup]}>
          <Row
            icon={<SymbolView name="arrow.up.circle" size={15} tintColor={C.white} />}
            iconColor="rgba(245,158,11,0.28)"
            title={t("settings.upgrade")}
            value={t("settings.unlockAll")}
            onPress={() => router.push("/paywall")}
            right={
              <View style={styles.upgradeBadge}>
                <AppText style={styles.upgradeBadgeText}>{t("settings.upgradeCta")}</AppText>
              </View>
            }
            last
          />
        </View>

        {/* Support group */}
        <View style={styles.group}>
          <Row
            icon={<SymbolView name="star" size={15} tintColor="#00e06a" />}
            title={t("settings.rate")}
            value={t("settings.loveReview")}
            onPress={onRate}
          />
          <Row
            icon={<SymbolView name="bubble.left.and.bubble.right" size={15} tintColor="#00e06a" />}
            title={t("settings.feedback")}
            value={t("settings.shareIdeas")}
            onPress={onFeedback}
            last
          />
        </View>

        {/* Version */}
        <View style={styles.group}>
          <Row
            icon={<SymbolView name="info.circle" size={15} tintColor={C.white} />}
            iconColor={C.surfaceTop}
            title={t("settings.appVersion")}
            value={`${version} (${build})`}
            last
          />
        </View>

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 8, paddingBottom: 32, gap: 10 },

  group: {
    backgroundColor: C.surface,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    ...shadow.sm,
  },
  upgradeGroup: {
    borderColor: "rgba(245,158,11,0.22)",
    backgroundColor: "rgba(245,158,11,0.06)",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 14,
    gap: 12,
    minHeight: 58,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: R.xs,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  rowText: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: "600", color: C.white },
  rowValue: { fontSize: 12, fontWeight: "500", color: C.textMuted, marginTop: 2 },
  rowRight: { flexShrink: 0 },
  rowChevron: { fontSize: 20, color: "rgba(255,255,255,0.20)", fontWeight: "600" },

  upgradeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: R.pill,
    backgroundColor: "rgba(245,158,11,0.18)",
    borderWidth: 1,
    borderColor: "rgba(245,158,11,0.35)",
  },
  upgradeBadgeText: { fontSize: 11, fontWeight: "700", color: C.gold },
});
