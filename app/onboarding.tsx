import React, { useRef } from "react";
import { View, Pressable, StyleSheet, PanResponder } from "react-native";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";

import Screen from "@/components/ui/Screen";
import AppText from "@/components/ui/AppText";
import BottomBar from "@/components/ui/BottomBar";
import { useI18n } from "./_layout";

const PRIMARY = "#00e06a";
const SWIPE_THRESHOLD = 70;

export default function Onboarding() {
  const lockRef = useRef(false);
  const { t } = useI18n();

  const goNext = () => router.push("/onboarding2");

  const panResponder = PanResponder.create({
    // Only capture deliberate horizontal swipes (avoid vertical scroll/jitter)
    onMoveShouldSetPanResponder: (_, g) => {
      const ax = Math.abs(g.dx);
      const ay = Math.abs(g.dy);
      return ax > 18 && ax > ay * 1.25;
    },

    onPanResponderRelease: (_, g) => {
      if (lockRef.current) return;

      // swipe left -> next
      if (g.dx < -SWIPE_THRESHOLD) {
        lockRef.current = true;
        goNext();
        setTimeout(() => (lockRef.current = false), 450);
        return;
      }

      // swipe right on first screen: do nothing
    },

    // If the gesture gets cancelled, unlock
    onPanResponderTerminate: () => {
      lockRef.current = false;
    },
  });

  return (
    <Screen>
      <View style={styles.page} {...panResponder.panHandlers}>
        {/* Top */}
        <View style={styles.top}>
          <Pressable onPress={() => router.replace("/home")} hitSlop={10}>
            <AppText variant="muted" style={styles.skip}>
              {t("onboarding.skip")}
            </AppText>
          </Pressable>
        </View>

        {/* Middle */}
        <View style={styles.middle}>
          <View style={styles.pill}>
            <View style={styles.pillRow}>
              <SymbolView
                name="soccerball"
                size={14}
                tintColor="rgba(255,255,255,0.92)"
              />
              <AppText variant="label" style={styles.pillText}>
                FOOTBALL IMPOSTER
              </AppText>
            </View>
          </View>

          <AppText variant="hero" style={styles.title}>
            {t("onboarding.title")}
          </AppText>

          <AppText variant="muted" style={styles.body}>
            {t("onboarding.body")}
          </AppText>

          <View style={styles.tiles}>
            <Tile symbol="soccerball" />
            <Tile symbol="soccerball" />
            <Tile symbol="questionmark" danger />
          </View>
        </View>

        {/* Bottom */}
        <View style={styles.bottom}>
          <Dots active={0} />
        </View>
      </View>

      <BottomBar label={t("common.next")} onPress={goNext} />
    </Screen>
  );
}

function Tile({ symbol, danger }: { symbol: string; danger?: boolean }) {
  return (
    <View style={[styles.tile, danger ? styles.tileDanger : styles.tileNormal]}>
      <SymbolView
        name={symbol}
        size={26}
        tintColor={danger ? "rgba(255,255,255,0.95)" : "#00e06a"}
      />
    </View>
  );
}

function Dots({ active }: { active: number }) {
  return (
    <View style={styles.dots}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={[styles.dot, i === active ? styles.dotActive : styles.dotIdle]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },

  top: { height: 52, paddingHorizontal: 18, alignItems: "flex-end", justifyContent: "center" },
  skip: { fontSize: 14, fontWeight: "800" },

  middle: { flex: 1, paddingHorizontal: 22, alignItems: "center", justifyContent: "center", gap: 12 },

  pill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(0,224,106,0.14)",
    borderWidth: 1,
    borderColor: "rgba(0,224,106,0.35)",
  },
  pillText: { color: "rgba(255,255,255,0.92)", fontSize: 11, fontWeight: "900", letterSpacing: 1.2 },

  pillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  title: { textAlign: "center", fontSize: 28, lineHeight: 34, letterSpacing: -0.3 },
  body: { textAlign: "center", fontSize: 14, lineHeight: 20, marginTop: 2 },

  tiles: { flexDirection: "row", gap: 12, marginTop: 10 },
  tile: {
    width: 70,
    height: 70,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
  },
  tileNormal: { backgroundColor: "rgba(0,224,106,0.12)", borderColor: "rgba(0,224,106,0.35)" },
  tileDanger: { borderColor: "rgba(255, 80, 80, 0.55)" },

  bottom: { height: 64, alignItems: "center", justifyContent: "center" },
  dots: { flexDirection: "row", justifyContent: "center", gap: 8 },
  dot: { height: 8, width: 8, borderRadius: 999 },
  dotActive: { width: 26, backgroundColor: PRIMARY },
  dotIdle: { backgroundColor: "rgba(255,255,255,0.15)" },
});