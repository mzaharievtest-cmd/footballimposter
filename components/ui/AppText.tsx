import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { C } from "./theme";

type Variant = "hero" | "title" | "label" | "body" | "muted" | "caption";

type Props = TextProps & { variant?: Variant };

export default function AppText({ variant = "body", style, ...props }: Props) {
  return <Text {...props} style={[styles[variant], style]} />;
}

export { AppText };

const styles = StyleSheet.create({
  hero: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1,
    color: C.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
    color: C.white,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0,
    color: C.white,
  },
  body: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    color: C.text,
  },
  muted: {
    fontSize: 13,
    fontWeight: "500",
    color: C.textSub,
    lineHeight: 18,
  },
  caption: {
    fontSize: 11,
    fontWeight: "600",
    color: C.textMuted,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
