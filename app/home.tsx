import { View, StyleSheet, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/ui/AppText";
import BottomBar from "@/components/ui/BottomBar";
import { useI18n } from "./_layout";
import { C, R } from "@/components/ui/theme";

export default function Home() {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* Explicit status-bar spacer — no padding ambiguity */}
      <View style={{ height: insets.top }} />

      {/* Settings button sits right below the status bar */}
      <View style={styles.topBar} pointerEvents="box-none">
        <Pressable
          onPress={() => router.push("/settings")}
          hitSlop={12}
          style={({ pressed }) => [styles.settingsBtn, pressed && { opacity: 0.6 }]}
        >
          <SymbolView name="gearshape.fill" size={17} tintColor={C.textSub} />
        </Pressable>
      </View>

      {/* This View is the ONLY flex:1 child — justifyContent:center has full height */}
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>

        <AppText
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {t("home.title")}
        </AppText>
        <AppText style={styles.tagline}>{t("home.tagline")}</AppText>

        <Pressable
          onPress={() => router.push("/onboarding")}
          style={({ pressed }) => [styles.howToPlay, pressed && { opacity: 0.6 }]}
        >
          <AppText style={styles.howToPlayText}>{t("home.howToPlay")}</AppText>
        </Pressable>
      </View>

      <BottomBar label={t("home.getStarted")} onPress={() => router.push("/setup")} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },

  topBar: {
    height: 52,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: R.sm,
    backgroundColor: C.surfaceUp,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  logoWrap: {
    width: 112,
    height: 112,
    borderRadius: 28,
    marginBottom: 36,
    backgroundColor: "rgba(0,224,106,0.15)",
    borderWidth: 1,
    borderColor: "rgba(0,224,106,0.25)",
    shadowColor: "#00e06a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  logo: {
    width: 112,
    height: 112,
    borderRadius: 28,
  },

  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "800",
    color: C.white,
    letterSpacing: -0.8,
    textAlign: "center",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 15,
    fontWeight: "500",
    color: C.textSub,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
  },

  howToPlay: {
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: R.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  howToPlayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.5)",
  },
});
