import React, { useCallback } from "react";
import { View, StyleSheet, Switch, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import Slider from "@react-native-community/slider";
import Screen from "@/components/ui/Screen";
import Card from "@/components/ui/Card";
import AppText from "@/components/ui/AppText";
import Header from "@/components/ui/Header";

import { useGameSettings } from "../store/gameSettings";
import { useI18n } from "./_layout";

const PRIMARY = "#00e06a";
const PRIMARY_BG = "rgba(0,224,106,0.10)";
const BORDER_IDLE = "rgba(255,255,255,0.10)";
const BORDER_ACTIVE = "rgba(0,224,106,0.55)";

type RandomMode = "balanced" | "custom";

export default function ImpostersScreen() {
  const gs = useGameSettings() as any;
  const {
    players,
    imposters,
    setImposters,
    randomImposters,
    setRandomImposters,
    imposterNeverFirst,
    setImposterNeverFirst,
  } = gs;

  // Random settings from store (persisted)
  const storeRandomMode: RandomMode = (gs.randomMode as RandomMode) || "balanced";
  const setStoreRandomMode: ((m: RandomMode) => void) | undefined =
    typeof gs.setRandomMode === "function" ? gs.setRandomMode : undefined;

  const playerCount = players.length;

  // Fixed: 1..(players-1)
  const FIXED_MAX = Math.max(1, playerCount - 1);

  // Random: 0..players
  const RANDOM_MAX = Math.max(0, playerCount);

  const storeMin: number = Number.isFinite(gs.randomMinImposters)
    ? Number(gs.randomMinImposters)
    : 0;
  const storeMax: number = Number.isFinite(gs.randomMaxImposters)
    ? Number(gs.randomMaxImposters)
    : RANDOM_MAX;

  const setStoreMin: ((n: number) => void) | undefined =
    typeof gs.setRandomMinImposters === "function" ? gs.setRandomMinImposters : undefined;
  const setStoreMax: ((n: number) => void) | undefined =
    typeof gs.setRandomMaxImposters === "function" ? gs.setRandomMaxImposters : undefined;

  // Optional setting (Random only)
  const showImposterCount: boolean =
    typeof gs.showImposterCount === "boolean" ? gs.showImposterCount : true;
  const setShowImposterCount: ((v: boolean) => void) | undefined =
    typeof gs.setShowImposterCount === "function" ? gs.setShowImposterCount : undefined;

  const { t } = useI18n();

  // Keep stored values valid when player count changes
  React.useEffect(() => {
    if (!playerCount) return;

    // Clamp fixed store value to 1..FIXED_MAX when in fixed mode
    if (!randomImposters) {
      const next = clampInt(imposters, 1, FIXED_MAX);
      if (next !== imposters) setImposters(next);
      return;
    }

    // Random mode: clamp stored values to 0..RANDOM_MAX.
    // In Custom mode enforce max >= min + 1 by bumping max when needed.
    let nextMin = clampInt(storeMin, 0, RANDOM_MAX);
    let nextMax = clampInt(storeMax, 0, RANDOM_MAX);

    if (storeRandomMode === "custom") {
      if (RANDOM_MAX >= 1) {
        if (nextMax <= nextMin) {
          nextMax = clampInt(nextMin + 1, 0, RANDOM_MAX);

          // If we hit the ceiling, pull min down so we still have a 1-step gap
          if (nextMax <= nextMin) {
            nextMax = RANDOM_MAX;
            nextMin = clampInt(RANDOM_MAX - 1, 0, RANDOM_MAX);
          }
        }
      } else {
        // Only 0 possible
        nextMin = 0;
        nextMax = 0;
      }
    }

    if (setStoreMin && nextMin !== storeMin) setStoreMin(nextMin);
    if (setStoreMax && nextMax !== storeMax) setStoreMax(nextMax);
  }, [
    playerCount,
    FIXED_MAX,
    RANDOM_MAX,
    randomImposters,
    storeMin,
    storeMax,
    imposters,
    setImposters,
    setStoreMin,
    setStoreMax,
    storeRandomMode,
  ]);

  // Safety for never-first toggle
  React.useEffect(() => {
    if (!playerCount) return;
    const invalidNeverFirst = !randomImposters && imposters >= playerCount;
    if (invalidNeverFirst && imposterNeverFirst) setImposterNeverFirst(false);
  }, [playerCount, randomImposters, imposters, imposterNeverFirst, setImposterNeverFirst]);

  const selectFixed = useCallback(() => {
    setRandomImposters(false);
    const next = clampInt(imposters, 1, FIXED_MAX);
    setImposters(next);
  }, [imposters, FIXED_MAX, setRandomImposters, setImposters]);

  const selectRandom = useCallback(() => {
    setRandomImposters(true);

    // Do NOT reset random mode/range here — keep the user’s last settings.
    if (storeRandomMode === "custom") {
      setImposters(clampInt(storeMax, 0, RANDOM_MAX));
    } else {
      setImposters(RANDOM_MAX);
    }
  }, [storeRandomMode, storeMax, RANDOM_MAX, setRandomImposters, setImposters]);

  const canDecFixed = !randomImposters && imposters > 1;
  const canIncFixed = !randomImposters && imposters < FIXED_MAX;
  const decFixed = useCallback(() => setImposters(Math.max(1, imposters - 1)), [imposters, setImposters]);
  const incFixed = useCallback(() => setImposters(Math.min(FIXED_MAX, imposters + 1)), [FIXED_MAX, imposters, setImposters]);

  // Derived values for UI.
  // In Custom mode enforce: max >= min + 1 (when possible).
  let minVal = clampInt(storeMin, 0, RANDOM_MAX);
  let maxVal = clampInt(storeMax, 0, RANDOM_MAX);

  if (storeRandomMode === "custom") {
    if (RANDOM_MAX >= 1) {
      if (maxVal <= minVal) {
        maxVal = clampInt(minVal + 1, 0, RANDOM_MAX);
        if (maxVal <= minVal) {
          maxVal = RANDOM_MAX;
          minVal = clampInt(RANDOM_MAX - 1, 0, RANDOM_MAX);
        }
      }
    } else {
      minVal = 0;
      maxVal = 0;
    }
  }

  return (
    <Screen>
      <Header title={t("imposters.title")} onLeft={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
      {/* FIXED */}
      <Pressable onPress={selectFixed}>
        <Card style={[styles.sectionCard, !randomImposters ? styles.sectionActive : styles.sectionIdle]}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIcon, !randomImposters ? styles.iconActive : styles.iconIdle]}>
              <SymbolView
                name="123.rectangle.fill"
                size={18}
                tintColor={!randomImposters ? "white" : "rgba(255,255,255,0.9)"}
              />
            </View>
            <View style={styles.flex1}>
              <AppText style={[styles.sectionTitle, !randomImposters ? styles.textActive : undefined]}>
                Fixed
              </AppText>
              <AppText variant="muted" style={styles.sectionDesc}>
                Choose exact imposter count
              </AppText>
            </View>
            <SymbolView
              name={!randomImposters ? "checkmark.circle.fill" : "circle"}
              size={22}
              tintColor={!randomImposters ? PRIMARY : "rgba(255,255,255,0.35)"}
            />
          </View>

          <View style={[styles.counterRow, randomImposters && styles.disabledRow]}>
            <Pressable
              style={[styles.counterBtn, !canDecFixed && styles.disabledBtn]}
              disabled={!canDecFixed}
              onPress={decFixed}
            >
              <SymbolView name="minus" size={22} tintColor="rgba(255,255,255,0.9)" />
            </Pressable>

            <View style={[styles.counterCenter, !randomImposters ? styles.counterCenterActive : undefined]}>
              <AppText variant="hero">{clampInt(imposters, 1, FIXED_MAX)}</AppText>
            </View>

            <Pressable
              style={[styles.counterBtn, !canIncFixed && styles.disabledBtn]}
              disabled={!canIncFixed}
              onPress={incFixed}
            >
              <SymbolView name="plus" size={22} tintColor={PRIMARY} />
            </Pressable>
          </View>

          <AppText variant="muted" style={styles.rangeLabel}>
            Range: 1 - {FIXED_MAX}
          </AppText>
        </Card>
      </Pressable>

      {/* RANDOM */}
      <Pressable onPress={selectRandom}>
        <Card style={[styles.sectionCard, randomImposters ? styles.sectionActive : styles.sectionIdle]}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIcon, randomImposters ? styles.iconActive : styles.iconIdle]}>
              <SymbolView
                name="shuffle"
                size={18}
                tintColor={randomImposters ? "white" : "rgba(255,255,255,0.9)"}
              />
            </View>
            <View style={styles.flex1}>
              <AppText style={[styles.sectionTitle, randomImposters ? styles.textActive : undefined]}>
                Random
              </AppText>
              <AppText variant="muted" style={styles.sectionDesc}>
                Randomize imposter count each game
              </AppText>
            </View>
            <SymbolView
              name={randomImposters ? "checkmark.circle.fill" : "circle"}
              size={22}
              tintColor={randomImposters ? PRIMARY : "rgba(255,255,255,0.35)"}
            />
          </View>

          {randomImposters ? (
            <>
              {/* Sub-modes */}
              <View style={styles.subRow}>
                <Pressable
                  style={[styles.subCard, storeRandomMode === "balanced" ? styles.subCardActive : styles.subCardIdle]}
                  onPress={() => {
                    setStoreRandomMode?.("balanced");
                    setImposters(RANDOM_MAX);
                  }}
                >
                  <AppText style={[styles.subTitle, storeRandomMode === "balanced" ? styles.textActive : undefined]}>
                    Balanced
                  </AppText>
                </Pressable>

                <Pressable
                  style={[styles.subCard, storeRandomMode === "custom" ? styles.subCardActive : styles.subCardIdle]}
                  onPress={() => {
                    setStoreRandomMode?.("custom");

                    // Ensure defaults exist if missing (and valid)
                    if (!Number.isFinite(gs.randomMinImposters) && setStoreMin) setStoreMin(0);
                    if (!Number.isFinite(gs.randomMaxImposters) && setStoreMax) {
                      setStoreMax(RANDOM_MAX >= 1 ? 1 : 0);
                    }

                    // Keep legacy cap aligned with current max
                    setImposters(clampInt(maxVal, 0, RANDOM_MAX));
                  }}
                >
                  <AppText style={[styles.subTitle, storeRandomMode === "custom" ? styles.textActive : undefined]}>
                    Custom
                  </AppText>
                </Pressable>
              </View>

              {/* Show Imposter count (Random only) */}
              <View style={styles.randomToggleRow}>
                <View style={styles.flex1}>
                  <AppText style={styles.randomToggleTitle}>Show imposter count</AppText>
                  <AppText variant="muted" style={styles.randomToggleDesc}>
                    Show the random imposter count range during the game
                  </AppText>
                </View>

                <Switch
                  value={showImposterCount}
                  onValueChange={(v) => setShowImposterCount?.(v)}
                  trackColor={{ false: "rgba(255,255,255,0.15)", true: "rgba(0,224,106,0.35)" }}
                  thumbColor={showImposterCount ? PRIMARY : "rgba(255,255,255,0.55)"}
                />
              </View>

              {storeRandomMode === "custom" ? (
                <View style={styles.customRangeWrap}>
                  <View style={styles.sliderRow}>
                    <AppText style={styles.sliderLabel}>Min</AppText>
                    <AppText variant="label" style={styles.sliderValue}>
                      {minVal}
                    </AppText>
                  </View>

                  <Slider
                    value={minVal}
                    minimumValue={0}
                    maximumValue={RANDOM_MAX}
                    step={1}
                    onValueChange={(v) => {
                      const nextMin = clampInt(Number(v), 0, RANDOM_MAX);
                      setStoreMin?.(nextMin);

                      // If min reaches/exceeds max -> force max = min + 1 (when possible)
                      if (RANDOM_MAX >= 1 && maxVal <= nextMin) {
                        const bumpedMax = clampInt(nextMin + 1, 0, RANDOM_MAX);
                        setStoreMax?.(bumpedMax);
                        setImposters(bumpedMax);
                      }
                    }}
                    minimumTrackTintColor={PRIMARY}
                    maximumTrackTintColor="rgba(255,255,255,0.18)"
                    thumbTintColor={PRIMARY}
                  />

                  <View style={[styles.sliderRow, { marginTop: 10 }]}>
                    <AppText style={styles.sliderLabel}>Max</AppText>
                    <AppText variant="label" style={styles.sliderValue}>
                      {maxVal}
                    </AppText>
                  </View>

                  <Slider
                    value={maxVal}
                    minimumValue={0}
                    maximumValue={RANDOM_MAX}
                    step={1}
                    onValueChange={(v) => {
                      let nextMax = clampInt(Number(v), 0, RANDOM_MAX);

                      // If user tries to set max <= min -> force max = min + 1 (when possible)
                      if (RANDOM_MAX >= 1 && nextMax <= minVal) {
                        nextMax = clampInt(minVal + 1, 0, RANDOM_MAX);
                      }

                      setStoreMax?.(nextMax);
                      setImposters(nextMax);
                    }}
                    minimumTrackTintColor={PRIMARY}
                    maximumTrackTintColor="rgba(255,255,255,0.18)"
                    thumbTintColor={PRIMARY}
                  />

                  <AppText variant="muted" style={styles.rangeLabel}>
                    Range: {minVal} - {maxVal}
                  </AppText>
                </View>
              ) : (
                <View style={styles.customRangeWrap}>
                  <AppText variant="muted" style={styles.rangeLabel}>
                    Random (0 - {RANDOM_MAX})
                  </AppText>
                </View>
              )}
            </>
          ) : null}
        </Card>
      </Pressable>

      {/* NEVER FIRST */}
      <Card style={[styles.neverFirstCard, styles.sectionIdle]}>
        <View style={styles.neverFirstRow}>
          <View style={styles.neverFirstLeft}>
            <View style={styles.neverFirstTitleRow}>
              <SymbolView name="hand.raised.slash.fill" size={18} tintColor="rgba(255,255,255,0.9)" />
              <AppText style={styles.neverFirstTitle}>{t("imposters.neverFirst.title")}</AppText>
            </View>
            <AppText variant="muted" style={styles.sectionDesc}>
              {t("imposters.neverFirst.desc")}
            </AppText>
          </View>

          <Switch
            value={imposterNeverFirst}
            onValueChange={setImposterNeverFirst}
            trackColor={{ false: "rgba(255,255,255,0.15)", true: "rgba(0,224,106,0.35)" }}
            thumbColor={imposterNeverFirst ? PRIMARY : "rgba(255,255,255,0.55)"}
          />
        </View>
      </Card>
      </ScrollView>
    </Screen>
  );
}

