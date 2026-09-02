import React from "react";
import { View, Pressable, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "@/components/ui/AppText";
import { C, R } from "./theme";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  secondaryLabel?: string;
  onSecondaryPress?: () => void;
};

export default function BottomBar({ label, onPress, disabled, secondaryLabel, onSecondaryPress }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) + 10 }]}>
      <View style={styles.row}>
        {secondaryLabel && onSecondaryPress && (
          <Pressable
            onPress={onSecondaryPress}
            style={({ pressed }) => [styles.ghostBtn, pressed && { opacity: 0.65 }]}
          >
            <AppText style={styles.ghostText}>{secondaryLabel}</AppText>
          </Pressable>
        )}
        <Pressable
          onPress={onPress}
          disabled={disabled}
          style={({ pressed }) => [
            styles.button,
            secondaryLabel && styles.buttonFlex,
            disabled && styles.disabled,
            pressed && !disabled && styles.pressed,
          ]}
        >
          <AppText style={styles.text}>{label}</AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: C.bg,
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: C.accent,
    borderRadius: R.pill,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFlex: { flex: 1 },
  pressed: Platform.select({ ios: { opacity: 0.88 }, android: { opacity: 0.88 } }) ?? {},
  text: { fontSize: 14, fontWeight: "900", color: "#021a0b", letterSpacing: -0.1 },
  disabled: { opacity: 0.45 },
  ghostBtn: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostText: { fontSize: 15, fontWeight: "600", color: C.textSub },
});
