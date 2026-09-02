import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import AppText from "./AppText";
import { C } from "./theme";

type Props = {
  title: string;
  subtitle?: string;
  onLeft?: () => void;
  right?: React.ReactNode;
  style?: ViewStyle;
};

export default function Header({ title, subtitle, onLeft, right, style }: Props) {
  return (
    <View style={[styles.header, style]}>
      {onLeft ? (
        <Pressable
          onPress={onLeft}
          hitSlop={12}
          style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
        >
          <AppText style={styles.backIcon}>‹</AppText>
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}

      <View style={styles.center}>
        <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
        {subtitle ? <AppText style={styles.subtitle}>{subtitle}</AppText> : null}
      </View>

      <View style={styles.side}>
        {right ?? null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    marginBottom: 4,
  },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  backBtnPressed: {
    backgroundColor: C.accentSoft,
  },
  backIcon: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "700",
    lineHeight: 20,
    marginTop: -1,
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: C.white,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "500",
    color: C.textMuted,
    marginTop: 1,
  },
  side: {
    width: 38,
    alignItems: "center",
    justifyContent: "center",
  },
});
