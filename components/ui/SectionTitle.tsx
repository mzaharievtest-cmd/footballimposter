import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import AppText from "./AppText";

type Props = {
  title: string;
  icon?: string;
  right?: React.ReactNode;
  style?: ViewStyle;
};

export default function SectionTitle({ title, right, style }: Props) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.left}>
        <View style={styles.dot} />
        <AppText style={styles.title}>{title}</AppText>
      </View>
      {right ? <View>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#00e06a",
  },
  title: {
    fontSize: 9,
    fontWeight: "800",
    color: "rgba(255,255,255,0.45)",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
