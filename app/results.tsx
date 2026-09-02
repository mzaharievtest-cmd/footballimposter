import React, { useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import AppText from "@/components/ui/AppText";
import BottomBar from "@/components/ui/BottomBar";
import Header from "@/components/ui/Header";
import { useGameSettings } from "../store/gameSettings";
import { useI18n } from "./_layout";
import { C, R, shadow } from "@/components/ui/theme";

function normalizeImposterIndexes(input: any, playersLen: number): number[] {
  if (!input) return [];
  if (input instanceof Set)
    return Array.from(input).map((v) => (typeof v === "number" ? v : Number(v))).filter((n) => Number.isFinite(n) && n >= 0 && n < playersLen);
  if (Array.isArray(input))
    return input.map((v) => (typeof v === "number" ? v : Number(v))).filter((n) => Number.isFinite(n) && n >= 0 && n < playersLen);
  if (typeof input === "object")
    return Object.keys(input).filter((k) => Boolean((input as any)[k])).map((k) => Number(k)).filter((n) => Number.isFinite(n) && n >= 0 && n < playersLen);
  return [];
}

function displayPlayer(players: string[] | undefined, idx: number, t: (k: string) => string) {
  const name = (players?.[idx] ?? "").trim();
  return name.length ? name : `${t("players.player")} ${idx + 1}`;
}

export default function ResultsScreen() {
  const store = useGameSettings() as any;
  const { t } = useI18n();

  const players: string[] = store.players ?? [];
  const word = store.secretLabel ?? store.secretWord ?? store.roundWord ?? store.round?.commonWord ?? store.round?.word ?? "";

  const imposterIndexes: number[] = useMemo(() => {
    const len = players.length;
    for (const c of [store.round?.imposterIds, store.storeRound?.imposterIds, store.imposterIds, store.imposterIndexes, store.imposters]) {
      const res = normalizeImposterIndexes(c, len);
      if (res.length) return res;
    }
    return [];
  }, [players.length, store]);

  const imposterNames = useMemo(() => {
    if (!players.length || !imposterIndexes.length) return [] as string[];
    return imposterIndexes.map((i) => displayPlayer(players, i, t));
  }, [players, imposterIndexes, t]);

  const isPlural = imposterNames.length > 1;

  // Animation values
  const labelAnim = useRef(new Animated.Value(0)).current;
  const nameAnim  = useRef(new Animated.Value(0)).current;
  const wordLabelAnim = useRef(new Animated.Value(0)).current;
  const wordAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    [labelAnim, nameAnim, wordLabelAnim, wordAnim].forEach(v => v.setValue(0));

    const anim = (val: Animated.Value, delay: number) =>
      Animated.timing(val, { toValue: 1, duration: 380, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true });

    Animated.stagger(160, [
      anim(labelAnim, 100),
      anim(nameAnim, 0),
      anim(wordLabelAnim, 0),
      anim(wordAnim, 0),
    ]).start();
  }, []);

  const toStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
  });

  const titleLine = useMemo(() => {
    if (!imposterNames.length) return t("results.notSet");
    return isPlural ? imposterNames.join(", ") : imposterNames[0];
  }, [imposterNames, isPlural, t]);

  return (
    <Screen>
      <Header title={t("results.title")} onLeft={() => router.replace("/setup")} />

      <View style={styles.wrap}>
        {/* Imposter block */}
        <Animated.View style={[styles.block, toStyle(labelAnim)]}>
          <View style={styles.card}>
            <View style={styles.cardLabel}>
              <AppText style={styles.cardLabelText}>
                {isPlural ? t("results.impostersWere") : t("results.imposterWas")}
              </AppText>
            </View>
            <Animated.View style={toStyle(nameAnim)}>
              <AppText
                style={styles.imposterName}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.65}
              >
                {titleLine}
              </AppText>
            </Animated.View>
          </View>
        </Animated.View>

        {/* Secret word block */}
        <Animated.View style={[styles.block, toStyle(wordLabelAnim)]}>
          <View style={[styles.card, styles.cardAccent]}>
            <View style={[styles.cardLabel, styles.cardLabelAccent]}>
              <AppText style={[styles.cardLabelText, styles.cardLabelTextAccent]}>
                {t("results.secretWord")}
              </AppText>
            </View>
            <Animated.View style={toStyle(wordAnim)}>
              <AppText
                style={styles.secretWord}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.65}
              >
                {String(word || "").toUpperCase()}
              </AppText>
            </Animated.View>
          </View>
        </Animated.View>
      </View>

      <BottomBar label={t("results.playAgain")} onPress={() => { try { store.resetRound?.(); } catch {} router.replace("/setup"); }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 14,
  },
  block: {
    width: "100%",
  },
  card: {
    backgroundColor: C.surface,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 28,
    alignItems: "center",
    ...shadow.md,
  },
  cardAccent: {
    backgroundColor: C.accentSoft,
    borderColor: C.accentBorder,
  },
  cardLabel: {
    position: "absolute",
    top: -1,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  cardLabelAccent: {},
  cardLabelText: {
    fontSize: 11,
    fontWeight: "700",
    color: C.danger,
    letterSpacing: 1,
    textTransform: "uppercase",
    backgroundColor: C.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: R.pill,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.25)",
    overflow: "hidden",
    marginTop: -10,
  },
  cardLabelTextAccent: {
    color: C.accent,
    backgroundColor: C.bg,
    borderColor: C.accentBorder,
  },
  imposterName: {
    fontSize: 40,
    fontWeight: "800",
    color: C.danger,
    textAlign: "center",
    letterSpacing: -1,
    lineHeight: 46,
  },
  secretWord: {
    fontSize: 40,
    fontWeight: "800",
    color: C.accent,
    textAlign: "center",
    letterSpacing: -1,
    lineHeight: 46,
  },
});
