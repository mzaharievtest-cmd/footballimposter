// app/voting.tsx
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, ScrollView, StyleSheet, View } from "react-native";
import { SymbolView } from "expo-symbols";

import AppText from "@/components/ui/AppText";
import BottomBar from "@/components/ui/BottomBar";
import Card from "@/components/ui/Card";
import Header from "@/components/ui/Header";
import Screen from "@/components/ui/Screen";
import SectionTitle from "@/components/ui/SectionTitle";
import { useGameSettings } from "../store/gameSettings";

export default function VotingScreen() {
  // Keep this screen aligned with the same round state Game uses.
  // IMPORTANT: Do not randomize here. We ONLY read the round state from gameSettings.
  const { playerList, round } = useGameSettings() as any;

  // Player list is the source of truth for ordering & numbering across the app
  const playerListArray: { id: string; name: string }[] = Array.isArray(playerList)
    ? playerList
    : [];

  // Starting player must come from round (same as Game)
  const startingPlayerId: string | null =
    typeof (round as any)?.startingPlayerId === "string" ? (round as any).startingPlayerId : null;

  const startingLabel = useMemo(() => {
    const idx = startingPlayerId
      ? playerListArray.findIndex((p) => p.id === startingPlayerId)
      : -1;
    const num = idx >= 0 ? idx + 1 : 1;
    const name = idx >= 0 ? String(playerListArray[idx]?.name ?? "").trim() : "";
    const isDefault = !name || name.toLowerCase() === `player ${num}`;
    return isDefault ? `Player ${num}` : `Player ${num} (${name})`;
  }, [startingPlayerId, playerListArray]);

  // Animation values for staggered card entrance
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(12)).current;

  const card1Opacity = useRef(new Animated.Value(0)).current;
  const card1Translate = useRef(new Animated.Value(18)).current;
  const card1Scale = useRef(new Animated.Value(0.96)).current;

  const card2Opacity = useRef(new Animated.Value(0)).current;
  const card2Translate = useRef(new Animated.Value(18)).current;
  const card2Scale = useRef(new Animated.Value(0.96)).current;

  const card3Opacity = useRef(new Animated.Value(0)).current;
  const card3Translate = useRef(new Animated.Value(18)).current;
  const card3Scale = useRef(new Animated.Value(0.96)).current;

  const card4Opacity = useRef(new Animated.Value(0)).current;
  const card4Translate = useRef(new Animated.Value(18)).current;
  const card4Scale = useRef(new Animated.Value(0.96)).current;

  const hintOpacity = useRef(new Animated.Value(0)).current;
  const hintTranslate = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    // Reset animations on mount
    titleOpacity.setValue(0);
    titleTranslate.setValue(12);
    card1Opacity.setValue(0);
    card1Translate.setValue(18);
    card1Scale.setValue(0.96);
    card2Opacity.setValue(0);
    card2Translate.setValue(18);
    card2Scale.setValue(0.96);
    card3Opacity.setValue(0);
    card3Translate.setValue(18);
    card3Scale.setValue(0.96);
    card4Opacity.setValue(0);
    card4Translate.setValue(18);
    card4Scale.setValue(0.96);
    hintOpacity.setValue(0);
    hintTranslate.setValue(8);

    // Staggered entrance animations
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 300,
        delay: 50,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(titleTranslate, {
        toValue: 0,
        duration: 300,
        delay: 50,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Card 1 (Starting Player)
    Animated.parallel([
      Animated.timing(card1Opacity, {
        toValue: 1,
        duration: 400,
        delay: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(card1Translate, {
        toValue: 0,
        duration: 400,
        delay: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(card1Scale, {
        toValue: 1,
        delay: 150,
        speed: 18,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Card 2
    Animated.parallel([
      Animated.timing(card2Opacity, {
        toValue: 1,
        duration: 400,
        delay: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(card2Translate, {
        toValue: 0,
        duration: 400,
        delay: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(card2Scale, {
        toValue: 1,
        delay: 250,
        speed: 18,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Card 3
    Animated.parallel([
      Animated.timing(card3Opacity, {
        toValue: 1,
        duration: 400,
        delay: 350,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(card3Translate, {
        toValue: 0,
        duration: 400,
        delay: 350,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(card3Scale, {
        toValue: 1,
        delay: 350,
        speed: 18,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Card 4
    Animated.parallel([
      Animated.timing(card4Opacity, {
        toValue: 1,
        duration: 400,
        delay: 450,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(card4Translate, {
        toValue: 0,
        duration: 400,
        delay: 450,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(card4Scale, {
        toValue: 1,
        delay: 450,
        speed: 18,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Hint text
    Animated.parallel([
      Animated.timing(hintOpacity, {
        toValue: 1,
        duration: 350,
        delay: 550,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(hintTranslate, {
        toValue: 0,
        duration: 350,
        delay: 550,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    titleOpacity, titleTranslate,
    card1Opacity, card1Translate, card1Scale,
    card2Opacity, card2Translate, card2Scale,
    card3Opacity, card3Translate, card3Scale,
    card4Opacity, card4Translate, card4Scale,
    hintOpacity, hintTranslate,
  ]);

  return (
    <Screen>
      <Header
        title="Voting"
        onLeft={() => router.replace("/game")}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslate }],
          }}
        >
          <SectionTitle title="How to Vote" />
        </Animated.View>
        <View style={styles.titleSpacer} />

        {/* Card 1 - Starting Player */}
        <Animated.View
          style={{
            opacity: card1Opacity,
            transform: [{ translateY: card1Translate }, { scale: card1Scale }],
          }}
        >
          <Card style={[styles.stepCard, styles.stepBlue]}>
            <View style={styles.stepRow}>
              <View style={[styles.stepIcon, styles.stepIconBlue]}>
                <SymbolView name="person.fill" size={24} tintColor="rgba(255,255,255,0.9)" />
                <View style={[styles.stepNum, styles.stepNumBlue]}>
                  <AppText style={styles.stepNumText}>1</AppText>
                </View>
              </View>
              <View style={styles.stepTextWrap}>
                <AppText variant="label" style={styles.stepTitle}>
                  Starting Player
                </AppText>
                <AppText variant="muted" style={styles.stepDesc}>
                  {startingLabel} starts the round.
                </AppText>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Card 2 - Group Discussion */}
        <Animated.View
          style={{
            opacity: card2Opacity,
            transform: [{ translateY: card2Translate }, { scale: card2Scale }],
          }}
        >
          <Card style={[styles.stepCard, styles.stepPurple]}>
            <View style={styles.stepRow}>
              <View style={[styles.stepIcon, styles.stepIconPurple]}>
                <SymbolView name="person.2.fill" size={24} tintColor="rgba(255,255,255,0.9)" />
                <View style={[styles.stepNum, styles.stepNumPurple]}>
                  <AppText style={styles.stepNumText}>2</AppText>
                </View>
              </View>
              <View style={styles.stepTextWrap}>
                <AppText variant="label" style={styles.stepTitle}>
                  Group Discussion
                </AppText>
                <AppText variant="muted" style={styles.stepDesc}>
                  Take turns clockwise.
                </AppText>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Card 3 - Vote Time */}
        <Animated.View
          style={{
            opacity: card3Opacity,
            transform: [{ translateY: card3Translate }, { scale: card3Scale }],
          }}
        >
          <Card style={[styles.stepCard, styles.stepGold]}>
            <View style={styles.stepRow}>
              <View style={[styles.stepIcon, styles.stepIconGold]}>
                <SymbolView name="checkmark.seal.fill" size={24} tintColor="rgba(255,255,255,0.9)" />
                <View style={[styles.stepNum, styles.stepNumGold]}>
                  <AppText style={styles.stepNumText}>3</AppText>
                </View>
              </View>
              <View style={styles.stepTextWrap}>
                <AppText variant="label" style={styles.stepTitle}>
                  Vote Time
                </AppText>
                <AppText variant="muted" style={styles.stepDesc}>
                  Each player gives one clue. Go around 2–3 times.
                </AppText>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Card 4 - Reveal Phase */}
        <Animated.View
          style={{
            opacity: card4Opacity,
            transform: [{ translateY: card4Translate }, { scale: card4Scale }],
          }}
        >
          <Card style={[styles.stepCard, styles.stepRed]}>
            <View style={styles.stepRow}>
              <View style={[styles.stepIcon, styles.stepIconRed]}>
                <SymbolView name="eye.fill" size={24} tintColor="rgba(255,255,255,0.9)" />
                <View style={[styles.stepNum, styles.stepNumRed]}>
                  <AppText style={styles.stepNumText}>4</AppText>
                </View>
              </View>
              <View style={styles.stepTextWrap}>
                <AppText variant="label" style={styles.stepTitle}>
                  Reveal Phase
                </AppText>
                <AppText variant="muted" style={styles.stepDesc}>
                  Vote for the imposters and reveal the results.
                </AppText>
              </View>
            </View>
          </Card>
        </Animated.View>

        <View style={styles.bottomSpacer} />

        <Animated.View
          style={{
            opacity: hintOpacity,
            transform: [{ translateY: hintTranslate }],
          }}
        >
          <AppText variant="muted" style={styles.bottomHint}>
            Tip: Keep answers vague — don&apos;t give the word away.
          </AppText>
        </Animated.View>
      </ScrollView>

      <BottomBar label="Reveal Results" onPress={() => router.replace("/results")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 18,
  },

  stepCard: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  stepIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  stepIconGlyph: {
    fontSize: 22,
  },

  stepNum: {
    position: "absolute",
    right: -8,
    top: -8,
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  stepNumText: {
    color: "white",
    fontSize: 13,
    fontWeight: "900",
  },

  stepTextWrap: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 20,
    lineHeight: 24,
  },
  stepDesc: {
    marginTop: 4,
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.7,
  },

  stepBlue: {
    borderColor: "rgba(255,196,0,0.55)",
    borderWidth: 2,
  },
  stepPurple: {
    borderColor: "rgba(155,92,255,0.45)",
    borderWidth: 2,
  },
  stepGold: {
    borderColor: "rgba(245,158,11,0.35)",
    borderWidth: 2,
  },
  stepRed: {
    borderColor: "rgba(239,68,68,0.35)",
    borderWidth: 2,
  },

  stepIconBlue: { backgroundColor: "rgba(255,196,0,0.18)" },
  stepIconPurple: { backgroundColor: "rgba(155,92,255,0.16)" },
  stepIconGold: { backgroundColor: "rgba(245,158,11,0.14)" },
  stepIconRed: { backgroundColor: "rgba(239,68,68,0.14)" },

  stepNumBlue: {
    backgroundColor: "rgba(255,196,0,0.55)",
    borderColor: "rgba(255,196,0,0.65)",
  },
  stepNumPurple: {
    backgroundColor: "rgba(155,92,255,0.45)",
    borderColor: "rgba(155,92,255,0.55)",
  },
  stepNumGold: {
    backgroundColor: "rgba(245,158,11,0.40)",
    borderColor: "rgba(245,158,11,0.55)",
  },
  stepNumRed: {
    backgroundColor: "rgba(239,68,68,0.35)",
    borderColor: "rgba(239,68,68,0.50)",
  },

  bottomHint: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.65,
  },
  titleSpacer: { height: 14 },
  bottomSpacer: { height: 22 },
});