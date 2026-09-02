import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

export type ChevronDirection = "left" | "right";

type ChevronProps = {
  direction?: ChevronDirection;
  size?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
};

/**
 * Simple chevron glyph so direction is always correct on every platform.
 * (Avoids asset baseline/padding quirks.)
 */
export default function Chevron({
  direction = "right",
  size = 22,
  color = "rgba(255,255,255,0.90)",
  style,
}: ChevronProps) {
  const glyph = direction === "left" ? "‹" : "›";

  return (
    <Text
      accessibilityRole="image"
      accessibilityLabel={direction === "left" ? "Back" : "Forward"}
      style={[styles.chev, { fontSize: size, lineHeight: size, color }, style]}
    >
      {glyph}
    </Text>
  );
}

const styles = StyleSheet.create({
  chev: {
    fontWeight: "900",
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
  },
});