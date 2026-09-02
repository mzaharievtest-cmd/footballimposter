import React, { useCallback, useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/ui/Screen";
import Header from "@/components/ui/Header";
import AppText from "@/components/ui/AppText";
import { useGameSettings } from "../store/gameSettings";
import { useI18n } from "./_layout";
import { C, R, shadow } from "@/components/ui/theme";

const AVATAR_COLORS = [
  { bg: "rgba(0,224,106,0.15)", color: "#00e06a" },
  { bg: "rgba(255,196,0,0.15)", color: "#ffc400" },
  { bg: "rgba(130,80,255,0.15)", color: "#a060ff" },
  { bg: "rgba(255,80,110,0.15)", color: "#ff5070" },
];

export default function GameScreen() {
  const settings = useGameSettings();
  const { t } = useI18n();
  const { players } = settings as any;
  const navigatedRef = useRef(false);
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, [pulse]);

  const playerList: { id: string; name: string }[] = Array.isArray((settings as any).playerList)
    ? (settings as any).playerList
    : Array.isArray(players)
      ? (players as string[]).map((name, idx) => ({ id: String(idx), name }))
      : [];

  const playersSeenIds: string[] = Array.isArray((settings as any).playersSeenIds)
    ? (settings as any).playersSeenIds : [];

  const playersSeenIdx: number[] = Array.isArray((settings as any).playersSeen)
    ? (settings as any).playersSeen
    : Array.isArray((settings as any).seenPlayers)
      ? (settings as any).seenPlayers : [];

  const votingUnlocked: boolean =
    typeof (settings as any).votingUnlocked === "boolean" ? (settings as any).votingUnlocked : false;

  const allPlayersSeen: boolean =
    typeof (settings as any).allPlayersSeen === "boolean"
      ? (settings as any).allPlayersSeen
      : playerList.length > 0 &&
        (playersSeenIds.length > 0
          ? playersSeenIds.length >= playerList.length
          : playersSeenIdx.length >= playerList.length);

  const storeRound: any = (settings as any).round ?? null;

  const isRandomImposters: boolean =
    typeof (settings as any).randomImposters === "boolean" ? (settings as any).randomImposters : false;

  const showImposterCount: boolean =
    typeof (settings as any).showImposterCount === "boolean" ? (settings as any).showImposterCount : false;

  const roundImposterCount: number =
    typeof storeRound?.imposterPlayerIds?.length === "number"
      ? storeRound.imposterPlayerIds.length
      : storeRound?.imposterIds instanceof Set
        ? storeRound.imposterIds.size
        : typeof (settings as any).imposters === "number"
          ? (settings as any).imposters : 0;

  const startingPlayerId: string | null =
    typeof storeRound?.startingPlayerId === "string" ? storeRound.startingPlayerId : null;

  useEffect(() => {
    const s: any = settings as any;
    if (typeof s.startRound !== "function") return;
    if (s.round) return;
    if (playerList.length === 0) return;
    try { s.startRound(); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerList.length]);

  useEffect(() => {
    if (!allPlayersSeen) { navigatedRef.current = false; return; }
    if (votingUnlocked) return;
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    if (typeof (settings as any).setVotingUnlocked === "function") {
      (settings as any).setVotingUnlocked(true);
    }
    router.replace("/voting");
  }, [allPlayersSeen, votingUnlocked, settings]);

  const openReveal = useCallback((idx: number) => {
    const p = playerList[idx];
    if (!p) return;
    router.push({
      pathname: "/reveal",
      params: { playerId: p.id, playerName: p.name, playerIndex: String(idx), playerNumber: String(idx + 1) },
    });
  }, [playerList]);

  return (
    <Screen>
      <Header
        title={t("game.playersTitle")}
        onLeft={() => {
          navigatedRef.current = false;
          const s: any = settings as any;
          if (typeof s.resetGame === "function") s.resetGame();
          if (typeof s.resetRound === "function") s.resetRound();
          if (typeof s.resetSeenPlayers === "function") s.resetSeenPlayers();
          if (typeof s.clearSeenPlayers === "function") s.clearSeenPlayers();
          if (typeof s.setSeenPlayers === "function") s.setSeenPlayers([]);
          router.back();
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <AppText style={styles.hint}>{t("game.tapNameInstruction")}</AppText>

        <View style={styles.fieldLine} pointerEvents="none">
          <View style={styles.fieldLineTrack} />
          <View style={styles.fieldLineCircle} />
        </View>

        {isRandomImposters && showImposterCount ? (
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <AppText style={styles.badgeText}>
              {t("imposters.title")}: {roundImposterCount}
            </AppText>
          </View>
        ) : null}

        <View style={styles.grid}>
          {playerList.map((p, idx) => {
            const name = p?.name ?? "";
            const pid = p?.id ?? String(idx);
            const done = playersSeenIds.length > 0
              ? playersSeenIds.includes(pid)
              : playersSeenIdx.includes(idx);
            const isStarter = startingPlayerId === pid;
            const initial = (name?.trim()?.[0] ?? "P").toUpperCase();
            const palette = AVATAR_COLORS[idx % AVATAR_COLORS.length];

            return (
              <Animated.View style={styles.tileWrap} key={pid}>
                <Pressable
                  style={[styles.tile, done && styles.tileDone, isStarter && styles.tileStarter]}
                  onPress={() => openReveal(idx)}
                  disabled={done}
                >
                  {isStarter && (
                    <Animated.View
                      pointerEvents="none"
                      style={[styles.starterRing, {
                        opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }),
                      }]}
                    />
                  )}

                  <View style={[styles.numBadge, done && styles.numBadgeDone]}>
                    <AppText style={styles.numText}>{idx + 1}</AppText>
                  </View>

                  <View
                    style={[
                      styles.avatar,
                      done ? styles.avatarDone : { backgroundColor: palette.bg },
                    ]}
                  >
                    {done
                      ? <AppText style={styles.doneIcon}>✓</AppText>
                      : <AppText style={[styles.avatarText, { color: palette.color }]}>{initial}</AppText>
                    }
                  </View>

                  <AppText numberOfLines={1} style={[styles.name, done && styles.nameDone]}>
                    {name}
                  </AppText>

                  {isStarter && (
                    <View style={styles.starterPill} pointerEvents="none">
                      <AppText style={styles.starterPillText}>{t("game.startingPlayer")}</AppText>
                    </View>
                  )}
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        {votingUnlocked ? (
          <Pressable style={styles.votingBtn} onPress={() => router.push("/voting")}>
            <AppText style={styles.votingBtnText}>{t("game.voting")}</AppText>
          </Pressable>
        ) : <View style={{ height: 10 }} />}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 24 },

  hint: {
    textAlign: "center",
    fontSize: 13,
    color: C.textMuted,
    fontWeight: "500",
    marginBottom: 20,
    marginTop: 4,
  },

  fieldLine: {
    height: 1.5,
    marginBottom: 16,
    marginTop: -8,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldLineTrack: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: "rgba(0,224,106,0.08)",
  },
  fieldLineCircle: {
    width: 10,
    height: 10,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "rgba(0,224,106,0.15)",
    backgroundColor: C.bg,
  },

  badge: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: R.pill,
    backgroundColor: "rgba(255,50,50,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,50,50,0.20)",
    marginBottom: 16,
  },
  badgeDot: { width: 5, height: 5, borderRadius: 999, backgroundColor: "#ff6666" },
  badgeText: { fontSize: 12, fontWeight: "600", color: "#ff6666" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tileWrap: {
    width: "48%",
  },
  tile: {
    backgroundColor: C.surface,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...shadow.sm,
  },
  tileDone: {
    opacity: 0.40,
  },
  tileStarter: {
    borderColor: "rgba(255,196,0,0.35)",
    backgroundColor: "rgba(255,196,0,0.03)",
    borderWidth: 1.5,
  },
  starterRing: {
    position: "absolute",
    inset: -1,
    borderRadius: R.lg + 1,
    borderWidth: 1.5,
    borderColor: "#ffc400",
  },
  numBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 24,
    height: 24,
    borderRadius: R.xs,
    backgroundColor: C.surfaceTop,
    alignItems: "center",
    justifyContent: "center",
  },
  numBadgeDone: { backgroundColor: C.surfaceUp },
  numText: { fontSize: 11, fontWeight: "700", color: C.textMuted },

  starterPill: {
    marginTop: 8,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: R.pill,
    backgroundColor: "rgba(255,196,0,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,196,0,0.30)",
  },
  starterPillText: { fontSize: 9, fontWeight: "700", color: "#ffc400", letterSpacing: 0.4, textTransform: "uppercase" },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 14,
    backgroundColor: C.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarDone: { backgroundColor: C.surfaceTop },
  avatarText: { fontSize: 26, fontWeight: "800", color: C.white },
  doneIcon: { fontSize: 22, fontWeight: "700", color: C.textMuted },

  name: { fontSize: 14, fontWeight: "700", color: C.white, textAlign: "center", paddingHorizontal: 8 },
  nameDone: { color: C.textMuted },

  votingBtn: {
    marginTop: 16,
    backgroundColor: C.accent,
    borderRadius: R.pill,
    paddingVertical: 16,
    alignItems: "center",
    ...shadow.md,
  },
  votingBtnText: { fontSize: 14, fontWeight: "900", color: "#021a0b" },
});
