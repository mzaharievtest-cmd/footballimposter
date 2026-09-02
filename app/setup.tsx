import React, { useCallback, useMemo } from "react";
import { View, Pressable, StyleSheet, ScrollView, Alert, Switch } from "react-native";
import { router } from "expo-router";
import { CATEGORIES, useGameSettings } from "../store/gameSettings";
import { SymbolView } from "expo-symbols";

import Screen from "@/components/ui/Screen";
import AppText from "@/components/ui/AppText";
import Card from "@/components/ui/Card";
import Header from "@/components/ui/Header";
import BottomBar from "@/components/ui/BottomBar";
import { StatCard } from "@/components/ui/StatCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { useI18n } from "./_layout";
import { C } from "@/components/ui/theme";

const ACCENT = C.accent;

export default function Setup() {
  const {
    players, imposters, randomImposters, randomMode,
    randomMinImposters, randomMaxImposters, mode, setMode,
    showCategoryToImposter, setShowCategoryToImposter,
    selectedCategories, startNewRound,
  } = useGameSettings();

  const { t } = useI18n();
  const playerCount = players.length;

  const selectedList = useMemo(
    () => CATEGORIES.filter((c) => selectedCategories[c.key]).map((c) => t(c.title)),
    [selectedCategories, t]
  );

  const categoriesLabel = useMemo(() => {
    if (selectedList.length === 0) return t("setup.selectCategories");
    if (selectedList.length === CATEGORIES.length) return t("setup.allCategories");
    if (selectedList.length <= 2) return selectedList.join(", ");
    return `${selectedList.length} ${t("setup.categories")}`;
  }, [selectedList, t]);

  const onStart = useCallback(() => {
    if (selectedList.length === 0) {
      Alert.alert(t("setup.alert.selectCategoryTitle"), t("setup.alert.selectCategoryBody"));
      return;
    }
    if (typeof startNewRound === "function") startNewRound();
    router.push("/game");
  }, [selectedList.length, t, startNewRound]);

  const imposterValueLabel = useMemo(() => {
    if (!randomImposters) return String(imposters);
    const maxBalanced = Math.max(0, playerCount);
    if (randomMode === "balanced") return `0-${maxBalanced}`;
    return `${randomMinImposters}-${randomMaxImposters}`;
  }, [randomImposters, imposters, playerCount, randomMode, randomMinImposters, randomMaxImposters]);

  return (
    <Screen>
      <Header title={t("setup.title")} onLeft={() => router.back()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Players + Imposters */}
        <View style={styles.row2}>
          <StatCard
            icon={<SymbolView name="person.3.fill" size={24} tintColor={C.white} />}
            label={t("setup.howManyPlayers")}
            value={playerCount}
            onPress={() => router.push("/players")}
          />
          <StatCard
            icon={<SymbolView name="eye.slash.fill" size={24} tintColor={C.white} />}
            label={t("setup.howManyImposters")}
            value={imposterValueLabel}
            onPress={() => router.push("/imposters")}
          />
        </View>

        {/* Game Mode */}
        <SectionTitle title={t("setup.gameMode")} />
        <View style={styles.row2}>
          <ModeCard
            active={mode === "same"}
            title={t("setup.mode.same.title")}
            desc={t("setup.mode.same.desc")}
            onPress={() => setMode("same")}
          />
          <ModeCard
            active={mode === "similar"}
            title={t("setup.mode.similar.title")}
            desc={t("setup.mode.similar.desc")}
            onPress={() => setMode("similar")}
          />
        </View>

        {/* Categories */}
        <SectionTitle title={t("setup.categoriesTitle")} />
        <Pressable onPress={() => router.push("/categories")}>
          <Card style={styles.categoryCard}>
            <View style={styles.catRow}>
              <View style={styles.catIconBox}>
                <AppText style={styles.catIcon}>⚽</AppText>
              </View>
              <View style={styles.catText}>
                <AppText style={styles.catLabel}>{categoriesLabel}</AppText>
                <AppText style={styles.catSub}>
                  {selectedList.length} / {CATEGORIES.length} {t("setup.categories")}
                </AppText>
              </View>
              <AppText style={styles.chevron}>›</AppText>
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <AppText style={styles.toggleLabel}>{t("setup.showCategoryToImposter")}</AppText>
              <Switch
                value={showCategoryToImposter}
                onValueChange={setShowCategoryToImposter}
                trackColor={{ false: C.surfaceTop, true: "rgba(0,224,106,0.35)" }}
                thumbColor={showCategoryToImposter ? ACCENT : "rgba(255,255,255,0.45)"}
              />
            </View>
          </Card>
        </Pressable>

      </ScrollView>

      <BottomBar label={t("setup.startGame")} onPress={onStart} />
    </Screen>
  );
}

function ModeCard({
  active, title, desc, onPress,
}: {
  active: boolean; title: string; desc: string; onPress: () => void;
}) {
  return (
    <Pressable style={styles.flex1} onPress={onPress}>
      <View style={[styles.modeCard, active && styles.modeCardActive]}>
        {active && <View style={styles.modeBar} />}
        <View style={styles.modeHeaderRow}>
          <View style={[styles.radio, active && styles.radioActive]}>
            {active ? <View style={styles.radioDot} /> : null}
          </View>
          <AppText style={[styles.modeTitle, active && styles.modeTitleActive]}>{title}</AppText>
        </View>
        <AppText style={styles.modeDesc}>{desc}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 4, paddingBottom: 16, gap: 10 },
  row2: { flexDirection: "row", gap: 10 },
  flex1: { flex: 1 },

  modeCard: {
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 14,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
    overflow: "hidden",
  },
  modeCardActive: {
    borderColor: "#00e06a",
    backgroundColor: "rgba(0,224,106,0.06)",
  },
  modeBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: C.accent,
  },
  modeHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  radio: {
    width: 7,
    height: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.30)",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: "#00e06a",
  },
  radioDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#00e06a",
  },
  modeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: C.textSub,
  },
  modeTitleActive: { color: "#00e06a" },
  modeDesc: {
    fontSize: 12,
    fontWeight: "500",
    color: C.textMuted,
    textAlign: "left",
    lineHeight: 17,
  },

  categoryCard: {
    borderRadius: 16,
  },
  catRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  catIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(0,224,106,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  catIcon: { fontSize: 18 },
  catText: { flex: 1 },
  catLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: C.white,
  },
  catSub: {
    fontSize: 12,
    fontWeight: "500",
    color: C.textMuted,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: C.textMuted,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 14,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: C.textSub,
    paddingRight: 12,
    lineHeight: 18,
  },
});