function clampInt(n: number, min: number, max: number) {
  const nn = Number.isFinite(n) ? Math.floor(n) : min;
  return Math.max(min, Math.min(max, nn));
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  sectionCard: {
    marginTop: 12,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  iconIdle: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.10)",
  },
  iconActive: {
    backgroundColor: PRIMARY_BG,
    borderColor: BORDER_ACTIVE,
  },

  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  textActive: {
    color: "white",
  },
  sectionDesc: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    opacity: 0.75,
    marginTop: 2,
  },

  sectionIdle: {
    borderWidth: 1,
    borderColor: BORDER_IDLE,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  sectionActive: {
    borderWidth: 1,
    borderColor: BORDER_ACTIVE,
    backgroundColor: "rgba(0,224,106,0.10)",
  },

  counterRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  disabledRow: {
    opacity: 0.45,
  },

  counterBtn: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  counterCenter: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  counterCenterActive: {
    backgroundColor: "rgba(0,224,106,0.14)",
    borderColor: "rgba(0,224,106,0.55)",
  },

  rangeLabel: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    opacity: 0.75,
    textAlign: "left",
  },

  disabledBtn: {
    opacity: 0.35,
  },

  subRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 12,
  },
  subCard: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    minHeight: 74,
    justifyContent: "center",
  },
  subCardIdle: {
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(0,0,0,0.10)",
  },
  subCardActive: {
    borderColor: BORDER_ACTIVE,
    backgroundColor: "rgba(0,224,106,0.10)",
  },
  subTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },

  randomToggleRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  randomToggleTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },
  randomToggleDesc: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    opacity: 0.75,
    marginTop: 2,
  },

  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  sliderLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    opacity: 0.9,
  },
  sliderValue: {
    fontSize: 16,
  },

  customRangeWrap: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    gap: 10,
  },

  neverFirstCard: {
    marginTop: 12,
    marginBottom: 24,
  },
  neverFirstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  neverFirstLeft: {
    flex: 1,
  },
  neverFirstTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  neverFirstTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  flex1: { flex: 1 },
});