import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import { C, R, shadow } from "./theme";

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  hint?: string;
  onPress: () => void;
  horizontal?: boolean;
};

export function StatCard({ icon, label, value, hint, onPress, horizontal }: Props) {
  if (horizontal) {
    return (
      <Pressable
        style={({ pressed }) => [styles.cardH, pressed && styles.pressed]}
        onPress={onPress}
      >
        <View style={styles.iconBoxH}>{icon}</View>
        <View style={styles.textH}>
          <AppText style={styles.labelH}>{label}</AppText>
          {hint ? <AppText style={styles.hint}>{hint}</AppText> : null}
        </View>
        <AppText style={styles.valueH}>{value}</AppText>
        <AppText style={styles.chevron}>›</AppText>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.iconBox}>{icon}</View>
      <AppText style={styles.value}>{value}</AppText>
      <AppText style={styles.label}>{label}</AppText>
      {hint ? <AppText style={styles.hint}>{hint}</AppText> : null}
      <AppText style={styles.chevron}>›</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    minHeight: 160,
    gap: 4,
    ...shadow.sm,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: R.md,
    backgroundColor: C.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  value: {
    fontSize: 28,
    fontWeight: "900",
    color: C.white,
    letterSpacing: -1,
    lineHeight: 32,
    textAlign: "left",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: C.textSub,
    textAlign: "left",
    lineHeight: 16,
  },
  hint: {
    fontSize: 10,
    fontWeight: "500",
    color: C.textMuted,
    textAlign: "left",
  },
  chevron: {
    position: "absolute",
    bottom: 12,
    right: 14,
    fontSize: 18,
    color: C.textMuted,
    fontWeight: "700",
  },

  // Horizontal
  cardH: {
    backgroundColor: C.surface,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    ...shadow.sm,
  },
  iconBoxH: {
    width: 44,
    height: 44,
    borderRadius: R.md,
    backgroundColor: C.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textH: { flex: 1, gap: 2 },
  labelH: {
    fontSize: 14,
    fontWeight: "600",
    color: C.textSub,
  },
  valueH: {
    fontSize: 32,
    fontWeight: "800",
    color: C.white,
    letterSpacing: -1,
    flexShrink: 0,
  },
});
