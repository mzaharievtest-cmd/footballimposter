import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { C, shadow } from "./theme";

type Variant = "default" | "raised" | "accent" | "danger" | "flat";

type Props = ViewProps & {
  children: React.ReactNode;
  variant?: Variant;
  padding?: number;
};

export default function Card({ style, children, variant = "default", padding, ...props }: Props) {
  return (
    <View
      {...props}
      style={[styles.base, styles[variant], padding !== undefined && { padding }, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  default: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.07)",
    ...shadow.sm,
  },
  raised: {
    backgroundColor: C.surfaceUp,
    borderColor: C.borderMid,
    ...shadow.md,
  },
  accent: {
    backgroundColor: C.surfaceUp,
    borderColor: C.accentBorder,
    ...shadow.sm,
  },
  danger: {
    backgroundColor: C.dangerSoft,
    borderColor: "rgba(239,68,68,0.25)",
    ...shadow.sm,
  },
  flat: {
    backgroundColor: "transparent",
    borderColor: C.border,
    shadowOpacity: 0,
    elevation: 0,
  },
});
