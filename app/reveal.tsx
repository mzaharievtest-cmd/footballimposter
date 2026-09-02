import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Pressable, Animated, Easing } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SymbolView } from "expo-symbols";

import Screen from "@/components/ui/Screen";
import AppText from "@/components/ui/AppText";
import Card from "@/components/ui/Card";
import Header from "@/components/ui/Header";
import { useI18n } from "./_layout";
import { CATEGORIES, useGameSettings } from "../store/gameSettings";
import { C } from "../components/ui/theme";

// Helper: read first non-empty param from a list of keys
function pickParam(params: Record<string, any>, keys: string[]) {
  for (const k of keys) {
    const v = params?.[k];
    if (v === undefined || v === null) continue;
    const s = Array.isArray(v) ? String(v[0]) : String(v);
    if (s.trim().length) return s;
  }
  return "";
}

export default function Reveal() {
  const raw = useLocalSearchParams<Record<string, any>>();
  const gs = useGameSettings() as any;
  const { t } = useI18n();

  const round = (gs?.round ?? gs?.currentRound ?? gs?.activeRound) as any;

  const idx = Number(
    pickParam(raw, ["idx", "playerIdx", "index0", "index", "playerIndex", "player"])
  );
  const playersLen = Array.isArray(gs?.players) ? gs.players.length : undefined;
  const hasValidIdx =
    Number.isFinite(idx) && idx >= 0 && (typeof playersLen !== "number" || idx < playersLen);

  const markSeenSafe = (idx: number) => {
    if (!Number.isFinite(idx) || idx < 0) return;

    if (typeof gs?.markPlayerSeen === "function") {
      gs.markPlayerSeen(idx);
      return;
    }

    if (typeof gs?.setPlayersSeen === "function") {
      gs.setPlayersSeen((prev: number[] = []) => (prev.includes(idx) ? prev : [...prev, idx]));
      return;
    }

    if (typeof gs?.setPlayerSeen === "function") {
      gs.setPlayerSeen(idx, true);
      return;
    }

    if (Array.isArray(gs?.playersSeen) && typeof gs?.setState === "function") {
      const next = gs.playersSeen.includes(idx) ? gs.playersSeen : [...gs.playersSeen, idx];
      gs.setState({ playersSeen: next });
    }
  };

  const categoryKey = String(
    pickParam(raw, ["categoryKey", "category", "cat"]) ||
      round?.categoryKey ||
      round?.category?.key ||
      ""
  );

  // ✅ FIX: category titles coming from round/CATEGORIES are keys -> translate with t(...)
  const resolvedCategoryTitle = useMemo(() => {
    const title = round?.categoryTitle ?? round?.category?.title;
    if (typeof title === "string" && title.trim().length) {
      return t(title); // works for "categories.activePlayers" and also for plain text
    }

    const found = CATEGORIES.find((c: any) => c.key === categoryKey);
    return found?.title ? t(found.title) : t("common.unknown");
  }, [categoryKey, round?.categoryTitle, round?.category?.title, t]);

  const mode = String(round?.mode ?? gs?.mode ?? "same");
  const showCategoryToImposter =
    typeof round?.showCategoryToImposter === "boolean"
      ? round.showCategoryToImposter
      : Boolean(gs?.showCategoryToImposter);

  const getIsImposter = (i: number) => {
    const imp = round?.imposterIds;
    if (!imp) return false;
    if (imp instanceof Set) return imp.has(i);
    if (Array.isArray(imp)) return imp.includes(i);
    if (typeof imp === "object") return Boolean((imp as any)[i]);
    return false;
  };

  const isImposter = hasValidIdx ? getIsImposter(idx) : false;

  const categoryLabel =
    isImposter && !showCategoryToImposter ? t("reveal.hidden") : resolvedCategoryTitle;

  const commonWord = String(
    round?.commonWord ??
      round?.secretWord ??
      round?.word ??
      round?.secret ??
      t("common.unknown")
  );

  const imposterWord = String(
    round?.imposterWord ?? round?.differentWord ?? t("common.unknown")
  );

  const displayWord = useMemo(() => {
    if (!hasValidIdx) return t("common.unknown");

    if (mode === "same") {
      return isImposter ? t("game.imposter") : commonWord;
    }

    if (isImposter) {
      if (!imposterWord || imposterWord === t("common.unknown")) {
        return t("game.imposter");
      }
      return imposterWord;
    }

    return commonWord;
  }, [hasValidIdx, mode, isImposter, commonWord, imposterWord, t]);

  const playerIndex = pickParam(raw, ["player", "playerIndex", "index"]);
  const playerName = pickParam(raw, ["playerName", "name"]);

  const playerLabel = useMemo(() => {
    if (playerName) return playerName;
    if (playerIndex) return `${t("players.player")} ${playerIndex}`;
    return t("players.player");
  }, [playerIndex, playerName, t]);

  const [revealed, setRevealed] = useState(false);

  const cardScale = useRef(new Animated.Value(1)).current;

  const hintOpacity = useRef(new Animated.Value(1)).current;
  const hintTranslate = useRef(new Animated.Value(0)).current;

  const wordOpacity = useRef(new Animated.Value(0)).current;
  const wordScale = useRef(new Animated.Value(0.96)).current;
  const wordTranslate = useRef(new Animated.Value(10)).current;

  const dot1 = useRef(new Animated.Value(0.35)).current;
  const dot2 = useRef(new Animated.Value(0.35)).current;
  const dot3 = useRef(new Animated.Value(0.35)).current;

  const gotItOpacity = useRef(new Animated.Value(0)).current;
  const gotItTranslate = useRef(new Animated.Value(10)).current;
  const gotItScale = useRef(new Animated.Value(0.98)).current;

  useEffect(() => {
    setRevealed(false);

    cardScale.setValue(1);
    hintOpacity.setValue(1);
    hintTranslate.setValue(0);

    wordOpacity.setValue(0);
    wordScale.setValue(0.96);
    wordTranslate.setValue(10);

    dot1.setValue(0.35);
    dot2.setValue(0.35);
    dot3.setValue(0.35);

    gotItOpacity.setValue(0);
    gotItTranslate.setValue(10);
    gotItScale.setValue(0.98);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayWord, playerLabel, categoryLabel, isImposter, mode]);

  useEffect(() => {
    if (revealed) return;

    const pulse = (v: Animated.Value, delay = 0) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(v, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(v, {
          toValue: 0.35,
          duration: 320,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]);

    const loop = Animated.loop(
      Animated.parallel([pulse(dot1, 0), pulse(dot2, 120), pulse(dot3, 240)])
    );

    loop.start();
    return () => loop.stop();
  }, [revealed, dot1, dot2, dot3]);

  const runReveal = () => {
    if (revealed) return;
    setRevealed(true);

    Animated.parallel([
      Animated.timing(gotItOpacity, {
        toValue: 1,
        duration: 220,
        delay: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(gotItTranslate, {
        toValue: 0,
        duration: 220,
        delay: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(gotItScale, {
        toValue: 1,
        speed: 18,
        bounciness: 7,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.parallel([
      Animated.timing(hintOpacity, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(hintTranslate, {
        toValue: -8,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(wordOpacity, {
        toValue: 1,
        duration: 240,
        delay: 70,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(wordTranslate, {
        toValue: 0,
        duration: 240,
        delay: 70,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(wordScale, {
        toValue: 1,
        speed: 18,
        bounciness: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Screen>
      <Header
        title={
          playerName?.trim()
            ? playerName
            : hasValidIdx
              ? `${t("players.player")} ${idx + 1}`
              : playerLabel
        }
        onLeft={() => {
          if (revealed && hasValidIdx) markSeenSafe(idx);
          router.back();
        }}
      />

      <View style={styles.root}>
        <View style={styles.content}>
          <View style={styles.stack}>
            {revealed && (
              <AppText variant="muted" style={styles.category} numberOfLines={2}>
                {t("common.category")}: {categoryLabel}
              </AppText>
            )}

            <Pressable
              onPress={runReveal}
              onPressIn={() =>
                Animated.spring(cardScale, {
                  toValue: 0.985,
                  speed: 22,
                  bounciness: 0,
                  useNativeDriver: true,
                }).start()
              }
              onPressOut={() =>
                Animated.spring(cardScale, {
                  toValue: 1,
                  speed: 18,
                  bounciness: 6,
                  useNativeDriver: true,
                }).start()
              }
              style={styles.revealCardPressable}
            >
              <Animated.View style={{ transform: [{ scale: cardScale }] }}>
                <Card style={[styles.revealCard, revealed && isImposter && styles.imposterCard]}>
                  <View style={styles.revealInner}>
                    <Animated.View
                      style={{
                        opacity: hintOpacity,
                        transform: [{ translateY: hintTranslate }],
                        alignItems: "center",
                      }}
                    >
                      <AppText variant="label" style={styles.revealLabel}>
                        {t("reveal.tapToReveal")}
                      </AppText>

                      <View style={styles.dotsRow}>
                        <Animated.View style={[styles.dot, { opacity: dot1 }]} />
                        <Animated.View style={[styles.dot, { opacity: dot2 }]} />
                        <Animated.View style={[styles.dot, { opacity: dot3 }]} />
                      </View>

                      <View style={styles.hintSubRow}>
                        <AppText variant="muted" style={styles.hintSub}>
                          {t("reveal.makeSureNoOnesWatching")}
                        </AppText>
                        <SymbolView name="eye.fill" size={16} tintColor="rgba(255,255,255,0.72)" />
                      </View>
                    </Animated.View>

                    <Animated.View
                      pointerEvents={revealed ? "auto" : "none"}
                      style={[
                        styles.wordWrap,
                        {
                          opacity: wordOpacity,
                          transform: [{ translateY: wordTranslate }, { scale: wordScale }],
                        },
                      ]}
                    >
                      <AppText
                        variant="hero"
                        style={[styles.wordText, revealed && isImposter && styles.wordTextImposter]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.7}
                      >
                        {displayWord}
                      </AppText>
                    </Animated.View>
                  </View>
                </Card>
              </Animated.View>
            </Pressable>

            <Animated.View
              pointerEvents={revealed ? "auto" : "none"}
              style={[
                styles.gotItWrap,
                {
                  opacity: gotItOpacity,
                  transform: [{ translateY: gotItTranslate }, { scale: gotItScale }],
                },
              ]}
            >
              <Pressable
                onPress={() => {
                  if (revealed && hasValidIdx) markSeenSafe(idx);
                  router.back();
                }}
                style={styles.gotItBtn}
              >
                <AppText style={styles.gotItText}>{t("reveal.gotIt")}</AppText>
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 24 },
  content: { flex: 1, justifyContent: "center", paddingTop: 10, paddingBottom: 10 },
  stack: { alignItems: "center", width: "100%", paddingVertical: 6 },

  category: {
    marginTop: 0,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.75,
  },

  revealCardPressable: { width: "100%", marginTop: 0 },
  revealCard: {
    width: "100%",
    backgroundColor: "rgba(0,224,106,0.06)",
    borderColor: "rgba(0,224,106,0.25)",
    borderWidth: 1,
  },

  imposterCard: {
    borderColor: "#EF4444",
    borderWidth: 2,
  },

  revealInner: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 18,
    minHeight: 240,
  },

  revealLabel: { textAlign: "center", fontSize: 18, fontWeight: "900" },

  dotsRow: { flexDirection: "row", gap: 12, marginTop: 18, marginBottom: 18 },

  dot: { width: 10, height: 10, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.92)" },

  hintSubRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 6 },

  hintSub: {
    textAlign: "center",
    opacity: 0.72,
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 20,
  },

  wordWrap: {
    position: "absolute",
    top: 0,
    left: 18,
    right: 18,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  wordText: { textAlign: "center", includeFontPadding: false, textAlignVertical: "center" },

  wordTextImposter: { color: "#EF4444", letterSpacing: 1 },

  gotItWrap: { width: "100%", alignItems: "center", marginTop: 18, minHeight: 56 },

  gotItBtn: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    backgroundColor: C.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  gotItText: { color: "#021a0b", fontSize: 18, fontWeight: "900" },
});