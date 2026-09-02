import React, { useRef } from "react";
import { View, Pressable, StyleSheet, PanResponder } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import AppText from "@/components/ui/AppText";
import BottomBar from "@/components/ui/BottomBar";
import { useI18n } from "./_layout";

const PRIMARY = "#00e06a";
const SWIPE_THRESHOLD = 70;

export default function Onboarding2() {
  const lockRef = useRef(false);
  const { t } = useI18n();

  const goNext = () => router.push("/onboarding3");
  const goPrev = () => router.back();

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 18 && Math.abs(g.dx) > Math.abs(g.dy),
    onPanResponderRelease: (_, g) => {
      if (lockRef.current) return;

      if (g.dx < -SWIPE_THRESHOLD) {
        lockRef.current = true;
        goNext();
        setTimeout(() => (lockRef.current = false), 400);
        return;
      }

      if (g.dx > SWIPE_THRESHOLD) {
        lockRef.current = true;
        goPrev();
        setTimeout(() => (lockRef.current = false), 400);
        return;
      }
    },
  });

  return (
    <Screen>
      <View style={styles.page} {...panResponder.panHandlers}>
        {/* TOP */}
        <View style={styles.top}>
          <Pressable onPress={() => router.replace("/home")} hitSlop={10}>
            <AppText variant="muted" style={styles.skip}>
              {t("onboarding.skip")}
            </AppText>
          </Pressable>
        </View>

        {/* CENTER */}
        <View style={styles.center}>
          <AppText variant="hero" style={styles.title}>
            {t("onboarding2.title")}
          </AppText>

          <View style={styles.categoryPill}>
            <AppText variant="label" style={styles.categoryText}>
              {t("onboarding2.categoryPlayers")}
            </AppText>
          </View>

          <View style={styles.cards}>
            <PlayerRow index="1" name={t("onboarding.player1")} word={t("onboarding2.wordExample")} />
            <PlayerRow index="2" name={t("onboarding.player2")} word={t("onboarding2.wordExample")} />
            <PlayerRow
              index="3"
              name={t("onboarding.player3")}
              word={t("common.unknown")}
              danger
              rightTag={t("game.imposter")}
            />
          </View>

          <View style={styles.hintBox}>
            <AppText variant="body" style={styles.hintText}>
              {t("onboarding2.hint")}
            </AppText>
          </View>
        </View>

        {/* BOTTOM */}
        <View style={styles.bottom}>
          <Dots active={1} />
        </View>
      </View>

      <BottomBar label={t("common.next")} onPress={goNext} />
    </Screen>
  );
}

function PlayerRow({
  index,
  name,
  word,
  danger,
  rightTag,
}: {
  index: string;
  name: string;
  word: string;
  danger?: boolean;
  rightTag?: string;
}) {
  return (
    <View style={[styles.card, danger ? styles.cardDanger : styles.cardNormal]}>
      <View style={styles.cardRow}>
        <View style={[styles.avatar, danger ? styles.avatarDanger : styles.avatarNormal]}>
          <AppText variant="label">{index}</AppText>
        </View>

        <View style={styles.textWrap}>
          <AppText variant="muted" style={styles.name}>
            {name}
          </AppText>
          {danger && word === "??" ? (
            <AppText
              variant="title"
              style={[styles.word, styles.wordDanger]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.78}
            >
              ??
            </AppText>
          ) : (
            <AppText
              variant="title"
              style={[styles.word, danger && styles.wordDanger]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.78}
            >
              {word}
            </AppText>
          )}
        </View>

        {rightTag ? (
          <View style={styles.tag}>
            <AppText variant="label" style={styles.tagText}>
              {rightTag}
            </AppText>
          </View>
        ) : (
          <View style={styles.tagSpacer} />
        )}
      </View>
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

  center: {
    flex: 1,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  title: { marginBottom: 4 },

  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  categoryText: { color: "rgba(255,255,255,0.80)", fontWeight: "800" },

  cards: { width: "100%", gap: 12, marginTop: 6 },

  card: {
    borderRadius: 20,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
  },
  cardNormal: { borderColor: "rgba(0,224,106,0.28)" },
  cardDanger: { borderColor: "rgba(255,80,80,0.45)", backgroundColor: "rgba(255,80,80,0.10)" },

  cardRow: { flexDirection: "row", alignItems: "center", gap: 12 },

  avatar: { width: 46, height: 46, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  avatarNormal: { backgroundColor: "rgba(0,224,106,0.18)" },
  avatarDanger: { backgroundColor: "rgba(255,80,80,0.18)" },

  name: { fontSize: 14, fontWeight: "800" },
  word: { marginTop: 6, fontSize: 22, fontWeight: "900", color: "white" },
  wordDanger: { color: "rgba(255,80,80,0.95)" },
  wordSymbolRow: {
    marginTop: 6,
    justifyContent: "center",
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qMark: {
    marginRight: -6,
    transform: [{ translateY: 2 }],
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(255,80,80,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,80,80,0.35)",
    minWidth: 86,
    alignItems: "center",
  },
  tagText: { fontSize: 11, letterSpacing: 1 },

  hintBox: {
    width: "100%",
    marginTop: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "rgba(0,224,106,0.10)",
    borderWidth: 1,
    borderColor: "rgba(0,224,106,0.18)",
  },
  hintText: { textAlign: "left", fontSize: 16, fontWeight: "400" },

  bottom: { height: 64, alignItems: "center", justifyContent: "center" },
  dots: { flexDirection: "row", justifyContent: "center", gap: 8 },
  dot: { height: 8, width: 8, borderRadius: 999 },
  dotActive: { width: 26, backgroundColor: PRIMARY },
  dotIdle: { backgroundColor: "rgba(255,255,255,0.15)" },
  textWrap: { flex: 1 },
  tagSpacer: { width: 86 },
});