import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import { C } from "./theme";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
  bottom?: React.ReactNode;
  padded?: boolean;
  paddingHorizontal?: number;
  paddingTop?: number;
};

export default function Screen({
  children,
  style,
  edges = ["top", "bottom"],
  bottom,
  padded = true,
  paddingHorizontal = 18,
  paddingTop = 10,
}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <View style={styles.root}>
        <View
          style={[
            styles.content,
            padded && { paddingHorizontal, paddingTop },
            !padded && { paddingHorizontal: 0, paddingTop: 0 },
            style,
          ]}
        >
          {children}
        </View>
        {bottom ? <View style={styles.bottomSlot}>{bottom}</View> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  root: { flex: 1, backgroundColor: C.bg },
  content: { flex: 1 },
  bottomSlot: {
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: C.bg,
  },
});
